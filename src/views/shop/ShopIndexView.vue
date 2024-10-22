<script setup>
    import ProductCard from '@/components/shop/ProductCard.vue';
    import SearchBar from '@/components/shop/SearchBar.vue';
    import SortingSelection from '@/components/shop/SortingSelection.vue';
    import CategoryFilter from '@/components/shop/CategoryFilter.vue';
    import PriceRangeBar from '@/components/shop/PriceRangeBar.vue';
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
                                <ProductCard></ProductCard>
                            </div>
                            <div class="col-12">
                                <!-- 分頁功能區域 -->
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