<script setup>
import { ref, onMounted, computed } from 'vue';
const emit = defineEmits();
const categories = ref([]);
const BASE_URL = import.meta.env.VITE_API_BASEURL

// Fetch categories from API on mount
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
    emit('categorySelected', categoryId);
};

// Calculate the total amount for all products
const totalAmount = computed(() => {
    return categories.value.reduce((sum, category) => sum + category.amount, 0);
});
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <h4>商品分類</h4>
            <ul class="list-unstyled product-categorie">
                <li>
                    <div class="d-flex justify-content-between product-name">
                        <a href="#" @click.prevent="selectCategory(0)">
                            全部品項
                        </a>
                        <span>({{ totalAmount }})</span>
                    </div>
                </li>
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
/* Add custom styles here if needed */
</style>