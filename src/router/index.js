import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import MemberInFo from '@/components/MemberInFo.vue'
import MemberSettingView from '@/views/MemberSettingView.vue'
import MemberFavorite from '@/components/MemberFavorite.vue'


const routes = [
  {
    //http://localhost:5173/
    path: '/',
    component: HomeView,
    name: 'home',
    alias: '/index'    //http://localhost:5173/index

  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/register',
    component: Register,
    name: 'register'
  },
  {
    path: '/forgotpassword',
    component: ForgotPassword,
    name: 'forgotpassword'
  },
  {
    path: '/MemberInFo',
    component: MemberInFo,
    name: 'MemberInFo'
  },
  {
    path: '/MemberSettingView',
    component: MemberSettingView,
    name: 'MemberSettingView'
  },
  {
    path: '/MemberFavorite',
    component: MemberFavorite,
    name: 'MemberFavorite'
  }

]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
