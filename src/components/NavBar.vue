<script setup>
/* 縮放st */
import { m_e_move,m_e_leave,navClass,m_e_onBeforeUnmount } from '@/hb1_t_js/NAV_c'
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
            <a class="navbar-brand" href="/">食益光年</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/location" class="nav-link">地圖</router-link>
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
                </ul>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

                    </ul>
                    <div class="d-flex">
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            class="me-1 text-black"><i class="bi bi-person-fill fs-3 text-primary"></i></a>
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
                            aria-controls="offcanvasExample" class="me-1 text-black"><i
                                class="bi bi-cart-fill fs-3 text-primary"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="!state.isDisabled">
        <div class="container-fluid">
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