<template>
  <div class="pt-5" style="padding-left: 280px">
    <div class="card bg-info bg-opacity-10 border-info">
      <div class="row">

      <div class="col-xl-3 col-lg-4">
        <img :src="image" alt="" class="card-img img-fluid p-1" v-if="image">
        <img src="https://www.forewordreviews.com/books/covers/so-good-in-black.jpg" class="card-img img-fluid p-1" v-if="image == null">
      </div>

      <div class="col-xl-9 col-lg-8">
        <div class="card-title pt-2">
          <h4>{{ title }}</h4>
        </div>

        <div class="card-body">
          <h6 class="card-subtitle">{{ publicDate }}</h6>
          <p class="card-text text-truncate">{{ info }}</p>
          <div class="opacity-75">
          <RouterLink :to="`/books/${id}`" class="btn btn-info">
            View this book
          </RouterLink>
          </div>
        </div>
      </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Preview",
  props: {
    id: Number,
    title: String,
    publicDate: Date,
    image: String,
    info: String
  },
  computed: {
    formattedDate() {
      return this.publicDate.toLocaleDateString()
    }
  }
}

</script>

<style scoped>

</style>