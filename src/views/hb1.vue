<script setup>
//@/hb1_t_js/GM_c.js，地圖專用js
import { map_init, mapHeight } from '@/hb1_t_js/GM_c.js';
//@/hb1_t_js/FT_c.js，footer專用js
import { FT_set } from '@/hb1_t_js/FT_c.js';
import '@/hb1_t_js/sidebar.css';//側邊攔樣式
import '@/hb1_t_js/mp_load_styles.css';//loading樣式
map_init();//地圖初始化
FT_set()//設置footer是否顯示
import { ref } from 'vue';

const showDrawer = ref(false);
function toggleDrawer() {
  showDrawer.value = !showDrawer.value;
}
</script>

<template>
    <div id="map"></div>
    <div id="nav-bar" >
      <input id="nav-toggle" type="checkbox"/>
        <div id="nav-header">
          <p id="nav-title"></p>
          <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
          <hr/>
        </div>
        <div id="nav-content">
          <div class="nav-button" @click="toggleDrawer"><i class="fas fa-palette"></i><span>Your Work</span></div>
          <div id="nav-content-highlight"></div>
        </div>
      <input id="nav-footer-toggle" type="checkbox"/>
    </div>
    <!-- 左側滑出的窗格區塊 -->
    <div v-if="showDrawer" id="left-drawer" class="animate-slide-left">
      <!-- 窗格內容 -->
      <p>這裡是延伸出來的窗格內容</p>
    </div>
    <div class="cloud-overlay" id="cloudOverlay">
      <div class="cloud-container">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:20%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:30%;left: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:50%;left: 55%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:70%;left: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:80%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:20%;right: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:30%;right: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:50%;right: 55%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:70%;right: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:80%;right: 50%;">
      </div>
    </div>
</template>
<style>
    #map {
        height: v-bind(mapHeight); /* 綁定動態的 mapHeight */
    }
</style>