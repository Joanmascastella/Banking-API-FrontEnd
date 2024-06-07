<template>
  <SubNavigation v-show="!transactionStore.errorMessage"></SubNavigation>


  <div v-show="!transactionStore.errorMessage" id="transactionsContainer">

    <h1 v-if="!route.query.report">Online transactions</h1>
    <h1 v-else>Online transactions summary</h1>

    <Pagination  v-show="!route.query.report" :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage"
      :paginatedItems="paginatedItems" />

    <TransactionCategoryLinks v-show="!route.query.report" />


    <TransactionsTableTemplate v-show="!route.query.report" :transactions="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
      :accountsData="accountsData" :pages="pages" ref="user" />

    <TransactionReport v-show="route.query.report" ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"
      :maximumAmount="reportData.get('maximumAmount')" :totalAmount="reportData.get('totalAmount')"
      :OnlineByCustomersCount="reportData.get('byCustomersCount')"
      :OnlineByEmployeesCount="reportData.get('byEmployeesCount')"
      :OnlineByCustomersAmount="reportData.get('byCustomersAmount')"
      :OnlineByEmployeesAmount="reportData.get('byEmployeesAmount')" :transactionsData="transactionsData" />

  </div>
  <div v-show="transactionStore.errorMessage === 403">
    You are not authorized to view this page
  </div>

</template>

<script setup>

import { ref, onMounted, reactive, computed, watch } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import TransactionReport from "../../common/employee/TransactionReport.vue";
import { transactions } from "../../../stores/transactions";
import Pagination from '../../common/employee/Pagination.vue';
import SubNavigation from '../../common/employee/SubNavigation.vue';

import { useRouter, useRoute } from 'vue-router';


const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const transactionsData = reactive(new Map());
const reportData = reactive(new Map())
const report = ref(null)
const user = ref(null)
let paginatedItems = ref([])
const transactionsCount = ref(null)
const router = useRouter()
const route = useRoute()


const pages = reactive({
  actualPage: route.query.page ? route.query.page : 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});



async function load() {
  await transactionStore.retrieveOnlineTransactions();
  await transactionStore.retrieveOnlineTransactionsByCustomers();
  await transactionStore.retrieveOnlineTransactionsByEmployees();
  transactionsCount.value = transactionStore.getOnlineTransactions.length;
  user.value.retrieveAccountData(transactionStore.getOnlineTransactions, accountsData);
  user.value.retrieveUser(transactionStore.getOnlineTransactions, ownersOfAccounts);

  report.value.loadReport(reportData, transactionStore.getOnlineTransactions);
  report.value.loadOnlineReport(reportData, transactionStore.getOnlineTransactionsByCustomers, transactionStore.getOnlineTransactionsByEmployees);

  report.value.retrieveMinimumAmountTransaction(transactionStore.getOnlineTransactions, transactionsData);
  report.value.retrieveMaximumAmountTransaction(transactionStore.getOnlineTransactions, transactionsData);

  paginateItems()
}


function paginateItems() {
  paginatedItems.value = transactionStore.getPaginatedItems(pages, "onlineTransactions")

}


function displayNewPage() {
  router.push({ path: '/transactions/online', query: { page: pages.actualPage } });
  paginateItems();
}

watch(() => route.query.transactionId, () => {
  router.go(0)
})

onMounted(() => {
  load()
})



</script>


<style scoped>
@import "../../../assets/transactionContainer.css"
</style>
