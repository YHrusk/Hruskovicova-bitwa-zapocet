<template>
  <div class="container" style="padding-top: 15px">
    <div class="row align-items-start">
      <div class="col">
        <h3 class="content"><b>New book</b></h3>
        <label class="form-label">Book Title:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.title" class="md-textarea form-control" rows="1" placeholder="title"></textarea><br>
        </div>
        <label class="form-label">Book Price:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.price" class="md-textarea form-control" rows="1" placeholder="price"></textarea><br>
        </div>
        <label class="form-label">Author:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.name" class="md-textarea form-control" rows="1" placeholder="author"></textarea><br>
        </div>
        <label class="form-label">Publication Date:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.publicDate" class="md-textarea form-control" rows="1" placeholder="publication date"></textarea><br>
        </div>
        <label class="form-label">Publisher:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.pubName" class="md-textarea form-control" rows="1" placeholder="publisher"></textarea><br>
        </div>
        <label class="form-label">Information:</label>
        <div class="md-form mb-4 form-group purple-border">
          <textarea v-model="book.info" class="md-textarea form-control" rows="3" placeholder="info"></textarea>
        </div>
        <label class="form-label">Image:</label>
        <div>
          <input @change="onImage" class="form-control" type="file" id="file">
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-info" @click="postBook" style="margin-top: 25px; margin-bottom: 20px">Save this book</button>
  </div>
</template>

<script>
export default {
  name: "NewBook",
  data(){
    return{
      book: {
        title: null,
        price: null,
        publicDate: null,
        info: null,
        image: null,
        name: null,
        pubName: null
      }
    }
  },
  methods: {
    onImage(e){
    },
    async postBook(){
      try{
      console.log(this.book);
      await fetch('http://localhost:5000/books',
          {
            method: 'POST',
            body: JSON.stringify(this.book),
            headers:{
              'Content-type':'application/json'
            }
          }
      )
        alert("Book was saved!");
      } catch (e) {
      alert(e);
      }
    }
  }
}
</script>

<style scoped>

</style>