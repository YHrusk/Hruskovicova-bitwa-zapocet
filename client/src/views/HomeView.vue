<script>
import Preview from "../components/Preview.vue";
import Book from "../components/Book.vue";

export default {
  components: {Preview, Book},

  data() {
    return {
      books: []
    }
  },
  async created() {
    const res = await fetch('http://localhost:5000/books', {method: 'GET'});
    console.log(res);
    this.books = await res.json();
  }
}
</script>

<template>
  <div class="container-fluid p-5">
    <div class="row">
        <div class="col-md-9" v-for="book in books">
          <Preview :id="book.book_ID" :title="book.title" :publicDate="book.publicDate" :info="book.info" :image="book.image"></Preview>
        </div>
    </div>
  </div>
</template>
