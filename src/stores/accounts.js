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
            const response = await this.$axios.put(`/accounts/customers/ ${account.iban}`, account);
            if(response.data) {
                return { success: true };
            }
            
        } catch (error) {
            return { success: false, message: error.message || "Error updating the absolute transaction limit." };
        }
    }

   function getPaginatedItems(pages, list="allAccounts") {
       const start = (pages.actualPage - 1) * pages.perPage;
       const stop = start + pages.perPage;
       if (list == "allAccounts") {
           return accounts.value.data.slice(start, stop)
       }
       else if (list = "accountsWithLimit") {
           return accountsWithLimit.value.data.slice(start, stop)
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
        getPaginatedItems
    }

});

