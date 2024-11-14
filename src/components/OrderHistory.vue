<template>
  <div class="order-history">
    <h2>歷史訂單</h2>

    <!-- 列印按鈕 -->
    <button class="styled-button" @click="printOrderHistory">列印訂單</button>

    <div id="print-section">
      <table>
        <thead>
          <tr>
            <th @click="sortTable('id')">訂單編號</th>
            <th @click="sortTable('date')">訂單時間</th>
            <th @click="sortTable('status')">訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ formatDate(order.orderTime) || 'N/A'  }}</td>
            <td>
              <!-- <span :class="['status', getStatusClass(order.status)]" >
                {{ order.status || 'N/A' }}
              </span> -->
              <span v-if="order.status == 'Completed'" :class="['status', getStatusClass(order.status)]">
                已完成
              </span>
              <span v-if="order.status == 'Shipped'" :class="['status', getStatusClass(order.status)]">
                已出貨
              </span>
              <span v-if="order.status == 'Pending'" :class="['status', getStatusClass(order.status)]">
                處理中
              </span>
              <span v-else :class="['status', getStatusClass(order.status)]">已取消</span>
            </td>
            <td>
              <button class="styled-button" @click="fetchOrderItems(order.id)">詳細內容</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁按鈕 -->
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一頁</button>
        <span>第 {{ currentPage }} 頁</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一頁</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2'; 
const BASE_URL = import.meta.env.VITE_API_BASEURL;
export default {
  name: 'OrderHistory',
  setup() {
    const userId = JSON.parse(localStorage.getItem('member'))?.id;
    const orders = ref([]);
    const selectedOrderItems = ref([]);
    const selectedOrderId = ref(null);
    const sortKey = ref('id');
    const sortOrder = ref(1);
    const currentPage = ref(1);
    const ordersPerPage = 20;

    const fetchUserOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Orders/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // 將回應轉換為 JSON 格式
    orders.value = data;
    // console.log(userId);
    // console.log('User Orders:', data);  // 檢查回傳資料
  } catch (error) {
    console.error('Error fetching user orders:', error);
  }
};

const fetchOrderItems = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/Orders/order/${orderId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // 將回應轉換為 JSON 格式
    selectedOrderItems.value = data;
    selectedOrderId.value = orderId;
    // console.log('Fetched order items:', data); // 檢查回傳資料
     const orderDetailsHtml = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background-color: #f0f8ff;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 40%;">商品名稱</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 20%;">數量</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 20%;">單價</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left; width: 20%;">賣家名稱</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.productName || 'N/A'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity || 0}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.unitPrice || 'N/A'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.sellerName || 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    await Swal.fire({
      title: `訂單詳情 - 訂單編號: ${orderId}`,
      html: orderDetailsHtml,
      confirmButtonText: '關閉',
      width: '80%',
      preConfirm: () => {
        selectedOrderItems.value = [];
        selectedOrderId.value = null;
      }
    });
  } catch (error) {
    console.error('Error fetching order items:', error);
  }
};

    const getStatusClass = (status) => {
      switch (status) {
        case 'Completed':
          return 'status-completed';
        case 'Pending':
          return 'status-pending';
        case 'Canceled':
          return 'status-cancelled';
        default:
          return 'status-shipped';
      }
    };

    const sortTable = (key) => {
      if (sortKey.value === key) {
        sortOrder.value *= -1;
      } else {
        sortKey.value = key;
        sortOrder.value = 1;
      }
    };
    
    const sortedOrders = computed(() => {
      return [...orders.value].sort((a, b) => {
        if (a[sortKey.value] < b[sortKey.value]) return -1 * sortOrder.value;
        if (a[sortKey.value] > b[sortKey.value]) return 1 * sortOrder.value;
        return 0;
      });
    });
    // 分頁邏輯
    const totalPages = computed(() => {
      return Math.ceil(orders.value.length / ordersPerPage);
    });

    const paginatedOrders = computed(() => {
      const startIndex = (currentPage.value - 1) * ordersPerPage;
      const endIndex = startIndex + ordersPerPage;
      return sortedOrders.value.slice(startIndex, endIndex);
    });

    // 改變頁面
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };

    const printOrderHistory = () => {
      const printContents = document.getElementById('print-section').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    };

    // 取得並格式化日期的函數
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      date.setHours(date.getHours() + 8);

      // 格式化為 'yyyy/mm/dd aa:bb' 格式
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 月份從 0 開始，所以需要加 1
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      // 返回格式化結果
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    };

    onMounted(fetchUserOrders);

    return {
      orders,
      sortedOrders,
      selectedOrderItems,
      selectedOrderId,
      getStatusClass,
      fetchOrderItems,
      printOrderHistory,
      sortTable,
      formatDate,
      changePage,
      currentPage,
      totalPages,
      paginatedOrders
    };
  },
};
</script>

<style scoped>
.order-history {
  padding: 20px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.styled-button {
  padding: 10px 20px;
  background: linear-gradient(45deg, #ff5722, #ff9800);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.styled-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s;
}

.styled-button:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.styled-button:hover {
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.5);
  transform: translateY(-2px);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin: 10px;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
}

th {
  background-color: #df9e3d;
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
}

tr:hover {
  background-color: #f1f5f9;
}

.status {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.9em;
  font-weight: bold;
  color: #fff;
}

.status-completed {
  background-color: #4caf50;
}

.status-pending {
  background-color: #ffc107;
}

.status-shipped {
  background-color: cornflowerblue;
}
.status-cancelled {
  background-color: #f44336;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 灰色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000; /* 确保 modal 在最上层 */
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: left;
  z-index: 2001; /* 确保 modal 内部内容在最上层 */
}

.modal h3 {
  margin-top: 0;
  font-size: 20px;
}

.modal p {
  margin: 10px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #f0f8ff;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination span {
  align-self: center;
  margin: 0 10px;
  font-size: 16px;
}
</style>
