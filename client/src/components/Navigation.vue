<template>
  <nav class="navbar bg-info bg-opacity-10 navbar-expand-lg navbar-light fixed-top">
      <router-link class="navbar-brand" style="padding-left: 150px" to="/">
        <img src="https://icon-library.com/images/book-icon/book-icon-13.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
        Library Management System
      </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

      <div class="navbar-collapse">
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              Info
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">
              Contact
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/newbook" class="nav-link">
              New Book
            </router-link>
          </li>
        </ul>
          <form class="d-flex offset-md-7" >
            <input class="form-control me-2" type="search" placeholder="Search">
            <button class="btn btn-outline-info" type="submit">Search</button>
          </form>
      </div>

  </nav>
</template>

<script>
export default {
  name: "Navigation.vue"
}
</script>

<style scoped>

</style>