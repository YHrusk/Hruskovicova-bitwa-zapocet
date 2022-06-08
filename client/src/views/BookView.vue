<template>
  <div class="row" style="padding-top: 100px">
    <Book :id="book.id" :title="book.title" :image="book.image" :price="book.price" :info="book.info" :publicDate="book.publicDate"/>
    <RouterLink class="btn bg-light text-info m-2" to="/">Back</RouterLink>
  </div>
</template>

<script>
import Book from "../components/Book.vue";

export default {
  name: "BookView.vue",
  components: Book,
  data() {
    return{
      book: []
    }
  },
  async mounted(){
    const id = this.$route.params.id;
    this.book = await this.getData(id);
  },
  methods: {
    async getData(id){
      const res = await fetch(`http://localhost:5000/books/${id}`,
          {method: 'GET',
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'},}
      );
      return res.json();
    }
  }
}
</script>

<style scoped>

</style>