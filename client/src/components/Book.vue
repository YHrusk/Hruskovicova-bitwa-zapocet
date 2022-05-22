<template>
  <div class="container" style="padding-top: 65px">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-6">
            <div class="white-box text-center"><img src="https://via.placeholder.com/430x600/00CED1/000000" class="img-responsive"></div>
          </div>
          <div class="col-lg-7 col-md-7 col-sm-6">
            <h1 class="box-title mt-5">{{ book.title }}</h1>
            <h2 class="mt-5">
              {{ book.price }} CZK
            </h2>
            <p>{{book.info}}</p>
            <h3 class="box-title mt-5">Key Highlights</h3>
            <ul class="list-unstyled">
              <li><i class="fa fa-check text-success"></i>Author: {{book.author}}</li>
              <li><i class="fa fa-check text-success"></i>Publication date: {{formattedDate}}</li>
            </ul>
            <a href="#" class="card-link">Edit Data</a>
            <a href="#" class="card-link">Delete this record of the book</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data(){
    return {
      book: {
        id: null,
        title: null,
        author: null,
        publicDate: null,
        image: null,
        price: null,
        info: null
      }
    }
  },
  computed: {
    formattedDate() {
      return this.book.publicDate ? this.book.publicDate.toLocaleDateString(): '';
    }
  },
  async mounted(){
    const id = this.$route.params.id;
    this.book = await this.getData(id);
  },
  methods: {
    async getData(id){
        const res = await fetch(`http://localhost:3000/books/${id}`,{method: 'GET'});
      return res.json();
      }
    }
}
</script>

<style scoped>

</style>