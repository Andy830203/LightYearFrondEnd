<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div id="layout">
    <NavBar></NavBar>
  </div>
  <div>
    <RouterView />
  </div>
  <div id="layout">
    
    <FooterBar></FooterBar>
  </div>
</template>

<style scoped>
  #layout {
  width: 100%;
  }
</style>
