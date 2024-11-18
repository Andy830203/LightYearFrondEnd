<template>
    <div>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel"  style="width: 100%;">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: index === 0 }"
          v-for="(group, index) in groupedProducts"
          :key="index"
        >
          <div class="row">
            <div class="col-md-4" v-for="product in group" :key="product.id" style="width: 33%;">
              <div class="card h-100 p-5">
                <img :src="product.image" class="card-img-top mx-auto" :alt="product.name" style="width: 200px;height: 200px;" />
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">{{ product.description }}</p>
                  <p class="text-primary fw-bold">{{ product.price }}</p>
                  <router-link :to="product.link">
                    <button class="btn btn-primary">前往購買</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
        >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>
  </template>
  
  <script setup>
//   import { Carousel } from "bootstrap";
  import { ref, onMounted } from "vue";
  
  // 商品資料
  const recommendedProducts = ref([
    {
      id: 1,
      name: "xx店愛心便當認購",
      price: "NT$ 70",
      description: "歡迎認購愛心待用餐，幫助需要的人度過難關。",
      image: "/src/assets/images/members/便當.jpg",
      link: "/itemDetails/13",
    },
    {
      id: 2,
      name: "毛衣認購",
      price: "NT$ 280",
      description: "幫助偏鄉兒童過冬。",
      image: "/src/assets/images/members/毛衣.jpg",
      link: "/itemDetails/16",
    },
    {
      id: 3,
      name: "認購禮物-筆記本",
      price: "NT$ 40",
      description: "幫助偏鄉兒童。",
      image: "/src/assets/images/members/筆記本.jpg",
      link: "/itemDetails/14",
    },
    {
      id: 4,
      name: "文具用品認購",
      price: "NT$ 200",
      description: "幫助偏鄉兒童學習用品。",
      image: "/src/assets/images/members/文具用品.jpg",
      link: "/itemDetails/15",
    },
    {
      id: 5,
      name: "愛心筆",
      price: "NT$ 100",
      description: "幫助偏鄉國小棒球隊出國比賽的經費。",
      image: "/src/assets/images/members/愛心筆.jpg",
      link: "/itemDetails/17",
    },
    {
      id: 6,
      name: "棒球手套認購",
      price: "NT$ 400",
      description: "幫助偏鄉小學棒球手套。",
      image: "/src/assets/images/members/棒球手套.jpg",
      link: "/itemDetails/17",
    },
  ]);
  
  // 將資料分組，每組3個
  const groupedProducts = ref(
    Array.from(
      { length: Math.ceil(recommendedProducts.value.length / 3) },
      (_, i) =>
        recommendedProducts.value.slice(i * 3, i * 3 + 3)
    )
  );
  
  // 啟動 Bootstrap 自動輪播
//   onMounted(() => {
//     const carouselElement = document.querySelector("#carouselExampleControls");
//     if (carouselElement) {
//       new Carousel(carouselElement, {
//         interval: 3000, // 時間間隔設定
//         ride: "carousel",
//       });
//     }
//   });
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  </style>

