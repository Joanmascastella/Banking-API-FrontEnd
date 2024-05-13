<template>

<h3>with absolute limit less than or equal to €{{ route.query.absoluteLimit }}</h3>
  <AccountsTable :accountListing="accountsListing.data" :ownersOfAccounts="ownersOfAccounts" />

  <b-button v-b-tooltip.hover title="List all accounts"  @click="listAllAccounts"> <img
      id="accounts-list" src="../../../assets/img/account-details-icon.png"> </b-button>

</template>

<script setup>
import AccountsTable from '../../common/employee/AccountsTable.vue'
import { ref, reactive } from 'vue';
import { accounts } from "../../../stores/accounts";
import { users } from "../../../stores/users";
import { useRoute, useRouter } from 'vue-router'


const accountsListing = ref([]);
const accountStore = accounts();
const userStore = users();
const ownersOfAccounts = reactive(new Map());
const obj = reactive({ accountsListing })
const route = useRoute()
const router = useRouter()



async function load() {

  accountsListing.value = await accountStore.retrieveAccountsByAbsoluteLimit(route.query.absoluteLimit);

  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < obj.accountsListing.data.length; index++) {
    let item = obj.accountsListing.data[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    ownersOfAccounts.set(item.userId, result[0].firstName + result[0].lastName);
  }
}

load()


function listAllAccounts() {

  router.push('/accounts/customers');

}

</script>

<style scoped>
#accounts-list {
  position: fixed;
  right: 0.5%;
  bottom: 7%;
  border: 5px solid #b9faae;
  background-color: white;
  padding: 5px;
  border-radius: 25px;

}


h2 {font-weight:initial;}
/*mobile*/

@media only screen and (max-width:768px) {

  #accounts-list {
    position: absolute;
    top: 15%;
    width: 70px;
    height: 70px;
  }

}


/*tablet*/
@media only screen and (min-width:768px) and (max-width:1280px) {
  #accounts-list {
    position: absolute;
    top: 15%;
  }
}
</style>