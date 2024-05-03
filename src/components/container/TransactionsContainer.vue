<template>
  <Suspense>
    <main>
      <TransactionsTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import TransactionsTable from '../common/TransactionsTable.vue'

</script>

