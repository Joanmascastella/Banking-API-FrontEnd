<template>
<div v-show="!transactionStore.errorMessage" id="transactionsContainer"> 

  <Pagination :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage" :paginatedItems="paginatedItems"/>

  <TransactionCategoryLinks ref="child"/>

  <TransactionsTableTemplate :transactions="paginatedItems" :ownersOfAccounts="ownersOfAccounts" :accountsData="accountsData" :pages="pages" ref="user"/>

  <TransactionReport ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"  :maximumAmount="reportData.get('maximumAmount')"  :totalAmount="reportData.get('totalAmount')"
  :transactionsData="transactionsData" 
/>

  <b-button v-b-tooltip.hover title="View all transactions" id="report-link" @click="viewAllTransactions()"> <img
    id="transaction-list" src="../../../assets/img/transactions.png"> </b-button>
<b-button v-if="!transactionStore.errorMessage" v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
    id="transaction-report" src="../../../assets/img/transaction-report-icon.png"> </b-button>
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
import { useRouter, useRoute } from 'vue-router';


const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const transactionsData = reactive(new Map());
const child = ref(null)
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

  await transactionStore.retrieveTransactionsByCustomers();
  transactionsCount.value = transactionStore.getTransactionsByCustomers.length;
  user.value.retrieveAccountData(transactionStore.getTransactionsByCustomers, accountsData);
  user.value.retrieveUser(transactionStore.getTransactionsByCustomers, ownersOfAccounts);
  
  report.value.loadReport(reportData, transactionStore.getTransactionsByCustomers);
  report.value.retrieveMinimumAmountTransaction(transactionStore.getTransactionsByCustomers, transactionsData);
  report.value.retrieveMaximumAmountTransaction(transactionStore.getTransactionsByCustomers, transactionsData);

  paginateItems()

}


function paginateItems() {

paginatedItems.value = transactionStore.getPaginatedItems(pages, "transactionsByCustomers")

}


function displayNewPage() {
router.push({ path: '/transactions/byCustomers', query: { page: pages.actualPage } });
paginateItems();
}

watch(() => route.query.transactionId, () => {
  router.go(0)})

onMounted(() => {
document.getElementById("report-container").style.display = "none";
load()
})

function viewReport() {
report.value.viewReport();

}

function viewAllTransactions() {
child.value.viewAllTransactions();

}


</script>


<style scoped>

@import "../../../assets/transactionContainer.css"

</style>
