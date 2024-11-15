<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue';
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import '@/components/member/Count.css';
import { memberCount,count_init } from '@/components/member/Count';
count_init();


</script>

<template>
<div class="centered-container">
    <div id="id_1" class="card flex-container">
        <div class="image-container">
            <img src="/src/assets/images/members/內文手transparent.png" alt="公益平台介紹圖片" class="intro-image" style="background-color: #FFE6FF;">
        </div>
        <div class="text-content">
            <h1>主題介紹</h1>
            <p>
                我們的公益平台旨在整合分散的公益資訊，方便更多人參與社會公益活動。無論個人或團體，都可以輕鬆發起或參加各種活動，如社區清潔、淨灘等，加速活動推展，迅速聚集志同道合的夥伴。
                <br><br>
                此外，我們特別增加了「愛心餐點」功能，讓有需求的人快速找到附近的愛心餐點，也便於愛心人士進行捐助。透過地圖功能，使用者可查找離自己最近的活動地點，讓公益參與更直接有效。
                <br><br>
                我們的目標是打造一個透明、開放的公益平台，讓每個人都能輕鬆找到夥伴，無論參與或組織活動，皆能得到支持。我們相信，這個平台將讓公益參與變得簡單且充滿互助精神，促進社會和諧，共同創造溫暖的社區。
            </p>
        </div>
    </div>
</div>

    <div id="id_3">
        <h1>使用說明</h1>
    </div>
    <div class="container">
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
        <div class="stat-card" v-if="memberCount !== null">
          
          <h2>{{ memberCount }}+</h2>
        </div>
      </div>
    </div>
    <div class="stats-section col-3">
        <h2>愛心商品總數</h2>
      <div class="stats-container">
        <div class="stat-card" v-if="memberCount !== null">
          
          <h2>{{ memberCount }}+</h2>
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

    min-height: 100vh;
    padding: -20px;
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
    height: auto; /* 設定自動高度，讓內容撐開 */
}

/* id 為 id_3 的區塊特定樣式 */
#id_3 {
    height: 300px;
}
/* 圖片容器樣式，確保圖片和標題並排 */
.image-container {
    flex-shrink: 0;
}
</style>
