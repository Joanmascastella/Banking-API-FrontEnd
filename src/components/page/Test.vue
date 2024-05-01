<template>
    <div class="container">
        <h1>Testing Accounts</h1>
        <p v-if="user">User ID: {{ user.id }}</p>
        <p v-if="user">User Role: {{ user.role }}</p>
        <p v-if="!user">No user data available.</p>
        <div v-if="accounts && accounts.length > 0">
      <ul>
        <li v-for="account in accounts" :key="account.userId">
          User ID: {{ account.userId }} - IBAN: {{ account.IBAN }} - Balance: {{ account.balance }}
        </li>
      </ul>
    </div>
        <div v-else>
            <p>No accounts available or unable to fetch accounts.</p>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, getCurrentInstance } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

export default {
    name: "Dashboard",
    data() {
    return {
      accounts: [],
      error: ''
    };
  },
    setup() {
        const authStore = useAuthStore();
        authStore.checkUser();

        const user = computed(() => authStore.user);
        const accounts = ref([]);

        // Use getCurrentInstance to access the global properties
        const { proxy } = getCurrentInstance();

        // Fetch accounts from the backend
        const fetchAccounts = async () => {
            try {
                const response = await proxy.$axios.get('/users');
                this.accounts = response.data;
            } catch (error) {
                if (error.response) {
                    // Log or display error details from the server
                    console.error('Failed to fetch accounts:', error.response.data);
                    // Optionally, handle different types of errors differently
                    if (error.response.status === 500) {
                        console.error("Server error, please try again later.");
                    }
                } else {
                    console.error('Error fetching accounts:', error.message);
                }
            }
        };




        onMounted(fetchAccounts);

        return {
            user,
            accounts
        };
    },
}
</script>


<style scoped>
.container {
    margin-top: 40px;
}

p {
    font-size: 30px;
    color: black;
}
</style>