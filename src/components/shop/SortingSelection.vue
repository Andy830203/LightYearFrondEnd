<script setup>
import { ref } from 'vue';

const emit = defineEmits();

// 定義選擇的排序選項
const selectedSort = ref('default');

// 處理排序變更
const handleSortChange = () => {
    emit('sortChanged', selectedSort.value); // 發送事件到父組件
};
</script>

<template>
    <div class="sort-container">
        <label for="sortOptions" class="sort-label">排序:</label>
        <select id="sortOptions" v-model="selectedSort" @change="handleSortChange" class="sort-select">
            <option value="default">預設</option>
            <option value="priceDesc">價格最高</option>
            <option value="priceAsc">價格最低</option>
            <option value="timeDesc">最新上架</option>
            <option value="timeAsc">最舊上架</option>
        </select>
    </div>
</template>

<style scoped>
/* 排序容器樣式 */
.sort-container {
    background-color: #f3eae0; /* 柔和米色背景 */
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 200px;
}

/* 標籤樣式 */
.sort-label {
    font-size: 1rem;
    color: #4a4a4a; /* 深灰色文字 */
    margin: 0;
}

/* 下拉選單樣式 */
.sort-select {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.3rem 0.8rem;
    font-size: 0.9rem;
    background-color: #ffffff;
    color: #4a4a4a;
    outline: none;
    transition: border-color 0.3s, background-color 0.3s;
}

.sort-select:focus {
    border-color: #6b9d8f; /* 聚焦時的柔和藍綠色邊框 */
    background-color: #f9f5f1; /* 聚焦時的背景色 */
}

.sort-select option {
    color: #4a4a4a; /* 選項文字顏色 */
}
</style>
