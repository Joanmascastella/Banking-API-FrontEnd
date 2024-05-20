
<script setup>
import { useRouter } from 'vue-router'
import { users } from "../../../stores/users";

const userStore = users();
const router = useRouter()


defineProps({
  transactions: Array,
  ownersOfAccounts: Map,
});

async function retrieveUser(transactions, accountOwnerData) {

  const usersList = await userStore.retrieveAllUsers();

  for (let index = 0; index < transactions.length; index++) {
    let item = transactions[index];
    let result = usersList.data.filter((user) => user.id === item.userId);
    accountOwnerData.set(item.userId, result[0].firstName + result[0].lastName);
  }
}

defineExpose({
  retrieveUser,
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
              <tr v-for="(item, count) in transactions" :key="item.userId" >
                  <td>{{++count}} </td>
                   <td>{{item.date}} </td>
                   <td v-if="!ownersOfAccounts.has('user')"><div id="customerTransactions">{{ ownersOfAccounts.get(item.userId) }} <router-link v-if="router.currentRoute.value.name==='transactionsByCustomers'" :to="{ path: '/transactions/customer', query: { userId: item.userId }}"><button>View transactions</button></router-link></div></td>
                  <td v-if="item.fromAccount != 'ATM'"><div>{{item.fromAccount}}  <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img class="account" src="../../../assets/img/account-details-icon.png"></b-button></router-link></div></td>
                  <td v-else>{{item.fromAccount}}</td>
                  <td v-if="item.toAccount != 'ATM'">{{item.toAccount}} <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img class="account" src="../../../assets/img/account-details-icon.png"></b-button></router-link></td>
                  <td v-else>{{item.toAccount}}</td>
                  <td>€{{item.amount}} </td>
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

.link:hover {
  text-emphasis: none;
  text-decoration: none;
  background-color: white;
}


.account{ width: 35%;}

button {font-size:medium;
padding:5px;
background-color: #43A801;
border:none;}

#customerTransactions {display:flex;
flex-direction:column;
width:fit-content;}
@media only screen and (max-width:768px) {

table {
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
}
}

@media only screen and (min-width:1080px) {

  .account{ width: 20%;}

}
</style>

