<script>
    import '@/hb1_t_js/sidebar.css'; // 側邊攔樣式
    import useDataTable from '@/hb1_t_js/sidebar_zoom12.js';
    export default {
    name: 'DynamicDataTable',   
    setup() {
        useDataTable();
    }
};
</script>

<template>
   <div class="container d-flex flex-column flex-shrink-0 p-3 text-white bg-dark nav-data"
       style="width: 20vw;position: absolute; right: 2vw; top: 5vw; border-radius: 20px;background-color: rgb(255, 193, 7) !important;color: black !important;">
    <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" style="color: black !important
    ;">
      <span class="fs-4">區域活動數量總覽</span>
    </div>
    <hr>
    <div>
    <table id="dynamicTable_z12" class="display" style="width:100%">
      <thead>
        <tr>
          <th>區</th>
          <th>活動數量</th>
        </tr>
      </thead>
    </table>
  </div>
    <!-- <div class="offcanvas custom-offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" data-bs-backdrop="false">
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
    </div> -->
  </div>
</template>