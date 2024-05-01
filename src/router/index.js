import { createRouter, createWebHistory } from 'vue-router';
// Import the components
import LoginPage from "../components/page/LoginPage.vue";
import Test from "../components/page/Test.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/dashboard', 
      name: 'dashboard',
      component: Test
    }
  ]
});

export default router;
