<template>
    <MovieGrid :movies="this.topMovies" title="Top 10 Highest Voted Movies" :errorMsg="errorMsg" />
    <MovieGrid :movies="this.randomMovies" title="Random 10 Movies" :errorMsg="errorMsg" />

</template>

<script>
import axios from 'axios'
import MovieGrid from './MovieGrid.vue'
export default {
    data() {
        return {
            topMovies: [],
            randomMovies: [],
            errorMsg: "",
        };
    },
    async mounted() {
        let JWTToken = sessionStorage.getItem("jwtToken");
        let requestConfig = {
            headers: {
                Authorization: "Bearer " + JWTToken
            }
        };
        try {
            await axios
                .get("http://localhost:5238/api/Movie/GetHighestVotedMovies", requestConfig)
                .then((response) => {
                    this.topMovies = response.data;
                })

        } catch (err) {
            if (err.code == "ERR_NETWORK") {
                this.errorMsg = err.code
                console.log(this.errorMsg)
            }
            if (err.response.status == 401) {
                alert("Bitte log dich ein")
                window.location.href = 'http://127.0.0.1:5173';
            }
            this.errorMsg = err.response.statusText
        }
        try {
            await axios
                .get("http://localhost:5238/api/Movie/GetRandomMovies", requestConfig)
                .then((response) => {
                    this.randomMovies = response.data;
                })
        } catch (err) {
            if (err.code == "ERR_NETWORK") {
                this.errorMsg = "Unbekannter Fehler"
                return;
            }
            this.errorMsg = err.response.statusText
        }
    },
    components: { MovieGrid }
}
</script>

<style>

</style>