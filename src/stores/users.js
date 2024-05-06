import { defineStore } from 'pinia'



export const users = defineStore('users', {
    state() {
        return {
        };
    },

    actions: {

        async retrieveAllUsers() {
            return await this.$axios.get('/users');
        }}
        
        
});