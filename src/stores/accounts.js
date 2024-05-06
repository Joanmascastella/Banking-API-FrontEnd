import { defineStore } from 'pinia'



export const accounts = defineStore('accounts', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllAccounts() {
            return await this.$axios.get('/accounts/customers');
        }}
        
        
});