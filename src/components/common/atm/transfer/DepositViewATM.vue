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
  import { computed , ref , reactive } from 'vue';
  
  export default {
  setup() {
    const customerStore = useCustomerGETAPICalls();
    const userData = computed(() => customerStore.userData);

    const transaction = reactive({
      fromAccount: 'ATM',
      toAccount: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      userId: customerStore.userId,
    });

    const selectedAccountType = ref('CHECKING'); // Default to checking account

    const updateFromAccount = () => {
      const selectedAccount = userData.value.find(account => account.accountType === selectedAccountType.value);
      transaction.fromAccount = selectedAccount ? selectedAccount.IBAN : '';
    };

    const submitWithdrawal = async () => {
      try {
        const atmStore = useAtmPOSTAPICalls();
        const response = await atmStore.withdraw(transaction);
        console.log('Withdrawal successful:', response);
      } catch (error) {
        console.error('Withdrawal failed:', error);
      }
    };

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