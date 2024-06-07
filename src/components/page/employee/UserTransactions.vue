<script setup>
import UserTransactionsContainer from "../../container/employeedashboard/UserTransactionsContainer.vue";
</script>

<template>
  <div class="content">
    <UserTransactionsContainer />
  </div>
</template>


<style scoped>
.content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
