<template>
  <div class="content">
    <h1>ATM Transactions</h1>

    <TransactionCategoryLinks />
    <TransactionsTableTemplate :transactions="transactions" />

    <div id="report-container">
      <div>
        <h2>Count</h2>
        <div class="report-data">
          <h2>{{ count }}</h2>
        </div>
        <div id="count-by-type" class="report-data"><span><strong>Withdrawals: {{ ATMWithdrawalsCount
              }}</strong></span><span><strong>Deposits: {{ ATMDepositsCount }}</strong></span></div>
      </div>
      <div>
        <h2>Minimum amount</h2>
        <div class="report-data">
          <h2>€{{ minimumAmount }}</h2>
        </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
            title="View transaction"><img id="transaction"
              src="../../assets/img/transactions.png"></b-button></router-link>
      </div>
      <div>
        <h2>Maximum amount</h2>
        <div class="report-data">
          <h2>€{{ maximumAmount }}</h2>
        </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
            title="View transaction"><img id="transaction"
              src="../../assets/img/transactions.png"></b-button></router-link>
      </div>
      <div>
        <h2>Total amount</h2>
        <div class="report-data">
          <h2>€{{ totalAmount }}</h2>
        </div>
        <div id="amount-by-type" class="report-data"><span><strong>Withdrawals: €{{ ATMWithdrawalsAmount }}</strong></span><span><strong>Deposits: €{{ ATMDepositsAmount }}</strong></span></div>
      </div>
    </div>
    <router-link :to="{ path: '/transactions' }"> <b-button v-b-tooltip.hover title="View all transactions"
        id="report-link"> <img id="transaction-list" src="../../assets/img/transactions.png"> </b-button></router-link>
    <b-button v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
        id="transaction-report" src="../../assets/img/transaction-report-icon.png"> </b-button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import TransactionCategoryLinks from "../common/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../common/TransactionsTableTemplate.vue";
import { transactionReport } from "../../stores/transactionReport";



const transactions = ref([])
const reportObject = transactionReport();


onMounted(() => {
  document.getElementById("report-container").style.display = "none";
})

const { data } = await axios.get('http://localhost:8080/transactions/ATM')

transactions.value = data

reportObject.retrieveCount(data);
reportObject.retrieveMinimumAmount(data);
reportObject.retrieveMaximumAmount(data);
reportObject.retrieveTotalAmount(data);
reportObject.retrieveATMWithdrawalsCount(data);
reportObject.retrieveATMDepositsCount(data);
reportObject.retrieveATMWithdrawalsAmount(data);
reportObject.retrieveATMDepositsAmount(data);


const count = reportObject.report.get("count");
const minimumAmount = reportObject.report.get("minimumAmount");
const maximumAmount = reportObject.report.get("maximumAmount");
const totalAmount = reportObject.report.get("totalAmount");
const ATMWithdrawalsCount = reportObject.report.get("ATMWithdrawalsCount");
const ATMDepositsCount = reportObject.report.get("ATMDepositsCount");
const ATMWithdrawalsAmount = reportObject.report.get("ATMWithdrawalsAmount");
const ATMDepositsAmount = reportObject.report.get("ATMDepositsAmount");


function viewReport() {
  document.getElementById("report-container").style.display = "flex";
  document.getElementById("report-container").style.justifyContent = "space-around";
  document.getElementById("transactions-table").style.display = "none";

}



</script>

<style scoped>
@import "../../assets/transactionPage.css"
</style>