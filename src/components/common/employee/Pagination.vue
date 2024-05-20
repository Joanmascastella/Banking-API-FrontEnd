<script setup>


const props = defineProps({
  pages: null,
  pageQuery:null,
  paginatedItems:null,
});

function paginate(itemListing) {
  const start = (props.pageQuery - 1) * props.pages.perPage;
  const stop = start + props.pages.perPage;
  props.paginatedItems.value = itemListing.slice(start, stop);
}

defineExpose({
props,
paginate,
})


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
  margin-top: 10px;
  margin-bottom: 15px;
}

#pagination button {
  background-color: #dd5602;
  border: none;
  font-size: medium;
  padding: 7px;
}
</style>
