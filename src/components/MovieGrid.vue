<template>
  <div v-if="!movies.length">
    <div class="font-bold text-3xl text-center my-5">
      {{title}}
    </div>
    <div class="flex w-full text-3xl justify-center">
      {{errorMsg}}
    </div>
  </div>
  <div v-else>
    <div class="font-bold text-3xl text-center my-5">
      {{title}}
    </div>
    <div class="grid md:grid-cols-5 grid-cols-1 gap-5">
      <div v-for="(movie, index) in movies" :key="index" class="flex justify-center items-center">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'
export default {
  props: {
    title: String,
    movies: Array,
    errorMsg: String
  },
  components: { MovieCard }
}
</script>