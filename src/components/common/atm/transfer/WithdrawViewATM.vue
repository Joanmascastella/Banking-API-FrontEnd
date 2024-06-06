<template>
  <div>
    <h2>Withdraw</h2>
    <form @submit.prevent="submitWithdrawal">
      <div>
        <label for="accountType">Account Type:</label>
        <select v-model="selectedAccountType" @change="updateFromAccount">
          <option value="CHECKING">Checking</option>
          <option value="SAVINGS">Savings</option>
        </select>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="transaction.amount" required />
      </div>
      <button type="submit">Withdraw</button>
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
        fromAccount: '',
        toAccount: 'ATM',
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
        this.updateFromAccount(); 
      } else {
        console.error(response.message);
      }
    },
    updateFromAccount() {
      const account = this.userDetails.find(account => account.accountType === this.selectedAccountType);
      if (account) {
        this.transaction.fromAccount = account.IBAN;
      }
    },
    async submitWithdrawal() {
      const atmStore = useAtmPOSTAPICalls();
      try {
        const response = await atmStore.withdraw(this.transaction);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Withdrawal successful!'
        });
        console.log('Withdrawal successful:', response);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error during withdrawal: ' + error.message
        });
        console.error('Error during withdrawal:', error);
      }
    }
  },
  created() {
    this.fetchUserDetails();
  }
};
</script>