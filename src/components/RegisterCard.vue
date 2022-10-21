<template>
    <div
        class="card w-96 h-[350px] bg-base-100 shadow-xl border-2 my-3 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
        <div class="flex flex-col w-full h-full justify-center items-center">
            <div class="card-body py-3 flex justify-evenly">
                <h2 class="card-title justify-center my-3">Register</h2>
                <input class="input input-bordered w-full max-w-xs" type="text" placeholder="Username"
                    v-model="username" />
                <input class="input input-bordered w-full max-w-xs" type="password" placeholder="Password"
                    v-model="password" />
            </div>
        </div>
        <div class="flex w-full justify-center my-3">
            <button class="btn btn-primary rounded-lg px-6 hover:-translate-y-2 duration-300 hover:bg-slate-600"
                @click="handleRegisterClick">Register</button>
        </div>
        <div v-if="msg" class="text-green-600 py-1 text-lg text-center">
            {{msg}}
        </div>
        <div v-if="errorMsg" class="text-red-600 py-1 text-lg text-center">
            {{errorMsg}}
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            username: "",
            password: "",
            msg: "",
            errorMsg:""
        }
    },
    methods: {
        async handleRegisterClick() {
            try {
                await axios
                    .post("http://localhost:5238/api/Register", { username: this.username, password: this.password })
                    .then((response) => {
                        this.errorMsg = "";
                        this.msg = response.data;
                    });

            } catch (err) {
                if (err.code == "ERR_NETWORK") {
                    this.errorMsg = "Unbekannter Fehler"
                    this.loading = false;
                    return;
                }
                this.errorMsg = err.response.data;
            }
        }
    }
}
</script>

<style>

</style>