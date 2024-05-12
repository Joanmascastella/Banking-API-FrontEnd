import { defineStore } from 'pinia'



export const transactions = defineStore('transactions', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllTransactions() {
            return await this.$axios.get('/transactions');
        },
        async retrieveATMTransactions() {
            return await this.$axios.get('/transactions/ATM');
        },
        async retrieveTransactionsByCustomers() {
            return await this.$axios.get('/transactions/byCustomers');
        },
        async retrieveTransactionsByEmployees() {
            return await this.$axios.get('/transactions/byEmployees');
        },
        async retrieveOnlineTransactions() {
            return await this.$axios.get('/transactions/online');
        },
        async retrieveOnlineTransactionsByEmployees() {
            return await this.$axios.get('/transactions/online/byEmployees');
        },
        async retrieveOnlineTransactionsByCustomers() {
            return await this.$axios.get('/transactions/online/byCustomers');
        },
    
    
    
    }
        
        
});