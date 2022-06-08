<template>
  <div class="container" style="padding-top: 65px">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-6">
            <div class="white-box text-center"><img :src="book.image" class="img-responsive"></div>
          </div>
          <div class="col-lg-7 col-md-7 col-sm-6">

            <h1 v-if="editBook==false" class="box-title mt-5">{{ book.title }}</h1>
            <h1 v-if="editBook==true">Book Title</h1>
            <input v-if="editBook==true" v-model="PatchBook.title" type="text" placeholder="title">

            <h2 v-if="editBook==false" class="mt-5">{{ book.price }} CZK</h2>
            <h2 v-if="editBook==true">Book Price in CZK</h2>
            <input v-if="editBook==true" v-model="PatchBook.price" type="text" placeholder="price">

            <p v-if="editBook==false">{{book.info}}</p>
            <h3 v-if="editBook==true">Book Info</h3>
            <textarea v-if="editBook==true" v-model="PatchBook.info" type="text" placeholder="info"/>

            <div v-if="editBook==false">
              <h3 class="box-title mt-5">Key Highlights</h3>
              <ul class="list-unstyled">
               <li><i class="fa fa-check text-success"></i>Author: {{book.author}}</li>
                <li><i class="fa fa-check text-success"></i>Publication date: {{book.publicDate}}</li>
              </ul>
            </div>

            <div v-if="editBook==true">
              <h3 class="box-title mt-5">Edit Key Highlights</h3>
              <input v-model="PatchBook.author" type="text" placeholder="author">
              <input v-model="PatchBook.publicDate" type="text" placeholder="publication date">
            </div>

            <button v-if="editBook==false" type="button" class="btn btn-info" v-on:click="editBook=true">Edit this book</button>
            <button v-if="editBook==false" type="button" class="btn btn-info" @click="deleteBook(book)">Delete this record of the book</button>
            <button v-if="editBook==true" class="btn btn-info" type="button" @click="patchTheBook(book)">Confirm Edit</button>
            <button v-if="editBook==true" class="btn btn-info" type="button" v-on:click="editBook=false">Cancel Edit</button>
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
        price: null,
        info: null,
        publicDate: null,
        image: null
      },
      PatchBook: {
        title: null,
        price: null,
        info: null,
        publicDate: null
      },
      editBook: false
    }
  },
  computed: {
    formattedDate() {
      return this.book.publicDate ? this.book.publicDate.toLocaleDateString(): '';
    }
  },
  async created() {
    await this.resetData();
  },
  methods: {
    async patchTheBook(bookToPatch){
      try{
        if(this.PatchBook.title == null) {this.PatchBook.title = bookToPatch.title};
        if(this.PatchBook.price == null) {this.PatchBook.price = bookToPatch.price};
        if(this.PatchBook.info == null) {this.PatchBook.info = bookToPatch.info};
        if(this.PatchBook.publicDate == null) {this.PatchBook.publicDate = bookToPatch.publicDate};
        console.log(this.PatchBook);
        const res = await fetch(`http://localhost:5000/books/${bookToPatch}`,
            {methods: 'PATCH',
              body: JSON.stringify(this.PatchBook),
              headers:{
                'Content-type':'application/json'
              }
        });
        console.log(res);
        alert("Book was successfully edited");
      } catch (e){
        alert(e);
      }
      this.editBook=false;
      await this.resetData();
    },
    async deleteBook(bookToDelete){
      try{
        const res = await fetch(`http://localhost:5000/books/${bookToDelete}`,{method: 'DELETE'});
        console.log(res);
        alert("Book was successfully deleted");

      } catch(e){
        alert(e);
      }
    },
    async resetData(){
      const res = await fetch(`http://localhost:5000/books/${this.$route.params.id}`,{method: 'GET'});
      this.book = await res.json();
      console.log(this.book);
    }
  }
}
</script>

<style scoped>

</style>