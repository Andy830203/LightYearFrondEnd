<script setup>
    const IMG_URL = import.meta.env.VITE_API_IMGURL
    const props = defineProps({
        productId: Number,
        productName: String,
        productImage: String,
        productCategoryID: Number,
        productCategoryName: String,
        productDescription: String,
        productPrice: Number
    });
    const desciption50 = function(description) { 
        // 檢查 description 是否存在
        if (!description) {
            return '';  // 如果 description 為 null 或 undefined，返回空字符串
        }
        return description.length <= 50 ? description : description.substring(0, 50) + '...';
    };
    const imgurlProcess = function(urlFromDB) {
        if (!urlFromDB || urlFromDB == 'NoPicture') {
            return IMG_URL + "/images/non-found.jpg";  // 找不到圖片
        }
        return IMG_URL + urlFromDB;
    }
</script>

<template>
    <div class="col-md-6 col-lg-6 col-xl-4">
        <div class="rounded position-relative product-item">
            <div class="product-img">
                <img :src="imgurlProcess(productImage)" :alt="productName" class="img-fluid w-100 rounded-top" alt="">
            </div>
            <div class="text-white bg-info px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">{{ productCategoryName }}</div>
            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                <h4>{{productName}}</h4>
                <p>{{productDescription !== null ? desciption50(productDescription): "無商品描述"}}</p>
                <div class="d-flex justify-content-between flex-lg-wrap">
                    <p class="text-dark fs-5 fw-bold mb-0">{{ productPrice !== null ? productPrice : "未標示價格" }}</p>
                        <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i>查看詳細</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .product-img img {
        height: 220px; /* Set a fixed height */
        object-fit: cover; /* Maintain aspect ratio */
        width: 100%; /* Full width for consistency */
    }
</style>