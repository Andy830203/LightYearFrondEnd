<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
import { computed, provide } from 'vue';
import { state } from '@/global_value'; // 從外部文件引入狀態
const RouterViewclass = computed(() => {// 動態綁定 CSS class
    return state.isDisabled === false ? 'other' : 'map_r';
});
</script>
<template>
  <div class="wrapper">
    <header>
      <NavBar></NavBar>
    </header>
    <main class="content" :class="RouterViewclass">
      <!-- 主要內容 -->
      <!-- <RouterLink :to="{name:'shop'}">商店</RouterLink> -->
      <RouterView/><!-- mt-5下拉主頁面內容 :class="RouterViewclass"-->
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
.other{
  margin-top: 7%;
}
.map_r{
  margin-top: 0%;
  height: 100%;
}
</style>
