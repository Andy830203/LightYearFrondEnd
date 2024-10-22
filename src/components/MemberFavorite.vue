<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow">
            <div class="card-header text-center bg-light text-dark">
              <h4>我的收藏活動</h4>
            </div>
            <div class="card-body">
              <!-- 活動列表 -->
              <div v-if="favoriteEvents.length > 0">
                <div v-for="event in favoriteEvents" :key="event.id" class="mb-3">
                  <div class="d-flex align-items-center">
                    <div class="event-info flex-grow-1">
                      <h5 class="mb-1">{{ event.title }}</h5>
                      <p class="text-muted mb-1">日期：{{ event.date }}</p>
                      <p class="text-muted">地點：{{ event.location }}</p>
                    </div>
                    <button class="btn btn-outline-danger" @click="removeFromFavorites(event.id)">
                      移除
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
              <div v-else>
                <p class="text-center text-muted">你還沒有收藏任何活動。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';

// 定義 reactive 變數
const favoriteEvents = ref([]); // 收藏的活動列表

// 取得收藏的活動
const getFavoriteEvents = async () => {
  try {
    const response = await fetch('/api/favorite-events');
    const data = await response.json();
    favoriteEvents.value = data;
  } catch (error) {
    alert('無法載入收藏活動');
  }
};

// 移除收藏的活動
const removeFromFavorites = async (eventId) => {
  try {
    await fetch(`/api/favorite-events/${eventId}`, {
      method: 'DELETE'
    });
    favoriteEvents.value = favoriteEvents.value.filter(event => event.id !== eventId);
    alert('成功移除收藏活動');
  } catch (error) {
    alert('移除收藏失敗');
  }
};

// 使用 onMounted 來呼叫 getFavoriteEvents
onMounted(() => {
  getFavoriteEvents();
});
</script>

  
  <style scoped>
  .container {
    margin-top: 5rem;
  }
  
  .card {
    border-radius: 10px;
    border: 1px solid #d3d3d3;
  }
  
  .card-header {
    background-color: #f0f4f8;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .event-info h5 {
    margin: 0;
    font-weight: bold;
  }
  
  .btn-outline-danger {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  </style>
  