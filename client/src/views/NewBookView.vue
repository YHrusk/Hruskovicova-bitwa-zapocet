<template>
  <div class="row">
    <div class="col-8 offset-2">
      <NewBook></NewBook>
    </div>
  </div>
</template>

<script>
import NewBook from "../components/NewBook.vue";

export default {
  name: "NewBookView.vue",
  components: {NewBook}
}
</script>

<style scoped>

</style>