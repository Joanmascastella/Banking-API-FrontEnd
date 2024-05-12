<template>
  <TransactionCategoryLinks />

  <TransactionsTableTemplate :transactions="transactionsListing.data" />

  <div id="report-container">
  <div>
    <h2>Count</h2>
    <div class="report-data">
      <h2>{{ reportData.get("count") }}</h2>
    </div>
    <div id="count-by-type" class="report-data"><span><strong>Withdrawals: {{ reportData.get("ATMWithdrawalsCount") }}</strong></span><span><strong>Deposits: {{ reportData.get("ATMDepositsCount") }}</strong></span></div>
      
  </div>
  <div>
    <h2>Minimum amount</h2>
    <div class="report-data">
      <h2>€{{  reportData.get("minimumAmount") }}</h2>
    </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
        title="View transaction"><img id="transaction"
          src="../../../assets/img/transactions.png"></b-button></router-link>
  </div>
  <div>
    <h2>Maximum amount</h2>
    <div class="report-data">
      <h2>€{{  reportData.get("maximumAmount") }}</h2>
    </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
        title="View transaction"><img id="transaction"
          src="../../../assets/img/transactions.png"></b-button></router-link>
  </div>
  <div>
    <h2>Total amount</h2>
    <div class="report-data">
      <h2>€{{  reportData.get("totalAmount") }}</h2>
    </div>
    <div id="amount-by-type" class="report-data"><span><strong>Withdrawals: €{{ reportData.get("ATMWithdrawalsAmount") }}</strong></span><span><strong>Deposits: €{{ reportData.get("ATMDepositsAmount") }}</strong></span></div>
  </div>
</div>
<b-button v-b-tooltip.hover title="View all transactions" id="report-link" @click="viewAllTransactions()"> <img
    id="transaction-list" src="../../../assets/img/transactions.png"> </b-button>
<b-button v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
    id="transaction-report" src="../../../assets/img/transaction-report-icon.png"> </b-button>

</template>

<script setup>

import { ref, onMounted, reactive } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import { transactionReport } from "../../../stores/transactionReport";
import { transactions } from "../../../stores/transactions";



const transactionsListing = ref([])
const transactionStore = transactions();
const reportObject = transactionReport();
const obj = reactive({ transactionsListing })
const reportData = reactive(new Map()) 



async function load() {
transactionsListing.value = await transactionStore.retrieveATMTransactions();
reportData.set("count", reportObject.retrieveCount(obj.transactionsListing.data));
reportData.set("minimumAmount", reportObject.retrieveMinimumAmount(obj.transactionsListing.data));
reportData.set("maximumAmount", reportObject.retrieveMaximumAmount(obj.transactionsListing.data));
reportData.set("totalAmount", reportObject.retrieveTotalAmount(obj.transactionsListing.data));
reportData.set("ATMWithdrawalsCount", reportObject.retrieveATMWithdrawalsCount(obj.transactionsListing.data));
reportData.set("ATMDepositsCount", reportObject.retrieveATMDepositsCount(obj.transactionsListing.data));
reportData.set("ATMWithdrawalsAmount", reportObject.retrieveATMWithdrawalsAmount(obj.transactionsListing.data));
reportData.set("ATMDepositsAmount", reportObject.retrieveATMDepositsAmount(obj.transactionsListing.data));

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
