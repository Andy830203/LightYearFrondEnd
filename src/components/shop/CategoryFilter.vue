<script setup>
import { ref } from 'vue';

// 模擬從 API 或資料庫獲取的分類數據
const categories = ref([
    { name: 'Apples', icon: 'fas fa-apple-alt', count: 3 },
    { name: 'Oranges', icon: 'fas fa-apple-alt', count: 5 },
    { name: 'Strawberries', icon: 'fas fa-apple-alt', count: 2 },
    { name: 'Bananas', icon: 'fas fa-apple-alt', count: 8 },
    { name: 'Pumpkins', icon: 'fas fa-apple-alt', count: 5 }
]);
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <h4>Categories</h4>
            <ul class="list-unstyled product-categorie">
                <li v-for="(category, index) in categories" :key="index">
                    <div class="d-flex justify-content-between product-name">
                        <a href="#">
                            <i :class="category.icon + ' me-2'"></i>{{ category.name }}
                        </a>
                        <span>({{ category.count }})</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/* 可根據需要自定義樣式 */
</style>