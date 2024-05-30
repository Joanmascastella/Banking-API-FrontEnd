<template>
  <div v-show="!transactionStore.errorMessage" id="transactionsContainer"> 

  <Pagination  :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage" :paginatedItems="paginatedItems"/>

  <TransactionCategoryLinks ref="child"/>

  <TransactionsTableTemplate :transactions="paginatedItems" :ownersOfAccounts="ownersOfAccounts" :accountsData="accountsData" ref="user" :pages="pages"/>

  <TransactionReport ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"  :maximumAmount="reportData.get('maximumAmount')"  :totalAmount="reportData.get('totalAmount')" 
  :ATMWithdrawalsCount="reportData.get('ATMWithdrawalsCount')" :ATMDepositsCount="reportData.get('ATMDepositsCount')" :ATMWithdrawalsAmount="reportData.get('ATMWithdrawalsAmount')" :ATMDepositsAmount="reportData.get('ATMDepositsAmount')"/>

  <b-button v-b-tooltip.hover title="View all transactions" id="report-link" @click="viewAllTransactions()"> <img
    id="transaction-list" src="../../../assets/img/transactions.png"> </b-button>
<b-button  v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
    id="transaction-report" src="../../../assets/img/transaction-report-icon.png"> </b-button>
  </div>
<div v-show="transactionStore.errorMessage === 403"> 
  You are not authorized to view this page
</div>

</template>

<script setup>

import { ref, onMounted, reactive, computed } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import TransactionReport from "../../common/employee/TransactionReport.vue";
import { transactions } from "../../../stores/transactions";
import Pagination from '../../common/employee/Pagination.vue';
import { useRouter } from 'vue-router';


const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const child = ref(null)
const reportData = reactive(new Map()) 
const report = ref(null)
const user = ref(null)
let paginatedItems = ref([])
const transactionsCount = ref(null)
const router = useRouter()


const pages = reactive({
  actualPage: 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});



async function load() {

  await transactionStore.retrieveATMTransactions();
  transactionsCount.value = transactionStore.getATMTransactions.length;
  user.value.retrieveAccountData(transactionStore.getATMTransactions, accountsData);
  user.value.retrieveUser(transactionStore.getATMTransactions, ownersOfAccounts);

  report.value.loadReport(reportData, transactionStore.getATMTransactions);
  report.value.loadATMReport(reportData, transactionStore.getATMTransactions);

  paginateItems()

}


function paginateItems() {
paginatedItems.value = transactionStore.getPaginatedItems(pages, "ATMTransactions")

}


function displayNewPage() {
router.push({ path: '/transactions/ATM', query: { page: pages.actualPage } });
paginateItems()
}




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
