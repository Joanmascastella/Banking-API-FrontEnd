<template>

  <div v-if="!transactionsListing.error" id="user"><img src="../../../assets/img/user.png">
    <h5>{{ ownerOfAccounts.get("user") }}</h5>
  </div>

  <Pagination v-if="!transactionsListing.error" ref="pagination" :pages="pages" @newPage="displayNewPage"
    :pageQuery="pages.actualPage" :paginatedItems="paginatedItems" />

  <div v-if="!transactionsListing.error" class="grid">

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


  <div v-if="!transactionsListing.error" id="transactions">
    <TransactionsTableTemplate :transactions="paginatedItems" :ownersOfAccounts="ownerOfAccounts" ref="user" />
  </div>
  <div v-else-if="transactionsListing.error===403">You are not authorized to view this page</div>
</template>

<script setup>

import { ref, reactive, computed } from 'vue'
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import { transactions } from "../../../stores/transactions";
import { users } from "../../../stores/users";
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../common/employee/Pagination.vue';


const route = useRoute()
const transactionsListing = ref([])
const transactionStore = transactions();
const obj = reactive({ transactionsListing })
const userStore = users();
const ownerOfAccounts = reactive(new Map());
const userId = route.query.userId;
const userData = reactive({ id: userId});
let paginatedItems = ref([])
const transactionsCount = ref(null)
const pagination = ref(null)
const router = useRouter()
let viewATMDeposits = ref(false)
let viewATMWithdrawals = ref(false)
let viewOnlineTransfers= ref(false)



const pages = reactive({
  actualPage: 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});



async function load() {

  transactionsListing.value = await retrieveTransactionCategory()

  transactionsCount.value = obj.transactionsListing.data.length;

  const usersList = await userStore.retrieveAllUsers();

  let result = usersList.data.filter((user) => userData.id === user.id.toString());

  ownerOfAccounts.set("userId", result[0].id);
  ownerOfAccounts.set("user", result[0].firstName + result[0].lastName);

  paginateItems()

}

load()

function paginateItems() {
pagination.value.paginate(transactionsListing.value.data);
paginatedItems.value = pagination.value.props.paginatedItems.value;
}


function displayNewPage() {

  router.push({ path: '/transactions/customer', query: { userId: ownerOfAccounts.get("userId"), page: pages.actualPage } });

load();

}

async function retrieveTransactionCategory(){

  if (viewATMDeposits.value === true) {
    transactionsListing.value = await transactionStore.retrieveATMDepositsOfUser(route.query.userId);
  }
  else if (viewATMWithdrawals.value === true) {
    transactionsListing.value = await transactionStore.retrieveATMWithdrawalsOfUser(route.query.userId);
  }
  else if (viewOnlineTransfers.value === true) {
    transactionsListing.value = await transactionStore.retrieveOnlineTransfersOfUser(route.query.userId);
  }
  else {
    transactionsListing.value = await transactionStore.retrieveTransactionsOfUserByEmployee(route.query.userId);

  }

  return transactionsListing.value;

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



</script>



<style scoped>

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
  margin-bottom:5px;
  padding:0px;
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

#transactions{width:100%;}

</style>
