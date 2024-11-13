<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue'
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue'
import EventPeriods from '@/components/event/EventPeriods.vue';
import InputFieldComponent from '@/components/event/InputFieldComponent.vue'
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import MapComponent from '@/components/MapComponent.vue';
import { ref } from 'vue'
import ItemView from '../shop/ItemView.vue';
import { all } from 'axios';


// localStorage.setItem('name', 'ted')

// 資料設定
const BASE_URL = import.meta.env.VITE_API_BASEURL
const API_URL = BASE_URL + '/Events'
const PERIODS_URL = `${BASE_URL}/EventPeriods`
const CATEGORY_URL = API_URL + '/Categories'
const LOCATIONS_URL = BASE_URL + '/Locations'
const EVENTLOCATIONS_URL = BASE_URL + '/EventLocations'

const eventsData = ref({
    "id": 0,
    "name": "string",
    "organizerId": 0,
    "fee": 0,
    "capacity": 0,
    "description": "",
    "priority": 0,
    "categoryId": 0,
})

const categories = ref({
    'categoryId': 0,
    'categoryName': ''
})

const periods = ref([])

const member = JSON.parse(localStorage.getItem('member'))

eventsData.value.organizer = member.name
eventsData.value.organizerId = member.id

const getLoc = [
    // {
    //     'id': 1,
    //     'name': 'Loc1',
    //     'addr': 'abcdefg'
    // },
    // {
    //     'id': 2,
    //     'name': 'Loc2',
    //     'addr': 'abcdefg1'
    // },
]

const columns = [
    { data: 'id', title: 'ID' },
    { data: 'name', title: '名稱' },
    { data: 'address', title: '地址' },
];

const LocationData = ref(getLoc)

const getData = ref({
    'eveTypes': [
        'type 1',
        'type 2',
        'type 3'
    ],
    'evePriors': [
        { 'name': 'Prior 1', 'numberValue': 1 },
        { 'name': 'Prior 2', 'numberValue': 2 },
        { 'name': 'Prior 3', 'numberValue': 3 },
        { 'name': 'Prior 4', 'numberValue': 4 },
        { 'name': 'Prior 5', 'numberValue': 5 }
    ],
})

// const demoList = [
//     { 'id': '1', 'locName': 'Location A1', 'order': '1' },
//     { 'id': '2', 'locName': 'Location A2', 'order': '2' },
//     { 'id': '3', 'locName': 'Location A3', 'order': '3' },
//     { 'id': '4', 'locName': 'Location A4', 'order': '4' },
//     { 'id': '5', 'locName': 'Location A5', 'order': '5' },
//     { 'id': '6', 'locName': 'Location A6', 'order': '6' },
//     { 'id': '7', 'locName': 'Location A7', 'order': '7' },
//     { 'id': '8', 'locName': 'Location A8', 'order': '8' },
//     { 'id': '9', 'locName': 'Location A9', 'order': '9' },
//     { 'id': '10', 'locName': 'Location A10', 'order': '10' },
// ]

const eventLocs = ref([])

const startData = ref({
    'startPerson': '123',
    'eveTitle': '',
    'eveFee': '',
    'eveType': '',
    'evePrior': '',
    'eveFee2': '',
    'eveFee3': '',
})

const isSubmitClick = ref(false)

const loadCategories = async () => {
    try {
        const response = await fetch(CATEGORY_URL, {
            method: 'GET',
        })
        const datas = await response.json()
        console.log(datas)
        categories.value = datas
    } catch (error) {
        alert(`loadCategories 發生錯誤: ${error.name} -> ${error.message}, cause: ${error.cause}`)
    }

}

const loadLocations = async () => {
    //要改URL
    const response = await fetch(LOCATIONS_URL, {
        method: 'GET',
    })
    const datas = await response.json()
    console.log(datas)
    LocationData.value = datas
}

