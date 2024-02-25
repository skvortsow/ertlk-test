<template>
  <Form
    :btnText="'Войти'"
    :title="'Войти'"
    :error="error"
    v-on:sendForm="login"
  ></Form>
  <router-link to="/registration" class="link">Зарегистрироваться</router-link>
</template>
<script setup>
import Form from "./Form/Form.vue";
import usersList from "../usersList.js";
import router from "../router.js";
import { useUserStore } from "../stores/index.js";
import { ref, onMounted } from "vue";

let error = ref("");
let userStore = null;

onMounted(() => {
  userStore = useUserStore();
});

const login = (user) => {
  const userIsRegistered = userStore.userIsRegistered(user);
  if (userIsRegistered) {
    userStore.setUser(user);
    router.push({ name: "main" });
  } else {
    error.value = "Логин или пароль введены неверно";
  }
};
</script>
