<script setup>
    import '@/hb1_t_js/sidebar.css';//側邊攔樣式
    import { tableData,init_sidebar } from '@/hb1_t_js/sidebar.js'
    init_sidebar();
</script>
<template>
  <div class="container d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav-data"
       style="width: 20vw;position: absolute; right: 2vw; top: 5vw; border-radius: 20px;">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">活動一覽</span>
    </div>
    <hr>
    <table id="side_dt" class="display">
      <thead>
        <tr>
          <th>活動名稱</th>
          <th>位置</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in tableData" :key="index">
          <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">{{ entry.name }}</td>
          <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">{{ entry.position }}</td>
        </tr>
      </tbody>
    </table>

    <div class="offcanvas custom-offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">活動介紹</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div id="offcanvasContent">
          活動內文
        </div>
        <div class="button-container">
          <button>我要參加</button>
        </div>
      </div>
    </div>
  </div>
</template>


