<!-- This component is based on the guide at https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref -->


<template>

  <div v-show="!transactionStore.errorMessage" id="transactionsContainer">

    <h1 style="color: black;">Transactions </h1>

    <h5 style="color: black;">{{ ownerOfAccounts.get("user") }}</h5>

    <Pagination ref="pagination" :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage"
      :paginatedItems="paginatedItems" />

    <div class="grid">

      <div>
        <button @click="displayAllTransactions">All transactions</button>
      </div>


      <div>
        <button @click="displayATMDeposits">ATM deposits</button>
      </div>

      <div>
        <button @click="displayATMWithdrawals">ATM withdrawals</button>
      </div>

      <div>

        <button @click="displayOnlineTransfers">Online</button>
      </div>
    </div>

    <TransactionsTableTemplate :transactions="paginatedItems" :ownersOfAccounts="ownerOfAccounts"
      :accountsData="accountsData" :pages="pages" ref="user" />
  </div>
  <div v-show="transactionStore.errorMessage" id="error-message">
    {{ transactionStore.errorMessage }}
  </div>
</template>

<script setup>

import { ref, reactive, computed, onMounted } from 'vue'
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import { transactions } from "../../../stores/transactions";
import { users } from "../../../stores/users";
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../common/employee/Pagination.vue';

const router = useRouter()
const route = useRoute()
const transactionsListing = ref([])
const transactionStore = transactions();
const userStore = users();
const ownerOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const user = ref(null)
let paginatedItems = ref([])
const transactionsCount = ref(null)
const pagination = ref(null)
let viewATMDeposits = ref(false)
let viewATMWithdrawals = ref(false)
let viewOnlineTransfers = ref(false)



const pages = reactive({
  actualPage: route.query.page ? route.query.page : 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});



async function load() {
  await userStore.retrieveAllUsers();

  transactionsListing.value = retrieveTransactionCategory()
  transactionsCount.value = transactionsListing.value.data.length;
  user.value.retrieveAccountData(transactionsListing.value.data, accountsData);

  let result = userStore.usersData.filter((user) => route.query.userId === user.id.toString());
  ownerOfAccounts.set("userId", result[0].id);
  ownerOfAccounts.set("user", result[0].firstName + result[0].lastName);

  paginateItems()

}

function paginateItems() {
  pagination.value.paginate(transactionsListing.value.data);
  paginatedItems.value = pagination.value.props.paginatedItems.value;
}


function displayNewPage() {

  router.push({ path: '/transactions/customer', query: { userId: ownerOfAccounts.get("userId"), page: pages.actualPage } });

  load();

}

function retrieveTransactionCategory() {

  if (viewATMDeposits.value === true) {
    transactionsListing.value = transactionStore.getATMDepositsOfUser
  }
  else if (viewATMWithdrawals.value === true) {
    transactionsListing.value = transactionStore.getATMWithdrawalsOfUser
  }
  else if (viewOnlineTransfers.value === true) {
    transactionsListing.value = transactionStore.getOnlineTransactionsOfUser
  }
  else {
    transactionsListing.value = transactionStore.getTransactionsOfUserByEmployee
  }

  return transactionsListing.value

}

function displayAllTransactions() {

  viewATMDeposits.value = false;
  viewATMWithdrawals.value = false;
  viewOnlineTransfers.value = false;
  displayNewPage();

}

function displayATMDeposits() {

  viewATMDeposits.value = true;
  viewATMWithdrawals.value = false;
  viewOnlineTransfers.value = false;
  displayNewPage();

}

function displayATMWithdrawals() {

  viewATMWithdrawals.value = true;
  viewATMDeposits.value = false;
  viewOnlineTransfers.value = false;
  displayNewPage();

}

function displayOnlineTransfers() {

  viewOnlineTransfers.value = true;
  viewATMWithdrawals.value = false;
  viewATMDeposits.value = false;
  displayNewPage();

}

onMounted(async () => {
  await transactionStore.retrieveTransactionsOfUserByEmployee(route.query.userId);
  await transactionStore.retrieveATMDepositsOfUser(route.query.userId);
  await transactionStore.retrieveATMWithdrawalsOfUser(route.query.userId);
  await transactionStore.retrieveOnlineTransfersOfUser(route.query.userId);

  load()
})



</script>



<style scoped>
h1 {
  text-align: center;
  margin-top: 17vh;
}



.grid {
  min-width: 90vw;
  margin-bottom: 10px;
}

.grid button {
  border: none;
  width: 100%;
}

#user {
  display: flex;
  column-gap: 0.5rem;
  margin-top: 0px;
  margin-bottom: 5px;
  padding: 0px;
}

#user img {
  width: 28px;
  height: 28px;
  padding: 0px;
  vertical-align: middle;
}

#user h5 {
  color: black;
}

#transactionsContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

#error-message {
  margin-top: 150px;
}
</style>
