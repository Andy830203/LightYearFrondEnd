<script setup>
import MapComponent from '@/components/MapComponent.vue';
import { ref } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL
const API_URL = BASE_URL + '/Events'

const eventsData = ref(null)

const chooseId = ref('') // ID

const loadEvents = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
    })
    const datas = await response.json()
    eventsData.value = datas
}

loadEvents()
</script>

<template>
    <div class="mt-5">
        <div class="row">
            <div class="col-md-6 col-12">
                <!-- 列表部分 -->
                <h4>活動列表</h4>
                <ul>
                    <li v-for="e in eventsData" :key="e.id" :value="e.id" @click="chooseId = e.id">
                        {{ e.id }}-{{ e.name }}
                    </li>
                </ul>
            </div>
            <div class="col-md-6 col-12">
                <!-- 事件大綱部分 -->
                <h5>hi</h5>
            </div>
            <div class="col-12">
                <!-- 地圖 -->
                <h4>地圖</h4>
                <MapComponent />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>