import { defineStore } from 'pinia';

export const useCustomerPOSTAPICalls = defineStore('useCustomerPost', {
    actions: {
        async registerUser(user) {
            try {
                const response = await this.$axios.post('/register', user);
                return response.data;
            } catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        },
        async transferToOwn(transaction){
            try {
                const response = await this.$axios.post('/accounts/own/transfers', transaction);
                return response.data;
            } catch (error) {
                console.error('Error registering user:', error);
                throw error;
            }
        },
        async transferToOthers(transaction){
            try {
                const response = await this.$axios.post('/transactions/transfers', transaction);
                return response.data;
            } catch (error) {
                console.error('Error making transaction:', error);
                throw error;
            }
        },
    }
});
