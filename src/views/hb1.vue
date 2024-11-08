<script setup>
//@/hb1_t_js/GM_c.js，地圖專用js
import { map_init, mapHeight } from '@/hb1_t_js/GM_c.js';
import ft_gm from  '@/hb1_t_js/footbar.vue';//icon專用footer
import { FT_set } from '@/hb1_t_js/FT_c.js';//@/hb1_t_js/FT_c.js，APP.vue footer專用js
import sidebar_gm from '@/hb1_t_js/sidebar.vue'//sidebar組件
import '@/hb1_t_js/mp_load_styles.css';//loading動畫
//sidebar
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
    <sidebar_gm></sidebar_gm>
    <div class="cloud-overlay" id="cloudOverlay">
      <div class="cloud-container">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:0%;left: 55%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:5%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:15%;left: 55%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:25%;left: 60%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:30%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:50%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向左衝去背_t1.png" alt="Cloud Left" class="cloud cloud-left" style="top:70%;left: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:0%;right: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:5%;right: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:15%;right: 55%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:25%;right: 60%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:30%;right: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:50%;right: 50%;">
        <img src="@/hb1_t_js/map_load_img/向右衝去背_t1.png" alt="Cloud Right" class="cloud cloud-right" style="top:70%;right: 50%;">

      </div>
    </div>
  <ft_gm></ft_gm>
</template>
<style>
    #map {
        height: v-bind(mapHeight);/*js讀目前視窗高度，使用100vw，gm沒辦法正常顯示，似乎只吃px?*/
    }
</style>