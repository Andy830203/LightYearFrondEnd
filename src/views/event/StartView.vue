<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue'
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue'
import InputFieldComponent from '@/components/event/InputFieldComponent.vue'
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import { ref } from 'vue'


localStorage.setItem('name', 'ted')

// 資料設定
const BASE_URL = import.meta.env.VITE_API_BASEURL
const API_URL = BASE_URL + '/Events'
const CATEGORY_URL = API_URL + '/Categories'
const eventsData = ref({
    "id": 0,
    "name": "string",
    "organizerId": 0,
    "organizer": "string",
    "fee": 0,
    "capacity": 0,
    "description": "string",
    "priority": 0,
    "categoryId": 0,
    "category": "string"
})

const categories = ref({
    'categoryId': 0,
    'categoryName': ''
})

eventsData.value.organizer = localStorage.getItem('name')

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

const startData = ref({
    'startPerson': '123',
    'eveTitle': '',
    'eveFee': '',
    'eveType': '',
    'evePrior': '',
    'eveFee2': '',
    'eveFee3': '',
})

const loadCategories = async () => {
    const response = await fetch(CATEGORY_URL, {
        method: 'GET',
    })
    const datas = await response.json()
    console.log(datas)
    categories.value = datas
}

const loadLocations = async () => {
    const response = await fetch(CATEGORY_URL, {
        method: 'GET',
    })
    const datas = await response.json()
    console.log(datas)
    categories.value = datas
}

const onSubmit = () => {
    // alert('123')
    // console.log('123')
    // fetch('127.0.0.1', {
    //     body: '123321',
    //     method: 'POST'
    // })
    // let rtValue = localStorage.getItem('name')
    console.log(startData.value)
    // console.log(rtValue)
    localStorage.clear()
}

loadCategories()
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
                                <select class="form-select" name="" id="eveType" v-model="eventsData.category">
                                    <!-- <option value="">type 1</option>
                                    <option value="">type 2</option>
                                    <option value="">type 3</option> -->
                                    <option v-for="type in categories" :value="type" :key="type"> {{ type }}
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
                                <PlacesComponent></PlacesComponent>
                            </div>

                            <!-- 活動描述 -->
                            <label for="eveDesc" class="mb-2 form-label">活動描述</label>
                            <textarea class="form-control mt-0 mb-5" name="description" id="eveDesc" cols="30"
                                rows="10"></textarea>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 offset-lg-1">
                        <div class="row g-3 align-items-center">
                            <!-- 活動照片 -->
                            <label for="evePhoto" class="mb-2 form-label">活動照片</label>
                            <!-- 實作輪播 -->
                            <div>
                                實作輪播
                                <CarouselComponent></CarouselComponent>
                            </div>
                            <input type="file" name="Photo" id="evePhoto" class="form-control">

                            <!-- 活動時間 -->
                            <!-- <label for="eveStartDay" class="mb-2 form-label">活動開始日期</label>
                            <input type="date" name="" id="eveStartDay" class="form-control">
                            <label for="eveStartTime" class="mb-2 form-label">活動開始時間</label>
                            <input type="time" name="" id="eveStartTime" class="form-control"> -->
                            <InputFieldComponent Type="date" Id="eveStartDay" Label="活動開始日期"></InputFieldComponent>
                            <InputFieldComponent Type="time" Id="eveStartTime" Label="活動開始時間" v-model="startData">
                            </InputFieldComponent>
                            <InputFieldComponent Type="date" Id="eveEndDay" Label="活動結束日期"></InputFieldComponent>
                            <InputFieldComponent Type="time" Id="eveEndTime" Label="活動結束時間"></InputFieldComponent>

                            <!-- 最大活動人數 -->
                            <ColumnInputFieldComponent Type="number" Id="eveCap" Label="最大活動人數" Indent="false"
                                LabelCol="4" InputCol="7" class="mt-5">
                            </ColumnInputFieldComponent>
                            <!-- <InputFieldComponent Type="number" Id="eveCap" Label="最大活動人數"></InputFieldComponent> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- submit -->
            <button class="fixedBtn roundBtn btn btn-primary" type="submit">
                <i class="bi bi-plus-circle-fill"></i>
            </button>
        </form>
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