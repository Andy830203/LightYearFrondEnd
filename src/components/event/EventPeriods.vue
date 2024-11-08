<script setup>
import InputFieldComponent from '@/components/event/InputFieldComponent.vue'
import { ref } from 'vue';

const model = defineModel()

const periods = ref([])

</script>

<template>
    <div>
        <div class="d-block">
            <!-- periods list -->
            <ul>
                <li>123321</li>
            </ul>
        </div>
        <div class="d-block">
            <!-- add periods -->
            <!-- import luxon -->
            <InputFieldComponent Type="date" Id="eveStartDay" Label="活動開始日期" />
            <InputFieldComponent Type="time" Id="eveStartTime" Label="活動開始時間" v-model="startData" />
            <InputFieldComponent Type="date" Id="eveEndDay" Label="活動結束日期" />
            <InputFieldComponent Type="time" Id="eveEndTime" Label="活動結束時間" />
        </div>
        <button class="btn btn-primary">添加時段</button>
    </div>
</template>

<style lang="css" scoped></style>