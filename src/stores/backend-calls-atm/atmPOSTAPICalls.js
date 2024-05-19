import { defineStore } from 'pinia';

export const useAtmPOSTAPICalls = defineStore('useAtmPost', {
  actions: {
    async withdraw(transaction) {
      try {
        const response = await this.$axios.post('/atm/withdrawals', transaction);
        return response.data;
      } catch (error) {
        console.error('Error during withdrawal:', error);
        throw error;
      }
    },
    async deposit(transaction) {
      try {
        const response = await this.$axios.post('/atm/deposits', transaction);
        return response.data;
      } catch (error) {
        console.error('Error during deposit:', error);
        throw error;
      }
    },
  }
});
