<script setup>
import { ref } from 'vue';

const emit = defineEmits();

// 定義選擇的排序選項
const selectedSort = ref('default');

// 處理排序變更
const handleSortChange = () => {
    // console.log('Selected sorting:', selectedSort.value);
    emit('sortChanged', selectedSort.value); // 發送事件到父組件
};
</script>

<template>
    <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
        <label for="sortOptions">排序:</label>
        <select id="sortOptions" v-model="selectedSort" @change="handleSortChange"
        class="border-0 form-select-sm bg-light me-3">
            <option value="default">預設</option>
            <option value="priceDesc">價格最高</option>
            <option value="priceAsc">價格最低</option>
            <option value="timeDesc">最新上架</option>
            <option value="timeAsc">最舊上架</option>
        </select>
    </div>
</template>

<style scoped>
/* 根據需要自訂樣式 */
</style>