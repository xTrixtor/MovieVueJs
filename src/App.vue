<template>
  <div>
      <router-link to="/">Login</router-link> |
      <router-link to="/register">Register</router-link>|
      <router-link to="/movies">Movies</router-link>
  </div>
  <router-view />
</template>

<script>
import Movies from './components/Movies.vue';
export default {
    components: { Movies }
}
</script>

<style>

</style>