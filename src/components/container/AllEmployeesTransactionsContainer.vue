<template>
  <Suspense>
    <main>
      <TransactionsByEmployeesTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import TransactionsByEmployeesTable from '../common/TransactionsByEmployeesTable.vue'

</script>

