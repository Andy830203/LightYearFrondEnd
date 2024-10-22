<script setup>
//@/hb1_t_js/GM_c.js，地圖專用js
import { map_init } from '@/hb1_t_js/GM_c.js';
//@/hb1_t_js/FT_c.js，footer專用js
import { FT_set } from '@/hb1_t_js/FT_c.js';

map_init();//地圖初始化
FT_set()//設置footer是否顯示
</script>

<template>
    <div id="map"></div>

</template>

<style>
    #map {
        height: 500px;
        width: 100%;
    }
</style>