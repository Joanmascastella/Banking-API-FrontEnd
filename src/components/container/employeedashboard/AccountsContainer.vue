<template>

      <AccountsTable :accountListing="accountsListing.data" :ownersOfAccounts="ownersOfAccounts"/>

</template>

<script setup>
import AccountsTable from '../../common/employee/AccountsTable.vue'

import { ref, reactive } from 'vue';
import { accounts } from "../../../stores/accounts";
import { users } from "../../../stores/users";



const accountsListing = ref([]);
const accountStore = accounts();
const userStore = users();
const ownersOfAccounts = reactive(new Map());
const obj = reactive({ accountsListing })


async function load() {

  accountsListing.value = await accountStore.retrieveAllAccounts();
  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < obj.accountsListing.data.length; index++) {
    let item = obj.accountsListing.data[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    ownersOfAccounts.set(item.userId, result[0].firstName + result[0].lastName);
  }
}

load()




</script>
