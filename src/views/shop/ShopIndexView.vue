<script setup>
    import ProductCard from '@/components/shop/ProductCard.vue';
    import SearchBar from '@/components/shop/SearchBar.vue';
    import SortingSelection from '@/components/shop/SortingSelection.vue';
    import CategoryFilter from '@/components/shop/CategoryFilter.vue';
    import PriceRangeBar from '@/components/shop/PriceRangeBar.vue';
    import PagingComponent from '@/components/shop/PagingComponent.vue';
    import { ref, watchEffect } from 'vue';
    const BASE_URL = import.meta.env.VITE_API_BASEURL
    const API_URL = `${BASE_URL}/Products/search`

    const terms = ref({
        "keyword": "",
        "categoryId": 0,
        "sortBy": "default",
        "page": 1,
    })

    //API 回傳結果
    const result = ref({
        "totalPages": 0, 
        "products": [] 
    })

    watchEffect(async function() {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(terms.value),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'  // 啟用 CORS 模式
            })
            const datas = await response.json()
            result.value.totalPages = datas.totalPages
            result.value.products = datas.productsResult
        }
        catch (error) {
            console.error('Error fetching sorted products:', error);
        }
        
    })

    const pagingHandler = function(page) {
        terms.value.page = page
    }

    const searchHandler = function(keyword) {
        terms.value.keyword = keyword
    }

    // 監聽排序變更
    const handleSortChange = (newSort) => {
        console.log(newSort);
        terms.value.sortBy = newSort; // 更新選擇的排序選項
        terms.value.page = 1;
    };

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
                             <SortingSelection @sortChanged="handleSortChange"></SortingSelection>
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
                                    :productId="product.id"
                                    :productName="product.name"
                                    :productCategoryID="product.category"
                                    :productCategoryName="product.categoryName"
                                    :productImage="product.mainImageUrl"
                                    :productDescription="product.description"
                                    :productPrice="product.price"
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