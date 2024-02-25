<template>
  <Form
    :btnText="'Зарегистрироваться'"
    :title="'Регистрация'"
    :error="error"
    v-on:sendForm="register"
  ></Form>
  <router-link to="/login" class="link"
    >Уже зарегистрированы? Войти</router-link
  >
</template>
<script setup>
import Form from "./Form/Form.vue";
import router from "../router";
import { useUserStore } from "../stores";
import { ref } from "vue";

const error = ref("");

const userStore = useUserStore();

const register = (user) => {
  event.preventDefault();
  const registeredUser = userStore.usersList.find((registeredUser) => {
    return registeredUser.login === user.login;
  });

  if (registeredUser) {
    error.value = "Логин занят";
  } else {
    userStore.addUser(user);
    router.push({ name: "login" });
  }
};
</script>

<style scoped></style>
