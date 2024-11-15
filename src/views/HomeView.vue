<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue';
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import '@/components/member/Count.css';
import { memberCount,count_init, productsCount, eventsCount } from '@/components/member/Count';
count_init();


</script>

<template>
<div class="centered-container">
    <div id="id_1" class="align-middle">
        <h1>主題介紹</h1>
        <p>我們的公益平台旨在解決當今公益資訊分散的問題，讓更多人能夠輕鬆參與社會公益活動。在這個平台上，不論是個人或團體，都可以輕鬆發起或參與各種活動，如社區清潔、淨灘等，從而更快地聚集有意參與的夥伴，加速活動的推展。我們致力於整合各種公益資源，並提供便利的功能，讓使用者在尋找公益資訊時更加便捷高效。
        <br>
        此外，我們在網站中特別增加了「愛心餐點」的領取與捐贈功能，讓有需求的人可以快速找到附近的愛心餐點，並讓有心人能便捷地進行捐助。透過地圖功能，使用者可以查看離自己最近的活動地點或資源，使公益參與更加直接有效。我們的目標是提供一個透明而開放的公益平台，讓所有人都能輕鬆找到志同道合的夥伴，無論是單純參與或組織活動，皆能在此找到支持。
        <br>
        我們深信，此平台的建立將使公益參與變得簡單且充滿互助精神，讓社會中的每個人都能輕鬆地成為改變的力量，共同創造和諧與溫暖的社區。</p>
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
</div>
</template>

<style lang="css" scoped>
.centered-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平置中 */
    justify-content: center; /* 垂直置中 */
}
div{
    color: black;
}
#id_1{
    width: 80%;
    font-size: 25px;
    padding: 20px;
    text-align: center; /* 保持內容左對齊 */
    height: 500px;
    }
#id_3{
    height: 300px;
    }
h1{
top: 50%;
}
</style>