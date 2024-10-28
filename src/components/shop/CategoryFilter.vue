<script setup>
import { ref, onMounted } from 'vue';
const emit = defineEmits();
const categories = ref([]);
const BASE_URL = import.meta.env.VITE_API_BASEURL
// 從API獲取分類
// Fetch categories on mount
onMounted(async () => {
    try {
        const response = await fetch(`${BASE_URL}/ProductCategories`);
        categories.value = await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
});

// Emit category selection to parent
const selectCategory = function(categoryId) {
    emit('categorySelected', categoryId); // Send selected category ID to parent component
};
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <h4>商品分類</h4>
            <ul class="list-unstyled product-categorie">
                <li v-for="(category, index) in categories" :key="index">
                    <div class="d-flex justify-content-between product-name">
                        <a href="#" @click.prevent="selectCategory(category.id)">
                            {{ category.name }}
                        </a>
                        <span>({{ category.amount }})</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
/* 可根據需要自定義樣式 */
</style>