import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'

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
      path: '/shopping',
      component: Wj1
    },
    {
      path: '/login',
      component: Xp1
    },
    {
      path: '/event',
      component: Yt1
    },
    {
      path: '/location',
      component: Hb1
    },
  ]
})

export default router
