<template>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>BSN</th>
                    <th>Phone number</th>
                    <th>Birth Date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in usersData" :key="user.id">
                    <td class=".hidden-sm">{{ user.username }}</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.BSN }}</td>
                    <td class=".hidden-sm">{{ user.phoneNumber }}</td>
                    <td>{{ user.birthDate }}</td>
                    <td>{{ user.isApproved ? 'Approved': 'Pending'}}</td>
                    <td>
                        <button id="btn-approve" v-if="!user.isApproved" @click="openPopUp(user, false)">Approve</button>
                        <button id="btn-cancel" v-if="user.isApproved" @click="cancelAccount(user.id)">Close Account</button> 
                        <button v-if="user.isApproved" @click="openPopUp(user, true)">Edit Daily Limit</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <TransferLimitsView v-if="showPopup"
                            :editMode="editMode"
                            :dailyLimit="this.selectedUser.dailyLimit"
                            @confirm="approveUser"
                            @edit-limit="confirmEdit"
                            @cancel="cancelApproval"/>
    </div>
</template>

<script>
import TransferLimitsView from './TransferLimitsView.vue';
    export default {
        name:"UserTable",
        components: {
            TransferLimitsView
        },
        props: {
            usersData: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                showPopup: false,
                selectedUser: null,
                editMode: false
            }
        },
        methods: {
            approveUser(formData) {
                this.showPopup = false;
                this.$emit('approve-user', this.selectedUser.id, formData.dailyLimit, formData.absoluteLimitSavings, formData.absoluteLimitChecking)
            },
            cancelAccount(userId) {
                this.$emit('cancel-account', userId);
            },
            openPopUp(user, editMode) {
                this.selectedUser = user;
                this.editMode = editMode;
                this.showPopup= true;
            },
            cancelApproval() {
                this.showPopup = false;
                this.selectedUser = null;
                this.editMode = false; 
            },
            confirmEdit(dailyLimit) {
                this.showPopup = false;
                this.selectedUser.dailyLimit = dailyLimit;
                this.$emit('edit-limit', this.selectedUser);
            }
        }
    }
</script>

<style scoped>
table th {
  background-color: #FCC26B;
}

table td {
  background-color: white;
  font-size: medium;
}

table,
th,
td {
  border: transparent;
  color: darkslategray;
}

table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
}

button {
    width: 50px;
    height: 50px;
    margin: 5px;
    font-size: 10px;
    padding:0;
    border: none;
}

#btn-approve{
    background-color: green;
}

#btn-cancel{
    background-color: red;
}

@media screen and (max-width: 1024px) {
    .container {
        overflow-x: auto;
    }
}

</style>