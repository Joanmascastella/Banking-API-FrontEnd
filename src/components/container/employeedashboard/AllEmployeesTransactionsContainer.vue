<template>
  <TransactionCategoryLinks ref="child"/>

  <TransactionsTableTemplate :transactions="transactionsListing.data" :ownersOfAccounts="ownersOfAccounts" ref="user"/>

  <TransactionReport ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"  :maximumAmount="reportData.get('maximumAmount')"  :totalAmount="reportData.get('totalAmount')"/>

  <b-button v-b-tooltip.hover title="View all transactions" id="report-link" @click="viewAllTransactions()"> <img
    id="transaction-list" src="../../../assets/img/transactions.png"> </b-button>
<b-button v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
    id="transaction-report" src="../../../assets/img/transaction-report-icon.png"> </b-button>

</template>

<script setup>

import { ref, onMounted, reactive } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import TransactionReport from "../../common/employee/TransactionReport.vue";
import { transactions } from "../../../stores/transactions";



const transactionsListing = ref([])
const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const child = ref(null)
const obj = reactive({ transactionsListing })
const reportData = reactive(new Map()) 
const report = ref(null)
const user = ref(null)




async function load() {
transactionsListing.value = await transactionStore.retrieveTransactionsByEmployees();
user.value.retrieveUser(obj.transactionsListing.data, ownersOfAccounts);
report.value.loadReport(reportData, obj.transactionsListing.data);

}

load()



onMounted(() => {
document.getElementById("report-container").style.display = "none";
})

function viewReport() {
report.value.viewReport();

}

function viewAllTransactions() {
child.value.viewAllTransactions();

}


</script>


<style scoped>

@import "../../../assets/transactionPage.css"

</style>
