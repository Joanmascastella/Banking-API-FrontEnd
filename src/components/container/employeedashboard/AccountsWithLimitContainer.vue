<template>

  <h3>with absolute limit less than or equal to €{{ route.query.absoluteLimit }}</h3>

  <div v-show="!accountStore.errorMessage" id="accountsContainer"> 

    <Pagination :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage"
      :paginatedItems="paginatedItems" />

    <AccountsTable ref="user" :accountListing="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
      @update-totalLimit="updateTotalLimit" />

  <AccountsContainer ref="accountManager"></AccountsContainer>

  <b-button  v-b-tooltip.hover title="List all accounts" @click="listAllAccounts"> <img
      id="accounts-list" src="../../../assets/img/account-details-icon.png"> </b-button>
  </div>
<div v-show="accountStore.errorMessage === 403"> 
  You are not authorized to view this page
</div>

</template>

<script setup>
import AccountsTable from '../../common/employee/AccountsTable.vue'
import { ref, reactive, computed, onMounted } from 'vue';
import { accounts } from "../../../stores/accounts";
import { useRoute, useRouter } from 'vue-router'
import Pagination from '../../common/employee/Pagination.vue';
import AccountsContainer from './AccountsContainer.vue';



const accountStore = accounts();
const ownersOfAccounts = reactive(new Map());
const route = useRoute()
const router = useRouter()
let paginatedItems = ref([])
const accountsCount = ref(null)
const user = ref(null)
const accountManager = ref(null)



const pages = reactive({
  actualPage: route.query.page ? route.query.page : 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(accountsCount.value / pages.perPage)
  ),
});



async function load() {

  await accountStore.retrieveAccountsByAbsoluteLimit(route.query.absoluteLimit);
  accountsCount.value = accountStore.getAccountsWithLimit.length;
  user.value.retrieveUser(accountStore.getAccountsWithLimit, ownersOfAccounts);
  paginateItems();
}


function paginateItems() {
  paginatedItems.value = accountStore.getPaginatedItems(pages, "accountsWithLimit");
}

function displayNewPage() {
  router.push({ path: '/accounts/byAbsoluteLimit', query: { absoluteLimit: route.query.absoluteLimit, page: pages.actualPage } });
  paginateItems()
}

async function updateTotalLimit(updatedAccount) {
  accountManager.value.updateTotalLimit(updatedAccount)
}




function listAllAccounts() {

  router.push('/accounts/customers');

}

onMounted(() => {
  load()
})


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


#accountsContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
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