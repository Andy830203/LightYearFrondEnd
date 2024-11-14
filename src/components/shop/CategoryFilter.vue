<script setup>
import { ref, onMounted, computed } from 'vue';
const emit = defineEmits();
const categories = ref([]);
const BASE_URL = import.meta.env.VITE_API_BASEURL;

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
    <div class="col-lg-12 category-container">
        <div class="category-header">
            <h4>商品分類</h4>
        </div>
        <ul class="list-unstyled product-category-list">
            <li>
                <div class="category-item">
                    <a href="#" @click.prevent="selectCategory(0)" class="category-link">
                        全部品項
                    </a>
                    <span class="category-amount">({{ totalAmount }})</span>
                </div>
            </li>
            <li v-for="(category, index) in categories" :key="index">
                <div class="category-item">
                    <a href="#" @click.prevent="selectCategory(category.id)" class="category-link">
                        {{ category.name }}
                    </a>
                    <span class="category-amount">({{ category.amount }})</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
/* 外部容器樣式 */
.category-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 標題樣式 */
.category-header h4 {
    font-weight: 600;
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 15px;
}

/* 分類清單樣式 */
.product-category-list {
    padding: 0;
    margin: 0;
}

.category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.3s ease;
}

.category-item:hover {
    background-color: #f9f9f9;
}

/* 分類連結樣式 */
.category-link {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
}

.category-link:hover {
    color: #007bff;
}

/* 數量顯示樣式 */
.category-amount {
    font-size: 0.9rem;
    color: #666;
    font-weight: 400;
}
</style>
