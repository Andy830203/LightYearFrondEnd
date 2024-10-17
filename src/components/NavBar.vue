<script setup>
    
</script>

<template>
    
    <!-- header start-->
    <header>
        <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">食益光年</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li  class="nav-item">
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
    </header>
    <!-- header end -->
</template>

<style lang="css" scoped>

</style>