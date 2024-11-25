<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue';
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import RecommendedProducts from "@/components/RecommendedProducts.vue";
import '@/components/member/Count.css';
import { memberCount, count_init, productsCount, eventsCount } from '@/components/member/Count';
count_init();
</script>

<template>
  <div class="centered-container">
    <div id="id_1" class="card flex-container">
      <div class="image-container">
        <img src="/src/assets/images/members/內文手transparent.png" alt="公益平台介紹圖片" class="intro-image" style="background-color: #FFE6FF;">
      </div>
      <div class="text-content">
        <!-- <h1>主題介紹</h1> -->
        <p style="font-size: 30px;">
          整合公益資訊，促進活動參與
          <br><br>
          發起或加入活動，快速聚集夥伴
          <br><br>
          提供愛心餐點，地圖查找方便
          <br><br>
          打造透明平台，推動互助社區
        </p>
      </div>
    </div>
  </div>
  <div class="mx-auto mt-5" style="width: 1500px;">
    <recommended-products></recommended-products>
  </div>
  <div class="centered-container">
    <div id="id_3" class="col-lg-12">
      <h1>使用說明</h1>
      <!-- 使用書本樣式的卡片區域 -->
      <div class="row new-card-section">
        <div class="col-3 g-3">
          <p style="margin-left: -30%;">我想要註冊</p>
          <div class="book">
            <div class="cover">
              <img src="/src/assets/images/members/登入.png" alt="">
              <!-- <p>我想要註冊</p> -->
            </div>
            <div class="inner-content">

                <button class="action-button" data-bs-toggle="modal" data-bs-target="#exampleModal">前往註冊</button>
            </div>
          </div>
        </div>
        <div class="col-3 g-3">
          <p style="margin-left: -30%;">我想參加活動</p>
          <div class="book">
            <div class="cover">
              <img src="/src/assets/images/members/活動.png" alt="">
            </div>
            <div class="inner-content">
              <router-link to="/Eventlist">
          <button class="action-button">前往活動</button>
        </router-link>
            </div>
          </div>
        </div>
        <div class="col-3 g-3">
          <p style="margin-left: -30%;">我想買商品</p>
          <div class="book">
            <div class="cover">
              <img src="/src/assets/images/members/商品.png" alt="">
            </div>
            <div class="inner-content">
              <router-link to="/shop">
          <button class="action-button">前往商品</button>
        </router-link>
            </div>
          </div>
        </div>
        <div class="col-3 g-3">
          <p style="margin-left: -30%;">我想看地圖</p>
          <div class="book">
            <div class="cover">
              <img src="/src/assets/images/members/地圖.png" alt="">            </div>
            <div class="inner-content">
              <router-link to="/location">
          <button class="action-button">前往地圖</button>
        </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <h1></h1>
    <div class="row">
      <div class="stats-section col-3">
        <h2>目前總註冊人數</h2>
        <div class="stats-container">
          <div class="stat-card" v-if="memberCount !== null">
            <h2>{{ memberCount }}+</h2>
          </div>
        </div>
      </div>
      <div class="stats-section col-3">
        <h2>愛心代用餐總數</h2>
        <div class="stats-container">
          <div class="stat-card" v-if="memberCount !== null">
            <h2>{{ memberCount }}+</h2>
          </div>
        </div>
      </div>
      <div class="stats-section col-3">
        <h2>活動總數</h2>
        <div class="stats-container">
          <div class="stat-card" v-if="eventsCount !== null">
            <h2>{{ eventsCount }}+</h2>
          </div>
        </div>
      </div>
      <div class="stats-section col-3">
        <h2>愛心商品總數</h2>
        <div class="stats-container">
          <div class="stat-card" v-if="productsCount !== null">
            <h2>{{ productsCount }}+</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* 主容器設定，讓內容置中排列 */
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平置中 */
  padding: -40px;
}

/* 全部 div 的字體顏色設置 */
div {
  color: black;
}

/* 卡片容器設定 */
.flex-container {
  display: flex;
  gap: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 1200px;
  width: 90%;
  align-items: center; /* 垂直置中圖片和文字 */
}

/* 圖片樣式設定 */
.intro-image {
  width: 200px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 文字內容區塊設定 */
.text-content {
  flex: 1;
  text-align: left;
}

/* 標題樣式 */
h1 {
  font-size: 28px;
  color: #333333;
  margin-bottom: 20px;
  font-style: italic;
}

/* 文字段落樣式 */
p {
  font-size: 18px;
  color: #555555;
  line-height: 1.6;
}

/* id 為 id_1 的區塊特定樣式 */
#id_1 {
  font-size: 25px;
  padding: 20px;
  text-align: center;
  height: 30vw; /* 設定自動高度，讓內容撐開 */
}

/* id 為 id_3 的區塊特定樣式 */
#id_3 {
  text-align: center;
  margin-top: 20px;
  width: 50vw;
}

/* 圖片容器樣式，確保圖片和標題並排 */
.image-container {
  flex-shrink: 0;
}

/* 卡片樣式，參照 Uiverse.io by eslam-hany */
.book {
  position: relative;
  border-radius: 10px;
  width: 220px;
  height: 300px;
  background-color: #f7d46c;
  /* box-shadow: 1px 1px 12px #000; */
  transform: preserve-3d;
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}

.cover {
  top: 0;
  position: absolute;
  background: linear-gradient(90deg, 	#ffbf73, #f2a633);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;
  transform-origin: 0;
  /* box-shadow: 1px 1px 12px #000; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.book:hover .cover {
  transition: all 0.5s;
  transform: rotateY(-80deg);
}

/* 卡片區域樣式 */
.new-card-section {
  display: flex;
  justify-content: center; /* 居中卡片 */
  margin-top: 20px;
}

/* 書本內文字樣式 */
p {
  font-size: 20px;
  font-weight: bolder;
}
/* 按鈕樣式 */
.action-button {
  padding: 10px 20px;
  font-size: 16px;
  color: black;
  background-color: #ffbf73; /* 主按鈕顏色 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.4); /* 輕微陰影 */
}

/* 按鈕懸停效果 */
.action-button:hover {
  background-color: #ffbf73; /* 懸停顏色 */
  box-shadow: 0 6px 10px rgba(0, 123, 255, 0.6); /* 增強陰影 */
  transform: translateY(-3px); /* 微微上移 */
}

/* 按鈕按下效果 */
.action-button:active {
  background-color: #004494;
  box-shadow: 0 3px 5px rgba(0, 123, 255, 0.4);
  transform: translateY(1px); /* 向下微移 */
}

.cover img {
  border-radius: 10px;
  width: 100%; /* 圖片寬度匹配 div */
  height: 100%; /* 圖片高度匹配 div */
  object-fit: cover; /* 圖片填滿，可能會裁切 */
  display: block; /* 避免圖片下方的空白間距 */
}
</style>
