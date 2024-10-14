import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import Hb1 from '@/views/hb1.vue'
import Wj1 from '@/views/wj1.vue'
import Xp1 from '@/views/xp1.vue'
import Yt1 from '@/views/yt1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //http://localhost:5173/
      path: '/',
      component: HomeView,
      name: 'home',
      alias: '/index'//http://localhost:5173/index
    },
    {
      //http://localhost:5173/shopping
      path: '/shopping',
      component: Wj1
    },
    {
      //http://localhost:5173/login
      path: '/login',
      component: Xp1
    },
    {
      //http://localhost:5173/event
      path: '/event',
      component: Yt1
    },
    {
      //http://localhost:5173/location
      path: '/location',
      component: Hb1
    },
  ]
})

export default router
