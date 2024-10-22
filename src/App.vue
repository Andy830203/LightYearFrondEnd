<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div class="wrapper">
    <header>
      <NavBar></NavBar>
    </header>
    <main class="content">
      <!-- 主要內容 -->
      <RouterView />
    </main>
    <FooterBar></FooterBar>
  </div>
  <div >
    
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: space-around;
  }
  /* :global(body) {
    display: flex;
    place-items: center;
  }
  :global(#app) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  } */
</style>
