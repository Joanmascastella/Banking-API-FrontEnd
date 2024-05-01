import { createRouter, createWebHistory } from 'vue-router'
//import HomePage from '../components/page/HomePage.vue'
import LoginPage from "../components/page/LoginPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomePage 
    //   or use 
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import('../components/page/HomePage.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router
