<script setup>
/* 縮放st */
import { m_e_move, m_e_leave, navClass, m_e_onBeforeUnmount } from '@/hb1_t_js/NAV_c'//nav樣式更改
import { state } from '@/global_value'; // 從外部文件引入狀態
m_e_onBeforeUnmount()
/* 縮放end */

import { computed } from 'vue';
import { useMemberStore } from '../stores/Member';

const memberStore = useMemberStore();

// 判斷是否已登入
const isLoggedIn = computed(() => memberStore.isLoggedIn);

// 顯示會員名稱，如果未登入則為空
const memberName = computed(() => {
  return memberStore.member && memberStore.member.name ? memberStore.member.name : '';
});

// 登出功能
function logout() {
  memberStore.member = null; // 清除 Pinia 狀態
  localStorage.removeItem('member'); // 清除 localStorage 中的 member
  window.location.reload(); // 重整頁面以更新顯示
}
</script>

<template>
    <!-- 原有的 -->
    <!-- <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow"> -->
    <!-- 更改的 -->
    <!-- <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow bg-warning.bg-gradient" id="navbar_e1" @mouseenter="m_e_move"  @mouseleave="m_e_leave" :class="navClass"> -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-light shadow bg-warning bg-gradient border border-5 border-warning"
        id="navbar_e1" @mouseenter="m_e_move" @mouseleave="m_e_leave" :class="navClass">
        <div class="container-fluid">
            <!-- logo圖路徑之後用ref路徑指向一個變數，下面佔位子的導覽列也是 -->
            <div class="navbar-brand map_img" style="position: absolute; z-index: 999; top: 10%;">
                <a class="navbar-brand" href="/"><img src="../assets/images/members/logo去背22.png"></a>
            </div>
            <button class="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mx-auto" id="navbarSupportedContent">
                <ul class="navbar-nav mb-lg-0 justify-content-center mx-auto sm-mx-auto">
                    <li class="nav-item mx-3">
                        <router-link to="/map_api" class="nav-link">
                            <i class="bi bi-globe-americas"></i>
                            <span>地圖api</span>
                        </router-link>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/location" class="nav-link">
                            <i class="bi bi-globe-americas"></i>
                            <span>地圖</span>
                        </router-link>
                    </li>
                    <li class="nav-item mx-3">

                        <a class="nav-link" href="./faq.html">
                            <i class="bi bi-question-circle"></i>
                            <span>常見問題</span>
                        </a>
                    </li>
                    <li class="nav-item mx-3">
                        <a class="nav-link" href="./form.html">
                            <i class="bi bi-megaphone"></i>
                            <span>聯絡我們</span>
                        </a>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/shop" class="nav-link">
                                <i class="bi bi-shop-window"></i>
                                <span>愛心商城</span>
                        </router-link>
                    </li>
                    <!--會員-->
                    <li class="nav-item dropdown lg-mx-auto md-mx-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-person map_icon"></i> 
                        <span>會員專區</span>
                         </a>
                     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a class="dropdown-item" href="/MemberInFo">
                            <i class="bi bi-info-circle"></i> 
                            <span>會員資訊</span>
                            </a>                  
                        </li>
                        <!-- <li>
                            <a class="dropdown-item" href="/MemberSettingView">
                                <i class="fa-solid fa-gear"></i> 設定
                            </a>
                        </li> -->
                        <li>
                            <a class="dropdown-item" href="/MemberFavorite">
                            <i class="fa-solid fa-heart"></i> <span>我的收藏</span>
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="/OrderHistory">
                            <i class="fa-solid fa-clipboard-list"></i> <span>我的歷史訂單</span>  
                            </a>
                        </li>
                     </ul>                    
                    </li>   
                    <li class="nav-item dropdown lg-mx-auto md-mx-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-calendar-event"></i>
                            <span>活動</span>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'eventStart' }">發起活動</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'eventSignUp' }">報名活動</RouterLink>
                            </li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'eventTrack' }">追蹤活動</RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div id="map_nav">
                <!-- 根據登入狀態顯示會員圖示或歡迎訊息 -->
                        <div id="map_nav" class="nav-container">
                        <!-- 未登入狀態顯示登入圖示 -->
                                <RouterLink v-if="!isLoggedIn" to="/login" class="auth-icon">
                                     <i class="bi bi-person-fill" title="登入"></i>
                                </RouterLink>

                <!-- 已登入狀態顯示會員訊息與登出圖示 -->
                        <div v-else class="user-info">
                         <span class="welcome-text">歡迎 <span class="username">{{ memberName }}</span>！</span>
                        <button @click="logout" class="logout-icon" title="登出">
                        <i class="bi bi-box-arrow-right"></i>
                        </button>
                    </div>

                <!-- 購物車圖示 -->
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" class="cart-icon">
                        <i class="bi bi-cart-fill" title="購物車"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <!-- header end -->
</template>
<style lang="css" scoped>
i,
span,
#map_nav {
    color: black;
}

.nav-link:hover i,
.nav-link:hover span {
    color: grey;
}

#map_nav {
    font-size: 1.5rem;
}

/* 縮放st */
/*放大st*/
.large-nav {
    /*放大樣式*/
    border-radius: 0px;
    transform: translateX(0%) scale(1);
    transition: transform 0.8s ease-in-out, border-radius 1s ease-in-out;
}

/*放大i 標籤用*/
.large-nav i {
    opacity: 1;
    transition: font-size ease-in-out .5s;
}

/*放大span 標籤用*/
/* .large-nav span {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;               
} */
.large-nav .nav-item {
    /*放大nav-item 標籤用 */
    font-size: large;
    opacity: 1;
    transform: translateX(0%);
    transition: transform .5s ease-in-out, opacity 0.5s ease-in-out;
}
.map_img:hover{
    transform: scale(1.05);
    transition:transform .2s ease-in-out;
}
/*放大end*/
/*放大hover st*/
.large-nav .nav-item:hover,
.large-nav #map_nav i:hover {
    /*放大nav-item 標籤用 */
    transform: scale(1.5);
    transition: transform .2s ease-in-out;
}
.nav-link:hover i,.nav-link:hover span,#map_nav:hover i{
    color:aqua;
    font-weight: bold;
    transform: scale(1.5);
    transition:transform .5s ease-in-out;
}
/*放大hover end*/
/*縮小st*/
.small-nav {
    /*縮小樣式*/
    top: 0%;
    left: 0%;
    border-radius: 30px;
    transform: translateY(-23%) scale(0.6);
    transition: transform ease-in-out 1s, border-radius ease-in-out 1s;
}

.small-nav i {
    /*縮小i 標籤用*/
    opacity: 1;
    font-size: 3rem;
    transition: font-size ease-in-out .5s;
}

.small-nav span {
    /* 縮小span用 */
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.small-nav .nav-item {
    /*縮小nav-item 標籤用 */
    transform: translateX(50%);
    transition: transform .5s ease-in-out;
}

.small-nav #map_nav i {
    font-size: 3rem;
    transition: font-size .5s ease-in-out;
}

/*縮小end*/
/* 縮放end */

/*右上icon*/
.nav-container {
  display: flex;
  align-items: center;
  gap: 15px; /* 控制元素之間的間距 */
}

.auth-icon,
.cart-icon {
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px; /* 控制歡迎文字與登出圖示之間的間距 */
}

.welcome-text {
  font-size: 1rem;
}

.username {
    font-size: 1.2rem;
    font-weight: bold;
}

.logout-icon {
  background: none;
  border: none;
  cursor: pointer;
}

.logout-icon i {
  font-size: 1.2rem;
  color: 	#000000;
}

</style>