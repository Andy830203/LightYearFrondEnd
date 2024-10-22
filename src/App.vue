<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
import { provide } from 'vue';
import { state } from '@/global_value'; // 從外部文件引入狀態
//provide('isDisabled', state);// 提供狀態給子組件//
</script>
<template>
  <div class="wrapper">
    <header>
      <NavBar></NavBar>
    </header>
    <main class="content" style="height: 100%;width: 100%;">
      <!-- 主要內容 -->
      <RouterLink :to="{name:'shop'}">商店</RouterLink>
      <RouterView />
    </main>
    <FooterBar v-if="!state.isDisabled"></FooterBar>
  </div>
  <div>

  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-around;
  }
  html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<!-- <style scoped></style> -->
