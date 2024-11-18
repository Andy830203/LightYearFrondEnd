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
          <th>活動名稱</th>
          <th>發起人</th>
          <th>報名費</th>
          <th>最早開始時間</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in filteredEvents" :key="event.id" class="event-row">
          <td>{{ event.name }}</td>
          <td>{{ event.organizer }}</td>
          <td>{{ event.fee }} 元</td>
          <td>{{ getEarliestStartTime(event.periods) }}</td>
          <td class="event-actions">
            <button @click="openDetails(event.id)" class="details-button">詳細內容</button>
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
      :eventId="selectedEventId"
      @close="closeModal"
      @register="registerEvent"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import DetailModal from '@/components/DetailModal.vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

export default {
  components: {
    DetailModal,
  },
  data() {
    return {
      showModal: false,
      selectedEventId: null,
      events: [],
      filters: {
        minFee: null,
        maxFee: null,
        startDate: null,
        endDate: null,
      },
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => {
        const isWithinPriceRange =
          (!this.filters.minFee || event.fee >= this.filters.minFee) &&
          (!this.filters.maxFee || event.fee <= this.filters.maxFee);

        const earliestPeriod = event.periods.reduce((earliest, period) => {
          const startTime = new Date(period.startTime);
          return !earliest || startTime < new Date(earliest.startTime) ? period : earliest;
        }, null);
        const eventDate = earliestPeriod ? new Date(earliestPeriod.startTime) : null;

        const isWithinDateRange =
          (!this.filters.startDate || (eventDate && eventDate >= new Date(this.filters.startDate))) &&
          (!this.filters.endDate || (eventDate && eventDate <= new Date(this.filters.endDate)));

        return isWithinPriceRange && isWithinDateRange;
      });
    },
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch(`${BASE_URL}/Events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        this.events = await response.json();
        this.fetchfavorites();
      } catch (error) {
        console.error('Error fetching events:', error);
        Swal.fire('錯誤', '無法獲取活動資料，請稍後再試', 'error');
      }
    },
    async fetchfavorites() {
      const memberData = JSON.parse(localStorage.getItem('member'));
      const userID = memberData ? memberData.id : null;
      if (!userID) return; // Exit if not logged in
      try {
        const response = await fetch(`${BASE_URL}/Collections/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const favorites = await response.json();
        // Set isFavorite to true for events that are in the favorites list
        const favoriteIds = new Set(favorites.map(fav => fav.eventId));
        this.events.forEach(event => {
          event.isFavorite = favoriteIds.has(event.id);
        });
      } catch (error) {
        console.error('Error fetching favorites:', error);
        Swal.fire('錯誤', '無法獲取收藏資料，請稍後再試', 'error');
    }
  }
    ,
    getEarliestStartTime(periods) {
      if (!periods || periods.length === 0) return '無時段';
      
      const earliestPeriod = periods.reduce((earliest, period) => {
        const startTime = new Date(new Date(period.startTime).getTime() + 8 * 60 * 60 * 1000);
        return !earliest || startTime < new Date(earliest.startTime) ? period : earliest;
      }, null);

      if (!earliestPeriod) return '無時段';

      const startTime = new Date(new Date(earliestPeriod.startTime).getTime() + 8 * 60 * 60 * 1000);
      const year = startTime.getFullYear();
      const month = String(startTime.getMonth() + 1).padStart(2, '0');
      const day = String(startTime.getDate()).padStart(2, '0');
      const hours = String(startTime.getHours()).padStart(2, '0');
      const minutes = String(startTime.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    openDetails(eventId) {
      this.selectedEventId = eventId;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedEventId = null;
    },
    registerEvent(eventId) {
      this.$router.push({ name: 'eventSignUpWithId', params: { id: eventId } });
    },
    async toggleFavorite(event) {
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
          try {
            const memberData = JSON.parse(localStorage.getItem('member'));
            const userID = memberData ? memberData.id : null;
            await fetch(`${BASE_URL}/Collections/${userID}/${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
            });
            event.isFavorite = false;
            Swal.fire('已取消收藏', `活動「${event.name}」已取消收藏`, 'success');
          } 
          catch (error) {
            console.error('Error Deleting favorites:', error);
            Swal.fire('錯誤', '無法刪除收藏資料，請稍後再試', 'error');
          }
        }
      }
      else {
        try {
            const memberData = JSON.parse(localStorage.getItem('member'));
            const userID = memberData ? memberData.id : null;
            await fetch(`${BASE_URL}/Collections/AddFavorite`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      "memberId": userID,
                      "eventId": event.id
                    }),
                    mode: 'cors'
});
            event.isFavorite = true;
            Swal.fire('已添加收藏', `活動「${event.name}」已添加收藏`, 'success');
          } 
          catch (error) {
            console.error('Error Adding favorites:', error);
            Swal.fire('錯誤', '無法新增收藏資料，請稍後再試', 'error');
          }
      }
    },
    resetFilters() {
      this.filters.minFee = null;
      this.filters.maxFee = null;
      this.filters.startDate = null;
      this.filters.endDate = null;
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
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
