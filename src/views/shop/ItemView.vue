<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';  // 新增 useRouter
import { useMemberStore } from '@/stores/Member';
import Swal from 'sweetalert2';

const IMG_URL = import.meta.env.VITE_API_IMGURL;
const BASE_URL = import.meta.env.VITE_API_BASEURL;

const router = useRouter();  // 初始化路由用於返回按鈕
const memberStore = useMemberStore();
const isLoggedIn = computed(() => memberStore.isLoggedIn);

const props = defineProps({
  id: String
});

const productId = props.id;
const productDetails = ref(null);
const quantity = ref(0);

const fetchProductDetails = async function() {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });
    if (!response.ok) throw new Error('Failed to fetch product details');
    productDetails.value = await response.json();
  } 
  catch (error) {
    console.error('Error fetching product details:', error);
  }
};

// Add to cart function
const addToCart = async () => {
  if (!isLoggedIn.value) {
    await Swal.fire({
      icon: 'info',
      title: '請先登入',
      text: '您需要登入後才能將商品加入購物車。',
    });
    return;
  }

  const cartItemData = {
    BuyerId: memberStore.member.id,
    PId: productId,
    Quantity: quantity.value,
  };

  try {
    const response = await fetch(`${BASE_URL}/cartItems/AddToCart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItemData),
      mode: 'cors'
    });
    if (!response.ok) throw new Error('Failed to add item to cart');

    await Swal.fire({
      icon: 'success',
      title: '商品已加入購物車！',
      text: `已將 ${productDetails.value.name} 加入您的購物車。`,
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    await Swal.fire({
      icon: 'error',
      title: '錯誤',
      text: '加入購物車時發生問題，請稍後再試。',
    });
  }
};

// Increase or decrease quantity functions
const increaseQuantity = function() {
  if (productDetails.value && quantity.value < productDetails.value.instock) {
    quantity.value += 1;
  }
};
const decreaseQuantity = function() {
  if (quantity.value > 0) {
    quantity.value -= 1;
  }
};

const handleInput = (event) => {
  let value = parseInt(event.target.value, 10);
  
  if (isNaN(value) || value < 0) {
    quantity.value = 0;
  } else if (value > productDetails.value.instock) {
    quantity.value = productDetails.value.instock;
  } else {
    quantity.value = value;
  }
};

onMounted(fetchProductDetails);
</script>

<template>
    <div class="container-fluid product-detail">
        <div class="container py-5">
            <button @click="router.go(-1)" class="btn btn-back mb-4"> <!-- 返回按鈕 -->
                <i class="fa fa-arrow-left me-2"></i>返回
            </button>
            <div class="row g-4 mb-5">
                <div class="col-12">
                    <div class="row g-4">
                        <!-- 商品圖片輪播 -->
                        <div class="col-lg-6">
                            <div class="product-carousel rounded shadow-sm">
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <div v-if="productDetails && productDetails.imgUrls.length > 0">
                                            <div v-for="(image, index) in productDetails.imgUrls" :key="index" :class="['carousel-item', { active: index === 0 }]">
                                                <img :src="IMG_URL + image" class="img-fluid rounded w-100" :alt="productDetails.name">
                                            </div>
                                        </div>
                                        <div v-else class="carousel-item active">
                                            <img :src="IMG_URL + '/images/non-found.jpg'" class="img-fluid rounded w-100" alt="Image not found">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                     <!-- 圓點指示器 -->
                                    <div class="carousel-indicators">
                                        <button v-if="productDetails && productDetails.imgUrls.length > 0" v-for="(image, index) in productDetails.imgUrls" :key="index" type="button" :data-bs-target="'#carouselExampleControls'" :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : undefined" aria-label="'Slide ' + (index + 1)"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 商品敘述 -->
                        <div class="col-lg-6" v-if="productDetails">
                            <h4 class="fw-bold mb-3">{{ productDetails.name }}</h4>
                            <p class="text-muted mb-3">分類: {{ productDetails.categoryName }}</p>
                            <h5 class="text-primary fw-bold mb-3">價格: {{ productDetails.price || "未標示" }}</h5>
                            <p class="text-secondary mb-4">賣家: {{ productDetails.sellerName}}</p>
                            <p class="mb-4">商品描述: {{ productDetails.description || "無"}}</p>
                            <p class="text-secondary mb-4">庫存量: {{ productDetails.instock || "不詳"}}</p>
                            <div class="input-group quantity mb-5" style="width:200px;">
                                <button @click="decreaseQuantity" class="btn btn-minus bg-light text-secondary rounded-circle">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <input type="text" class="form-control form-control-sm text-center quantity-input" v-model="quantity" @input="handleInput">
                                <button @click="increaseQuantity" class="btn btn-plus bg-light text-secondary rounded-circle">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                            <button @click="addToCart" class="btn btn-add-to-cart">
                                <i class="fa fa-shopping-bag me-2"></i>加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 商品詳情容器 */
/* .product-detail {
    background-color: #f3eae0;
} */

/* 返回按鈕樣式 */
.btn-back {
    background-color: #6b9d8f;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    padding: 0.5rem 1.5rem;
    transition: background-color 0.3s, color 0.3s;
}

.btn-back:hover {
    background-color: #4a7d6b;
    color: #ffffff;
}

/* 產品輪播樣式 */
.product-carousel {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 數量調整按鈕 */
.quantity {
    display: flex;
    align-items: center;
}

.quantity-input {
    width: 60px;
    text-align: center;
}

.btn-minus,
.btn-plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    font-size: 1rem;
    color: #6b9d8f;
    border: 1px solid #ddd;
}

.btn-minus:hover,
.btn-plus:hover {
    background-color: #4a7d6b;
    color: #ffffff;
}

/* 圓點指示器 */
.carousel-indicators [data-bs-target] {
    background-color: #b0b0b0;
}

.carousel-indicators .active {
    background-color: #6b9d8f;
}

/* 加入購物車按鈕 */
.btn-add-to-cart {
    background-color: #6b9d8f;
    color: #ffffff;
    border-radius: 25px;
    padding: 0.5rem 1.5rem;
    border: none;
    transition: background-color 0.3s, color 0.3s;
}

.btn-add-to-cart:hover {
    background-color: #4a7d6b;
}
</style>
