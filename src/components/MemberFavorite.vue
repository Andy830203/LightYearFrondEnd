<template>
  <div class="favorites-container">
    <h2>我的收藏活動</h2>
    <div v-if="favorites.length === 0" class="no-favorites">
      暫無收藏活動
    </div>
    <ul v-else class="favorites-list">
      <li v-for="favorite in favorites" :key="favorite.id" class="favorite-item">
        <div class="event-info">
          <p>活動ID: {{ favorite.eventId }}</p>
          <p>
            狀態: <span :class="{'attending': favorite.attendance, 'not-attending': favorite.attendance === null}">
              {{ favorite.attendance ? '已參加' : '未參加' }}
            </span>
          </p>
        </div>
        <div class="button-group">
          <button @click="removeFavorite(favorite.eventId)" class="btn-remove">取消收藏</button>
          <button v-if="favorite.attendance === null" @click="markAsAttending(favorite.id)" class="btn-attend">標記為已參加</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const favorites = ref([]);
    const memberId = ref(null);

    // 從 localStorage 中取得 memberId
    const loadMemberId = () => {
      const storedMember = localStorage.getItem("member");
      if (storedMember) {
        const parsedMember = JSON.parse(storedMember);
        memberId.value = parsedMember?.memberId || null;
      } else {
        console.error("無法取得 member，請確認是否已登入");
      }
    };

    const getFavorites = async () => {
      if (!memberId.value) return; // 如果沒有 memberId，停止執行
      try {
        const response = await axios.get(`/api/Collections/${memberId.value}`);
        favorites.value = response.data;
      } catch (error) {
        console.error("獲取收藏活動失敗", error);
      }
    };

    const removeFavorite = async (eventId) => {
      try {
        await axios.delete(`/api/Collections/${memberId.value}/${eventId}`);
        getFavorites(); // 更新列表
      } catch (error) {
        console.error("移除收藏失敗", error);
      }
    };

    const markAsAttending = async (id) => {
      try {
        await axios.put(`/api/Collections/UpdateAttendance/${id}`, { attendance: true });
        getFavorites(); // 更新列表
      } catch (error) {
        console.error("標記參加失敗", error);
      }
    };

    onMounted(() => {
      loadMemberId(); // 初始化時從 localStorage 中載入 memberId
      getFavorites();
    });

    return {
      favorites,
      removeFavorite,
      markAsAttending,
    };
  },
};
</script>

<style scoped>
.favorites-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
}

h2 {
  text-align: center;
  color: #fff;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.no-favorites {
  text-align: center;
  font-size: 1.2em;
  color: #555;
  margin-top: 20px;
}

.favorites-list {
  list-style-type: none;
  padding: 0;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.event-info {
  flex: 1;
}

.event-info p {
  margin: 5px 0;
  color: #555;
  font-size: 1.1em;
}

.attending {
  color: #28a745; /* 綠色代表已參加 */
  font-weight: bold;
}

.not-attending {
  color: #ff6347; /* 紅色代表未參加 */
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn-remove,
.btn-attend {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-remove {
  background-color: #ff6347;
  color: #fff;
}

.btn-remove:hover {
  background-color: #e03d2d;
}

.btn-attend {
  background-color: #28a745;
  color: #fff;
}

.btn-attend:hover {
  background-color: #218838;
}
</style>
