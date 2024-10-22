// import './assets/main.css'

// import './assets/style.css'

import './assets/IndexStyle.css';

import './assets/product.css';

// 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// 引入 Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/fontawesome-free/css/all.css';

import 'jquery/dist/jquery.min.js';

import 'animate.css/animate.min.css';
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox.min.js';
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel';
// import WOW from 'wowjs';
// new WOW.WOW().init();


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
