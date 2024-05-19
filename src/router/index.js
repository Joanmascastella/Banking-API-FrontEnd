import { createRouter, createWebHistory } from 'vue-router';
// Import the components
import LoginPage from "../components/page/LoginPage.vue";
import Home from "../components/page/HomePage.vue";
import EmployeeDashboard from "../components/page/EmployeeDashboard.vue";
import CustomerAccounts from "../components/page/employee/CustomerAccounts.vue";
import CustomerAccountsWithLimit from "../components/page/employee/CustomerAccountsWithLimit.vue";
import AllTransactions from "../components/page/employee/AllTransactions.vue";
import ATMTransactions from "../components/page/employee/ATMTransactions.vue";
import TransactionsByCustomers from "../components/page/employee/TransactionsByCustomers.vue";
import TransactionsByEmployees from "../components/page/employee/TransactionsByEmployees.vue";
import OnlineTransactions from "../components/page/employee/OnlineTransactions.vue";
import AccountDetails from "../components/common/customer/AccountDetails.vue"
import RegisterPage from '@/components/page/RegisterPage.vue';
import TransferToOwn from '@/components/common/customer/transfer/TransferToOwn.vue';
import TransferToOthers from '@/components/common/customer/transfer/TransferToOthers.vue';
import UserTransactions from "../components/page/employee/UserTransactions.vue";
import ATMLoginPage from "../components/page/ATMLoginPage.vue"
import ATMDashboard from "../components/page/ATMDashboard.vue"
import ATMWithdraw from "@/components/common/atm/transfer/WithdrawViewATM.vue"
import ATMDeposit from "@/components/common/atm/transfer/DepositViewATM.vue"
import ATMBalance from "@/components/common/atm/CheckBalanceView.vue"
import TransactionHistory from "@/components/common/customer/TransactionHistory.vue"

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
      path: '/register',
      name: 'register',
      component: RegisterPage
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
      path: '/accounts/byAbsoluteLimit',
      name: 'customerAccountsWithLimit',
      component: CustomerAccountsWithLimit
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
    {
      path: '/account/details',
      name: 'accountDetails',
      component: AccountDetails
    },
    {
      path: '/own/transfer',
      name: 'makeOwnTransfer',
      component: TransferToOwn
    },
    {
      path: '/make/transfer',
      name: 'makeTransfer',
      component: TransferToOthers
    },
    {
      path: '/transactions/history/:id',
      name: 'UserTransactions',
      component: UserTransactions
    },
    {
      path: '/atm/login',
      name: 'atmLogin',
      component: ATMLoginPage
    },
    {
      path: '/atm/dashboard',
      name: 'atmDashboard',
      component: ATMDashboard
    },
    {
      path: '/atm/withdraw',
      name: 'atmWithdraw',
      component: ATMWithdraw
    },
    {
      path: '/atm/deposit',
      name: 'atmDeposit',
      component: ATMDeposit
    },
    {
      path: '/atm/check-balance',
      name: 'atmBalance',
      component: ATMBalance
    },
    {
      path: '/transactions/:userId/history',
      name: 'TransactionHistory',
      component: TransactionHistory,
      props: true
    },
    
  ]
});

export default router;
