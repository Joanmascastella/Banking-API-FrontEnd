<template>
  <Suspense>
    <main>
      <AccountsTable />

    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import AccountsTable from '../common/AccountsTable.vue'

</script>

