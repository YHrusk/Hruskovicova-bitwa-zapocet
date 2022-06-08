<template>
  <div class="container" style="padding-top: 50px">
    <div class="row align-items-start">
      <div class="col">
        <h3 class="content"><b>New book</b></h3>
        <label class="form-label">Book Title:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.title" class="md-textarea form-control" rows="1" placeholder="title"></textarea><br><br>
        </div>
        <label class="form-label">Author:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.author" class="md-textarea form-control" rows="1" placeholder="author"></textarea><br><br>
        </div>
        <label class="form-label">Publication Date:</label>
        <div class="md-form form-group purple-border">
          <textarea v-model="book.publicDate" class="md-textarea form-control" rows="1" placeholder="publication date"></textarea><br><br>
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
    <button type="button" class="btn btn-info" @click="postBook">Save this book</button>
  </div>
</template>

<script>
export default {
  name: "NewBook",
  data(){
    return{
      book: {
        title: null,
        author: null,
        publicDate: null,
        info: null,
        image: null
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