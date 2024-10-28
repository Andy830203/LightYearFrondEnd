<script setup>
import ProductCard from '@/components/shop/ProductCard.vue';
import SearchBar from '@/components/shop/SearchBar.vue';
import SortingSelection from '@/components/shop/SortingSelection.vue';
import CategoryFilter from '@/components/shop/CategoryFilter.vue';
import PriceRangeBar from '@/components/shop/PriceRangeBar.vue';
import PagingComponent from '@/components/shop/PagingComponent.vue';
import { ref, watchEffect, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const API_URL = `${BASE_URL}/Products/search`;

// 查詢條件初始化
const terms = ref({
    keyword: "",
    categoryId: 0,
    sortBy: "default",
    page: 1,
    priceThreshold: 0
});

const result = ref({
    totalPages: 0,
    products: []
});

// 紀錄所有商品的最高價格
const maxPrice = ref(0);

const fetchProducts = async () => {
    console.log("request")
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(terms.value),
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });
        const data = await response.json();
        result.value.totalPages = data.totalPages;
        result.value.products = data.productsResult;
    } catch (error) {
        console.error('Error fetching sorted products:', error);
    }
};

// 初始化獲取最高價並設定初始條件
onMounted(async () => {
    const response = await fetch(`${BASE_URL}/Products/maxPrice`);
    const data = await response.json();
    maxPrice.value = data.maxPrice;
    terms.value.priceThreshold = maxPrice.value;
    await fetchProducts();
});

// 當條件變更時重新抓取資料
watchEffect(fetchProducts);

const pagingHandler = (page) => {
    terms.value.page = page;
};

const searchHandler = (keyword) => {
    terms.value.keyword = keyword;
};

const handleSortChange = (newSort) => {
    terms.value.sortBy = newSort;
    terms.value.page = 1;
};

const handleCategorySelected = (categoryId) => {
    terms.value.categoryId = categoryId;
    terms.value.page = 1;
};

// 價格選擇條變化處理
const handlePriceChange = (newPrice) => {
    terms.value.priceThreshold = newPrice;
    terms.value.page = 1; // 重置為第一頁
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
                                <PriceRangeBar :maxPrice="maxPrice" @priceChanged="handlePriceChange" />
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-start">
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