<template>
<div id="user"><img src="../../../assets/img/user.png"> <h5>{{ ownerOfAccounts.get("user") }}</h5></div>

<Pagination ref="pagination" :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage" :paginatedItems="paginatedItems"/>

  <TransactionsTableTemplate :transactions="paginatedItems"  :ownersOfAccounts="ownerOfAccounts" ref="user"/>

</template>

<script setup>

import { ref, reactive, computed } from 'vue'
import TransactionsTableTemplate from "../../common/employee/TransactionsTableTemplate.vue";
import { transactions } from "../../../stores/transactions";
import { users } from "../../../stores/users";
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../common/employee/Pagination.vue';


const route = useRoute()
const transactionsListing = ref([])
const transactionStore = transactions();
const obj = reactive({ transactionsListing })
const userStore = users();
const ownerOfAccounts = reactive(new Map());
const userId = route.query.userId;
const userData = reactive({ id: userId});
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

  transactionsListing.value = await transactionStore.retrieveTransactionsOfUser(route.query.userId);
  transactionsCount.value = obj.transactionsListing.data.length;

  const usersList = await userStore.retrieveAllUsers();

  let result = usersList.data.filter((user) => userData.id === user.id.toString());

  ownerOfAccounts.set("userId", result[0].id);
  ownerOfAccounts.set("user", result[0].firstName + result[0].lastName);

  paginateItems()

}

load()

function paginateItems() {
pagination.value.paginate(transactionsListing.value.data);
paginatedItems.value = pagination.value.props.paginatedItems.value;

}


function displayNewPage() {

  router.push({ path: '/transactions/history', query: { userId: ownerOfAccounts.get("userId"), page: pages.actualPage } });

load();
}


</script>



<style scoped>

#user {
  display: flex;
  column-gap: 0.5rem;
  margin-top: 0px;
  margin-bottom:5px;
}

#user img {
  width: 28px;
  height: 28px;
  padding: 0px;
  vertical-align: middle;
}

#user h5 {
  color: black;
}






</style>
