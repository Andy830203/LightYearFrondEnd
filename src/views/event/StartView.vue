<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue';
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue';
import EventPeriods from '@/components/event/EventPeriods.vue';
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Events`;
const PERIODS_URL = `${BASE_URL}/EventPeriods`;
const CATEGORY_URL = `${API_URL}/Categories`;
const LOCATIONS_URL = `${BASE_URL}/Locations`;

const eventsData = ref({
    id: 0,
    name: '',
    organizerId: 0,
    fee: 0,
    capacity: 0,
    description: '',
    priority: 0,
    categoryId: 0,
});

const categories = ref([]);
const periods = ref([]);
const LocationData = ref([]);
const member = JSON.parse(localStorage.getItem('member'));

eventsData.value.organizer = member?.name || 'Unknown';
eventsData.value.organizerId = member?.id || 0;

const loadCategories = async () => {
    try {
        const response = await fetch(CATEGORY_URL);
        categories.value = await response.json();
    } catch (error) {
        console.error('Error loading categories:', error);
    }
};

const loadLocations = async () => {
    try {
        const response = await fetch(LOCATIONS_URL);
        LocationData.value = await response.json();
    } catch (error) {
        console.error('Error loading locations:', error);
    }
};

const onSubmit = async () => {
    // 提交事件邏輯
    console.log('Event submitted:', eventsData.value);
};

loadCategories();
loadLocations();
</script>

<template>
    <div class="container mt-5">
        <form class="event-form" @submit.prevent="onSubmit">
            <div class="form-header">
                <h1 class="form-title">活動建立</h1>
                <p class="form-description">填寫以下資料，建立您的活動。</p>
            </div>

            <!-- 左側內容 -->
            <div class="form-content">
                <div class="form-section">
                    <label for="eveTitle" class="form-label">活動名稱</label>
                    <input
                        type="text"
                        id="eveTitle"
                        class="form-control"
                        v-model="eventsData.name"
                        placeholder="輸入活動名稱"
                    />
                </div>
                <div class="form-section">
                    <label for="eveFee" class="form-label">報名費用</label>
                    <input
                        type="number"
                        id="eveFee"
                        class="form-control"
                        v-model="eventsData.fee"
                        placeholder="輸入報名費用"
                    />
                </div>
                <div class="form-section">
                    <label for="eveType" class="form-label">活動類別</label>
                    <select id="eveType" class="form-select" v-model="eventsData.categoryId">
                        <option v-for="cate in categories" :key="cate.categoryId" :value="cate.categoryId">
                            {{ cate.categoryName }}
                        </option>
                    </select>
                </div>
                <div class="form-section">
                    <label for="evePrior" class="form-label">活動優先級</label>
                    <select id="evePrior" class="form-select" v-model="eventsData.priority">
                        <option value="1">優先級 1</option>
                        <option value="2">優先級 2</option>
                        <option value="3">優先級 3</option>
                    </select>
                </div>
                <div class="form-section">
                    <label for="eveDesc" class="form-label">活動描述</label>
                    <textarea
                        id="eveDesc"
                        class="form-control"
                        v-model="eventsData.description"
                        placeholder="輸入活動描述"
                        rows="4"
                    ></textarea>
                </div>
                <div class="form-section">
                    <label for="evePhoto" class="form-label">活動照片</label>
                    <input type="file" id="evePhoto" class="form-control" />
                </div>
            </div>

            <!-- 右側內容 -->
            <div class="form-content">
                <div class="form-section">
                    <label class="form-label">活動地點</label>
                    <PlacesComponent :enableAddLocation="true" :locationData="LocationData" v-model="eventLocs" />
                </div>
                <div class="form-section">
                    <label class="form-label">活動時段</label>
                    <EventPeriods v-model="periods" />
                </div>
                <div class="form-section">
                    <ColumnInputFieldComponent
                        Type="number"
                        Id="eveCap"
                        Label="最大活動人數"
                        v-model="eventsData.capacity"
                    />
                </div>
            </div>

            <!-- 提交按鈕 -->
            <div class="form-footer">
                <button type="submit" class="btn btn-primary">提交活動</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
/* 容器樣式保持不變 */
.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-header {
    text-align: center;
    margin-bottom: 20px;
}

.form-title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
}

.form-description {
    font-size: 1rem;
    color: #666;
}

.form-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-section {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.form-control {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* 更新按鈕樣式 */
.form-footer {
    text-align: center;
    margin-top: 20px;
}

.btn {
    padding: 12px 25px;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
    display: inline-block;
}

/* 主按鈕 */
.btn-primary {
    background: linear-gradient(90deg, #4caf50, #2f8fdd);
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: none;
}

.btn-primary:hover {
    background: linear-gradient(90deg, #2f8fdd, #4caf50);
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 次要按鈕 */
.btn-secondary {
    background-color: #e0e0e0;
    color: #333;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
    background-color: #d6d6d6;
    transform: scale(1.05);
}

.btn-secondary:active {
    transform: scale(0.98);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

</style>