const onSubmit = async () => {
    try {
        if (periods.value.length === 0 && isSubmitClick.value) {
            alert('請輸入時段')
            isSubmitClick.value = false
            return
        }

        if (eventLocs.value.length === 0 && isSubmitClick.value) {
            alert('請輸入地點')
            isSubmitClick.value = false
            return
        }
        console.log(API_URL)
        console.log(eventsData.value)
        let myHeader = {
            "Content-Type": "application/json",
        }
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(eventsData.value),
            headers: myHeader
        })

        if (response.ok) {
            let allOk = true
            //時段
            const rtObj = await response.json()
            const newId = rtObj.id

            if (periods.value.length > 0) {
                periods.value.forEach(async (p, index) => {
                    p['description'] = `第 ${index + 1} 時段`
                    p['EId'] = newId

                    const respPeriods = await fetch(PERIODS_URL, {
                        method: 'POST',
                        body: JSON.stringify(p),
                        headers: myHeader
                    })

                    allOk = allOk && respPeriods.ok
                })
            }



            //地點
            eventLocs.value.forEach(async locs => {
                const ELocJson = {
                    "lId": locs.id,
                    "eId": newId,
                    "orderInEvent": locs.order
                }

                const respELocs = await fetch(EVENTLOCATIONS_URL, {
                    method: 'POST',
                    body: JSON.stringify(ELocJson),
                    headers: myHeader
                })

                allOk = allOk && respELocs.ok
            })

            //復位
            if (allOk) {
                periods.value = []
                eventLocs.value = []
                alert('添加成功')
            }
        }

        isSubmitClick.value = false

        console.log(response.status)
    } catch (error) {
        alert(`OnSubmit 發生錯誤: ${error.name} -> ${error.message}, cause: ${error.cause}`)
    }
}

const addLoc = (table) => {
    //https://datatables.net/forums/discussion/76468/how-to-get-selected-row-while-using-vue3-without-jquery
    const tb = table.dt
    const datas = tb.rows('.selected').data() // DataTables 的選擇器會回傳類似陣列的物件

    // 將 datas 轉為陣列處理
    const selectedItems = Array.from(datas);

    // 檢查是否有選中項目
    if (selectedItems.length > 0) {
        console.log(selectedItems); // 檢查選中的資料
        appendTargetList(selectedItems); // 傳遞選中項目到下一個函式
    }
}

const updateOrders = () => {
    // 根據 eventLocs 的新順序更新 order 值
    eventLocs.value.forEach((item, index) => {
        item.order = index + 1; // 重新分配 order，從 1 開始
    })
}

const appendTargetList = (list) => {
    // 確認 list 是否為陣列
    if (Array.isArray(list)) {
        // 找到當前最大 order
        let maxOrder = eventLocs.value.length > 0
            ? Math.max(...eventLocs.value.map(item => Number(item.order)))
            : 0;

        // 遍歷每一個選中的項目並添加到 eventLocs
        list.forEach(item => {
            console.log(item); // 檢查每個 item 的資料
            maxOrder += 1; // 增加最大 order
            // 添加新地點物件
            // id 為 Location Id
            const addObj = {
                'id': `${item.id}`, // 你可以根據需求修改此值
                'locName': item.name, // 假設 item.name 是你需要的地點名稱
                'order': `${maxOrder}` // 使用遞增的 order 值
            };
            eventLocs.value.push(addObj);
        });
    } else {
        // 若不是陣列，單獨處理一個項目
        const maxOrder = eventLocs.value.length > 0
            ? Math.max(...eventLocs.value.map(item => Number(item.order)))
            : 0;

        // 添加新地點物件
        const addObj = {
            'id': `${0}`, // 你可以根據需求修改此值
            'locName': list.name, // 假設 list.name 是你需要的地點名稱
            'order': `${maxOrder + 1}` // 使用遞增的 order 值
        };
        eventLocs.value.push(addObj);
    }
    updateOrders()

    console.log(eventLocs.value)
}

loadCategories()
loadLocations()
</script>

