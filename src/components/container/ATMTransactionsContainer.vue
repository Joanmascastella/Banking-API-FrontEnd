<template>
  <Suspense>
    <main>
      <ATMTransactionsTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import ATMTransactionsTable from '../common/ATMTransactionsTable.vue'

</script>

