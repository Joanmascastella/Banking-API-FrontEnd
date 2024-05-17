import { defineStore } from 'pinia'



export const accounts = defineStore('accounts', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllAccounts() {
            return await this.$axios.get('/accounts/customers');
        },
        async retrieveAccountsByAbsoluteLimit(absoluteLimit) {
            return await this.$axios.get('/accounts/byAbsoluteLimit?absoluteLimit='+absoluteLimit);
        },
        async updateAccountLimit(account){
            try{
                const response = await this.$axios.put(`/accounts/customers`, account);
                return {success: true};
            } catch (error) {
                return {success:  false, message: error.message || "Error updating the absolute transaction limit."};
            }
        },
    
    }
        
        
});