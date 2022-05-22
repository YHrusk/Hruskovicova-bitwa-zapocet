<script setup>
import {RouterView } from 'vue-router'
import Navigation from "./components/Navigation.vue";

</script>

<template>
  <Navigation/>
  <div class="container-fluid bg-info bg-gradient bg-opacity-10">
    <RouterView/>
  </div>
</template>

<style>

</style>
