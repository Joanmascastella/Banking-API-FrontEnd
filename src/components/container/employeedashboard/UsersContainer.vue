<template>
    <div>
        <UserTable v-if="usersData.length" :usersData="usersData" @approve-user="approveUser" @cancel-account="cancelAccount" @edit-limit="editDailyLimit"/>
    </div>
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
                      text: 'There was an error loading the users.',
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
                    fetchData();
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
                      text: 'There was an error approving the user.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        };

        const cancelAccount = async (userId) => {
            try {
                const response = await userStore.closeAccount(userId);
                if (response.success) {
                    fetchData();
                    Swal.fire({
                      title: 'Success!',
                      text: 'Account is closed',
                      icon: 'success',
                      timer: 1500,
                      confirmButtonText: 'OK'
                  });
                } else {
                    console.error('Failed to close account:', response.message);
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error closing the account.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                console.error('Error cancelling account:', error);
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error closing the account.',
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
                    const index = usersData.value.findIndex(user => user.id === user.id);
                    if (index !== -1) {
                        usersData.value[index] = user;
                    }
                } else {
                    console.error('Failed to edit the limit:', response.message);
                    Swal.fire({
                      title: 'Error!',
                      text: 'There was an error setting the daily limit.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
                }
            } catch (error) {
                console.error('Error editing the limit:', error);
                Swal.fire({
                      title: 'Error!',
                      text: 'There was an error setting the daily limit.',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  });
            }
        }

        watch(() => props.selectedFilter, fetchData, { immediate: true });

        return { usersData, approveUser, cancelAccount, editDailyLimit };
    }
    
}
</script>

<style scoped>
</style>