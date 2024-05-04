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
                  <td v-if="item.fromAccount != 'ATM'">{{item.fromAccount}}  <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img src="../../assets/img/account-details-icon.png"></b-button></router-link></td>
                  <td v-else>{{item.fromAccount}}</td>
                  <td v-if="item.toAccount != 'ATM'">{{item.toAccount}} <router-link :to="{ path : '#' }" class="link"><b-button v-b-tooltip.hover title="View account details"><img src="../../assets/img/account-details-icon.png"></b-button></router-link></td>
                  <td v-else>{{item.toAccount}}</td>
                  <td>€{{item.amount}} </td>
              </tr>
            </tbody>
        </table>

        <div id="report-container">
        <div><h2>Count</h2><div class="report-data"><h2>{{report.get("count")}}</h2></div></div>
        <div><h2>Minimum amount</h2><div class="report-data"><h2>€{{report.get("minimumAmount")}}</h2></div><router-link :to="{ path : '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover title="View transaction"><img id="transaction" src="../../assets/img/transactions.png"></b-button></router-link></div>
        <div><h2>Maximum amount</h2><div class="report-data"><h2>€{{report.get("maximumAmount")}}</h2></div><router-link :to="{ path : '#' }" class="link-to-transaction"><b-button v-b-tooltip.hover title="View transaction"><img id="transaction" src="../../assets/img/transactions.png"></b-button></router-link></div>
        <div><h2>Total amount</h2><div class="report-data"><h2>€{{report.get("totalAmount")}}</h2></div></div>
        </div>
     <b-button v-b-tooltip.hover title="View all transactions" id="report-link" @click="viewAllTransactions()"> <img id="transaction-list" src="../../assets/img/transactions.png"> </b-button>
     <b-button v-b-tooltip.hover title="View transaction report" id="report-link" @click="viewReport()"> <img id="transaction-report" src="../../assets/img/transaction-report-icon.png"> </b-button>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'

const transactions=ref([])


onMounted(() => {
      document.getElementById("report-container").style.display = "none";
})

const { data } = await axios.get('http://localhost:8080/transactions')
transactions.value = data

let report = new Map();

let count = 0;
let totalAmount = 0;

data.forEach((item , count) => { 

count+=1;
report.set("count", count);});

data.forEach((item , count) => { if (item.amount < data[0].amount){

report.set("minimumAmount", item.amount);}});

data.forEach((item , count) => { if (item.amount > data[0].amount){

report.set("maximumAmount", item.amount);}});

data.forEach((item , count) => { if (item.amount > data[0].amount){

report.set("maximumAmount", item.amount);}});

data.forEach((item , count) => { 
totalAmount+=item.amount;
report.set("totalAmount", totalAmount);});


function viewReport() {
  document.getElementById("report-container").style.display = "flex";
  document.getElementById("report-container").style.justifyContent = "space-around";
  document.getElementById("transactions-table").style.display = "none";

}

function viewAllTransactions() {    
  document.getElementById("transactions-table").style.display = "table";
  document.getElementById("report-container").style.display = "none";

}


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

table, #report-container {
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
  overflow:hidden;
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

#transaction-list {
position:fixed;
right:0;
bottom:20%;
border:5px solid #D0FAC9;
background-color:white;
padding:5px;
border-radius: 25px;
width:95px;
height:95px;

}

#transaction-report{
position:fixed;
right:0;
bottom:5%;
border:5px solid #D0FAC9;
background-color:white;
padding:5px;
border-radius: 25px;

}

.link:hover{  
text-emphasis: none;
text-decoration: none;
background-color:white;
}



#report-container {
height:65vh;
position:relative;
text-align:center;
}


#report-container h2 {
 text-align: center;
  margin-top:5vh;
  line-height:1;
}

.report-data{
border:5px solid #43A801;
background-color:white;
border-radius: 50%;
width:150px;
height:150px;
display:flex;
align-items:center;
justify-content:center;
position:absolute;
top:120px;

}

#transaction{
width:50px;
height:50px;
margin-top:180px;
}

.link-to-transaction{
padding-left:5px;
padding-right:5px;
background-color:transparent;}

.link-to-transaction:hover
{  
    text-emphasis: none;
    text-decoration: none;
    background-color:transparent;
}


#report-container div
{   display:flex;
    flex-direction:column;
    align-items:center;
}


#report-container div:first-child:not(.report-data)
{
    background-color:#238402;
        width:inherit;
}

#report-container div:nth-child(2n):not(.report-data){
    background-color:#FAAF23;
        width:inherit;
}

#report-container div:nth-child(3n):not(.report-data){
    background-color:yellow;
        width:inherit;
}

#report-container div:nth-child(4n):not(.report-data){
    background-color:#238402;
}






/*mobile*/

@media only screen and (max-width:768px) {

#transaction-list {
position:absolute;
right:65px;
top:15%;
width:64px;
height:64px;

}

#transaction-report{
position:absolute;
right:0;
top:15%;
width:64px;
height:64px;
}

#report-container {
height:300vh;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
position:static;
}

.report-data{

    position:static;
   
}


#report-container div{
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
}

#report-container div:first-child:not(.report-data){
    background-color:#238402;
      height:inherit;
    width:inherit;
}

#report-container div:nth-child(2n):not(.report-data){
    background-color:orange;
      height:inherit;
    width:inherit;
}

#report-container div:nth-child(3n):not(.report-data){
    background-color:yellow;
      height:inherit;
    width:inherit;
}


#report-container div:nth-child(4n):not(.report-data){
    background-color:#238402;
      height:inherit;
    width:inherit;
}

#transaction{

margin-top:50px;
}


}


@media only screen and (min-width:768px) and (max-width:1280px) {

#transaction-list {
position:absolute;
right:90px;
top:15%;
width:85px;
height:85px;

}

#transaction-report{
position:absolute;
right:0;
top:15%;
width:85px;
height:85px;
}

#report-container {
height:70vh;

}

}

</style>