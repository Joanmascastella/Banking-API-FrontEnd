<template>
  <div class="content">
    <h1>Online Transactions</h1>

    <TransactionCategoryLinks />
    <TransactionsTableTemplate :transactions="transactionsListing" />

    <div id="report-container">
      <div>
        <h2>Count</h2>
        <div class="report-data">
          <h2>{{ count }}</h2>
        </div>
        <div id="count-by-type" class="report-data"><span><strong>By customers:{{ onlineCustomerTransactions }}</strong></span><span><strong>By employees:{{ onlineEmployeeTransactions }}</strong></span></div>
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
        <div id="amount-by-type" class="report-data"><span><strong>By customers: €{{ onlineCustomerTransactionsAmount
              }}</strong></span><span><strong>By employees: €{{ onlineEmployeeTransactionsAmount }}</strong></span>
        </div>
      </div>
    </div>
    <router-link :to="{ path: '/transactions' }"> <b-button v-b-tooltip.hover title="View all transactions"
        id="report-link"> <img id="transaction-list" src="../../assets/img/transactions.png"> </b-button></router-link>
    <b-button v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img
        id="transaction-report" src="../../assets/img/transaction-report-icon.png"> </b-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import TransactionCategoryLinks from "../common/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../common/TransactionsTableTemplate.vue";
import { transactionReport } from "../../stores/transactionReport";
import { transactions } from "../../stores/transactions";
import { users } from "../../stores/users";


const transactionsListing = ref([])
const transactionStore = transactions();
const userStore = users();
const reportObject = transactionReport();


onMounted(() => {
  document.getElementById("report-container").style.display = "none";
})

const { data } = await transactionStore.retrieveOnlineTransactions();
transactionsListing.value = data

const usersList = await userStore.retrieveAllUsers();

const count = reportObject.retrieveCount(data);
const minimumAmount = reportObject.retrieveMinimumAmount(data);
const maximumAmount = reportObject.retrieveMinimumAmount(data);
const totalAmount = reportObject.retrieveTotalAmount(data)
const onlineCustomerTransactions = reportObject.retrieveOnlineCustomerTransactionCount(data, usersList);
const onlineEmployeeTransactions = reportObject.retrieveOnlineEmployeeTransactionCount(data, usersList);
const onlineCustomerTransactionsAmount = reportObject.retrieveOnlineCustomerTransactionsAmount(data, usersList);
const onlineEmployeeTransactionsAmount = reportObject.retrieveOnlineEmployeeTransactionsAmount(data, usersList);

function viewReport() {
  document.getElementById("report-container").style.display = "flex";
  document.getElementById("report-container").style.justifyContent = "space-around";
  document.getElementById("transactions-table").style.display = "none";

}



</script>

<style scoped>
@import "../../assets/transactionPage.css"
</style>