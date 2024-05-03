<template>
 <div class="content">
        <h2>Transactions</h2>

        <div class="grid">
        <div>
        <router-link :to="{ path : '/transactions/ATM' }">
            <button>ATM</button>
            </router-link>
        </div>
        <div> 
            <router-link :to="{ path : '/transactions/byCustomers' }">
                <button>By customers</button>
                </router-link>
         </div>

             <div> 
            <router-link :to="{ path : '/transactions/byEmployees' }">
                <button>By employees</button>
                </router-link>
         </div>
       
       <div> 
            <router-link :to="{ path : '/transactions/online' }">
                <button>Online</button>
                </router-link>
         </div>
         </div>
        <table>
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
                  <td v-if="item.fromAccount != 'ATM'">{{item.fromAccount}}  <b-button v-b-tooltip.hover title="View account details"><router-link :to="{ path : '#' }"><img src="../../assets/img/account-details-icon.png"></router-link></b-button></td>
                  <td v-else>{{item.fromAccount}}</td>
                  <td v-if="item.toAccount != 'ATM'">{{item.toAccount}}  <b-button v-b-tooltip.hover title="View account details"><router-link :to="{ path : '#' }"><img src="../../assets/img/account-details-icon.png"></router-link></b-button></td>
                  <td v-else>{{item.toAccount}}</td>
                  <td>€{{item.amount}} </td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const transactions=ref([])
const { data } = await axios.get('http://localhost:8080/transactions')
transactions.value = data


</script>

<style scoped>

h2 {text-align: center;
margin-top:20vh;}


.content {
min-height:100vh;
display:flex;
align-items:center;
flex-direction:column;
margin-left:5%;
margin-right:5%;
}

table th{background-color:#FCC26B;}
table td {background-color: white;}

table, th, td {
  border: transparent;
}
table {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow:hidden
}

.grid{min-width:90vw;
margin-bottom:10px;}

button{border:none;
width:100%;}


.grid div:first-child button {background-color: #F9970A;}
.grid div:nth-child(2n) button {background-color:#43A801;}
.grid div:nth-child(4n) button {background-color:#15CA20;}


 table th,
 table td
{
    text-align: center; 
    vertical-align: middle;
}

</style>