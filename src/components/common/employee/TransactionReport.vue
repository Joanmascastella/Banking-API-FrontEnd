<script setup>
import { transactionReport } from "../../../stores/transactionReport";
import { useRouter } from 'vue-router'

const router = useRouter()
const reportObject = transactionReport();


defineProps({
  count: Number,
  minimumAmount: Number,
  maximumAmount: Number,
  totalAmount:Number,
  ATMWithdrawalsCount: Number,
  ATMDepositsCount: Number,
  ATMWithdrawalsAmount: Number,
  ATMDepositsAmount: Number,
  OnlineByEmployeesCount: Number,
  OnlineByCustomersCount: Number,
  OnlineByEmployeesAmount: Number,
  OnlineByCustomersAmount: Number,

});


function loadReport(reportMap, transactions) {

reportMap.set("count", reportObject.retrieveCount(transactions));
reportMap.set("minimumAmount", reportObject.retrieveMinimumAmount(transactions));
reportMap.set("maximumAmount", reportObject.retrieveMaximumAmount(transactions));
reportMap.set("totalAmount", reportObject.retrieveTotalAmount(transactions));
}

function loadATMReport(reportMap, transactions){
reportMap.set("ATMWithdrawalsCount", reportObject.retrieveATMWithdrawalsCount(transactions));
reportMap.set("ATMDepositsCount", reportObject.retrieveATMDepositsCount(transactions));
reportMap.set("ATMWithdrawalsAmount", reportObject.retrieveATMWithdrawalsAmount(transactions));
reportMap.set("ATMDepositsAmount", reportObject.retrieveATMDepositsAmount(transactions));


}

function loadOnlineReport(reportMap, customerTransactions, employeeTransactions){
reportMap.set("byCustomersCount", reportObject.retrieveCount(customerTransactions));
reportMap.set("byEmployeesCount", reportObject.retrieveCount(employeeTransactions));
reportMap.set("byCustomersAmount", reportObject.retrieveTotalAmount(customerTransactions));
reportMap.set("byEmployeesAmount", reportObject.retrieveTotalAmount(employeeTransactions));
}


function viewReport() {
document.getElementById("report-container").style.display = "flex";
document.getElementById("report-container").style.justifyContent = "space-around";
document.getElementById("transactions-table").style.display = "none";

}


defineExpose({
  loadReport,
  loadATMReport,
  loadOnlineReport,
  viewReport
})


</script>


<template>
<div id="report-container">
      <div>
        <h2>Count</h2>
        <div class="report-data">
          <h2>{{ count }}</h2>
        </div>
        <div v-if="router.currentRoute.value.name === 'ATMTransactions'" id="count-by-type" class="report-data"><span><strong>Withdrawals: {{ ATMWithdrawalsCount }}</strong></span><span><strong>Deposits: {{ ATMDepositsCount }}</strong></span></div>
        <div v-if="router.currentRoute.value.name === 'onlineTransactions'" id="count-by-type" class="report-data"><span><strong>By customers: {{ OnlineByCustomersCount }}</strong></span><span><strong>By employees: {{ OnlineByEmployeesCount }}</strong></span></div>

      </div>
      <div>
        <h2>Minimum amount</h2>
        <div class="report-data">
          <h2>€{{ minimumAmount }}</h2>
        </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
            title="View transaction"><img id="transaction"
              src="../../../assets/img/transactions.png"></b-button></router-link>
      </div>
      <div>
        <h2>Maximum amount</h2>
        <div class="report-data">
          <h2>€{{ maximumAmount }}</h2>
        </div><router-link :to="{ path: '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover
            title="View transaction"><img id="transaction"
              src="../../../assets/img/transactions.png"></b-button></router-link>
      </div>
      <div>
        <h2>Total amount</h2>
        <div class="report-data">
          <h2>€{{ totalAmount }}</h2>
        </div>
        <div v-if="router.currentRoute.value.name === 'ATMTransactions'" id="amount-by-type" class="report-data"><span><strong>Withdrawals: €{{ ATMWithdrawalsAmount }}</strong></span><span><strong>Deposits: €{{ ATMDepositsAmount }}</strong></span></div>
        <div v-if="router.currentRoute.value.name === 'onlineTransactions'" id="count-by-type" class="report-data"><span><strong>By customers:€ {{ OnlineByCustomersAmount }}</strong></span><span><strong>By employees: €{{ OnlineByEmployeesAmount }}</strong></span></div>

      </div>
    </div>
</template>



<style scoped>

@import "../../../assets/transactionPage.css"

</style>
