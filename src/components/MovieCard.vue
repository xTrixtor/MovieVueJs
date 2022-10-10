<template>
        <div class="card h-full w-full bg-base-100 shadow-xl border-2 m-3 cursor-pointer hover:-translate-y-4 hover:border-4 hover:border-blue-300 duration-300"
            @click="handleInfoClick()">
            <figure><img src="../assets/images/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg" alt="shoes" /></figure>
            <div class="card-body py-3 flex ">
                <div class="flex-col w-full h-full flex justify-evenly">
                    <div class="flex text-2xl text-center my-3">
                        <p>
                            {{movie.title}}
                        </p>
                    </div>
                    <div class="flex justify-center text-2xl">Count: {{movie.vote_count}}</div>
                    <div class="flex justify-center text-2xl">Vote: {{movie.vote_average}}/10</div>
                </div>
            </div>
        </div>
    <div v-if="openModal">
        <MovieDetailsModal :movie="selectedMovie" @close-modal="closeModal()" />
    </div>
</template>

<script>
import axios from 'axios'
import MovieDetailsModal from './MovieDetailsModal.vue'
export default {
    props: {
        movie: Object,
    },
    data() {
        return {
            selectedMovie: null,
            openModal: false,
        };
    },
    methods: {
        async handleInfoClick() {
            let requestConfig = {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("jwtToken")
                },
                params: {
                    id: this.movie.movie_id
                }
            }
            try{
                await axios
                .get("http://localhost:5238/api/Movie/FindMovie", requestConfig)
                .then((response) => {
                    this.selectedMovie = response.data;
                    this.openModal = true;
                })
            }
            catch(err){
                alert(err.response.statusText)
            }
        },
        closeModal() {
            this.openModal = false;
            this.onError = false;
        }
    },
    components: { MovieDetailsModal}
}
</script>

<style>

</style>