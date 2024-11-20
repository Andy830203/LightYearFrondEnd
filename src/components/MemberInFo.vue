<template>
  <!-- <div>
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_PAGE_URL" target="_blank"><i class="fa-brands fa-facebook"></i></a>
  </div> -->
  <div class="page-container">
    <div class="content-container">
      <div class="member-info">
        <img :src="IMG_URL + member.photoUrl " alt="Member Photo" class="member-photo">
        <h2>{{ member.name }}</h2>
        <div class="info-item">
          <strong>暱稱:</strong> {{ member.nickname }}
        </div>
        <div class="info-item">
          <strong>生日:</strong> {{ member.birthday }}
        </div>
        <div class="info-item">
          <strong>Email:</strong> {{ member.email }}
        </div>
        <!-- <div class="info-item">
          <strong>點數:</strong> {{ member.point }}
        </div> -->
        <!-- <div class="info-item">
          <strong>等級:</strong> {{ member.level }}
        </div> -->
        <!-- <div class="info-item">
          <strong>經驗值:</strong>
          <div class="exp-container">
            <span class="exp-text">{{ member.exp }}%</span>
            <div class="progress-bar">
              <div class="progress-bar-fill" :style="{ width: member.exp + '%' }"></div>
            </div>
          </div>
        </div> -->
        <button @click="editMemberInfo" class="edit-button">修改會員資訊</button>
      </div>      
      <div class="favorite-container">
        <MemberFavorite></MemberFavorite>
        <MemberJoin></MemberJoin>
      </div>

      <div>
        <ShareButton></ShareButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import MemberFavorite from '@/components/MemberFavorite.vue';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ShareButton from './member/ShareButton.vue';
import MemberJoin from '@/components/Member_join_e.vue';

const router = useRouter();
const BASE_URL = import.meta.env.VITE_API_BASEURL;
const IMG_URL = import.meta.env.VITE_API_IMGURL;

const member = reactive({
  name: '',
  nickname: '',
  email: '',
  birthday: '',
  level: 0,
  exp: 0,
  point: 0,
  photoUrl: ''
});

async function MemberInFo() {
  const memberData = JSON.parse(localStorage.getItem('member'));
  const userID = memberData ? memberData.id : null;

  if (!userID) {
    console.error("無法取得使用者 ID");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/Members/InFo/${userID}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error('查詢失敗，請重新載入');
    }

    const result = await response.json();
    member.name = result.membername;
    member.nickname = result.membernickname;
    member.email = result.memberemail;
    member.birthday = result.memberbirth;
    member.exp = result.memberexp;
    member.point = result.memberpoint;
    member.photoUrl = result.memberimg;
    console.log(result);
  } catch (error) {
    console.error("登入發生錯誤", error);
  }
}

function editMemberInfo() {
  router.push({ name: 'MemberSettingView' });
}

onMounted(() => {
  MemberInFo();
  console.log("完整圖片路徑:", IMG_URL + member.photoUrl);
});
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.member-info {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Arial', sans-serif;
  align-self: flex-start;
  margin-right: 20px;
}
.favorite-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.member-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 2px solid #ddd;
}

h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.info-item {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
  text-align: left;
}

strong {
  color: #222;
}

.exp-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.exp-text {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}

.progress-bar {
  background-color: #e0e0e0;
  border-radius: 5px;
  width: 100%;
  height: 20px;
  overflow: hidden;
}

.progress-bar-fill {
  background-color: #76c7c0;
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}

.edit-button {
  background-color: #76c7c0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #5ba9a3;
}
</style>
