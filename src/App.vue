<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <header>
    <NavBar></NavBar>
    <FooterBar></FooterBar>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
