import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const transactions = defineStore('transactions', () => {

    const transactions = ref([])
    const ATMTransactions = ref([])
    const transactionsByCustomers = ref([])
    const transactionsByEmployees = ref([])
    const OnlineTransactions = ref([])
    const OnlineTransactionsByCustomers = ref([])
    const OnlineTransactionsByEmployees = ref([])
    const transactionsOfUserByEmployee = ref([])
    const errorMessage = ref(null)
    const ATMDepositsOfUser = ref([])
    const ATMWithdrawalsOfUser = ref([])
    const OnlineTransactionsOfUser = ref([])
    const transacationsOfUser = ref([]);

    const getTransactions = computed(() => transactions.value.data)
    const getTransactionsByCustomers = computed(() => transactionsByCustomers.value.data)
    const getTransactionsByEmployees = computed(() => transactionsByEmployees.value.data)
    const getATMTransactions = computed(() => ATMTransactions.value.data)
    const getOnlineTransactions = computed(() => OnlineTransactions.value.data)
    const getOnlineTransactionsByCustomers = computed(() => OnlineTransactionsByCustomers.value.data)
    const getOnlineTransactionsByEmployees = computed(() => OnlineTransactionsByEmployees.value.data)
    const getTransactionsOfUserByEmployee = computed(() => transactionsOfUserByEmployee.value)
    const getATMDepositsOfUser = computed(() => ATMDepositsOfUser.value)
    const getATMWithdrawalsOfUser = computed(() => ATMWithdrawalsOfUser.value)
    const getOnlineTransactionsOfUser = computed(() => OnlineTransactionsOfUser.value)
    const getHistory = computed(() => transacationsOfUser.value.data)



    async function retrieveAllTransactions() {
        try {
            transactions.value = await this.$axios.get('/transactions');
        }

        catch (error) {
            errorMessage.value = error.response.data;

        }
    }
    async function retrieveATMTransactions() {
        try {
            ATMTransactions.value = await this.$axios.get('/transactions/ATM');
        }
        catch (error) {
            errorMessage.value = error.response.data;
        }
    }
    async function retrieveTransactionsByCustomers() {
        try {
            transactionsByCustomers.value = await this.$axios.get('/transactions/byCustomers');
        }
        catch (error) {
            errorMessage.value = error.response.data;

        }

    }
    async function retrieveTransactionsByEmployees() {
        try {
            transactionsByEmployees.value = await this.$axios.get('/transactions/byEmployees');
        }
        catch (error) {

            errorMessage.value = error.response.data;

        }
    }
    async function retrieveOnlineTransactions() {
        try {
            OnlineTransactions.value = await this.$axios.get('/transactions/online');

        }
        catch (error) {
            errorMessage.value = error.response.data;
        }
    }
    async function retrieveOnlineTransactionsByEmployees() {
        try {
            OnlineTransactionsByEmployees.value = await this.$axios.get('/transactions/online/byEmployees');
        } catch (error) {
            errorMessage.value = error.response.data;
        }
    }
    async function retrieveOnlineTransactionsByCustomers() {
        try {
            OnlineTransactionsByCustomers.value = await this.$axios.get('/transactions/online/byCustomers');
        }
        catch (error) {
            errorMessage.value = error.response.data;
        }
    }

    async function retrieveTransactionsOfUser(userId) {
       
        try {
            transacationsOfUser.value = await this.$axios.get(`/transactions/${userId}/history`);
        }
        catch (error) {
            errorMessage.value = error.response.status;
        }
    }

    async function retrieveTransactionsOfUserByEmployee(userId) {
        try {
            transactionsOfUserByEmployee.value = await this.$axios.get(`/transactions/customer/${userId}`);
        }
        catch (error) {
            errorMessage.value = error.response.data;
        }
    }

    async function retrieveATMDepositsOfUser(userId) {
        try {
            ATMDepositsOfUser.value = await this.$axios.get(`/transactions/ATM/deposits/${userId}`);
        }
        catch (error) {
            errorMessage.value = error.response.data;
        }
    }

    async function retrieveATMWithdrawalsOfUser(userId) {
        try {
            ATMWithdrawalsOfUser.value = await this.$axios.get(`/transactions/ATM/withdrawals/${userId}`);
        }
        catch (error) {
            errorMessage.value = error.response.data;

        }
    }
    async function retrieveOnlineTransfersOfUser(userId) {
        try {
            OnlineTransactionsOfUser.value = await this.$axios.get(`/transactions/online/${userId}`);
        }
        catch (error) {
            errorMessage.value = error.response.data;

        }
    }
    async function searchTransactions(params) {
        return await this.$axios.get('/transactions/search', { params });
    }

    function getPaginatedItems(pages, list="allTransactions") {
        const start = (pages.actualPage - 1) * pages.perPage;
        const stop = start + pages.perPage;
        if (list == "allTransactions") {
            return transactions.value.data.slice(start, stop)
        }
        else if (list == "ATMTransactions"){
            return ATMTransactions.value.data.slice(start, stop)
        }
        else if (list == "transactionsByCustomers"){
            return transactionsByCustomers.value.data.slice(start, stop)
        }
        else if (list == "transactionsByEmployees"){
            return transactionsByEmployees.value.data.slice(start, stop)
        }
        else if (list == "onlineTransactions"){
            return OnlineTransactions.value.data.slice(start, stop)
        }
       }

    return {
        retrieveAllTransactions,
        retrieveATMTransactions,
        retrieveTransactionsByCustomers,
        retrieveTransactionsByEmployees,
        retrieveOnlineTransactions,
        retrieveOnlineTransactionsByEmployees,
        retrieveOnlineTransactionsByCustomers,
        retrieveTransactionsOfUser,
        retrieveTransactionsOfUserByEmployee,
        retrieveATMDepositsOfUser,
        retrieveATMWithdrawalsOfUser,
        retrieveOnlineTransfersOfUser,
        searchTransactions,
        errorMessage,
        transactions,
        getTransactions,
        getATMTransactions,
        getTransactionsByCustomers,
        getTransactionsByEmployees,
        getOnlineTransactions,
        getOnlineTransactionsByEmployees,
        getOnlineTransactionsByCustomers,
        getTransactionsOfUserByEmployee,
        getATMDepositsOfUser,
        getATMWithdrawalsOfUser,
        getOnlineTransactionsOfUser,
        getPaginatedItems,
        getHistory
    }


});