<template>
    <div>
        <form class="" @submit.prevent="onSubmit">
            <div class="container mt-3">
                <div class="row justify-content-center">
                    <div class="col-12 col-lg-5">
                        <div class="row g-3 align-items-center">
                            <!-- 發起人 -->
                            <h2 class="text-left">發起人: {{ eventsData.organizer }}</h2>
                            <!-- 活動名稱 -->
                            <div class="col-3 ">
                                <label for="eveTitle" class="col-form-label">活動名稱</label>
                            </div>
                            <div class="col-6">
                                <input type="text" class="form-control" id="eveTitle" v-model="eventsData.name">
                            </div>
                            <div class="col-3"></div>
                            <!-- 報名費 -->
                            <div class="col-3 ">
                                <label for="eveFee" class="col-form-label">報名費</label>
                            </div>
                            <div class="col-6">
                                <input type="number" class="form-control" id="eveFee" v-model="eventsData.fee">
                            </div>
                            <div class="col-3"></div>
                            <!-- 活動類別 -->
                            <div class="col-3 ">
                                <label for="eveType" class="col-form-label">活動類別</label>
                            </div>
                            <div class="col-6">
                                <!-- <input type="number" class="form-control" id="eveType"> -->
                                <select class="form-select" name="" id="eveType" v-model="eventsData.categoryId">
                                    <!-- <option value="">type 1</option>
                                    <option value="">type 2</option>
                                    <option value="">type 3</option> -->
                                    <option v-for="cate in categories" :value="cate.categoryId"
                                        :key="cate.categoryName"> {{ cate.categoryName }}
                                    </option>

                                </select>
                            </div>
                            <div class="col-3"></div>
                            <!-- 活動優先級 -->
                            <div class="col-3">
                                <label for="evePrior" class="col-form-label">活動優先級</label>
                            </div>
                            <div class="col-6">
                                <!-- <input type="number" class="form-control" id="eveType"> -->
                                <select class="form-select" name="" id="evePrior" v-model="eventsData.priority">
                                    <!-- <option value="">prior 1</option>
                                    <option value="">prior 2</option>
                                    <option value="">prior 3</option> -->
                                    <option v-for="prior in getData.evePriors" :key="prior.name"
                                        :value="prior.numberValue"> {{ prior.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-3"></div>

                            <!-- 活動地點 -->
                            <label for="eveLoc" class="mb-2 form-label">活動地點</label>
                            <!-- table of locations -->
                            <div class="mt-0">
                                <!-- 需要從零加入地點 -->
                                <PlacesComponent :enableAddLocation="true" @addLocation="addLoc"
                                    :locationData="LocationData" :columns="columns" v-model="eventLocs" />
                            </div>

                            <!-- 活動描述 -->
                            <label for="eveDesc" class="mb-2 form-label">活動描述</label>
                            <textarea class="form-control mt-0 mb-5" name="description" id="eveDesc" cols="30" rows="10"
                                v-model="eventsData.description" placeholder="請輸入內容"></textarea>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 offset-lg-1">
                        <div class="row g-3 align-items-center">
                            <!-- 活動照片 -->
                            <label for="evePhoto" class="mb-2 form-label">活動照片</label>
                            <!-- 實作輪播 -->
                            <!-- <div>
                                實作輪播
                                <CarouselComponent></CarouselComponent>
                            </div> -->
                            <input type="file" name="Photo" id="evePhoto" class="form-control">

                            <!-- 活動時間 -->
                            <EventPeriods v-model="periods" />
                            <!-- <InputFieldComponent Type="date" Id="eveStartDay" Label="活動開始日期" />
                            <InputFieldComponent Type="time" Id="eveStartTime" Label="活動開始時間" v-model="startData" />
                            <InputFieldComponent Type="date" Id="eveEndDay" Label="活動結束日期" />
                            <InputFieldComponent Type="time" Id="eveEndTime" Label="活動結束時間" /> -->

                            <!-- 最大活動人數 -->
                            <ColumnInputFieldComponent Type="number" Id="eveCap" Label="最大活動人數" Indent="false"
                                LabelCol="4" InputCol="7" class="mt-5" v-model="eventsData.capacity" />
                            <!-- <InputFieldComponent Type="number" Id="eveCap" Label="最大活動人數"></InputFieldComponent> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- submit -->
            <button class="fixedBtn roundBtn btn btn-primary" type="submit" @click="isSubmitClick = !isSubmitClick">
                <i class="bi bi-plus-circle-fill"></i>
            </button>
        </form>
        <!-- <MapComponent /> -->
    </div>

</template>

<style lang="css" scoped>
.flexBox {
    display: flex;
    justify-content: center;
}

.roundBtn {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    font-size: 1.25em;
}

.fixedBtn {
    display: block;
    position: fixed;
    right: 50px;
    bottom: 50px;
}

.holdplace {
    height: 400px;
    width: 100%;
    border: 1px solid salmon;
}

:deep(label) {
    font-weight: bold;
}
</style>