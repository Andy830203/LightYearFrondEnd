<script setup>
import { computed, ref } from 'vue';
import CarouselComponent from './CarouselComponent.vue';
//props
const props = defineProps(['Id', 'API'])
const BASE_URL = import.meta.env.VITE_API_BASEURL
const SignUp_URL = BASE_URL + '/SignUps'
const eData = ref('')
const signNumber = ref('0')

const loadData = async () => {
    const response = await fetch(`${props.API}/${props.Id}`, {
        method: 'GET'
    })

    eData.value = await response.json()
}

const loadSignedNumber = async () => {
    //get sign up
    const response = await fetch(`${SignUp_URL}/HowMany/${props.Id}`, {
        method: 'GET'
    })

    const num = await response.text()

    const signUpNum = parseInt(num, 10)

    signNumber.value = signUpNum
}

loadData()
loadSignedNumber()
</script>

<template>
    <div>
        <h2>{{ eData.name }}</h2>
        <div>{{ eData.description }}</div>
        <!-- <CarouselComponent /> -->
        <div>
            <label for="">報名費用</label> {{ eData.fee }}
            <label for="">剩餘人數</label> {{ signNumber }} / {{ eData.capacity }}
            <label for="">地點</label>
        </div>
    </div>
</template>

<style lang="css" scoped></style>