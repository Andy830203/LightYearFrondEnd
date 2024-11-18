<script setup>
import DetailModalSignUp from '@/components/event/DetailModalSignUp.vue';
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const EVENT_URL = BASE_URL + '/Events';
const CHOSEN_PERIOD_URL = BASE_URL + '/EventPeriods';
const MEMBERINFO_URL = BASE_URL + '/Members/GetMemberInFo';
const SignUp_URL = BASE_URL + '/SignUps';

const props = defineProps({
    id: String
});

const member = JSON.parse(localStorage.getItem('member'));
const eventData = ref({});
const choosePeriodId = ref(-1);
const choosePeriod = ref({});
const memberInfo = ref({});
const showModal = ref(false);

const getEvent = async () => {
    const response = await fetch(`${EVENT_URL}/${props.id}`, { method: 'GET' });
    const json = await response.json();
    return json;
};

const getChosenPeriod = async () => {
    const response = await fetch(`${CHOSEN_PERIOD_URL}/${choosePeriodId.value}`, { method: 'GET' });
    const json = await response.json();
    choosePeriod.value = json;
};

const getMemberInfo = async () => {
    const response = await fetch(`${MEMBERINFO_URL}/${member.id}`, { method: 'GET' });
    const json = await response.json();
    memberInfo.value = json;
};

const onSubmit = () => {
    showModal.value = true;
};

function closeModal() {
    showModal.value = false;
}

async function registerEvent() {
    const postObj = { epId: choosePeriodId.value, applicant: memberInfo.value.id };
    const response = await fetch(SignUp_URL, {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        Swal.fire('已報名成功', `您已成功報名活動「${eventData.value.name}」`, 'success');
        closeModal();
    }
}

onMounted(async () => {
    try {
        eventData.value = await getEvent();
        getMemberInfo();
        if (eventData.value.periods?.length > 0) {
            choosePeriodId.value = eventData.value.periods[0].id;
        }
        getChosenPeriod();
    } catch (error) {
        console.error('Failed to load event data:', error);
    }
});
</script>

<template>
    <div class="container mt-5">
        <div class="event-card shadow-sm">
            <div class="card-header">
                <h2>{{ eventData.name || '活動報名' }}</h2>
                <p class="description">{{ eventData.description }}</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <img
                            src="/images/non-found.jpg"
                            alt="活動圖片"
                            class="img-fluid rounded"
                        />
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label fw-bold">選擇報名時段</label>
                            <select
                                class="form-select"
                                v-model="choosePeriodId"
                                @change="getChosenPeriod"
                            >
                                <option
                                    v-for="period in eventData.periods"
                                    :key="period.id"
                                    :value="period.id"
                                >
                                    {{ period.description }}
                                </option>
                            </select>
                        </div>
                        <h5 class="fee">報名費用：{{ eventData.fee || 0 }} 元</h5>
                    </div>
                </div>
                <hr />
                <div class="form-section">
                    <ColumnInputFieldComponent
                        Type="text"
                        Label="電子郵件"
                        v-model="memberInfo.email"
                        Disable="true"
                    />
                    <ColumnInputFieldComponent
                        Type="text"
                        Label="電話"
                        v-model="memberInfo.phone"
                        Disable="true"
                    />
                    <ColumnInputFieldComponent
                        Type="text"
                        Label="地址"
                        v-model="memberInfo.address"
                        Disable="true"
                    />
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary me-3" @click="onSubmit">報名</button>
                <button class="btn btn-outline-secondary" @click="closeModal">取消</button>
            </div>
        </div>
        <DetailModalSignUp
            v-if="showModal"
            :event="eventData"
            :choose-period="choosePeriod"
            @close="closeModal"
            @register="registerEvent"
        />
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: auto;
}
.event-card {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
}
.card-header {
    text-align: center;
    margin-bottom: 20px;
}
.card-header h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
}
.card-header .description {
    font-size: 1rem;
    color: #666;
}
.card-body img {
    max-width: 100%;
    border-radius: 10px;
}
.card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.fee {
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
}
.form-select {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}
button {
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;
}
button.btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
}
button.btn-primary:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
button.btn-outline-secondary {
    background-color: transparent;
    border: 1px solid #ccc;
    color: #333;
}
button.btn-outline-secondary:hover {
    background-color: #f8f9fa;
}
</style>
