<script setup>
import UserTransactionsContainer from "../../container/employeedashboard/UserTransactionsContainer.vue";
</script>

<template>
   <div class="content">
    <img src="../../../assets/img/savings-account.png">
    <h1>Transactions </h1>
  <UserTransactionsContainer/>
  </div>
</template>


<style scoped>

h1 {
  text-align: center;
  margin-top: 10vh;
  margin-bottom:1.5vh;

}


.content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
