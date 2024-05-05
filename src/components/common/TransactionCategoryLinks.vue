<template>
        <div class="grid">
        <div>
        <router-link :to="{ path : '/transactions/ATM' }" class="transaction-category-link">
            <button @click="viewAllTransactions">ATM</button>
            </router-link>
        </div>
        <div> 
            <router-link :to="{ path : '/transactions/byCustomers' }" class="transaction-category-link">
                <button @click="viewAllTransactions">By customers</button>
                </router-link>
         </div>

             <div> 
            <router-link :to="{ path : '/transactions/byEmployees' }" class="transaction-category-link">
                <button @click="viewAllTransactions" >By employees</button>
                </router-link>
         </div>
       
       <div> 
            <router-link :to="{ path : '/transactions/online' }" class="transaction-category-link">
                <button @click="viewAllTransactions">Online</button>
                </router-link>
         </div>
         </div>
        
</template>


<script setup>
function viewAllTransactions() {
  document.getElementById("transactions-table").style.display = "table";
  document.getElementById("report-container").style.display = "none";
}

</script>


<style scoped>

@import "../../assets/transactionPage.css"


</style>