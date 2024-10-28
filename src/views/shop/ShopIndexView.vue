<script setup>
import ProductCard from '@/components/shop/ProductCard.vue';
import SearchBar from '@/components/shop/SearchBar.vue';
import SortingSelection from '@/components/shop/SortingSelection.vue';
import CategoryFilter from '@/components/shop/CategoryFilter.vue';
import PriceRangeBar from '@/components/shop/PriceRangeBar.vue';
import PagingComponent from '@/components/shop/PagingComponent.vue';
import { ref, watchEffect, computed } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Products/search`;

const terms = ref({
    keyword: "",
    categoryId: 0,
    sortBy: "default",
    page: 1,
});

// API 回傳結果
const result = ref({
    totalPages: 0,
    products: []
});

// 計算 maxPrice
const maxPrice = computed(() => {
    return result.value.products.length > 0 
        ? Math.max(...result.value.products.map(product => product.price)) 
        : 500; // 預設值
});

// 監聽條件變更，重新抓取資料
watchEffect(async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(terms.value),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });
        const datas = await response.json();
        result.value.totalPages = datas.totalPages;
        result.value.products = datas.productsResult;
    } catch (error) {
        console.error('Error fetching sorted products:', error);
    }
});

const pagingHandler = (page) => {
    terms.value.page = page;
};

const searchHandler = (keyword) => {
    terms.value.keyword = keyword;
};

// 監聽排序變更
const handleSortChange = (newSort) => {
    terms.value.sortBy = newSort;
    terms.value.page = 1;
};

// 類別選取
const handleCategorySelected = (categoryId) => {
    terms.value.categoryId = categoryId;
    terms.value.page = 1;
};
</script>

<template>
    <div class="container-fluid product">
        <div class="container py-5">
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <SearchBar @searchPerformed="searchHandler"></SearchBar>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <SortingSelection @sortChanged="handleSortChange"></SortingSelection>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <CategoryFilter @categorySelected="handleCategorySelected" />
                                <PriceRangeBar :maxPrice="maxPrice"></PriceRangeBar>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-center">
                                <ProductCard 
                                    v-for="product in result.products" 
                                    :key="product.id"
                                    :productId="product.id"
                                    :productName="product.name"
                                    :productCategoryID="product.category"
                                    :productCategoryName="product.categoryName"
                                    :productImage="product.mainImageUrl"
                                    :productDescription="product.description"
                                    :productPrice="product.price"
                                />
                            </div>
                            <div class="col-12 mt-3">
                                <PagingComponent @goPaging="pagingHandler" :totalPages="result.totalPages" :thePage="terms.page"></PagingComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>