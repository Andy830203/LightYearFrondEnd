import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ShopIndexView from '@/views/shop/ShopIndexView.vue'
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
      //http://localhost:5173/shop
      path: '/shop',
      component: ShopIndexView,
      name: 'shop',    
    }
  ]
})

export default router
