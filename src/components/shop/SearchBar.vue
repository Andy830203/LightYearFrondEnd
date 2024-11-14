<script setup>
import { ref } from 'vue';
const emit = defineEmits();
// 定義搜尋關鍵字的狀態
const keyword = ref('');

// 處理搜尋功能
const search = function() {
    emit('searchPerformed', keyword.value);
};
</script>

<template>
    <div class="input-group w-100 mx-auto search-bar">
        <input
            v-model="keyword"
            v-on:keyup.enter="search"
            type="search"
            class="form-control search-input"
            placeholder="搜尋商品"
            aria-describedby="search-icon"
        />
        <span id="search-icon" class="input-group-text search-icon" @click="search">
            <i class="fa fa-search"></i>
        </span>
    </div>
</template>

<style scoped>
/* 整體搜尋欄樣式 */
.search-bar {
    max-width: 500px;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 輸入框樣式 */
.search-input {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0;
    outline: none;
    font-size: 1rem;
    color: #4a4a4a;
    background-color: #f7f8fa; /* 柔和的背景色 */
    transition: background-color 0.3s;
}

.search-input::placeholder {
    color: #b0b0b0;
    font-style: italic;
}

/* 輸入框聚焦時的背景色變化 */
.search-input:focus {
    background-color: #e8f0fe;
}

/* 搜尋按鈕樣式 */
.search-icon {
    background-color: #6b9d8f; /* 柔和的藍綠色 */
    color: #ffffff;
    cursor: pointer;
    padding: 0.75rem;
    transition: background-color 0.3s;
    border: none;
}

.search-icon:hover {
    background-color: #4a7d6b; /* 較深的藍綠色 */
}

.search-icon i {
    font-size: 1.2rem;
}
</style>
