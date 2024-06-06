<template>
  <div>
    <h2>Deposit</h2>
    <form @submit.prevent="submitDeposit">
      <div>
        <label for="accountType">Account Type:</label>
        <select v-model="selectedAccountType" @change="updateToAccount">
          <option value="CHECKING">Checking</option>
          <option value="SAVINGS">Savings</option>
        </select>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="transaction.amount" required />
      </div>
      <button type="submit">Deposit</button>
    </form>
  </div>
</template>

<script>
import { useAtmPOSTAPICalls } from '@/stores/backend-calls-atm/atmPOSTAPICalls';
import { useCustomerGETAPICalls } from '@/stores/backend-calls-customer/customerGetAPICalls.js';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      selectedAccountType: 'CHECKING',
      transaction: {
        fromAccount: 'ATM',
        toAccount: '',
        amount: 0
      },
      userDetails: []
    };
  },
  methods: {
    async fetchUserDetails() {
      const customerStore = useCustomerGETAPICalls();
      const response = await customerStore.getUserAccountDetails();
      if (response.success) {
        this.userDetails = customerStore.userData;
        this.updateToAccount(); 
      }
      else {
        console.error(response.message);
      }
    },
    updateToAccount() {
      const account = this.userDetails.find(account => account.accountType === this.selectedAccountType);
      if (account) {
        this.transaction.toAccount = account.IBAN;
      }
    },
    async submitDeposit() {
      const atmStore = useAtmPOSTAPICalls();
      try {
        const response = await atmStore.deposit(this.transaction);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Deposit successful!'
        });
        console.log('Deposit successful:', response);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error during deposit: ' + error.message
        });
        console.error('Error during deposit:', error);
      }
    }
  },
  created() {
    this.fetchUserDetails();
  }
};
</script>