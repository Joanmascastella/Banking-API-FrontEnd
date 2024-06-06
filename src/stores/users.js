import { defineStore } from 'pinia'



export const users = defineStore('users', {
    state() {
        return {
          usersData: [],
        };
    },

    actions: {
        async retrieveAllUsers() {
            try{
                const response = await this.$axios.get('/users');
                if(response.data) {
                    this.usersData = response.data;
                    return {success: true};
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
                    this.usersData = response.data;
                    return {success: true};
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
                if (response.data) {
                    const updatedUserIndex = this.usersData.findIndex(user => user.id === userId);
                    if (updatedUserIndex !== -1) {
                        this.usersData[updatedUserIndex].isApproved = true;
                        this.usersData[updatedUserIndex].dailyLimit = dailyLimit;
                    }
                    return {success: true};
                }
            } catch (error) {
                return {success: false, message: error.message || "Error approving user."};
            }
        },
        async updateDailyLimit(user){
            try{
                const response = await this.$axios.put(`/users/${user.id}`, user);
                if (response.data) {
                    const updatedUserIndex = this.usersData.findIndex(u => u.id === user.id);
                    if (updatedUserIndex !== -1) {
                        this.usersData[updatedUserIndex].dailyLimit = user.dailyLimit;
                    }
                    return {success: true};
                }
            } catch (error) {
                return {success:  false, message: error.message || "Error updating the Daily limit."};
            }
        },
        async closeAccount(userId) {
            try{
                const response = await this.$axios.delete(`/users/${userId}`);
                if(response.data) {
                    const userIndex = this.usersData.findIndex(user => user.id === userId);
                    if (userIndex !== -1) {
                        this.usersData[userIndex].isActive = false;
                    }
                    return {success: true};
                }
            } catch (error) {
                
                return {success:  false, message: error.response.data || "Error closing the account."};
            }
        }
    } 
});