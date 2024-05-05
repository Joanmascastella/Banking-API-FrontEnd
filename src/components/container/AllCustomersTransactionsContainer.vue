<template>
  <Suspense>
    <main>
      <TransactionsByCustomersTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import TransactionsByCustomersTable from '../common/TransactionsByCustomersTable.vue'

</script>

