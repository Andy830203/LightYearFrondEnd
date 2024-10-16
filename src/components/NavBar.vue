<script setup>
    
</script>

<template>
    
    <!-- header start-->
    <header>
        <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow">
            <div class="container-fluid">
                <a class="navbar-brand" href="./index.html">食益光年</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li> -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                關於狸小路
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="./about.html">關於狸小路</a></li>
                                <li><a class="dropdown-item" href="">媒體報導</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                全部商品
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="./productListAll.html">全部商品</a>
                                </li>
                                <li><a class="dropdown-item" href="./productListAll.html">蛋糕系列</a>
                                </li>
                                <li><a class="dropdown-item" href="./productListAll.html">Mini蛋糕系列</a>
                                </li>
                                <li><a class="dropdown-item" href="./productListAll.html">千層系列</a>
                                </li>
                                <li><a class="dropdown-item" href="./productListAll.html">宅配千層系列</a>
                                </li>
                                <li><a class="dropdown-item" href="./productListAll.html">初雪蛋糕系列</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./faq.html">常見問題</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./form.html">聯絡我們</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                門市據點
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="./shops.html">門市據點</a>
                                </li>
                                <li><a class="dropdown-item" href="">快閃資訊</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">

                        </ul>
                        <div class="d-flex">
                            <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#exampleModal"                               
                            class="me-1 text-black">
                            <router-link to="/login" class="me-1 text-black">
                            <i class="bi bi-person-fill fs-3 text-primary"></i>
                            </router-link>
                        </a> <!--會員-->
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