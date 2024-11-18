import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'; // 引入 SweetAlert2

const BASE_URL = import.meta.env.VITE_API_BASEURL;
const memberId = ref(null);
const favorites = ref([]);
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
    const API_URL = `${BASE_URL}/Collections/${memberId.value}`;
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        favorites.value = data.map(event => ({
          name:event.eventName, 
          id: event.collectionId, 
          isFavorite: true,
        }));
        hasFavorites.value = favorites.value.length > 0;
      } else {
        console.error("無法取得收藏活動", data);
      }
    } catch (error) {
      console.error("請求錯誤", error);
    }
  }
};


const toggleFavorite = async (favorite) => {
  if (favorite.isFavorite) {
    const confirmResult = await Swal.fire({
      title: '確認取消收藏?',
      text: `確定要取消收藏活動「${favorite .name}」嗎？`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    });

    if (confirmResult.isConfirmed) {
      await removeFavorite(favorite);
      Swal.fire('已取消收藏', `活動「${favorite.name}」已取消收藏`, 'success');
    }
  }
};

const removeFavorite = async (favorite) => {
  const API_URL = `${BASE_URL}/Collections/${favorite.id}`; // 使用 CollectionId 作為取消依據
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      favorite.isFavorite = false; // 更新收藏狀態
      favorites.value = favorites.value.filter(f => f.isFavorite); // 更新列表
      hasFavorites.value = favorites.value.length > 0;
    } else {
      console.error("無法取消收藏活動");
    }
  } catch (error) {
    console.error("請求錯誤", error);
  }
};

onMounted(() => {
  loadMemberId();
  fetchFavorites();
});