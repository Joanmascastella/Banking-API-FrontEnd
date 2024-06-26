<template>
  <div v-if="authStore.user">
    <div v-if="isEmployee">
      <EmployeeDashboard />
    </div>
    <div v-else-if="isCustomer && !isATMPage">
      <CustomerDashboard />
    </div>
    <div v-else-if="isCustomer && isATMPage">
      <ATMDashboard />
    </div>
  </div>
  <div v-else class="welcome">
    <div class="centered-container">
      <h1>Hi, welcome to BankAPI</h1>
      <h3>We are excited for you to get started. Please login or register to continue.</h3>
      <a href="/login" class="button primary">Login</a>
      <a href="/register" class="button">Register</a>
      <a href="/atm/login" class="button">ATM</a>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';
import EmployeeDashboard from "./EmployeeDashboard.vue";
import CustomerDashboard from "./CustomerDashboard.vue";
import ATMDashboard from "./ATMDashboard.vue";
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Home',
  components: {
    EmployeeDashboard,
    CustomerDashboard,
    ATMDashboard
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      authStore.checkUser();
    });

    const isEmployee = computed(() => authStore.isEmployee);
    const isCustomer = computed(() => authStore.isCustomer);
    const isATMPage = computed(() => route.path.startsWith('/atm'));

    // Redirect logic based on the current route and user role
    if (authStore.user) {
      if (isCustomer.value && isATMPage.value) {
        router.push('/atm/dashboard');
      } else if (isCustomer.value) {
        router.push('/');
      } else if (isEmployee.value) {
        router.push('/dashboard/employee');
      }
    }

    return { authStore, isEmployee, isCustomer, isATMPage };
  },
}
</script>

<style scoped>
.welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered-container {
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1, h3 {
  color: #333; 
}

.button {
  display: inline-block;
  margin: 0.5rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: white;
  background-color: #007BFF;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.button.primary {
  background-color: #28a745; 
}

.button:not(.primary) {
  background-color: #17a2b8;
}
</style>
