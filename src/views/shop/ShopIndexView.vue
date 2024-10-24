<script setup>
    import ProductCard from '@/components/shop/ProductCard.vue';
    import SearchBar from '@/components/shop/SearchBar.vue';
    import SortingSelection from '@/components/shop/SortingSelection.vue';
    import CategoryFilter from '@/components/shop/CategoryFilter.vue';
    import PriceRangeBar from '@/components/shop/PriceRangeBar.vue';
    import PagingComponent from '@/components/shop/PagingComponent.vue';
    import { ref, watchEffect } from 'vue';
    const BASE_URL = import.meta.env.VITE_API_BASEURL
    const API_URL = `${BASE_URL}/shop`

    // 定義價格範圍的值
    const terms = ref({
        "keyword": "",
        "categoryId": 0,
        "sortBy": "Id",
        "page": 1,
        "pageSize": 9,
    })

    //API 回傳結果
    const result = ref({
        "totalPages": 0, 
        "products": [] 
    })

    watchEffect(async function() {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(terms.value),
            headers: { 'Content-Type': 'application/json' }
        })
        const datas = await response.json()
        result.value.totalPages = datas.totalPages
        result.value.products = datas.productsResult
    })

    const pagingHandler = function(page) {
        terms.value.page = page
    }

    const searchHandler = function(keyword) {
        terms.value.keyword = keyword
    }

    // const CategoryHandler = function() {}
</script>

<template>
    <div class="container-fluid product py-5">
        <div class="container py-5">
            <h1 class="mb-4">愛心商城</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <!-- 搜尋 -->
                            <SearchBar></SearchBar>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <!-- 排序 -->
                             <SortingSelection></SortingSelection>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <!-- 類別選取 -->
                                 <CategoryFilter></CategoryFilter>
                                <!-- 篩選器 -->
                                 <PriceRangeBar></PriceRangeBar>
                            </div>
                            
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-center">
                                <!-- 商品 card -->
                                <ProductCard 
                                    v-for="product in result.products" 
                                    :productId="product.productId"
                                    :productName="product.productName"
                                    :productCategory="product.category"
                                    :productImage="product.productImage"
                                    :productDescription="product.productDescription"
                                    :productPrice="product.productPrice"
                                />
                            </div>
                            <div class="col-12">
                                <!-- 分頁功能區域 -->
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