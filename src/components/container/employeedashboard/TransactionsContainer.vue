<template>

  <Pagination v-if="!transactionsListing.error" ref="pagination" :pages="pages" @newPage="displayNewPage"
    :pageQuery="pages.actualPage" :paginatedItems="paginatedItems" />

  <TransactionCategoryLinks v-if="!transactionsListing.error" ref="child" />

  <div v-if="!transactionsListing.error" id="transactions">

    <TransactionsTableTemplate :transactions="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
      :accountsData="accountsData" ref="user" />
  </div>
  <div v-else-if="transactionsListing.error === 403">You are not authorized to view this page</div>


  <TransactionReport ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"
    :maximumAmount="reportData.get('maximumAmount')" :totalAmount="reportData.get('totalAmount')" />

  <b-button v-if="!transactionsListing.error" v-b-tooltip.hover title="View all transactions" id="report-link"
    @click="viewAllTransactions()"> <img id="transaction-list" src="../../../assets/img/transactions.png"> </b-button>
  <b-button v-if="!transactionsListing.error" v-b-tooltip.hover title="View transaction report" id="report-link"
    @click="viewReport()"> <img id="transaction-report" src="../../../assets/img/transaction-report-icon.png">
  </b-button>

</template>

<script setup>

import { ref, onMounted, reactive, computed } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import TransactionReport from "../../common/employee/TransactionReport.vue";
import { transactions } from "../../../stores/transactions";
import Pagination from '../../common/employee/Pagination.vue';
import { useRouter } from 'vue-router';




const transactionsListing = ref([])
const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const child = ref(null)
const obj = reactive({ transactionsListing })
const reportData = reactive(new Map())
const report = ref(null)
const user = ref(null)
let paginatedItems = ref([])
const transactionsCount = ref(null)
const pagination = ref(null)
const router = useRouter()



const pages = reactive({
  actualPage: 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});



async function load() {

  transactionsListing.value = await transactionStore.retrieveAllTransactions();
  transactionsCount.value = obj.transactionsListing.data.length;

  user.value.retrieveUser(obj.transactionsListing.data, ownersOfAccounts);
  user.value.retrieveAccountData(obj.transactionsListing.data, accountsData);
  report.value.loadReport(reportData, obj.transactionsListing.data);

  paginateItems()
}

load()

function paginateItems() {

  pagination.value.paginate(transactionsListing.value.data);
  paginatedItems.value = pagination.value.props.paginatedItems.value;

}


function displayNewPage() {
  router.push({ path: '/transactions', query: { page: pages.actualPage } });
  load();
}

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
@import "../../../assets/transactionContainer.css"
</style>
