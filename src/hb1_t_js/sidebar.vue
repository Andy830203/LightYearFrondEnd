<script setup>
    import '@/hb1_t_js/sidebar.css';//側邊攔樣式
    import { tableData,init_sidebar } from '@/hb1_t_js/sidebar.js'
    init_sidebar();
</script>
<template>
  <div class="container d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav-data"
       style="width: 20vw;position: absolute; right: 2vw; top: 5vw; border-radius: 20px;">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">導覽</span>
    </div>
    <hr>
    <table id="side_dt" class="display">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in tableData" :key="index">
          <td>{{ entry.name }}</td>
          <td>{{ entry.position }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
