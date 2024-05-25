import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const accounts = defineStore('accounts', () => {

    const accounts = ref([])
    const accountsWithLimit = ref([])
    const errorMessage = ref(null)
    const getAccounts = computed(() => accounts.value.data)
    const getAccountsWithLimit = computed(() => accountsWithLimit.value.data)


    async function retrieveAllAccounts() {
        try {
            accounts.value = await this.$axios.get('/accounts/customers');
            return accounts.value
        }
        catch (error) {
            errorMessage.value = error.response.status;
        }
    }

    async function retrieveAccountsByAbsoluteLimit(absoluteLimit) {
        try {
            accountsWithLimit.value = await this.$axios.get('/accounts/byAbsoluteLimit?absoluteLimit=' + absoluteLimit);
        }
        catch (error) {
            errorMessage.value = error.response.status;
        }
    }

    async function updateAccountLimit(account) {
        try {
            const response = await this.$axios.put(`/accounts/customers`, account);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || "Error updating the absolute transaction limit." };
        }
    }

    return {
        retrieveAllAccounts,
        retrieveAccountsByAbsoluteLimit,
        updateAccountLimit,
        errorMessage,
        accounts,
        getAccounts,
        getAccountsWithLimit,
    }

});

