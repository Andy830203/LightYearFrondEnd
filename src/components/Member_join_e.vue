<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'; // 引入 SweetAlert2

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const memberId = ref(null);
const evenjoin = ref([]);
const hasFavorites = ref(false);

const loadMemberId = () => {
  const storedMember = localStorage.getItem("member");
  if (storedMember) {
    const parsedMember = JSON.parse(storedMember);
    memberId.value = parsedMember?.id || null;
  } else {
    console.error("無法取得 member，請確認是否已登入");
  }
};
const fetchFavorites = async () => {
  if (memberId.value) {
    const API_URL = `${BASE_URL}/SignUps/member/${memberId.value}`;
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        evenjoin.value = data.map(event => ({
          name:event.eventName, //活動名
          id: event.collectionId, //活動id
          periodid:event.eventPeriodId,//時段id
          periodDescription:event.periodDescription//時段描述
        }));
        hasFavorites.value = evenjoin.value.length > 0;
      } else {
        console.error("無法取得報名活動", data);
      }
    } catch (error) {
      console.error("請求錯誤", error);
    }
  }
};


const toggleevenjoin = async (favorite) => {
    const confirmResult = await Swal.fire({
      title: '確認取消報名?',
      text: `確定要取消報名活動「${favorite .name}」嗎？`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    });

    if (confirmResult.isConfirmed) {
      await removeFavorite(favorite);
      Swal.fire('已取消報名', `活動「${favorite.name}」已取消報名`, 'success');
    }
};
// /api/SignUps/DeleteByApplicantAndPeriod?applicantId={applicantId}&periodId={periodId}
const removeFavorite = async (favorite) => {
  const API_URL = `${BASE_URL}/SignUps/DeleteByApplicantAndPeriod/?applicantId=${favorite.id}&periodId=${favorite.eventPeriodId}`;
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      evenjoin.value = evenjoin.value.filter(f => f.isFavorite); // 更新列表
      hasFavorites.value = evenjoin.value.length > 0;
    } else {
      console.error("無法取消報名活動");
    }
  } catch (error) {
    console.error("請求錯誤", error);
  }
};

onMounted(() => {
  loadMemberId();
  fetchFavorites();
});
</script>

<template>
<div class="favorites-container">
    <h2>我參加的活動</h2>

    <!-- 判斷是否有收藏活動 -->
    <div v-if="hasFavorites">
      <ul class="favorites-list">
        <li v-for="(favorite, index) in evenjoin" :key="favorite.id" class="favorite-item">
          {{ favorite.name }}
          <span
            class="favorite-icon"
            :class="{ active: favorite.isFavorite }"
            @click="toggleevenjoin(favorite)"
          >
            刪除
          </span>
        </li>
      </ul>
    </div>
    
    <!-- 沒有收藏活動時顯示提示 -->
    <div v-else class="no-favorites">
      暫無參加活動
    </div>
  </div>
</template>
<style scoped>
.favorites-container {
  width: 100%;
  max-width: 1000px;
  margin: 0px 20px 20px 0px;
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
  list-style: none;
  padding: 0;
  margin: 0;
}

.favorite-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  margin: 10px 0;
  padding: 12px 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  font-size: 1.1em;
  font-weight: bold;
  color: #ffffff;
  transition: transform 0.2s, box-shadow 0.3s;
  cursor: pointer;
}

.favorite-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.favorite-icon {
  font-size: 1.5em;
  color: #fff;
  transition: color 0.3s;
  cursor: pointer;
}

.favorite-icon.active {
  color: #e74c3c; /* 收藏時顯示紅色 */
}

.favorite-icon:not(.active) {
  color: #ccc; /* 未收藏時顯示灰色 */
}
</style>