<template>
  <div class="modal" v-if="event">
    <div class="modal-content">
      <button @click="closeModal" class="modal-close">&times;</button>
      <h2>{{ event.name }}</h2>
      <div class="modal-details">
        <p><strong>發起人:</strong> {{ event.organizer }}</p>
        <p><strong>報名費:</strong> {{ event.fee }} 元</p>
        
        <!-- 時段下拉選單 -->
        <!-- <div>
          <strong>選擇時段:</strong>
          <select v-model="selectedPeriod" class="time-slot-dropdown">
            <option 
              v-for="(period, index) in event.periods" 
              :key="index" 
              :value="period">
              {{ period.description }} ({{ formatDate(period.startTime) }} - {{ formatDate(period.endTime) }})
            </option>
          </select>
        </div> -->

        <div><strong>地點:</strong>
          <ul>
            <li v-for="(location, index) in event.locations" :key="location.id">
              {{ location.locName }} 
            </li>
          </ul>
          <span v-if="event.locations.length === 0">尚未指定地點</span>
        </div>

        <p><strong>最大人數:</strong> {{ event.capacity || '無限制' }}</p>
        <p><strong>活動類別:</strong> {{ event.category }}</p>
        <!-- <div class="modal-images">
          <h3>活動圖片</h3>
          <div v-for="(img, index) in event.images" :key="index" class="modal-image">
            <img :src="img" alt="活動圖片">
          </div>
        </div> -->
        <button @click="registerEvent" class="register-button">前往報名頁面</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['close', 'register']);
const event = ref(null);

// Watch for changes to the eventId prop and fetch event details
watch(
  () => props.eventId,
  async (newEventId) => {
    if (newEventId) {
      await fetchEventDetails(newEventId);
    }
  },
  { immediate: true }
);

// Fetch event details by eventId
async function fetchEventDetails(id) {
  try {
    const response = await fetch(`${BASE_URL}/Events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        });
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const eventData = await response.json();
    // 同時發送另一個 API 請求
    const responseLocations = await fetch(`${BASE_URL}/Events/Locations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    if (!responseLocations.ok) {
      throw new Error('Failed to fetch locations data');
    }
    const locationsData = await responseLocations.json();
    eventData.locations = locationsData;
    event.value = eventData;
  } catch (error) {
    console.error('Error fetching event details:', error);
  }
}

// Helper function to format date and time as "yyyy-MM-dd HH:mm"
function formatDate(date) {
  const d = new Date(new Date(date).getTime() + 8 * 60 * 60 * 1000)
  if (isNaN(d)) {  // 檢查是否為無效日期
    console.error("Invalid date format:", date);
    return "";  // 返回空字符串或預設值
  }
  
  // 使用本地時間格式化日期
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');  // 月份從 0 開始，因此要加 1
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
// Emit close event
function closeModal() {
  emit('close');
}

// Emit register event
function registerEvent() {
  emit('close');
  emit('register', props.eventId);
}
</script>
<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }
  
  .modal-content {
    background: #ffffff;
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 600px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.4s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); }
    to { transform: translateY(0); }
  }
  
  .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 1.5em;
    color: #999;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .modal-close:hover {
    color: #333;
  }
  
  .modal-details h2 {
    color: #4b79a1;
    font-size: 1.8em;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .modal-details p {
    margin: 8px 0;
    color: #666;
    font-size: 1em;
  }
  
  .modal-images {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }
  
  .modal-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }
  
  .modal-image img:hover {
    transform: scale(1.1);
  }
  
  .register-button {
    display: block;
    margin: 20px auto 0;
    padding: 10px 24px;
    font-size: 1em;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #4b79a1, #283e51);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .register-button:hover {
    background: linear-gradient(135deg, #283e51, #4b79a1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }
  
  .register-button:active {
    transform: translateY(2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>
  