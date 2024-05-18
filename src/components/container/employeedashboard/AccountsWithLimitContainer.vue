<template>

  <h3>with absolute limit less than or equal to €{{ route.query.absoluteLimit }}</h3>

  <div id="pagination-container">
    <Pagination ref="pagination" :pages="pages" @newPage="displayNewPage" />
  </div>

  <AccountsTable :accountListing="paginatedItems" :ownersOfAccounts="ownersOfAccounts" />


  <b-button v-b-tooltip.hover title="List all accounts" @click="listAllAccounts"> <img id="accounts-list"
      src="../../../assets/img/account-details-icon.png"> </b-button>

</template>

<script setup>
import AccountsTable from '../../common/employee/AccountsTable.vue'
import { ref, reactive, computed } from 'vue';
import { accounts } from "../../../stores/accounts";
import { users } from "../../../stores/users";
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../common/employee/Pagination.vue';



const accountsListing = ref([]);
const accountStore = accounts();
const userStore = users();
const ownersOfAccounts = reactive(new Map());
const obj = reactive({ accountsListing })
const route = useRoute()
const router = useRouter()
let paginatedItems = ref([])
const accountsCount = ref(null)

const pages = reactive({
  actualPage: 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(accountsCount.value / pages.perPage)
  ),
});



async function load() {

  accountsListing.value = await accountStore.retrieveAccountsByAbsoluteLimit(route.query.absoluteLimit);

  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < obj.accountsListing.data.length; index++) {
    let item = obj.accountsListing.data[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    ownersOfAccounts.set(item.userId, result[0].firstName + result[0].lastName);
  }

  paginateItems()
}

load()

function paginateItems() {

  route.query.page = pages.actualPage;
  accountsCount.value = obj.accountsListing.data.length;
  const start = (route.query.page - 1) * pages.perPage;
  const stop = start + pages.perPage;

  paginatedItems.value = accountsListing.value.data.slice(start, stop);

}


function displayNewPage() {
  router.push({ path: '/accounts/byAbsoluteLimit', query: { absoluteLimit: route.query.absoluteLimit, page: pages.actualPage } });
  load();
}



function listAllAccounts() {

  router.push('/accounts/customers');

}

</script>

<style scoped>
#accounts-list {
  position: absolute;
  right: 0.5%;
  top: 15%;
  border: 5px solid #b9faae;
  background-color: white;
  padding: 5px;
  border-radius: 25px;

}


h2 {
  font-weight: initial;
}


/*mobile*/

@media only screen and (max-width:768px) {

  #accounts-list {
    position: absolute;
    top: 15%;
    width: 70px;
    height: 70px;
  }

}


/*tablet*/
@media only screen and (min-width:768px) and (max-width:1280px) {
  #accounts-list {
    position: absolute;
    top: 15%;
  }
}
</style>