<template>
  <div
    class="
      card
      w-96
      h-[350px]
      bg-base-100
      shadow-xl
      border-2
      my-3
      fixed
      top-[50%]
      left-[50%]
      -translate-x-[50%] -translate-y-[50%]
    "
  >
    <div class="flex flex-col w-full h-full justify-center items-center">
      <div class="card-body py-3 flex justify-between">
        <h2 class="card-title justify-center my-3">Create New Password</h2>
        <input
          class="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <input
          class="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
      </div>
    </div>
    <div class="flex justify-center" v-if="loading">
        <img src="../assets/loading.svg" class="w-10 pb-3 invert">
    </div>
    <div v-if="msg" class="text-green-600 py-1 text-lg text-center">
      <p>{{ msg }}</p>
    </div>
    <div v-if="errorMsg" class="text-red-600 py-1 text-lg text-center">
      {{ errorMsg }}
    </div>
    <div class="flex w-full justify-center my-3">
      <button
        class="
          btn btn-primary
          rounded-lg
          px-6
          hover:-translate-y-2
          duration-300
          hover:bg-slate-600
        "
        @click="handleConfirm()"
      >
        Commit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      loading: false,
      msg: "",
    };
  },
  methods: {
    async handleConfirm() {
      this.loading = true;
      if (this.password !== this.confirmPassword) {
        this.loading = false;
        this.errorMsg = "Die Passwörter stimmen nicht überein!";
        return;
      }
      const resetCode = this.$route.params.resetCode;
      try {
        console.log(this.password);
        await axios
          .post("http://localhost:5238/api/Reset/CreateNewPassword", {
            ResetCode: resetCode,
            Username: this.username,
            NewPassword: this.password,
          })
          .then((response) => {
            this.loading = false;
            this.errorMsg = "";
            this.msg = response.data;
          });
      } catch (err) {
        if (err.code == "ERR_NETWORK") {
          this.errorMsg = "Unbekannter Fehler";
          this.loading = false;
          return;
        }
        this.errorMsg = err.response.data;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>