<script setup>
import { ref, computed, onMounted} from 'vue';
import { useMemberStore } from '@/stores/Member';


const IMG_URL = import.meta.env.VITE_API_IMGURL
const BASE_URL = import.meta.env.VITE_API_BASEURL;

// Use member store to track login status
const memberStore = useMemberStore();
const isLoggedIn = computed(() => memberStore.isLoggedIn);

// 使用 props 接收 id
const props = defineProps({
  id: String
});

const memberId = props.id;

// Setup reactive variables and methods
const cartItems = ref([]); // Holds the cart items
const instockCurr = ref({}); // Holds current stock information for each item
const stockLimitReached = ref({}); // 儲存每個商品的提示訊息狀態

// Function to fetch cart items
const fetchCartItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/CartItems/memberID/${memberId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        });
    cartItems.value = await response.json();
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};
onMounted(fetchCartItems);

// Fetches instock value for a specific product and stores it in instockCurr
const currItemResponse = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/Products/${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });
    const product = await response.json();
    instockCurr.value[productId] = product.instock;
  } catch (error) {
    console.error('Error fetching product stock:', error);
  }
};

// Fetch instock values for all cart items on mount
onMounted(async () => {
  for (const item of cartItems.value) {
    await currItemResponse(item.pId);
  }
});

// 更新購物車項目數量的 API
const updateCartItemQuantity = async (item) => {
  try {
    // 檢查庫存上限
    const maxStock = instockCurr.value[item.pId];
    if (item.quantity > maxStock) {
      item.quantity = maxStock;
      stockLimitReached.value[item.pId] = true;
    } else {
      stockLimitReached.value[item.pId] = false;
    }

    const response = await fetch(`${BASE_URL}/CartItems/UpdateCartItem`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BuyerId: memberId,
        PId: item.pId,
        Quantity: item.quantity
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item quantity');
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

// Validates quantity to be at least 1 and then updates cart item
const validateAndUpdateQuantity = (item) => {
  if (item.quantity < 1) {
    item.quantity = 1;
  }
  updateCartItemQuantity(item);
};

// Function to calculate subtotal
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Methods for quantity management
const incrementQuantity = async (item) => {
  if (!instockCurr.value[item.pId]) {
    await currItemResponse(item.pId); // Fetch instock if not already fetched
  }
  const maxStock = instockCurr.value[item.pId];
  if (item.quantity < maxStock) {
    item.quantity++;
    stockLimitReached.value[item.pId] = false;
    await updateCartItemQuantity(item);
  } else {
    stockLimitReached.value[item.pId] = true;
  }
};

const decrementQuantity = async (item) => {
  if (item.quantity > 1) {
    item.quantity--;
    stockLimitReached.value[item.pId] = false;
    await updateCartItemQuantity(item);
  }
};

// 刪除購物車項目的 API
const removeItem = async (itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/CartItems/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (response.ok) {
      // 刪除成功後，從 cartItems 中移除該項目
      cartItems.value = cartItems.value.filter(item => item.id !== itemId);
      console.log("Item deleted successfully");
    } else {
      console.error("Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const proceedToCheckout = () => {
  // Handle checkout logic (e.g., navigate to checkout page)
  console.log('Proceeding to checkout...');
};
</script>

<template>
<!-- Cart Page Start -->
<div class="container-fluid">
  
    <div class="container">
        <!-- Cart Table -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">商品圖</th>
                        <th scope="col">品名</th>
                        <th scope="col">價格</th>
                        <th scope="col">數量</th>
                        <th scope="col">金額</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.id">
                        <td scope="row">
                            <div class="d-flex align-items-center">
                                <img :src="IMG_URL + item.mainImageUrl" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="商品圖無法顯示">
                            </div>
                        </td>
                        <td><p class="mb-0 mt-4">{{ item.productName }}</p></td>
                        <td><p class="mb-0 mt-4">NT$ {{ item.productPrice }} </p></td>
                        <td>
                            <div class="input-group quantity mt-4" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button @click="decrementQuantity(item)" class="btn btn-sm btn-minus rounded-circle bg-light border">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm text-center border-0" v-model.number="item.quantity" @blur="validateAndUpdateQuantity(item)">
                                <div class="input-group-btn">
                                    <button @click="incrementQuantity(item)" class="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                <span v-if="stockLimitReached[item.pId]" class="text-danger small">已達庫存量上限</span>
                            </div>
                        </td>
                        <td><p class="mb-0 mt-4">NT$ {{ (item.productPrice * item.quantity) }} </p></td>
                        <td>
                            <button @click="removeItem(item.id)" class="btn btn-md rounded-circle bg-light border mt-4">
                                <i class="fa fa-times text-danger"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Cart Total -->
        <div class="row g-4 justify-content-end">
            <div class="col-8"></div>
            <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div class="bg-light rounded">
                    <div class="p-4">
                        <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                        <div class="d-flex justify-content-between mb-4">
                            <h5 class="mb-0 me-4">Subtotal:</h5>
                            <p class="mb-0">{{ subtotal.toFixed(2) }} $</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h5 class="mb-0 me-4">Shipping</h5>
                            <p class="mb-0">Flat rate: 3.00 $</p>
                        </div>
                    </div>
                    <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                        <h5 class="mb-0 ps-4 me-4">Total</h5>
                        <p class="mb-0 pe-4">{{ (subtotal + shipping).toFixed(2) }} $</p>
                    </div>
                    <button class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" @click="proceedToCheckout">Proceed Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
  <!-- Cart Page End -->
</template>

<style scoped>

</style>