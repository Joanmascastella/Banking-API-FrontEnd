<script setup>
import AccountsContainer from "../../container/employeedashboard/AccountsContainer.vue";
</script>

<template>
  <div class="content">
    <AccountsContainer />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20vh;
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