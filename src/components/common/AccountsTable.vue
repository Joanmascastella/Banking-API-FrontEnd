<template>
 <div class="content">
        <h2>Accounts</h2>
        <table>
            <thead>
            <tr>
                <th>User Id</th>
                <th>User's name</th>
                <th>Transactions</th>
                <th>Account</th>

            </tr>
            </thead>
            <tbody>
              <tr v-for="item in accounts" :key="item.userId">
                  <td>{{ item.userId }}</td>
                  <td>firstname lastname</td>
                  <td><router-link :to="{ path : '#' }">
                      <button>Account details</button>  </router-link></td>
                  <td><router-link :to="{ path : '#' }">
                     <button>Transactions</button></router-link></td>
                  
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const accounts= ref([])

const { data } = await axios.get('http://localhost:8080/accounts')
accounts.value = data

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

button{border:none;}
td:nth-child(3n) button {background-color: #F9970A;}
td:nth-child(4n) button {background-color:#43A801;}

 table th,
 table td
{
    text-align: center; 
    vertical-align: middle;
}

</style>