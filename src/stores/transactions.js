import { defineStore } from 'pinia'



export const transactions = defineStore('transactions', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllTransactions() {
            try {
                return await this.$axios.get('/transactions');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveATMTransactions() {
            try {
                return await this.$axios.get('/transactions/ATM');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveTransactionsByCustomers() {
            try {
                return await this.$axios.get('/transactions/byCustomers');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }

        },
        async retrieveTransactionsByEmployees() {
            try {
                return await this.$axios.get('/transactions/byEmployees');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveOnlineTransactions() {
            try {
                return await this.$axios.get('/transactions/online');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveOnlineTransactionsByEmployees() {
            return await this.$axios.get('/transactions/online/byEmployees');
        },
        async retrieveOnlineTransactionsByCustomers() {
            return await this.$axios.get('/transactions/online/byCustomers');
        },
        async retrieveTransactionsOfUser(userId) {
            return await this.$axios.get(`/transactions/${userId}/history`);
        },
        async retrieveTransactionsOfUserByEmployee(userId) {
            try {
                return await this.$axios.get(`/transactions/customer/${userId}`);
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveATMDepositsOfUser(userId) {
            try {
                return await this.$axios.get(`/transactions/ATM/deposits/${userId}`);
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveATMWithdrawalsOfUser(userId) {
            try {
                return await this.$axios.get(`/transactions/ATM/withdrawals/${userId}`);
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveOnlineTransfersOfUser(userId) {
            try {
                return await this.$axios.get(`/transactions/online/${userId}`);
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async searchTransactions(params) {
            return await this.$axios.get('/transactions/search', { params });
        }


    }


});