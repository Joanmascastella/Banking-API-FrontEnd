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
  viewReport,
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
            title="View transaction" @click="viewTransaction"><img id="transaction"
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


 #report-container {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
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

#transaction {
  width: 50px;
  height: 50px;
  margin-top: 180px;
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
}}


</style>
