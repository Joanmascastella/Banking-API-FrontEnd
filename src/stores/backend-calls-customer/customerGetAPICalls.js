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
        },

        async getUserDetails() {
            try {
                const response = await this.$axios.get("/users/getOne")
                if (response.data) {
                    return { success: true, data: response.data };  
                }
                return { success: false, message: "No data received" };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message || "Error fetching details" };
            }
        },

        
        async getIban(firstName, lastName) {
            try {
                const response = await this.$axios.get("/users/iban", {
                    params: {
                        firstName: firstName,
                        lastName: lastName
                    }
                });
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
