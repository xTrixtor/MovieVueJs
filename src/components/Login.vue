<template>
    <div
        class="card w-96 h-[400px] bg-base-100 shadow-xl border-2 my-3 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
        <div class="flex flex-col w-full h-full justify-center items-center">
            <div class="card-body py-3 flex justify-between">
                <h2 class="card-title justify-center my-3">Login</h2>
                <input class="input input-bordered w-full max-w-xs" type="text" placeholder="Username"
                    v-model="username" />
                <input class="input input-bordered w-full max-w-xs" type="password" placeholder="Password"
                    v-model="password" />
                <div>
                    <p class="text-center underline cursor-pointer" @click="handleGuestClick">Login as guest</p>
                </div>
                <div class="flex justify-center">
                    <router-link to="/register">Register Now</router-link>
                </div>
                <div class="flex justify-center">
            <p class="text-center hover:underline cursor-pointer" @click="handleForgottenClick">Forgot Password?</p>
        </div>
            </div>
        </div>
        
        <div class="flex w-full justify-center my-3">
            <button class="btn btn-primary rounded-lg px-6 hover:-translate-y-2 duration-300 hover:bg-slate-600"
                @click="handleLogin">Login</button>
        </div>
        <div class="flex justify-center" v-if="loading">
            <img src="../assets/loading.svg" class="w-10 pb-3 invert">
        </div>
        <div v-if="true" class="text-red-600 text-lg text-center">
            {{errorMsg}}
        </div>
    </div>
    <div v-if="forgottenFormVisible">
        <ForgottenForm/>
    </div>
</template>

<script lang="ts">
import ForgottenForm from "../components/ForgottenForm.vue"
import axios from "axios"
export default {
    data() {
        return {
            username: "",
            password: "",
            errorMsg: "",
            loading: false,
            forgottenFormVisible: false,
        }
    },
    methods: {
        async handleGuestClick() {
            this.loading = true;
            this.errorMsg = "";
            let JWTToken = "";
            try {
                await axios
                    .post("https://movieapi.boehnern.de/api/login", { username: "guest", password: "guest" })
                    .then((response) => {
                        console.log(response.data);
                        JWTToken = response.data.jwtToken;
                        const userID = response.data.userID;
                        sessionStorage.setItem("userID", userID)
                        sessionStorage.setItem("jwtToken", JWTToken);
                        alert(response.data.response)
                    });
                window.location.href = 'http://127.0.0.1:5173/movies';

            } catch (err) {
                this.errorMsg = err.response.data
            }
            this.loading = false;
        },
        async handleLogin() {
            this.loading = true;
            this.errorMsg = "";
            let JWTToken = "";
            try {
                await axios
                    .post("https://movieapi.boehnern.de/api/Login", { username: this.username, password: this.password })
                    .then((response) => {
                        JWTToken = response.data.jwtToken;
                        const userID = response.data.userID;
                        sessionStorage.setItem("userID", userID)
                        sessionStorage.setItem("jwtToken", JWTToken);
                        alert(response.data.response)
                    });
                window.location.href = 'http://127.0.0.1:5173/movies';

            } catch (err) {
                if (err.code == "ERR_NETWORK") {
                    this.errorMsg = "Unbekannter Fehler"
                    this.loading = false;
                    return;
                }
                this.errorMsg = err.response.data;
                this.loading = false;
            }
        },
        async handleForgottenClick() {
            this.forgottenFormVisible = !this.forgottenFormVisible;
        },
    },
    components: { ForgottenForm }
}
</script>

<style>

</style>