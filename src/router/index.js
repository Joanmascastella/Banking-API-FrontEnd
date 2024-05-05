import { createRouter, createWebHistory } from 'vue-router';
// Import the components
import LoginPage from "../components/page/LoginPage.vue";
import Test from "../components/page/Test.vue";
import EmployeeDashboard from "../components/page/EmployeeDashboard.vue";
import CustomerAccounts from "../components/page/CustomerAccounts.vue";
import AllTransactions from "../components/page/AllTransactions.vue";
import ATMTransactions from "../components/page/ATMTransactions.vue";
import TransactionsByCustomers from "../components/page/TransactionsByCustomers.vue";
import TransactionsByEmployees from "../components/page/TransactionsByEmployees.vue";
import OnlineTransactions from "../components/page/OnlineTransactions.vue";







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
    {
      path: '/transactions/ATM', 
      name: 'ATMTransactions',
      component: ATMTransactions
    },
    {
      path: '/transactions/byCustomers', 
      name: 'transactionsByCustomers',
      component: TransactionsByCustomers
    },
    {
      path: '/transactions/byEmployees', 
      name: 'transactionsByEmployees',
      component: TransactionsByEmployees
    },
    {
      path: '/transactions/online', 
      name: 'onlineTransactions',
      component: OnlineTransactions
    },
    
    
  ]
});

export default router;
