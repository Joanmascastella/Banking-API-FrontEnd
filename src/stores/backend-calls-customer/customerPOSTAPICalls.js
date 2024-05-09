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
        }
    }
});
