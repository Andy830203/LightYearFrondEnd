import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Hb1 from '@/views/hb1.vue'
import { state } from '@/global_value.js';  // 從 state.js 
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
        console.log("進入"+state.isDisabled);
      },
    },
  ]
})
// 使用全局afterEach守衛，路由切換後恢復組件的狀態
router.afterEach((to, from) => {
  if (to.path !== '/location') {
    // 當離開 /location 路由時恢復 A 組件的顯示
    state.isDisabled = false;
    console.log("離開後"+state.isDisabled);
  }
});
export default router
