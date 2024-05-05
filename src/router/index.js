import { createRouter, createWebHistory } from 'vue-router';
// Import the components
import LoginPage from "../components/page/LoginPage.vue";
import Home from "../components/page/HomePage.vue";
import EmployeeDashboard from "../components/page/EmployeeDashboard.vue";
import CustomerAccounts from "../components/page/CustomerAccounts.vue";
import AllTransactions from "../components/page/AllTransactions.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/dashboard/employee',
      name: 'employeeDashboard',
      component: EmployeeDashboard
    },
    {
      path: '/accounts/customers',
      name: 'customerAccounts',
      component: CustomerAccounts
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: AllTransactions
    },

  ]
});

export default router;
