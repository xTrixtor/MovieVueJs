import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue"
import Movies from "../components/Movies.vue"
import Register from "../components/RegisterCard.vue"
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;