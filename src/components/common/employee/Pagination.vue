<script setup>


defineProps({
  pages: null,
});


</script>

<template>

  <div style="text-align: right" id="pagination">
    <button :disabled="pages.actualPage <= 1" @click="pages.actualPage--; $emit('newPage')">
      < </button>
        Page {{ pages.actualPage }} of {{ pages.pagesCount }}
        <button :disabled="pages.actualPage >= pages.pagesCount" @click="pages.actualPage++; $emit('newPage')">
          >
        </button>
  </div>
</template>

<style scoped>
#pagination {
  margin: 10px;
}

#pagination button {
  background-color: #dd5602;
  border: none;
  font-size: medium;
  padding: 10px;
}
</style>
