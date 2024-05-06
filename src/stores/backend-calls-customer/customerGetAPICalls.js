import { defineStore } from 'pinia';

export const useCustomerGETAPICalls = defineStore('useCustomer', {
    actions: {
        async getUserAccountDetails() {
            try {
                const response = await this.$axios.get("/users/details");
                if (response.data) {
                    return { success: true, data: response.data };  
                }
                return { success: false, message: "No data received" };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message || "Error fetching details" };
            }
        }
    }
});
