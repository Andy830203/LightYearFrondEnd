<script setup>
    const props = defineProps({
        productId: Number,
        productName: String,
        productImage: String,
        productCategory: String,
        productDescription: String,
        productPrice: Number
    });
    const desciption50 = function(description) { 
        description.length <= 50 ? description : description.substring(0, 50) + '...';
    };
</script>

<template>
    <div class="col-md-6 col-lg-6 col-xl-4">
        <div class="rounded position-relative product-item">
            <div class="product-img">
                <img :src="productImage" :alt="productName" class="img-fluid w-100 rounded-top" alt="">
            </div>
            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">{{ productCategory }}</div>
            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                <h4>{{productName}}</h4>
                <p>{{desciption50(productDescription)}}</p>
                <div class="d-flex justify-content-between flex-lg-wrap">
                    <p class="text-dark fs-5 fw-bold mb-0">{{productPrice}}</p>
                        <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i>加入購物車</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    
</style>