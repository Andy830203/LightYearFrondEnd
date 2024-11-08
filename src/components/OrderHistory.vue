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
            <th @click="sortTable('date')">訂單日期</th>
            <th @click="sortTable('productName')">商品名稱</th>
            <th @click="sortTable('status')">訂單狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in sortedOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.date }}</td>
            <td>{{ order.productName }}</td>
            <td>
              <span :class="['status', getStatusClass(order.status)]">
                {{ order.status }}
              </span>
            </td>
            <td>
              <button class="styled-button" @click="showOrderDetails(order)">詳細內容</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 訂單詳情模態框 -->
    <div v-if="selectedOrder" class="modal-overlay" @click.self="closeOrderDetails">
      <div class="modal">
        <h3>訂單詳情 - 訂單編號: {{ selectedOrder.id }}</h3>
        <p><strong>訂單日期:</strong> {{ selectedOrder.date }}</p>
        <p><strong>商品名稱:</strong> {{ selectedOrder.productName }}</p>
        <p><strong>訂單狀態:</strong> {{ selectedOrder.status }}</p>
        <button class="styled-button" @click="closeOrderDetails">關閉</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'OrderHistory',
  setup() {
    const orders = ref([
      { id: '1001', date: '2024-10-01', productName: '商品A', status: '已完成' },
      { id: '1002', date: '2024-10-15', productName: '商品B', status: '處理中' },
      { id: '1003', date: '2024-11-01', productName: '商品C', status: '已取消' },
    ]);

    const sortKey = ref('id');
    const sortOrder = ref(1);
    const selectedOrder = ref(null);

    const getStatusClass = (status) => {
      switch (status) {
        case '已完成':
          return 'status-completed';
        case '處理中':
          return 'status-processing';
        case '已取消':
          return 'status-cancelled';
        default:
          return '';
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

    const printOrderHistory = () => {
      const printContents = document.getElementById('print-section').innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    };

    const showOrderDetails = (order) => {
      selectedOrder.value = order;
    };

    const closeOrderDetails = () => {
      selectedOrder.value = null;
    };

    return {
      orders,
      getStatusClass,
      printOrderHistory,
      sortTable,
      sortedOrders,
      showOrderDetails,
      closeOrderDetails,
      selectedOrder,
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

.status-processing {
  background-color: #ffc107;
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: left;
}

.modal h3 {
  margin-top: 0;
  font-size: 20px;
}

.modal p {
  margin: 10px 0;
}

</style>
