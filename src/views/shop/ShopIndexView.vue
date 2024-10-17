<script setup>
    import ProductBox from '@/components/shop/ProductBox.vue';
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
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <!-- 排序 -->
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <!-- 篩選器 -->
                        </div>
                        <div class="col-lg-9">
                            <div class="row g-4 justify-content-center">
                                <!-- 商品 card -->
                                <ProductBox></ProductBox>
                            </div>
                            <div class="col-12">
                                <!-- 分頁 -->
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