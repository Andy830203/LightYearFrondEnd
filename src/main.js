import './assets/main.css'
import './assets/style.css'

// 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入 Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

import '@fortawesome/fontawesome-free/css/all.css';

import 'jquery/dist/jquery.min.js';

import WOW from 'wowjs';
new WOW.WOW().init();


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
