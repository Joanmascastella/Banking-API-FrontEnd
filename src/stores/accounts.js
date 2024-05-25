import { defineStore } from 'pinia'



export const accounts = defineStore('accounts', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllAccounts() {
            try {
                return await this.$axios.get('/accounts/customers');
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async retrieveAccountsByAbsoluteLimit(absoluteLimit) {
            try {
                return await this.$axios.get('/accounts/byAbsoluteLimit?absoluteLimit=' + absoluteLimit);
            }
            catch (error) {
                const errorMessage = error.response.status;
                return { error: errorMessage };
            }
        },
        async updateAccountLimit(account) {
            try {
                const response = await this.$axios.put(`/accounts/customers`, account);
                if(response.data) {
                    return { success: true };
                }
                
            } catch (error) {
                return { success: false, message: error.message || "Error updating the absolute transaction limit." };
            }
        },

    }


});