<script setup>
import { ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useMemberStore } from '@/stores/Member';
import Swal from 'sweetalert2';

const IMG_URL = import.meta.env.VITE_API_IMGURL
const BASE_URL = import.meta.env.VITE_API_BASEURL;

// Use member store to track login status
const memberStore = useMemberStore();
const isLoggedIn = computed(() => memberStore.isLoggedIn);

// 使用 props 接收 id
const props = defineProps({
  id: String
});

const productId = props.id;
// const route = useRoute();
// const productId = route.params.id; // 從路由獲取商品 ID
// console.log(productId);
const productDetails = ref(null);


// For quantity control
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
    // console.log(response);
  } 
  catch (error) {
    console.error('Error fetching product details:', error);
  }
};

// Add to cart function
const addToCart = async () => {
  if (!isLoggedIn.value) {
    // Show login prompt if not logged in
    await Swal.fire({
      icon: 'info',
      title: '請先登入',
      text: '您需要登入後才能將商品加入購物車。',
    });
    return;
  }

  // Prepare cart item data
  const cartItemData = {
    BuyerId: memberStore.member.id,
    PId: productId,
    Quantity: quantity.value,
  };

  // Send request to add item to cart
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

// Functions to increase or decrease quantity
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
  // 去除開頭的 0 並限制數值範圍
  let value = parseInt(event.target.value, 10);
  
  if (isNaN(value) || value < 0) {
    quantity.value = 0;
  } else if (value > productDetails.value.instock) {
    quantity.value = productDetails.value.instock;
  } else {
    quantity.value = value;
  }
};


// 載入時獲取商品詳細資料
onMounted(fetchProductDetails);
</script>

<template>
    <div class="container-fluid">
        <div class="container py-5">
            <div class="row g-4 mb-5">
                <div class="col-12">
                    <div class="row g-4">
                        <!-- 商品圖片輪播 -->
                        <div class="col-lg-6">
                            <div class="border rounded">
                                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <!-- 顯示圖片輪播，如果 imgUrls 有圖片 -->
                                        <div v-if="productDetails && productDetails.imgUrls.length > 0">
                                            <div v-for="(image, index) in productDetails.imgUrls" :key="index" :class="['carousel-item', { active: index === 0 }]">
                                                <img :src="IMG_URL + image" class="img-fluid rounded w-100" :alt="productDetails.name">
                                            </div>
                                        </div>
                                        <!-- 顯示 not-found 圖片，如果 imgUrls 為空 -->
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
                                        <button v-if="productDetails && productDetails.imgUrls.length > 0" v-for="(image, index) in productDetails.imgUrls" :key="index" type="button" :data-bs-target="'#carouselExampleControls'" :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : undefined" aria-label="'Slide ' + (index + 1)">
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 商品敘述 -->
                        <div class="col-lg-6" v-if="productDetails">
                            <h4 class="fw-bold mb-3">{{ productDetails.name }}</h4>
                            <p class="fw-bold mb-3">分類: {{ productDetails.categoryName }}</p>
                            <h5 class="fw-bold mb-3">價格: {{ productDetails.price || "未標示" }}</h5>
                            <p class="mb-4">賣家: {{ productDetails.sellerName}}</p>
                            <p class="mb-4">商品描述: {{ productDetails.description || "無"}}</p>
                            <p class="mb-4">庫存量: {{ productDetails.instock || "不詳"}}</p>
                            <div class="input-group quantity mb-5" style="width: 180px;">
                                <div class="input-group-btn">
                                    <button @click="decreaseQuantity" class="btn btn-sm btn-minus rounded-circle bg-light border">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <!-- 使用 v-model 直接綁定 quantity 並限制輸入 -->
                                <input type="text" class="form-control form-control-sm text-center border-0 quantity-input" v-model="quantity" @input="handleInput">
                                <div class="input-group-btn">
                                    <button @click="increaseQuantity" class="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button @click="addToCart" class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">
                                    <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
}

.quantity-input {
  width: 70px;
}

.btn-minus,
.btn-plus {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 5px;
}

.carousel-indicators [data-bs-target] {
  background-color: #ddd;
}

.carousel-indicators .active {
  background-color: #007bff;
}
</style>