<template>
    <div class="grid">
        <div>
            <router-link :to="{ path : '/transactions/ATM' }" class="transaction-category-link">
                <button>ATM</button>
            </router-link>
        </div>
        <div> 
            <router-link :to="{ path : '/transactions/byCustomers' }" class="transaction-category-link">
                <button>By customers</button>
            </router-link>
        </div>

        <div> 
            <router-link :to="{ path : '/transactions/byEmployees' }" class="transaction-category-link">
                <button>By employees</button>
            </router-link>
        </div>
       
       <div> 
            <router-link :to="{ path : '/transactions/online' }" class="transaction-category-link">
                <button>Online</button>
            </router-link>
        </div>

        <div>
            <router-link :to="{ path : '/make/transfer' }" class="transaction-category-link">
                <button>Create</button>
            </router-link>
        </div>
    </div>
        
</template>


<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

function viewAllTransactions() {
if (router.currentRoute.value.name === 'transactions'){
    router.go(0);
}
router.push({ path: '/transactions' });

}

defineExpose({
  viewAllTransactions
})


</script>


<style scoped>

.grid {
  min-width: 90vw;
  margin-bottom: 10px;
}

button {
  border: none;
  width: 100%;
}



@media only screen and (max-width:1280px) {

button{
 font-size:smaller;
font-weight:bold;
height:100%;

}}


</style>