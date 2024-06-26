<script setup>
import { transactionReport } from "../../../stores/transactionReport";
import { useRouter, useRoute } from 'vue-router'
import { transactions } from "../../../stores/transactions";



const router = useRouter()
const route = useRoute()
const reportObject = transactionReport();
const transactionStore = transactions();


defineProps({
  count: Number,
  minimumAmount: Number,
  maximumAmount: Number,
  totalAmount: Number,
  ATMWithdrawalsCount: Number,
  ATMDepositsCount: Number,
  ATMWithdrawalsAmount: Number,
  ATMDepositsAmount: Number,
  OnlineByEmployeesCount: Number,
  OnlineByCustomersCount: Number,
  OnlineByEmployeesAmount: Number,
  OnlineByCustomersAmount: Number,
  allTransactions: Array,
  transactionsData: Map,

});


function loadReport(reportMap, transactions) {
  reportMap.set("count", reportObject.retrieveCount(transactions));
  reportMap.set("minimumAmount", reportObject.retrieveMinimumAmount(transactions)["minimumAmount"]);
  reportMap.set("maximumAmount", reportObject.retrieveMaximumAmount(transactions)["maximumAmount"]);
  reportMap.set("totalAmount", reportObject.retrieveTotalAmount(transactions));
}

function loadATMReport(reportMap, transactions) {
  reportMap.set("ATMWithdrawalsCount", reportObject.retrieveATMWithdrawalsCount(transactions));
  reportMap.set("ATMDepositsCount", reportObject.retrieveATMDepositsCount(transactions));
  reportMap.set("ATMWithdrawalsAmount", reportObject.retrieveATMWithdrawalsAmount(transactions));
  reportMap.set("ATMDepositsAmount", reportObject.retrieveATMDepositsAmount(transactions));


}

function loadOnlineReport(reportMap, customerTransactions, employeeTransactions) {
  reportMap.set("byCustomersCount", reportObject.retrieveCount(customerTransactions));
  reportMap.set("byEmployeesCount", reportObject.retrieveCount(employeeTransactions));
  reportMap.set("byCustomersAmount", reportObject.retrieveTotalAmount(customerTransactions));
  reportMap.set("byEmployeesAmount", reportObject.retrieveTotalAmount(employeeTransactions));
}



function getSelectedTransactionPage(transactions, transaction, transactionsPerPage = 2) {

  let itemIdx = transactions.indexOf(transaction);
  let page = Math.ceil(++itemIdx / transactionsPerPage);
  return page;
}

function getStoreToFetchData() {

  if (route.path == "/transactions/ATM") { return transactionStore.getATMTransactions }
  else if (route.path == "/transactions") { return transactionStore.getTransactions }
  else if (route.path == "/transactions/online") { return transactionStore.getOnlineTransactions }
  else if (route.path == "/transactions/byCustomers") { return transactionStore.getTransactionsByCustomers }
  else if (route.path == "/transactions/byEmployees") { return transactionStore.getTransactionsByEmployees }




}


async function retrieveMinimumAmountTransaction(transactions, transactionsData) {

  let res = reportObject.retrieveMinimumAmount(transactions)["id"];
  let store = getStoreToFetchData()

  for (let index = 0; index < transactions.length; index++) {
    let item = transactions[index];
    if (item.id == res) {
      let itemPage = getSelectedTransactionPage(store, item)
      transactionsData.set("minimumAmountItemId", item.id)
      transactionsData.set("minimumAmountItemIdPage", itemPage)


    }
  }
}

async function retrieveMaximumAmountTransaction(transactions, transactionsData) {

  let res = reportObject.retrieveMaximumAmount(transactions)["id"];
  let store = getStoreToFetchData()


  for (let index = 0; index < transactions.length; index++) {
    let item = transactions[index];
    if (item.id == res) {
      let itemPage = getSelectedTransactionPage(store, item)
      transactionsData.set("maximumAmountItemId", item.id)
      transactionsData.set("maximumAmountItemIdPage", itemPage)
    }
  }

}

defineExpose({
  loadReport,
  loadATMReport,
  loadOnlineReport,
  retrieveMinimumAmountTransaction,
  retrieveMaximumAmountTransaction,
})


</script>


