<template>
  <SubNavigation v-show="!transactionStore.errorMessage"></SubNavigation>

  <div v-show="!transactionStore.errorMessage" id="transactionsContainer">

    <h1 v-if="!route.query.report">Transactions by customers</h1>
    <h1 v-else>Transactions by customers summary</h1>

    <Pagination v-show="!route.query.report" :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage"
      :paginatedItems="paginatedItems" />

    <TransactionCategoryLinks v-show="!route.query.report" />

    <TransactionsTableTemplate v-show="!route.query.report" :transactions="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
      :accountsData="accountsData" :pages="pages" ref="user" />

    <TransactionReport v-show="route.query.report" ref="report" :count="reportData.get('count')" :minimumAmount="reportData.get('minimumAmount')"
      :maximumAmount="reportData.get('maximumAmount')" :totalAmount="reportData.get('totalAmount')"
      :transactionsData="transactionsData" />

  </div>
  <div v-show="transactionStore.errorMessage" id="error-message">
    {{ transactionStore.errorMessage }}
  </div>

</template>

<script setup>

import { ref, onMounted, reactive, computed, watch } from 'vue'
import TransactionCategoryLinks from "../../common/employee/TransactionCategoryLinks.vue";
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import TransactionReport from "../../common/employee/TransactionReport.vue";
import { transactions } from "../../../stores/transactions";
import Pagination from '../../common/employee/Pagination.vue';
import { useRouter, useRoute } from 'vue-router';
import SubNavigation from '../../common/employee/SubNavigation.vue';


const transactionStore = transactions();
const ownersOfAccounts = reactive(new Map());
const accountsData = reactive(new Map());
const transactionsData = reactive(new Map());
const reportData = reactive(new Map())
const report = ref(null)
const user = ref(null)
let paginatedItems = ref([])
const transactionsCount = ref(null)
const router = useRouter()
const route = useRoute()


const pages = reactive({
  actualPage: route.query.page ? route.query.page : 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(transactionsCount.value / pages.perPage)
  ),
});


async function load() {

  await transactionStore.retrieveTransactionsByCustomers();
  transactionsCount.value = transactionStore.getTransactionsByCustomers.length;
  user.value.retrieveAccountData(transactionStore.getTransactionsByCustomers, accountsData);
  user.value.retrieveUser(transactionStore.getTransactionsByCustomers, ownersOfAccounts);

  report.value.loadReport(reportData, transactionStore.getTransactionsByCustomers);
  report.value.retrieveMinimumAmountTransaction(transactionStore.getTransactionsByCustomers, transactionsData);
  report.value.retrieveMaximumAmountTransaction(transactionStore.getTransactionsByCustomers, transactionsData);

  paginateItems()

}


function paginateItems() {

  paginatedItems.value = transactionStore.getPaginatedItems(pages, "transactionsByCustomers")

}


function displayNewPage() {
  router.push({ path: '/transactions/byCustomers', query: { page: pages.actualPage } });
  paginateItems();
}

watch(() => route.query.transactionId, () => {
  router.go(0)
})

onMounted(() => {
  load()
})



</script>


<style scoped>
@import "../../../assets/transactionContainer.css"
</style>
