<script setup>
import InputFieldComponent from '@/components/event/InputFieldComponent.vue'
import { ref } from 'vue';

const periods = defineModel();

// 開始和結束的日期與時間 ref
const startDate = ref('');
const startTime = ref('');
const endDate = ref('');
const endTime = ref('');

// 添加時段的函式
const addPeriod = () => {
    if (startDate.value && startTime.value && endDate.value && endTime.value) {
        // 合併日期和時間
        const startDateTime = new Date(`${startDate.value}T${startTime.value}`).toISOString();
        const endDateTime = new Date(`${endDate.value}T${endTime.value}`).toISOString();

        // 添加到 periods 陣列
        periods.value.push({
            'startTime': startDateTime,
            'endTime': endDateTime
        });

        // 清空輸入欄位
        startDate.value = '';
        startTime.value = '';
        endDate.value = '';
        endTime.value = '';
    } else {
        alert('請填寫所有日期和時間');
    }
}

//清空 periods
const clearPeriods = () => {
    periods.value = []
}
</script>

<template>
    <div>
        <div class="d-block">
            <h4>時段列表</h4>
            <!-- 時段列表顯示為 JSON 格式 -->
            <pre>{{ JSON.stringify(periods, null, 2) }}</pre>
        </div>
        <div class="d-block">
            <!-- 新增時段輸入框 -->
            <InputFieldComponent Type="date" Id="eveStartDay" Label="活動開始日期" v-model="startDate" />
            <InputFieldComponent Type="time" Id="eveStartTime" Label="活動開始時間" v-model="startTime" />
            <InputFieldComponent Type="date" Id="eveEndDay" Label="活動結束日期" v-model="endDate" />
            <InputFieldComponent Type="time" Id="eveEndTime" Label="活動結束時間" v-model="endTime" />
        </div>
        <button type="button" class="btn btn-primary mt-3 me-2" @click="addPeriod">添加時段</button>
        <button type="button" class="btn btn-secondary mt-3" @click="clearPeriods">清空列表</button>
    </div>
</template>

<style lang="css" scoped></style>