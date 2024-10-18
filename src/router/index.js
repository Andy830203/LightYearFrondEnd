import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import StartView from '@/views/event/StartView.vue'
import SignUpView from '@/views/event/SignUpView.vue'
import TrackView from '@/views/event/TrackView.vue'
import EventView from '@/views/event/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //http://localhost:5173/
      path: '/',
      component: HomeView,
      name: 'home',
      //http://localhost:5173/index
      alias: '/index'
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
  ]
})

export default router
