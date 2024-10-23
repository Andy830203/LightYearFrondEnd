<script setup>
/* 縮放st */
import { m_e_move,m_e_leave,navClass,m_e_onBeforeUnmount} from '@/hb1_t_js/NAV_c'//nav樣式更改
import { state } from '@/global_value'; // 從外部文件引入狀態
m_e_onBeforeUnmount()
/* 縮放end */
</script>

<template>
<!-- 原有的 -->
    <!-- <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow"> -->
    <!-- 更改的 -->
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow" id="navbar_e1" @mouseenter="m_e_move"  @mouseleave="m_e_leave" :class="navClass">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="/">食益光年</a> -->
            <!-- logo圖路徑之後用ref路徑指向一個變數，下面佔位子的導覽列也是 -->
            <div class="navbar-brand" style="position: absolute; z-index: 999; top: 10%;">
                <a class="navbar-brand" href="/"><img src="../assets/images/members/logo去背22.png"></a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
            <div class="collapse navbar-collapse mx-auto">
                <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-text-top"> -->
                <ul class="navbar-nav mb-2 mb-lg-0 justify-content-center mx-auto">
                    <li class="nav-item">
                            <router-link to="/location" class="nav-link">
                                <i class="bi bi-globe-americas"></i>
                                <span>地圖</span>
                            </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            下拉選單預留
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">下拉1</a>
                            </li>
                            <li><a class="dropdown-item" href="">下拉2</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./faq.html">常見問題</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./form.html">聯絡我們</a>
                    </li>
                    <!--會員-->
                    <li class="nav-item dropdown">
                         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i style="color: black;" class="bi bi-person"></i> 會員專區
                         </a>
                     <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                          <a class="dropdown-item" href="/MemberInFo">
                         <i class="bi bi-info-circle"></i> 會員資訊
                         </a>
                    </li>
                    <li>
                          <a class="dropdown-item" href="/MemberSettingView">
                            <i class="fa-solid fa-gear"></i> 設定
                         </a>
                    </li>
                    <li>
                          <a class="dropdown-item" href="/MemberFavorite">
                            <i class="fa-solid fa-heart"></i> 我的收藏
                         </a>
                    </li>
                     </ul>                    
                    </li>
                   
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
                <div class="d-flex"><!--會員-->                     
                            <RouterLink to="/login" class="me-1 text-black">
                                <i class="bi bi-person-fill fs-3 text-primary"></i>
                            </RouterLink>
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                            aria-controls="offcanvasExample" class="me-1 text-black"><i
                                class="bi bi-cart-fill fs-3 text-primary"></i></a>
                    </div>
            </div>
        </div>
    </nav>
    <!-- header end -->


</template>



<style lang="css" scoped>
/* 大小變換 */
.large-nav {
    transform: translateX(0%) scale(1);
    transition:transform 0.8s ease-in-out;
}
.small-nav {
    /* scale: 1; */
    top:0%; 
    left:0%;
    transform: translateY(-23%) scale(0.4);
    transition:transform 0.8s ease-in-out;
}
/* 縮放end */
</style>