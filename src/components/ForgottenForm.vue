<template>
  <div class="flex flex-col w-full h-full justify-center items-center my-5">
    <h1 class="text-2xl mb-3">Sie haben ihr Password Vergessen?</h1>
    <input required class="input input-bordered w-full max-w-xs" type="text" placeholder="Username"
      v-model="username" />
    <div v-if="errorMsg" class="text-red-600 text-lg text-center">
      {{errorMsg}}
    </div>
    <div v-if="msg" class="text-green-600 py-3 text-lg text-center">
      {{msg}}
    </div>
    <button class="my-3 btn btn-primary rounded-lg px-6 hover:-translate-y-2 duration-300 hover:bg-slate-600"
      @click="handleForgottenClick()">Submit
    </button>
    <div class="flex justify-center" v-if="loading">
        <img src="../assets/loading.svg" class="w-10 pb-3 invert">
    </div>
  </div>

</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      username: "",
      errorMsg: "",
      loading: false,
      msg: ""
    }
  },
  methods: {
    async handleForgottenClick() {
      this.loading = true;
      if (this.username === "") {
        this.errorMsg = "Bitte gib deinen Namen an";
        this.loading = false;
        return;
      }
      try {
        await axios
          .post(`https://myawesomewebapi.boehnern.de/api/Reset/Password?username=${this.username}`)
          .then((response) => {
            this.errorMsg = "";
            this.msg = response.data;
            this.loading = false;
          });
      } catch (err) {
        if (err.code == "ERR_NETWORK") {
          this.errorMsg = "Unbekannter Fehler"
          this.loading = false;
          return;
        }
        this.errorMsg = err.response.data;
        this.loading = false;
      }
    }
  }
}
</script>

<style>

</style>