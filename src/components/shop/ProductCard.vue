<script setup>
const IMG_URL = import.meta.env.VITE_API_IMGURL;
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
    if (!description) {
        return '';  
    }
    return description.length <= 50 ? description : description.substring(0, 50) + '...';
};
const imgurlProcess = function(urlFromDB) {
    if (!urlFromDB || urlFromDB === 'NoPicture') {
        return IMG_URL + "/images/non-found.jpg"; 
    }
    return IMG_URL + urlFromDB;
};
</script>

<template>
    <div class="col-md-6 col-lg-6 col-xl-4">
        <div class="product-item">
            <div class="product-img">
                <img :src="imgurlProcess(productImage)" :alt="productName" class="img-fluid">
                <span class="product-category">{{ productCategoryName }}</span>
            </div>
            <div class="product-info">
                <h4>{{ productName }}</h4>
                <p>{{ productDescription !== null ? desciption50(productDescription) : "無商品描述" }}</p>
                <div class="product-footer">
                    <p class="product-price">{{ productPrice !== null ? productPrice : "未標示價格" }}</p>
                    <router-link :to="{ name: 'itemDetails', params: { id: productId }}" class="btn-view-details">
                        <i class="fa fa-shopping-bag me-2"></i>查看詳細
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 產品項目容器樣式 */
.product-item {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.product-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

/* 產品圖片樣式 */
.product-img {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.product-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* 類別標籤樣式 */
.product-category {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #6b9d8f;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
}

/* 產品信息區域樣式 */
.product-info {
    padding: 1.5rem;
    text-align: left;
}

.product-info h4 {
    font-size: 1.25rem;
    color: #4a4a4a;
    margin-bottom: 0.5rem;
}

.product-info p {
    color: #707070;
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

/* 底部價格與按鈕 */
.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-price {
    color: #6b9d8f;
    font-size: 1.2rem;
    font-weight: bold;
}

.btn-view-details {
    background-color: #ffffff;
    color: #6b9d8f;
    border: 2px solid #6b9d8f;
    border-radius: 20px;
    padding: 0.3rem 1rem;
    font-size: 0.9rem;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.btn-view-details:hover {
    background-color: #6b9d8f;
    color: #ffffff;
    border-color: #6b9d8f;
}
</style>
