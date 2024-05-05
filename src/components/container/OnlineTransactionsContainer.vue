<template>
  <Suspense>
    <main>
      <OnlineTransactionsTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import OnlineTransactionsTable from '../common/OnlineTransactionsTable.vue'

</script>

