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

const maxPrice = ref(0);

const fetchProducts = async () => {
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

onMounted(async () => {
  const response = await fetch(`${BASE_URL}/Products/maxPrice`);
  const data = await response.json();
  maxPrice.value = data.maxPrice;
  terms.value.priceThreshold = 0;
  await fetchProducts();
});

watchEffect(fetchProducts);

const pagingHandler = (page) => {
  terms.value.page = page;
};

const searchHandler = (keyword) => {
  terms.value.keyword = keyword;
  terms.value.page = 1;
};

const handleSortChange = (newSort) => {
  terms.value.sortBy = newSort;
  terms.value.page = 1;
};

const handleCategorySelected = (categoryId) => {
  terms.value.categoryId = categoryId;
  terms.value.page = 1;
};

const handlePriceChange = (newPrice) => {
  terms.value.priceThreshold = newPrice;
  terms.value.page = 1;
};
</script>

<template>
  <div class="container-fluid product-page row">
    <div class="filter-container col-md-3">
      <div class="filter-section">
        <CategoryFilter @categorySelected="handleCategorySelected" />
        <PriceRangeBar :maxPrice="maxPrice" @priceChanged="handlePriceChange" />
      </div>
    </div>
    <div class="container py-5 col-md-9">
      <div class="row g-4" style="width: 100%;">
        <div class="col-lg-12">
          <div class="row g-4 justify-content-between align-items-center search-sort-bar">
            <div class="col-xl-3">
              <SearchBar @searchPerformed="searchHandler"></SearchBar>
            </div>
            <div class="col-xl-3">
              <SortingSelection @sortChanged="handleSortChange"></SortingSelection>
            </div>
          </div>
          <div class="row g-4 mt-4">
            <div class="col-lg-12">
              <div class="row g-3 justify-content-start">
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
              <div class="col-12 mt-4">
                <PagingComponent 
                  @goPaging="pagingHandler" 
                  :totalPages="result.totalPages" 
                  :thePage="terms.page">
                </PagingComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* 整體頁面樣式 */
.product-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

/* 搜索和排序欄樣式 */
.search-sort-bar {
  padding: 15px;
  background-color: #caddab;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* 篩選區塊樣式 */
.filter-container {
  position: fixed;
  top: 5vw; /* 根據需求調整 */
  left: 0;
  width: 400px; /* 固定寬度 */
  padding: 20px;
  background-color: transparent; /* 移除背景色設置 */
  z-index: 100; /* 防止被覆蓋 */
}

.filter-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 產品列表樣式 */
.product-list {
  gap: 16px;
}

/* 按鈕和輸入框樣式 */
button, input, select {
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 8px 12px;
  transition: all 0.3s ease;
}

button:hover, input:hover, select:hover {
  border-color: #007bff;
  box-shadow: 0px 3px 6px rgba(0, 123, 255, 0.3);
}

button:active {
  transform: scale(0.98);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

/* 分頁區塊樣式 */
.paging-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.paging-section button {
  background-color: #007bff;
  color: white;
  margin: 0 5px;
  padding: 10px 15px;
}

.paging-section button:hover {
  background-color: #0056b3;
}

/* 排版和間距 */
.container-fluid {
  padding-left: 20px;
  padding-right: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.g-4 {
  gap: 1.5rem !important;
}

.product-page .py-5 {
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}
</style>
