<script setup>
import DetailModal from '@/components/DetailModal.vue';
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue';
import DetailModalSignUp from '@/components/event/DetailModalSignUp.vue';
import EventDatailComponent from '@/components/event/EventDatailComponent.vue';
import InputFieldComponent from '@/components/event/InputFieldComponent.vue';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_BASEURL
const EVENT_URL = BASE_URL + '/Events' //operation with event
const ELOCS_URL = EVENT_URL + '/Locations'
const CHOSEN_PERIOD_URL = BASE_URL + '/EventPeriods'
const MEMBERINFO_URL = BASE_URL + '/Members/GetMemberInFo'

const SignUp_URL = BASE_URL + '/SignUps'

//props
const props = defineProps({
    id: String
})

let eData = {
    'id': 0,
    'eventName': 'title',
    'fee': '300',
    'eventPeriods': [
        { 'name': '第一梯次', 'time': '20240801-00:00:00' },
        { 'name': '第二梯次', 'time': '20240802-00:00:00' },
        { 'name': '第三梯次', 'time': '20240803-00:00:00' },
    ],
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dapibus elit. Morbi quis felis quis neque sagittis luctus vel nec lacus. Suspendisse quis ipsum gravida, ultricies ante vitae, dictum sem. Integer laoreet felis et sollicitudin congue. Nunc et lectus venenatis, mollis massa a, imperdiet ipsum. Curabitur sit amet sem a velit accumsan vehicula. In sed tempus arcu. Cras finibus ac nunc at dapibus. Sed ex augue, condimentum sed finibus eget, fermentum nec tellus.'
};

const member = JSON.parse(localStorage.getItem('member'))

const eventData = ref({})

const EventLocations = ref([])

const choosePeriodId = ref(-1)

const choosePeriod = ref({})

const memberInfo = ref({})

const showModal = ref(false);
// const selectedEvent = ref(null);

const getEvent = async () => {
    const response = await fetch(`${EVENT_URL}/${props.id}`, {
        method: 'GET'
    })

    const json = await response.json()
    console.log(json)
    return json
}

const getEventLocs = async () => {
    const response = await fetch(`${ELOCS_URL}/${props.id}`, {
        method: 'GET'
    })

    const json = await response.json()
    EventLocations.value = json
}

const getChosenPeriod = async () => {
    const response = await fetch(`${CHOSEN_PERIOD_URL}/${choosePeriodId.value}`, {
        method: 'GET'
    })

    const json = await response.json()
    choosePeriod.value = json
}

const getMemberInfo = async () => {
    const response = await fetch(`${MEMBERINFO_URL}/${member.id}`, {
        method: 'GET'
    })

    const json = await response.json()
    memberInfo.value = json
}

const onSubmit = () => {
    // alert('請選擇時段')
    console.log(eventData.value)
    console.log(choosePeriodId.value)
    openDetails()
}

function openDetails() {
    // eventData.value = event;
    showModal.value = true;
}

function closeModal() {
    showModal.value = false;
    // eventData.value = null;
}

async function registerEvent(event) {
    // post signUp
    let postObj = {
        "epId": 0,
        "applicant": 0
    }

    postObj.epId = choosePeriodId.value
    postObj.applicant = memberInfo.value.id

    const response = await fetch(SignUp_URL, {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        Swal.fire('已報名', `您已成功報名活動「${event.name}」`, 'success');
    }

}

onMounted(async () => {
    try {
        eventData.value = await getEvent(); // 確保正確更新值

        getMemberInfo()
        if (eventData.value.periods.length > 0) {
            choosePeriodId.value = eventData.value.periods[0].id;
        }
        getEventLocs()
        getChosenPeriod()
        // alert('請選擇時段')
    } catch (error) {
        console.error('Failed to load event data:', error);
    }
})
</script>

<template>
    <div class="mt-3 container">
        <form @submit.prevent="onSubmit">
            <div class="d-flex" v-if="eventData">
                <div class="w-25">
                    <h2>{{ member.name }}</h2>
                    <div class="d-flex justify-content-around">
                        <label class="me-5"> 報名時段 </label>
                        <select class="form-select" :name="eventData.Name" :id="eventData.id" v-model="choosePeriodId"
                            @change="getChosenPeriod">
                            <!-- get EP DATA -->
                            <option v-for="period in eventData.periods" :value="period.id">
                                {{ period.description }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="w-75">
                    <div class="d-flex justify-content-center">
                        <img src="/images/non-found.jpg" alt="">
                    </div>
                </div>
            </div>

            <div class="row g-3 mt-3">
                <!-- <div class="col-12">
                    <input class="ms-3" type="checkbox" name="test" id="same"> <label for="same">同會員資料</label>
                </div> -->
                <div class="col-6">
                    <ColumnInputFieldComponent Type="text" Id="" Label="電子郵件" LabelCol="3" InputCol="8" Disable="true"
                        v-model="memberInfo.email" />
                </div>
                <div class="col-6">
                    <ColumnInputFieldComponent Type="text" Id="" Label="電話" LabelCol="2" InputCol="8" Disable="true"
                        v-model="memberInfo.phone" />
                </div>
                <div class="col-12">
                    <ColumnInputFieldComponent Type="text" Id="" Label="地址" LabelCol="1" InputCol="10" Disable="true"
                        v-model="memberInfo.address" />
                </div>
                <hr>
                <div class="row">
                    <EventDatailComponent class="col-md-12 col-12" :Id="props.id" :API="EVENT_URL" />
                    <!-- <div class="col-md-6 col-12 box"></div> -->
                </div>

                <!-- <h4> 活動描述 </h4>
                <div class="text-start mx-3">
                    {{ eventData.description }}
                </div>
                !-- 活動地點 --
                <div class="col-12">
                    <h4>活動地點</h4>
                    !-- 活動地點列表 --
                </div>
                !-- 報名費 --
                <div class="col-12">
                    <h4>報名費</h4>
                    <p class="mx-3 float-end fs-5">
                        {{ eventData.fee }} 元
                    </p>
                </div> -->
                <!-- submit -->
                <div class="col-12 my-3 d-flex justify-content-end">
                    <button class="btn btn-primary col-2 me-3" type="submit">報名</button>
                    <button class="btn btn-secondary col-2" type="button">取消</button>
                </div>
            </div>
        </form>
        <DetailModalSignUp v-if="showModal" :event="eventData" :locations="EventLocations" :choose-period="choosePeriod"
            @close="closeModal" @register="registerEvent" />
    </div>
</template>

<style lang="css" scoped>
.box {
    border: 1px solid salmon;
    height: 100px;
}

.no-resize {
    resize: none;
}

:deep(label) {
    font-weight: bold;
}
</style>