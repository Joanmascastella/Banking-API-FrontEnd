<template>
      <TransactionCategoryLinks />

      <TransactionsTableTemplate :transactions="transactionsListing.data" />

      <TransactionReport :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"  :maximumAmount="reportData.get('maximumAmount')"  :totalAmount="reportData.get('totalAmount')"/>

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
import { transactionReport } from "../../../stores/transactionReport";
import { transactions } from "../../../stores/transactions";



const transactionsListing = ref([])
const transactionStore = transactions();
const reportObject = transactionReport();
const obj = reactive({ transactionsListing })
const reportData = reactive(new Map()) 



async function load() {
transactionsListing.value = await transactionStore.retrieveAllTransactions();
reportData.set("count", reportObject.retrieveCount(obj.transactionsListing.data));
reportData.set("minimumAmount", reportObject.retrieveMinimumAmount(obj.transactionsListing.data));
reportData.set("maximumAmount", reportObject.retrieveMaximumAmount(obj.transactionsListing.data));
reportData.set("totalAmount", reportObject.retrieveTotalAmount(obj.transactionsListing.data));

}

load()



onMounted(() => {
  document.getElementById("report-container").style.display = "none";
})

function viewReport() {
  document.getElementById("report-container").style.display = "flex";
  document.getElementById("report-container").style.justifyContent = "space-around";
  document.getElementById("transactions-table").style.display = "none";

}

function viewAllTransactions() {
  document.getElementById("transactions-table").style.display = "table";
  document.getElementById("report-container").style.display = "none";

}



</script>


<style scoped>

@import "../../../assets/transactionPage.css"

</style>
