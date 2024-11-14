<template>
  <div class="event-list">
    <!-- 篩選區域 -->
    <div class="filters">
      <label class="filter-label">
        最低價格:
        <input type="number" v-model="filters.minFee" placeholder="最低價格" class="filter-input">
      </label>
      <label class="filter-label">
        最高價格:
        <input type="number" v-model="filters.maxFee" placeholder="最高價格" class="filter-input">
      </label>
      <label class="filter-label">
        活動開始日期:
        <input type="date" v-model="filters.startDate" class="filter-input">
      </label>
      <label class="filter-label">
        活動結束日期:
        <input type="date" v-model="filters.endDate" class="filter-input">
      </label>
      <button @click="resetFilters" class="reset-filters-button">重置篩選</button>
    </div>

    <!-- 活動列表區域 -->
    <table class="event-table">
      <thead>
        <tr>
          <th>活動圖片</th>
          <th>活動名稱</th>
          <th>發起人</th>
          <th>報名費</th>
          <th>時段</th>
          <th>地點</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in filteredEvents" :key="event.id" class="event-row">
          <td><img :src="event.image" alt="活動圖片" class="event-image"></td>
          <td>{{ event.name }}</td>
          <td>{{ event.organizer }}</td>
          <td>{{ event.fee }} 元</td>
          <td>{{ event.timeSlot }}</td>
          <td>{{ event.location }}</td>
          <td class="event-actions">
            <button @click="openDetails(event)" class="details-button">詳細內容</button>
            <span
              class="favorite-icon"
              :class="{ active: event.isFavorite }"
              @click="toggleFavorite(event)"
            >
              ❤
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 詳細內容彈跳視窗 -->
    <DetailModal
      v-if="showModal"
      :event="selectedEvent"
      @close="closeModal"
      @register="registerEvent"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import DetailModal from '@/components/DetailModal.vue';

const showModal = ref(false);
const selectedEvent = ref(null);

const events = ref([
  {
    id: 1,
    name: '活動名稱',
    organizer: '發起人A',
    fee: 100,
    timeSlot: '2024-11-12 14:00-16:00',
    location: '台北市中正區',
    image: 'https://via.placeholder.com/80',
    isFavorite: false,
    maxParticipants: 50,
    category: '文化',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150'
    ]
  },
  {
    id: 2,
    name: '藝術展覽',
    organizer: '藝術協會',
    fee: 200,
    timeSlot: '2024-12-01 10:00-18:00',
    location: '台中市西屯區',
    image: 'https://via.placeholder.com/80',
    isFavorite: true,
    maxParticipants: 30,
    category: '藝術',
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150'
    ]
  }
  // 更多活動...
]);

const filters = ref({
  minFee: null,
  maxFee: null,
  startDate: null,
  endDate: null
});

const filteredEvents = computed(() =>
  events.value.filter(event => {
    const isWithinPriceRange =
      (!filters.value.minFee || event.fee >= filters.value.minFee) &&
      (!filters.value.maxFee || event.fee <= filters.value.maxFee);
    const eventDate = new Date(event.timeSlot.split(' ')[0]);
    const isWithinDateRange =
      (!filters.value.startDate || eventDate >= new Date(filters.value.startDate)) &&
      (!filters.value.endDate || eventDate <= new Date(filters.value.endDate));
    return isWithinPriceRange && isWithinDateRange;
  })
);

function openDetails(event) {
  selectedEvent.value = event;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedEvent.value = null;
}

function registerEvent(event) {
  Swal.fire('已報名', `您已成功報名活動「${event.name}」`, 'success');
}

async function toggleFavorite(event) {
  if (event.isFavorite) {
    const confirmResult = await Swal.fire({
      title: '確認取消收藏?',
      text: `確定要取消收藏活動「${event.name}」嗎？`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    });

    if (confirmResult.isConfirmed) {
      event.isFavorite = false;
      Swal.fire('已取消收藏', `活動「${event.name}」已取消收藏`, 'success');
    }
  } else {
    event.isFavorite = true;
    Swal.fire('已添加收藏', `活動「${event.name}」已添加到收藏`, 'success');
  }
}

function resetFilters() {
  filters.value.minFee = null;
  filters.value.maxFee = null;
  filters.value.startDate = null;
  filters.value.endDate = null;
}
</script>

<style scoped>
/* 收藏圖示樣式 */
.favorite-icon {
  font-size: 1.5em;
  color: #ccc;
  transition: color 0.3s;
  cursor: pointer;
}

.favorite-icon.active {
  color: #e74c3c; /* 收藏時顯示紅色 */
}

/* 按鈕樣式 */
.reset-filters-button,
.details-button {
  padding: 8px 20px;
  font-size: 0.85em;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #4b79a1, #283e51);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.reset-filters-button:hover,
.details-button:hover {
  background: linear-gradient(135deg, #283e51, #4b79a1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.reset-filters-button:active,
.details-button:active {
  transform: translateY(1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 其他樣式 */
.event-list {
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  background: #f8f3eb;
  padding: 15px;
  border: 2px solid #c77d34;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.filter-label {
  color: #333;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter-input {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #c77d34;
  border-radius: 5px;
  background: #fff;
  color: #333;
  outline: none;
}

.event-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #c77d34;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.event-table th, .event-table td {
  padding: 16px;
  color: #333;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.event-table th {
  background-color: #f2e7dc;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.event-row:hover .event-image {
  transform: scale(1.1);
}

.event-row:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}
</style>
