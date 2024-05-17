<template>
    <div>
        <UserTable v-if="usersData.length" :usersData="usersData" @approve-user="approveUser" @cancel-account="cancelAccount" @edit-limit="editDailyLimit"/>
    </div>
</template>

<script>
import { users } from '@/stores/users.js';
import UserTable from '../../common/employee/UserTable.vue';
import { ref, watch} from 'vue';

export default {
    name: "UsersContainer",
    props: {
        selectedFilter: String
    },
    components: {
        UserTable
    },
    setup(props, { emit }) {
        const userStore = users();
        const usersData = ref([]);

        const fetchData = async () => {
            try {
                const response = props.selectedFilter === 'all' 
                    ? await userStore.retrieveAllUsers() 
                    : await userStore.retrieveUnapprovedUsers();
                
                if (response.success) {
                    usersData.value = response.data;
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const approveUser = async (userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit) => {
            try {
                console.log(userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit);
                const response = await userStore.approveUser(userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit);
                if (response.success) {
                    fetchData();
                } else {
                    console.error('Failed to approve user:', response.message);
                }
            } catch (error) {
                console.error('Error approving user:', error);
            }
        };

        const cancelAccount = async (userId) => {
            try {
                const response = await userStore.closeAccount(userId);
                if (response.success) {
                    fetchData(); 
                } else {
                    console.error('Failed to cancel account:', response.message);
                }
            } catch (error) {
                console.error('Error cancelling account:', error);
            }
        };

        const editDailyLimit = async (user) => {
            try {
                const response = await userStore.updateDailyLimit(user);
                if (response.success) {
                    const index = usersData.value.findIndex(user => user.id === user.id);
                    if (index !== -1) {
                        usersData.value[index] = user;
                    }
                } else {
                    console.error('Failed to edit the limit:', response.message);
                }
            } catch (error) {
                console.error('Error editing the limit:', error);
            }
        }

        watch(() => props.selectedFilter, fetchData, { immediate: true });

        return { usersData, approveUser, cancelAccount, editDailyLimit };
    }
    
}
</script>

<style scoped>
</style>