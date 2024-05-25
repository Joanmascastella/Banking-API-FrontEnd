import { defineStore } from 'pinia'



export const users = defineStore('users', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllUsers() {
            try{
                const response = await this.$axios.get('/users');
                if(response.data) {
                    return {success: true, data: response.data};
                }
                return {success:  false, message: "No users were found."};
            } catch (error) {
                return {success:  false, message: error.message || "Error fetching users."};
            }
        },
        async retrieveUnapprovedUsers() {
            try{
                const response = await this.$axios.get('/users/noncustomers');
                if(response.data) {
                    return {success: true, data: response.data};
                }
                return {success:  false, message: "No pending users were found."};
            } catch (error) {
                return {success:  false, message: error.message || "Error fetching pending users."};
            }
        },
        async approveUser(userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit){
            try{
                const response = await this.$axios.put(`/users/${userId}/approve`, {
                    dailyLimit,
                    absoluteSavingLimit,
                    absoluteCheckingLimit
                });
                return {success: true};
            } catch (error) {
                return {success:  false, message: error.message || "Error approving user."};
            }
        },
        async updateDailyLimit(user){
            try{
                const response = await this.$axios.put(`/users`, user);
                return {success: true};
            } catch (error) {
                return {success:  false, message: error.message || "Error updating the Daily limit."};
            }
        },
        async closeAccount(userId) {
            try{
                const response = await this.$axios.delete(`/users/${userId}`);
                return {success: true};
            } catch (error) {
                return {success:  false, message: error.message || "Error closing the account."};
            }
        }
    } 
});