<template>
  <div id="report-container">
    <div>
      <h2>Count</h2>
      <div class="report-data">
        <h2>{{ count }}</h2>
      </div>
      <div v-if="router.currentRoute.value.name === 'ATMTransactions'" id="count-by-type" class="report-data">
        <span><strong>Withdrawals: {{ ATMWithdrawalsCount }}</strong></span><span><strong>Deposits: {{ ATMDepositsCount
            }}</strong></span>
      </div>
      <div v-if="router.currentRoute.value.name === 'onlineTransactions'" id="count-by-type" class="report-data">
        <span><strong>By customers: {{ OnlineByCustomersCount }}</strong></span><span><strong>By employees: {{
          OnlineByEmployeesCount }}</strong></span>
      </div>

    </div>
    <div>
      <h2>Minimum amount</h2>
      <div class="report-data">
        <h2>€{{ minimumAmount }}</h2>
      </div>
      <router-link v-if="route.path == '/transactions/ATM'"
        :to="{ path: '/transactions/ATM', query: { transactionId: transactionsData.get('minimumAmountItemId'), page: transactionsData.get('minimumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions'"
        :to="{ path: '/transactions', query: { transactionId: transactionsData.get('minimumAmountItemId'), page: transactionsData.get('minimumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/online'"
        :to="{ path: '/transactions/online', query: { transactionId: transactionsData.get('minimumAmountItemId'), page: transactionsData.get('minimumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/byCustomers'"
        :to="{ path: '/transactions/byCustomers', query: { transactionId: transactionsData.get('minimumAmountItemId'), page: transactionsData.get('minimumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/byEmployees'"
        :to="{ path: '/transactions/byEmployees', query: { transactionId: transactionsData.get('minimumAmountItemId'), page: transactionsData.get('minimumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>

    </div>
    <div>
      <h2>Maximum amount</h2>
      <div class="report-data">
        <h2>€{{ maximumAmount }}</h2>
      </div> <router-link v-if="route.path == '/transactions/ATM'"
        :to="{ path: '/transactions/ATM', query: { transactionId: transactionsData.get('maximumAmountItemId'), page: transactionsData.get('maximumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions'"
        :to="{ path: '/transactions', query: { transactionId: transactionsData.get('maximumAmountItemId'), page: transactionsData.get('maximumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/online'"
        :to="{ path: '/transactions/online', query: { transactionId: transactionsData.get('maximumAmountItemId'), page: transactionsData.get('maximumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/byCustomers'"
        :to="{ path: '/transactions/byCustomers', query: { transactionId: transactionsData.get('maximumAmountItemId'), page: transactionsData.get('maximumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>
      <router-link v-else-if="route.path == '/transactions/byEmployees'"
        :to="{ path: '/transactions/byEmployees', query: { transactionId: transactionsData.get('maximumAmountItemId'), page: transactionsData.get('maximumAmountItemIdPage') } }"
        class="link-to-transaction" id="transaction">View transaction</router-link>

    </div>
    <div>
      <h2>Total amount</h2>
      <div class="report-data">
        <h2>€{{ totalAmount }}</h2>
      </div>
      <div v-if="router.currentRoute.value.name === 'ATMTransactions'" id="amount-by-type" class="report-data">
        <span><strong>Withdrawals: €{{ ATMWithdrawalsAmount }}</strong></span><span><strong>Deposits: €{{
          ATMDepositsAmount }}</strong></span>
      </div>
      <div v-if="router.currentRoute.value.name === 'onlineTransactions'" id="count-by-type" class="report-data">
        <span><strong>By customers:€ {{ OnlineByCustomersAmount }}</strong></span><span><strong>By employees: €{{
          OnlineByEmployeesAmount }}</strong></span>
      </div>

    </div>
  </div>
</template>



<style scoped>
#report-container {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}

#report-container {
  height: 65vh;
  position: relative;
  text-align: center;
}


#report-container h2 {
  text-align: center;
  margin-top: 5vh;
  line-height: 1;
}

.report-data {
  border: 5px solid #43A801;
  background-color: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100px;

}

#count-by-type,
#amount-by-type {
  margin-top: 160px;
  border: none;
  border-radius: 0%;
  background-color: inherit;
  width: auto;
  height: auto;
}

#count-by-type span,
#amount-by-type span {
  background-color: #238402;
  width: 100%;
  font-size: large;
}

.link-to-transaction {
  padding-left: 5px;
  padding-right: 5px;
  background-color: transparent;
}

.link-to-transaction:hover,
.transaction-category-link:hover {
  text-emphasis: none;
  text-decoration: none;
  background-color: transparent;
}


#report-container div {
  display: flex;
  flex-direction: column;
  align-items: center;
}


#report-container div:first-child:not(.report-data) {
  background-color: #238402;
  width: inherit;
}

#report-container div:nth-child(2n):not(.report-data) {
  background-color: white;
  width: inherit;
}

#report-container div:nth-child(3n):not(.report-data) {
  background-color: #FAAF23;
  width: inherit;
}

#report-container div:nth-child(4n):not(.report-data) {
  background-color: #238402;
}

#transaction {
  margin-top: 180px;
  text-decoration: underline;
  color: blue;
}


@media only screen and (max-width:768px) {


  #report-container {
    height: 300vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: static;
  }

  .report-data {

    position: static;

  }


  #report-container div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #report-container div:first-child:not(.report-data) {
    height: inherit;
    width: inherit;
  }

  #report-container div:nth-child(2n):not(.report-data) {
    height: inherit;
    width: inherit;
  }

  #report-container div:nth-child(3n):not(.report-data) {
    height: inherit;
    width: inherit;
  }


  #report-container div:nth-child(4n):not(.report-data) {
    height: inherit;
    width: inherit;
  }

  #transaction {
    margin-top: 50px;
  }


  #count-by-type,
  #amount-by-type {
    margin-top: 20px;
  }

  #user h5 {
    font-size: medium;

  }
}



@media only screen and (min-width:768px) and (max-width:1280px) {


  #report-container {
    height: 70vh;

  }

  #count-by-type,
  #amount-by-type {
    margin-top: 150px;
  }
}
</style>
