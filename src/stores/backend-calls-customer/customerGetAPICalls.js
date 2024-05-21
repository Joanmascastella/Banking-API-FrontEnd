import { defineStore } from 'pinia';

export const useCustomerGETAPICalls = defineStore('useCustomer', {
    state: () => ({
        userData: [],
        ibanData: null
    }),
    actions: {
        async getUserAccountDetails() {
            try {
                const response = await this.$axios.get("/users/details");
                if (response.data) {
                    this.userData = response.data;
                    return { success: true };  
                }
                return { success: false, message: "No data received" };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message || "Error fetching details" };
            }
        },

        async getUserDetails() {
            try {
                const response = await this.$axios.get("/users/getOne");
                if (response.data) {
                    this.userData = response.data;
                    return { success: true };  
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
                        firstName,
                        lastName
                    }
                });
                if (response.data) {
                    this.ibanData = response.data.iban;
                    return { success: true }; 
                }
                return { success: false, message: "No data received" };
            } catch (error) {
                console.error(error);
                return { success: false, message: error.message || "Error fetching details" };
            }
        }
    },
    getters: {
        getUserData(state) {
            return state.userData;
        },
        getIbanData(state) {
            return state.ibanData;
        }
    },
    persist: true 
});
