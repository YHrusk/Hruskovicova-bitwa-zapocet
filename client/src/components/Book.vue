<template>
  <div class="container" style="padding-top: 20px">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-6">
            <div class="white-box text-center">
              <img :src="book.image" class="img-responsive" width="500" height="700" v-if="book.image">
              <img src="https://www.forewordreviews.com/books/covers/so-good-in-black.jpg" v-if="book.image == null">
            </div>
          </div>
          <div class="col-lg-7 col-md-7 col-sm-6">

            <h1 v-if="editBook==false" class="box-title mt-5">{{ book.title }}</h1><h1 v-if="editBook==false" class="box-title mt-5">{{ book.id }}</h1>
            <h1 v-if="editBook==true" class="box-title mt-5">Book Title</h1>
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
                <li><i class="fa fa-check text-success"></i>Author: {{book.name}}</li>
                <li><i class="fa fa-check text-success"></i>Publication date: {{book.publicDate}}</li>
                <li><i class="fa fa-check text-success"></i>Publisher: {{book.pubName}}</li>
              </ul>
            </div>

            <div v-if="editBook==true">
              <h3 class="box-title mt-3">Edit Key Highlights</h3>
                <input v-model="PatchBook.publicDate" type="text" placeholder="publication date" style="margin-left: 10px">
            </div>

            <button v-if="editBook==false" type="button" class="btn btn-info" v-on:click="editBook=true">Edit this book</button>
            <button v-if="editBook==false" type="button" class="btn btn-info" @click="deleteBook()" style="margin-left: 10px">Delete this record of the book</button>

            <div style="padding-top:20px">
              <button v-if="editBook==true" class="btn btn-info" type="button" @click="patchTheBook(book)">Confirm Edit</button>
              <button v-if="editBook==true" class="btn btn-info" type="button" v-on:click="editBook=false" style="margin-left: 10px">Cancel Edit</button>
            </div>
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
      book: [],
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
        const res = await fetch(`http://localhost:5000/books/${this.$route.params.id}`,
            {method: 'PATCH',
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
    async deleteBook(){
      try{
        const res = await fetch(`http://localhost:5000/books/${this.$route.params.id}`,{method: 'DELETE'});
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