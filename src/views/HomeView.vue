<script setup>
import CarouselComponent from '@/components/event/CarouselComponent.vue';
import PlacesComponent from '@/components/event/PlacesComponent.vue';
import '@/components/member/Count.css';
import { memberCount,count_init } from '@/components/member/Count';
count_init();


</script>

<template>
<div style="text-align: center;">
    <div id="id_1">
        <h1>主題介紹</h1>
    </div>
    <div id="id_2">
        <h1>輪播</h1>
    </div>
    <div id="id_3">
        <h1>使用說明</h1>
    </div>
    <div class="container">
        <h1>取得的成果</h1>
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
</div>
</template>

<style lang="css" scoped>

div{
    color: black;
}
#id_1{
    background-color: aqua;
    height: 500px;
    }
#id_2{
    background-color: red;
    height: 800px;
    }
#id_3{
    background-color: rgb(0, 255, 136);
    height: 300px;
    }
h1{
top: 50%;
}
</style>