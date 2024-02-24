import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./components/Login.vue";
import Registration from "./components/Registration.vue";
import Main from "./components/Main.vue";
import { useUserStore } from "./stores/index";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { transition: "fade" },
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
      meta: { transition: "fade" },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.name === "main" && !useUserStore().$state.user) {
    return { name: "login" };
  }
});

export default router;
