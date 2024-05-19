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
  import { ref, reactive, watch, onMounted } from 'vue';
  
  export default {
  setup() {
    const customerStore = useCustomerGETAPICalls();
    const userData = ref([]); 

    onMounted(async () => {
      const response = await customerStore.getUserAccountDetails();
      if (response.success) {
        userData.value = response.data; 
      } else {
        console.error(response.message);
      }
    });

    const transaction = reactive({
      fromAccount: '',
      toAccount: 'ATM',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      userId: null,
    });


    const selectedAccountType = ref('CHECKING'); // Default to checking account

    const updateFromAccount = () => {
      if (this.userData.value && this.userData.value.length) {
        const selectedAccount = userData.value.find(account => account.accountType === selectedAccountType.value);
        transaction.fromAccount = selectedAccount ? selectedAccount.IBAN : '';
      }
    };

    const submitWithdrawal = async () => {
      try {
        if (!transaction.userId) {
          transaction.userId = userData.userId;
        }
        const atmStore = useAtmPOSTAPICalls();
        const response = await atmStore.withdraw(transaction);
        console.log('Withdrawal successful:', response);
      } catch (error) {
        console.error('Withdrawal failed:', error);
      }
    };

    // Watch for changes in userData and update the account if needed
    watch(userData, () => {
      if (userData.value.length) {
        updateFromAccount();
      }
    });

    return {
      transaction,
      selectedAccountType,
      userData,
      updateFromAccount,
      submitWithdrawal,
    };
  }
};
</script>