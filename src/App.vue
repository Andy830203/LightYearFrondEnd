<script setup>
import { RouterLink, RouterView,} from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
import { provide } from 'vue';
import { state } from '@/global_value';  // 從外部文件引入狀態

// 提供狀態給子組件
provide('isDisabled', state);
</script>

<template>
  <div id="layout">
    <NavBar></NavBar>
  </div>
  <div>
    <RouterView />
  </div>
  <div id="layout2" v-if="!state.isDisabled">
    <FooterBar></FooterBar>
  </div>
</template>

<style scoped>
#layout {
  width: 100%;
}
</style>
