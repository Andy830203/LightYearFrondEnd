<script setup>
import { ref } from 'vue';

// 定義搜尋關鍵字的狀態
const keyword = ref('');

// 處理搜尋功能
const search = function() {
    console.log('Searching for:', keyword.value);
    // 在這裡你可以調用 API 或處理搜尋邏輯
};
</script>

<template>
    <div class="input-group w-100 mx-auto d-flex">
        <input
            v-model="keyword"
            v-on:keyup.enter="search"
            @keyup.enter="search"
            type="search"
            class="form-control p-3"
            placeholder="keywords"
            aria-describedby="search-icon-1"
        />
        <span id="search-icon-1" class="input-group-text p-3" @click="search">
            <i class="fa fa-search"></i>
        </span>
    </div>
</template>

<style scoped>
/* 你可以根據需要調整樣式 */
</style>