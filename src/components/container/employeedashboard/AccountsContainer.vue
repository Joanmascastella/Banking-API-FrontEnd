<template>
  <SubNavigation v-show="!accountStore.errorMessage">
  </SubNavigation>

  <div v-show="!accountStore.errorMessage" id="accountsContainer">

    <div v-show="router.currentRoute.value.name === 'customerAccounts'" id="accountsContainer">

      <h1>Accounts</h1>

      <Pagination v-show="!route.query.filter" :pages="pages" @newPage="displayNewPage" :pageQuery="pages.actualPage"
        :paginatedItems="paginatedItems" />

      <AccountsTable v-if="!route.query.filter" :accountListing="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
        @update-totalLimit="updateTotalLimit" ref="user" />

      <div v-show="route.query.filter" id="filter-container">
        <div>
          <h2> Filter by absolute limit</h2>
          <p>Find all accounts with an absolute limit less than or equal to a specific limit</p>
          <input type="text" name="text" placeholder="€3000" aria-label="Text" ref="limit" />
          <button @click="listAccountsByAbsoluteLimit">List accounts</button>
        </div>
      </div>
    </div>
  </div>
  <div v-show="accountStore.errorMessage === 403">
    You are not authorized to view this page
  </div>
</template>
<script setup>

import AccountsTable from '../../common/employee/AccountsTable.vue';
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { accounts } from "../../../stores/accounts";
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import Pagination from '../../common/employee/Pagination.vue';
import SubNavigation from '../../common/employee/SubNavigation.vue';


const accountStore = accounts();
const ownersOfAccounts = reactive(new Map());
const selectedAccountPage = ref(null);
const limit = ref(null)
const router = useRouter()
const route = useRoute()
let paginatedItems = ref([])
const accountsCount = ref(null)
const user = ref(null)
const filter = ref(false)

const pages = reactive({
  actualPage: route.query.page ? route.query.page : 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(accountsCount.value / pages.perPage)
  ),
});



function retrieveSelectedAccountPage() {
  if (route.query.accountId != null) {
    selectedAccountPage.value = route.query.page;
  }

}

async function load() {
  await accountStore.retrieveAllAccounts();
  accountsCount.value = accountStore.getAccounts.length;
  user.value.retrieveUser(accountStore.getAccounts, ownersOfAccounts);
  paginateItems()
}



function paginateItems() {
  paginatedItems.value = accountStore.getPaginatedItems(pages, "allAccounts");
  retrieveSelectedAccountPage();

}


function displayNewPage() {
  if (selectedAccountPage.value != pages.actualPage) {
    router.push({ path: '/accounts/customers', query: { page: pages.actualPage } });
  }
  paginateItems()

}

watch(() => route.query.page, () => {
  if (selectedAccountPage.value != null) {
    router.go(0)
  }
})


function listAccountsByAbsoluteLimit() {

  let limitTemplateRef = limit.value;
  router.push({ path: '/accounts/byAbsoluteLimit', query: { absoluteLimit: limitTemplateRef.value } });

}

async function updateTotalLimit(updatedAccount) {
  try {
    await accountStore.updateAccountLimit(updatedAccount);
    Swal.fire({
      title: 'Success!',
      text: 'Total limit was updated to ' + updatedAccount.absoluteLimit,
      icon: 'success',
      timer: 1500,
      confirmButtonText: 'OK'
    });
  } catch (error) {
    console.error('Error updating total limit:', error);
  }
}


onMounted(async () => {
  load()


})


defineExpose({
  updateTotalLimit,

})


</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 17vh;
}



#filter-container {
  height: 65vh;
  text-align: center;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  padding-left: 5%;
  padding-right: 5%;
  display:flex;
  justify-content:space-around;
}

#filter-container h2 {
  text-align: center;
  margin-top: 10vh;
}


button {
  background-color: #43A801;
  border: none;
}

#accountsContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}



</style>