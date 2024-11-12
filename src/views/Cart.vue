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
  const total = cartItems.value.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD',  minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(total);
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

const removeAllItem = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/CartItems/userID/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (response.ok) {
      // 刪除成功後，將 cartItems 清空
      cartItems.value = [];
      console.log("All items deleted successfully for the user");
    } else {
      console.error("Failed to delete items for the user");
    }
  } catch (error) {
    console.error("Error deleting items:", error);
  }
}

const base_param = ref({
  MerchantID: "3002607",
  MerchantTradeNo: '',
  MerchantTradeDate: '',
  PaymentType: 'aio',
  TotalAmount: 0,
  TradeDesc: 'ecpay test',
  ItemName: "金流交易",
  ReturnURL: "http://localhost:5173/",
  ChoosePayment: 'ALL',
  EncryptType: 1,
  ClientBackURL: 'http://localhost:5173/shop', // Optional field
  CheckMacValue: ''  // Will be generated on the backend and assigned here
});
const sendCheck = {

}
const proceedToCheckout = async function() {
  // Handle checkout logic (e.g., navigate to checkout page)
  try {
    // 構建 sendCheck 物件
    const sendCheck = {
      buyer: memberId,
      orderItems: cartItems.value.map(item => ({
        pId: item.pId,
        quantity: item.quantity
      })),
      totalPrice: cartItems.value.reduce((total, item) => total + item.productPrice * item.quantity, 0),
      orderTime: new Date().toISOString() 
    };
    console.log(sendCheck);
    const response = await fetch(`${BASE_URL}/Orders/ToECpay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(sendCheck)
    });
    if (response.ok) {
      // 後端回應成功，解析回應中的訂單號和檢查碼等 ECPay 所需參數
      const result = await response.json();
      base_param.value = {
    ...base_param.value,
    MerchantTradeNo: result.MerchantTradeNo,
    MerchantTradeDate: result.MerchantTradeDate,
    TotalAmount: result.TotalAmount,
    ItemName: result.ItemName,
    CheckMacValue: result.CheckMacValue
  };
      //console.log(base_param.value);
       // 從後端生成的 CheckMacValue
      //console.log(document.getElementById("paymentForm"));
      // 延遲提交表單
      setTimeout(() => {
        document.getElementById("paymentForm").submit();
      }, 150); // 100ms 延遲
    } else {
      console.error("Failed to proceed with checkout");
    }
  } catch (error) {
    console.error("Error proceeding to checkout:", error);
  }
  removeAllItem(memberId);
}
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
                        <th scope="col">刪除項目</th>
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
                <div class="bg-light border border-secondary rounded p-4">
                    <div class="p-4">
                        <h5 class="display-6 mb-4">購物車 <span class="fw-normal">總計</span></h5>
                    </div>
                    <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                        <h5 class="mb-0 ps-4 me-4">Total</h5>
                        <p class="mb-0 pe-4">NT$ {{ (subtotal) }} </p>
                    </div>
                    <button class="btn btn-outline-primary border-secondary rounded-pill px-4 py-3  text-uppercase mb-4 ms-4" @click="proceedToCheckout">成立訂單</button>
                </div>
              </div>
        </div>
    </div>
</div>
<form id="paymentForm" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="POST" style="display: none">
  <input name="MerchantID" v-bind:value="base_param.MerchantID" />
  <input name="MerchantTradeNo" v-bind:value="base_param.MerchantTradeNo" />
  <input name="MerchantTradeDate" v-bind:value="base_param.MerchantTradeDate" />
  <input name="PaymentType" v-bind:value="base_param.PaymentType" />
  <input name="TotalAmount" v-bind:value="base_param.TotalAmount" />
  <input name="TradeDesc" v-bind:value="base_param.TradeDesc" />
  <input name="ItemName" v-bind:value="base_param.ItemName" />
  <input name="ReturnURL" v-bind:value="base_param.ReturnURL" />
  <input name="ChoosePayment" v-bind:value="base_param.ChoosePayment" />
  <input name="EncryptType" v-bind:value="base_param.EncryptType" />
  <input name="ClientBackURL" v-bind:value="base_param.ClientBackURL" />
  <input name="CheckMacValue" v-bind:value="base_param.CheckMacValue" />
  <button type="submit">Submit</button>
</form>
  <!-- Cart Page End -->
</template>

<style scoped>

</style>