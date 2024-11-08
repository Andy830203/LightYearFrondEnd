import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Hb1 from '@/views/hb1.vue'
import { state } from '@/global_value.js';  // 從 state.js 
import StartView from '@/views/event/StartView.vue'
import SignUpView from '@/views/event/SignUpView.vue'
import TrackView from '@/views/event/TrackView.vue'
import EventView from '@/views/event/EventView.vue'

import ShopIndexView from '@/views/shop/ShopIndexView.vue'
import ItemView from '@/views/shop/ItemView.vue';
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import MemberInFo from '@/components/MemberInFo.vue'
import MemberSettingView from '@/views/MemberSettingView.vue'
import MemberFavorite from '@/components/MemberFavorite.vue'
import MemberInFoView from '@/views/MemberInFoView.vue';
import EventComment from '@/components/EventComment.vue';
import ShareButton from '@/components/member/ShareButton.vue';
import ForceChangePassword from '@/components/ForceChangePassword.vue';
import OrderHistory from '@/components/OrderHistory.vue';
import Cart from '@/views/Cart.vue';
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
      //http://localhost:5173/itemDetails/5
      path: '/itemDetails/:id',
      component: ItemView,
      name: 'itemDetails',
      props: true,  // 允許使用路由參數作為組件的 props
    },
    {
      //http://localhost:5173/cart/5
      path: '/cart/:id',
      component: Cart,
      name: 'cart',
      props: true,  // 允許使用路由參數作為組件的 props
    },
    {
      // http://localhost:5173/start
      path: '/start',
      component: StartView,
      name: 'eventStart'
    },
    {
      // http://localhost:5173/signup/5
      path: '/signup/:id',
      component: SignUpView,
      name: 'eventSignUpWithId',
      props: true
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
    },
    {
      path: '/MemberInFoView',
      component: MemberInFoView,
      name: 'MemberInFoView'
    },
    {
      path: '/ShareButton',
      component: ShareButton,
      name: 'ShareButton'
    },
    {
      path: '/ForceChangePassword',
      component: ForceChangePassword,
      name: 'ForceChangePassword'
    },
    {
      path: '/OrderHistory',
      component: OrderHistory,
      name: 'OrderHistory'
    },

    {
      path: '/EventComment',
      component: EventComment,
      name: 'EventComment'
    }

  ]
})
// 使用全局afterEach守衛，路由切換後恢復組件的狀態
router.afterEach((to, from) => {
  if (to.path !== '/location') {
    state.isDisabled = false;
  }
});
export default router
