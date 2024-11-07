<script setup>
import { ref } from 'vue';
import CarouselComponent from './CarouselComponent.vue';

//props
const props = defineProps(['Id', 'API'])
const eData = ref('')

const loadData = async () => {
    const response = await fetch(`${props.API}/${props.Id}`, {
        method: 'GET'
    })

    eData.value = await response.json()
}

loadData()
</script>

<template>
    <div>
        <h2>{{ eData.name }}</h2>
        <div>{{ eData.description }}</div>
        <CarouselComponent />
        <div>
            <label for="">報名費用</label> {{ eData.fee }}
            <label for="">剩餘人數</label> {{ eData.capacity }}
            <label for="">地點</label>
        </div>
    </div>
</template>

<style lang="css" scoped></style>