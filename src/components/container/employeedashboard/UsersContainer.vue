<template>
    <UserTable v-if="userStore.usersData.length" :usersData="userStore.usersData" @approve-user="approveUser" @cancel-account="cancelAccount" @edit-limit="editDailyLimit"/>
</template>

<script>
import { users } from '@/stores/users.js';
import UserTable from '../../common/employee/UserTable.vue';
import { ref, watch} from 'vue';
import Swal from 'sweetalert2';

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

        const fetchData = async () => {
            try {
                const response = props.selectedFilter === 'all' 
                    ? await userStore.retrieveAllUsers() 
                    : await userStore.retrieveUnapprovedUsers();
                if (!response.success) {
                    console.error(response.message);
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error loading the users.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error loading the users.'+ response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        };

        const approveUser = async (userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit) => {
            try {
                console.log(userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit);
                const response = await userStore.approveUser(userId, dailyLimit, absoluteSavingLimit, absoluteCheckingLimit);
                if (response.success) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'User is approved',
                      icon: 'success',
                      timer: 1500,
                      confirmButtonText: 'OK'
                  });
                } else {
                    console.error('Failed to approve user:', response.message);
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error approving the user.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                console.error('Error approving user:', error);
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error approving the user.'+ response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        };

        const cancelAccount = async (userId) => {
            try {
                const response = await userStore.closeAccount(userId);
                if (response.success) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Account is closed',
                      icon: 'success',
                      timer: 1500,
                      confirmButtonText: 'OK'
                  });
                } else {
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error closing the account: '+ response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error closing the account: ' + response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        };

        const editDailyLimit = async (user) => {
            try {
                const response = await userStore.updateDailyLimit(user);
                if (response.success) {
                    Swal.fire({
                      title: 'Success!',
                      text: 'Daily limit was set to ' + user.dailyLimit,
                      icon: 'success',
                      timer: 1500,
                      confirmButtonText: 'OK'
                  });
                } else {
                    console.error('Failed to edit the limit:', response.message);
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error setting the daily limit.'+ response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                console.error('Error editing the limit:', error);
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error setting the daily limit.' + response.message,
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        }

        watch(() => props.selectedFilter, fetchData, { immediate: true });

        return { userStore, approveUser, cancelAccount, editDailyLimit };
    }
    
}
</script>

<style scoped>
</style>