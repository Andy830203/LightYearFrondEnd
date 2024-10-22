import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Hb1 from '@/views/hb1.vue'
import { state } from '@/global_value.js';  // 從 state.js 
import StartView from '@/views/event/StartView.vue'
import SignUpView from '@/views/event/SignUpView.vue'
import TrackView from '@/views/event/TrackView.vue'
import EventView from '@/views/event/EventView.vue'

import ShopIndexView from '@/views/shop/ShopIndexView.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import MemberInFo from '@/components/MemberInFo.vue'
import MemberSettingView from '@/views/MemberSettingView.vue'
import MemberFavorite from '@/components/MemberFavorite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //http://localhost:5173/
      path: '/',
      component: HomeView,
      name: 'home',
      alias: '/index'    //http://localhost:5173/index
    },
    {
      //http://localhost:5173/location
      path: '/location',
      component: Hb1,
      beforeEnter: (to, from) => {//當進入此組件時觸發
        state.isDisabled = true;
        console.log("進入" + state.isDisabled);//debug用
      },
    },
    {
      //http://localhost:5173/shop
      path: '/shop',
      component: ShopIndexView,
      name: 'shop',
    },
    {
      // http://localhost:5173/start
      path: '/start',
      component: StartView,
      name: 'eventStart'
    },
    {
      // http://localhost:5173/signup
      path: '/signup',
      component: SignUpView,
      name: 'eventSignUp'
    },
    {
      // http://localhost:5173/track
      path: '/track',
      component: TrackView,
      name: 'eventTrack'
    },
    {
      // http://localhost:5173/event + id
      path: '/event',
      component: EventView,
      name: 'event'
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
})
// 使用全局afterEach守衛，路由切換後恢復組件的狀態
router.afterEach((to, from) => {
  if (to.path !== '/location') {
    // 當離開 /location 路由時恢復 A 組件的顯示
    state.isDisabled = false;
    console.log("離開後" + state.isDisabled);
  }
});
export default router
