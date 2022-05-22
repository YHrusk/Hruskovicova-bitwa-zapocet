<template>
  <div class="pt-5">
    <div class="card bg-info bg-opacity-10 border-info">
      <div class="row">
      <div class="col-xl-3 col-lg-4">
        <img :src="image" alt="" class="card-img img-fluid p-1">
      </div>
      <div class="col-xl-9 col-lg-8">
        <div class="card-body">
          <h4 class="card-title">{{ title }}</h4>
          <h6>{{author}}</h6>
          <h6 class="card-subtitle">{{ formattedDate }}</h6>
          <p class="card-text text-truncate">{{ info }}</p>
          <div class="opacity-75">
          <router-link :to="`/book/${id}`" class="btn btn-info">
            View this book
          </router-link>
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
    author: String,
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