<script setup>
import { map_init } from '@/hb1_t_js/map_api_js_c_for_index.js';
map_init();//地圖初始化
</script>

<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<style scoped>
#map {
    height: 250px;
    width: 250px;
}
</style>