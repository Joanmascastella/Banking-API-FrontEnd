<template>
<div id="user"><img src="../../../assets/img/user.png"> <h5>{{ ownerOfAccounts.get("user") }}</h5></div>
  <TransactionsTableTemplate :transactions="transactionsListing.data"  :ownersOfAccounts="ownerOfAccounts" ref="user"/>

</template>

<script setup>

import { ref, reactive } from 'vue'
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import { transactions } from "../../../stores/transactions";
import { users } from "../../../stores/users";
import { useRoute } from 'vue-router'


const route = useRoute()
const transactionsListing = ref([])
const transactionStore = transactions();
const userStore = users();
const ownerOfAccounts = reactive(new Map());
const userId = route.params.id;
const userData = reactive({ id: userId});

async function load() {

transactionsListing.value = await transactionStore.retrieveTransactionsOfUser(route.params.id);

const usersList = await userStore.retrieveAllUsers();

let result = usersList.data.filter((user) => userData.id === user.id.toString());

ownerOfAccounts.set("user", result[0].firstName + result[0].lastName);

}

load()



</script>



<style scoped>

@import "../../../assets/transactionPage.css"



</style>
