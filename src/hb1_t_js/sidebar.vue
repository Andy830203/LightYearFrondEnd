<script setup>
    import '@/hb1_t_js/sidebar.css';//側邊攔樣式
</script>

<template>
    <div id="nav-bar" >
      <input id="nav-toggle" type="checkbox"/>
        <div id="nav-header">
          <p id="nav-title"></p>
          <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
          <hr/>
        </div>
        <div id="nav-content">
          <div class="nav-button" @click="toggleDrawer"><i class="bi bi-house"></i><span>1</span></div>
          <div id="nav-content-highlight"></div>
          <div class="nav-button" @click="toggleDrawer"><i class="bi bi-house"></i><span>2</span></div>
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