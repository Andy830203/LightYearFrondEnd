<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
import { provide } from 'vue';
import { state } from '@/global_value'; // 從外部文件引入狀態
provide('isDisabled', state);// 提供狀態給子組件
</script>

<template>
  <div class="wrapper">
    <NavBar></NavBar>
    <main class="content">
      <!-- 主要內容 -->
      <RouterView />
    </main>
    <FooterBar v-if="!state.isDisabled"></FooterBar>
  </div>
  <div >
    
  </div>
</template>

<style scoped>
</style>
