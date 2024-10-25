<script setup>
/* 縮放st */
import { m_e_move,m_e_leave,navClass,m_e_onBeforeUnmount } from '@/hb1_t_js/NAV_c'//nav樣式更改
import { state } from '@/global_value'; // 從外部文件引入狀態
m_e_onBeforeUnmount()
/* 縮放end */
</script>

<template>
    <!-- 主導航列 -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow" 
        id="navbar_e1" 
        @mouseenter="m_e_move"  
        @mouseleave="m_e_leave" 
        :class="navClass">
        
        <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand" href="/">
                <img src="../assets/images/members/logo圖0.png" alt="Logo">
            </a>
            
            <!-- 選單按鈕（小螢幕時） -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- 導覽列內容 -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- 地圖連結 -->
                    <li class="nav-item">
                        <router-link to="/location" class="nav-link">地圖</router-link>
                    </li>

                    <!-- 下拉選單 -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            下拉選單預留
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">下拉1</a></li>
                            <li><a class="dropdown-item" href="#">下拉2</a></li>
                        </ul>
                    </li>
                    <!-- 愛心商城連結 -->
                    <li class="nav-item">
                        <router-link to="/shop" class="nav-link">愛心商城</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/itemDetails" class="nav-link">商品內容測試</router-link>
                    </li>
                    <!-- 其他連結 -->
                    <li class="nav-item"><a class="nav-link" href="./faq.html">常見問題</a></li>
                    <li class="nav-item"><a class="nav-link" href="./form.html">聯絡我們</a></li>

                    <!-- 會員專區下拉選單 -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person" style="color: black;"></i> 會員專區
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/MemberInFo"><i class="bi bi-info-circle"></i> 會員資訊</a></li>
                            <li><a class="dropdown-item" href="/MemberSettingView"><i class="fa-solid fa-gear"></i> 設定</a></li>
                            <li><a class="dropdown-item" href="/MemberFavorite"><i class="fa-solid fa-heart"></i> 我的收藏</a></li>
                        </ul>
                    </li>

                    <!-- 活動專區 -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            活動
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><RouterLink class="dropdown-item" :to="{name: 'eventStart'}">發起活動</RouterLink></li>
                            <li><RouterLink class="dropdown-item" :to="{name: 'eventSignUp'}">報名活動</RouterLink></li>
                            <li><RouterLink class="dropdown-item" :to="{name: 'eventTrack'}">追蹤活動</RouterLink></li>
                        </ul>
                    </li>
                </ul>

                <!-- 會員與購物車按鈕 -->
                <div class="d-flex">
                    <RouterLink to="/login" class="me-1 text-black">
                        <i class="bi bi-person-fill fs-3 text-primary"></i>
                    </RouterLink>
                    <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" class="me-1 text-black">
                        <i class="bi bi-cart-fill fs-3 text-primary"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- 備用導航列 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="!state.isDisabled">
        <div class="container-fluid">
            <a class="navbar-brand" href="/"><img src="../assets/images/members/logo圖0.png" alt="Logo"></a>
            <div class="navbar-brand">.</div>
        </div>
    </nav>
</template>


<style lang="css" scoped>
/* 縮放st */
/* #navbar_e1{
    scale: 1;
    position: relative;
} */
/* 大小變換 */
.large-nav {
    transform: translateX(0%) scale(1);
    transition:transform 0.8s ease-in-out;
}
.small-nav {
    /* scale: 1; */
    top:4%; 
    left:0%;
    transform: translateY(-100%) scale(0.4);
    transition:transform 0.8s ease-in-out;
}
/* 縮放end */
</style>