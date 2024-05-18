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


.grid div:first-child button {
  background-color: #F9970A;
}

.grid div:nth-child(2n) button {
  background-color: #43A801;
}

.grid div:nth-child(3n) button {
  background-color: #F9791A;
}

.grid div:nth-child(4n) button {
  background-color: #15CA20;
}


@media only screen and (max-width:1280px) {

button{
 font-size:smaller;
font-weight:bold;
height:100%;

}}


</style>