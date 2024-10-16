<script setup>

</script>

<template>
    <!-- Navbar start -->
    <div class="container-fluid border-bottom bg-light wow fadeIn" data-wow-delay="0.1s">
        <div class="container topbar bg-primary d-none d-lg-block py-2" style="border-radius: 0 40px">
            <div class="d-flex justify-content-between">
                <div class="top-info ps-2">
                    <!-- <small class="me-3"><i class="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#"
                            class="text-white">123 Street, New York</a></small>
                    <small class="me-3"><i class="fas fa-envelope me-2 text-secondary"></i><a href="#"
                            class="text-white">Email@Example.com</a></small> -->
                </div>
                <div class="top-link pe-2">
                    <a href="" class="btn btn-light btn-sm-square rounded-circle"><i
                            class="fab fa-facebook-f text-secondary"></i></a>
                    <a href="" class="btn btn-light btn-sm-square rounded-circle"><i
                            class="fab fa-twitter text-secondary"></i></a>
                    <a href="" class="btn btn-light btn-sm-square rounded-circle"><i
                            class="fab fa-instagram text-secondary"></i></a>
                    <a href="" class="btn btn-light btn-sm-square rounded-circle me-0"><i
                            class="fab fa-linkedin-in text-secondary"></i></a>
                </div>
            </div>
        </div>
        <div class="container px-0">
            <nav class="navbar navbar-light navbar-expand-xl py-3">
                <a href="index.html" class="navbar-brand">
                    <h1 class="text-primary display-6">食益<span class="text-secondary">忘了</span></h1>
                </a>
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <div class="navbar-nav mx-auto">
                        <router-link to="/" class="nav-link" style="color: black;">首頁</router-link>
                        <div class="nav-item dropdown">
                            <router-link to="/shopping" class="nav-link dropdown-toggle" style="color: black;"
                                data-bs-toggle="dropdown">購物車</router-link>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <router-link to="/shopping" class="dropdown-item"
                                    style="color: black;">購物車</router-link>
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <router-link to="/login" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                style="color: black;">會員</router-link>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <router-link to="/login" class="dropdown-item" style="color: black;">會員</router-link>
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <router-link to="/event" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                style="color: black;">活動</router-link>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <router-link to="/event" class="dropdown-item" style="color: black;">活動</router-link>
                            </div>
                        </div>
                        <div class="nav-item dropdown">
                            <router-link to="/location" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                style="color: black;">地圖</router-link>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <router-link to="/location" class="dropdown-item" style="color: black;">地圖</router-link>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="d-flex me-4">
                            <div id="phone-tada" class="d-flex align-items-center justify-content-center">
                                <a href="" class="position-relative wow tada" data-wow-delay=".9s" >
                                    <i class="fa fa-phone-alt text-primary fa-2x me-4"></i>
                                    <div class="position-absolute" style="top: -7px; left: 20px;">
                                        <span><i class="fa fa-comment-dots text-secondary"></i></span>
                                    </div>
                                </a>
                            </div>
                            <div class="d-flex flex-column pe-3 border-end border-primary">
                                <span class="text-primary">Have any questions?</span>
                                <a href="#"><span class="text-secondary">Free: + 0123 456 7890</span></a>
                            </div>
                        </div> -->
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn-search btn btn-primary btn-md-square rounded-circle" data-bs-toggle="modal"
                            data-bs-target="#searchModal"><i class="fas fa-search text-white"></i></button>
                    </form>
                </div>
            </nav>
        </div>
    </div>
    <!-- Navbar End -->
</template>

<style lang="css" scoped>
.btn{
    display: flex;
}
</style>