<script setup>
//@/hb1_t_js/GM_c.js，地圖專用js
import { map_init, mapHeight } from '@/hb1_t_js/GM_c.js';
//@/hb1_t_js/FT_c.js，footer專用js
import { FT_set } from '@/hb1_t_js/FT_c.js';
import '@/hb1_t_js/sidebar.css';
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
</template>
<style>
    #map {
        height: v-bind(mapHeight); /* 綁定動態的 mapHeight */
    }
</style>