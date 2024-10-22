<script setup>
import { ref } from 'vue';

// 定義選擇的排序選項
const selectedSort = ref('default');

// 處理排序變更
const handleSortChange = () => {
    console.log('Selected sorting:', selectedSort.value);
    // 在這裡你可以調用排序的邏輯或方法
};
</script>

<template>
    <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
        <label for="sortOptions">Default Sorting:</label>
        <select
            id="sortOptions"
            v-model="selectedSort"
            @change="handleSortChange"
            class="border-0 form-select-sm bg-light me-3"
        >
            <option value="default">預設</option>
            <option value="price">價格</option>
            <option value="date">上架日期</option>
        </select>
    </div>
</template>

<style scoped>
/* 根據需要自訂樣式 */
</style>