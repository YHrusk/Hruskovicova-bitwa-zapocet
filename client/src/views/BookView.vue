<template>
  <div class="row" style="padding-top: 80px">
    <RouterLink class="btn bg-light text-info m-2" to="/">Back</RouterLink>
    <Book :id="book.book_ID" :title="book.title" :image="book.image" :price="book.price" :info="book.info" :publicDate="book.publicDate"/>
  </div>
</template>

<script>
import Book from "../components/Book.vue";

export default {
  name: "BookView.vue",
  components: {Book},
  data() {
    return{
      book: []
    }
  },
  async created() {
    const res = await fetch(`http://localhost:5000/books/${this.$route.params.id}`,{method: 'GET'});
    this.book = await res.json();
    console.log(this.book);
  }
}
</script>

<style scoped>

</style>