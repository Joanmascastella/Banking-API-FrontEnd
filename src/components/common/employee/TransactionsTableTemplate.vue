<script setup>
import { useRouter } from 'vue-router'
import { users } from "../../../stores/users";
import { accounts } from "../../../stores/accounts";


const userStore = users();
const router = useRouter()
const accountStore = accounts();



defineProps({
  transactions: Array,
  ownersOfAccounts: Map,
  accountsData: Map,

});

async function retrieveUser(transactions, accountOwnerData) {

  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < transactions.length; index++) {
    let item = transactions[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    accountOwnerData.set(item.userId, result[0].firstName + result[0].lastName);
  }
}

function getSelectedAccountPage(accounts, account, accountsPerPage = 2) {

  let itemIdx = accounts.indexOf(account);
  let page = Math.ceil(++itemIdx / accountsPerPage);
  return page;
}


async function retrieveAccountData(transactions, accountsData) {

  const accountsList = await accountStore.retrieveAllAccounts();

  for (let index = 0; index < transactions.length; index++) {
    let item = transactions[index];
    accountsList.data.filter((account) => {
      if (account.IBAN === item.fromAccount || account.IBAN === item.toAccount) {
        accountsData.set(account.IBAN, account.id)
        let itemPage = getSelectedAccountPage(accountsList.data, account)
        accountsData.set(`${account.IBAN}page`, itemPage);

      }

    });
  }
}


defineExpose({
  retrieveUser,
  retrieveAccountData

})

</script>

<template>
  <table id="transactions-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Date</th>
        <th v-if="!ownersOfAccounts.has('user')">Initiated by</th>
        <th>From account</th>
        <th>To account</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, count) in transactions" :key="item.userId">
        <td>{{++count }} </td>
        <td>{{ item.date }} </td>
        <td v-if="!ownersOfAccounts.has('user')">
          <div id="customerTransactions">{{ ownersOfAccounts.get(item.userId) }} <router-link
              v-if="router.currentRoute.value.name === 'transactionsByCustomers'"
              :to="{ path: '/transactions/customer', query: { userId: item.userId } }"><button>View
                transactions</button></router-link></div>
        </td>
        <td v-if="item.fromAccount != 'ATM'"><router-link
            :to="{ path: '/accounts/customers', query: { accountId: accountsData.get(item.fromAccount), page: accountsData.get(`${item.fromAccount}page`) } }"
            class="link"><b-button v-b-tooltip.hover title="View account details">{{
              item.fromAccount}}</b-button></router-link></td>
        <td v-else>{{ item.fromAccount }}</td>
        <td v-if="item.toAccount != 'ATM'"><router-link
            :to="{ path: '/accounts/customers', query: { accountId: accountsData.get(item.toAccount), page: accountsData.get(`${item.toAccount}page`) } }"
            class="link"><b-button v-b-tooltip.hover
              title="View account details">{{ item.toAccount }}</b-button></router-link></td>
        <td v-else>{{ item.toAccount }}</td>
        <td>€{{ item.amount }} </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table th {
  background-color: #FCC26B;
}

table td {
  background-color: white;
}

table,
th,
td {
  border: transparent;
}

table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
}


table th,
table td {
  text-align: center;
  vertical-align: middle;
}

.link {
  text-decoration: underline;
  color: rgb(2, 86, 151);
}

.link:hover {
  text-emphasis: none;
  background-color: white;
}


button {
  font-size: medium;
  padding: 5px;
  background-color: #43A801;
  border: none;
}

#customerTransactions {
  display: flex;
  flex-direction: column;
  width: fit-content;
}

@media only screen and (max-width:768px) {

  table {
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
  }
}
</style>
