<template>
    <div>
      <h2>Check Balance</h2>
      <div>
        <label for="accountType">Account Type:</label>
        <select v-model="selectedAccountType" @change="updateSelectedAccount">
          <option value="CHECKING">Checking</option>
          <option value="SAVINGS">Savings</option>
        </select>
      </div>
      <div v-if="selectedAccount">
        <h3>Account Balance</h3>
        <p>IBAN: {{ selectedAccount.IBAN }}</p>
        <p>Balance: {{ selectedAccount.balance }} {{ selectedAccount.currency }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
  
  export default {
    data() {
      return {
        selectedAccountType: 'CHECKING',
        userDetails: [],
        selectedAccount: null
      };
    },
    methods: {
      async fetchUserDetails() {
        const customerStore = useCustomerGETAPICalls();
        const response = await customerStore.getUserAccountDetails();
        if (response.success) {
          this.userDetails = response.data;
          this.updateSelectedAccount();
        } else {
          console.error(response.message);
        }
      },
      updateSelectedAccount() {
        this.selectedAccount = this.userDetails.find(account => account.accountType === this.selectedAccountType);
      }
    },
    created() {
      this.fetchUserDetails();
    }
  };
  </script>
  
  <style scoped>
  label{
    color: black;
  }
  h2 {
    color: black;
    margin-top: 20vh;
    text-align: center;
  }
  
  div {
    margin: 10px 0;
  }
  
  select {
    display: block;
    margin: 0 auto;
  }
  
  h3 {
    text-align: center;
    margin-top: 20px;
    color: black;
  }
  
  p {
    text-align: center;
    color: black;
  }
  </style>