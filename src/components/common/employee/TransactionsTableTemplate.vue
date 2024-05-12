
<script setup>
defineProps({
  transactions: Array,
});
</script>

<template>
   
        <table id="transactions-table">
            <thead>
            <tr>
                <th>Id</th>
                <th>Date</th>
                <th>From account</th>
                <th>To account</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item, count) in transactions" :key="item.userId">
                  <td>{{++count}} </td>
                   <td>{{item.date}} </td>
                  <td v-if="item.fromAccount != 'ATM'">{{item.fromAccount}}  <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img src="../../../assets/img/account-details-icon.png"></b-button></router-link></td>
                  <td v-else>{{item.fromAccount}}</td>
                  <td v-if="item.toAccount != 'ATM'">{{item.toAccount}} <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img src="../../../assets/img/account-details-icon.png"></b-button></router-link></td>
                  <td v-else>{{item.toAccount}}</td>
                  <td>€{{item.amount}} </td>
              </tr>
            </tbody>
        </table>
</template>

<style scoped>

@import "../../../assets/transactionPage.css"

</style>

