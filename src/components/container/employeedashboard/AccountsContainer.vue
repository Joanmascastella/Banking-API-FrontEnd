<template>

  <div id="pagination-container">
    <Pagination ref="pagination" :pages="pages" @newPage="displayNewPage" />
  </div>

  <AccountsTable :accountListing="paginatedItems" :ownersOfAccounts="ownersOfAccounts"
    @update-totalLimit="updateTotalLimit" />

  <b-button v-b-tooltip.hover title="List all accounts" @click="listAllAccounts"> <img id="accounts-list"
      src="../../../assets/img/account-details-icon.png"> </b-button>

  <b-button v-b-tooltip.hover title="Filter by absolute limit" @click="filterAccounts"> <img id="absolute-limit-filter"
      src="../../../assets/img/filter-accounts.png"> </b-button>

  <div id="filter-container">
    <div>

      <h2> Filter by absolute limit</h2>
      <p>Find all accounts with an absolute limit less than or equal to a specific limit</p>
      <input type="text" name="text" placeholder="€3000" aria-label="Text" ref="limit" />
      <button @click="listAccountsByAbsoluteLimit">List accounts</button>
    </div>
  </div>
</template>

<script setup>

import AccountsTable from '../../common/employee/AccountsTable.vue';
import { ref, reactive, onMounted, computed } from 'vue';
import { accounts } from "../../../stores/accounts";
import { users } from "../../../stores/users";
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import Pagination from '../../common/employee/Pagination.vue';


const accountsListing = ref([]);
const accountStore = accounts();
const userStore = users();
const ownersOfAccounts = reactive(new Map());
const obj = reactive({ accountsListing })
const limit = ref(null)
const router = useRouter()
let paginatedItems = ref([])
const route = useRoute()
const accountsCount = ref(null)

const pages = reactive({
  actualPage: 1,
  perPage: 2,
  pagesCount: computed(() =>
    Math.ceil(accountsCount.value / pages.perPage)
  ),
});



async function load() {

  accountsListing.value = await accountStore.retrieveAllAccounts();

  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < obj.accountsListing.data.length; index++) {
    let item = obj.accountsListing.data[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    ownersOfAccounts.set(item.userId, result[0].firstName + result[0].lastName);
  }

  paginateItems();
}

load()


onMounted(() => {
  document.getElementById("filter-container").style.display = "none";
})


function paginateItems() {

  route.query.page = pages.actualPage;
  accountsCount.value = obj.accountsListing.data.length;
  const start = (route.query.page - 1) * pages.perPage;
  const stop = start + pages.perPage;

  paginatedItems.value = accountsListing.value.data.slice(start, stop);

}


function displayNewPage() {
  router.push({ path: '/accounts/customers', query: { page: pages.actualPage } });
  load();
}


function filterAccounts() {
  document.getElementById("filter-container").style.display = "flex";
  document.getElementById("filter-container").style.justifyContent = "space-around";
  document.getElementById("accounts-table").style.display = "none";
  document.getElementById("pagination-container").style.display = "none";
}

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

function listAllAccounts() {

  router.go(0);

}



</script>

<style scoped>
#absolute-limit-filter,
#accounts-list {
  position: absolute;
  right: 0.5%;
  top: 15%;
  border: 5px solid #b9faae;
  background-color: white;
  padding: 5px;
  border-radius: 25px;

}

#accounts-list {
  right:105px;
  padding: 7px;
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
}

#filter-container h2 {
  text-align: center;
  margin-top: 10vh;
}


button {
  background-color: #43A801;
  border: none;
}



/*mobile*/

@media only screen and (max-width:768px) {

  #absolute-limit-filter,
  #accounts-list {
    position: absolute;
    top: 15%;
    width: 70px;
    height: 70px;
  }

  #accounts-list {
    right: 75px;
  }

  /*  I commented out this line because I added horizontal scrolling to the child component

  #accounts-table {
    overflow-x: auto;
  } */

}


/*tablet*/
@media only screen and (min-width:768px) and (max-width:1280px) {

  #absolute-limit-filter,
  #accounts-list {
    position: absolute;
    top: 15%;
  }

  #accounts-list {
    right: 105px;
  }

  /* I commented out this line because I added horizontal scrolling to the child component

  #accounts-table {
    overflow-x: auto;
  } */


}
</style>