import { createRouter, createWebHistory } from 'vue-router';
// Import the components
import LoginPage from "../components/page/LoginPage.vue";
import Test from "../components/page/Test.vue";
import EmployeeDashboard from "../components/page/EmployeeDashboard.vue";
import CustomerAccounts from "../components/page/CustomerAccounts.vue";
import AllTransactions from "../components/page/AllTransactions.vue";




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
