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
<script>
import Form from "./Form/Form.vue";
import { useUserStore } from "../stores";

export default {
  data() {
    return {
      login: "",
      password: "",
      error: "",
    };
  },
  components: {
    Form,
  },
  mounted() {
    this.userStore = useUserStore();
  },
  methods: {
    register(user) {
      event.preventDefault();
      const registeredUser = this.userStore.usersList.find((registeredUser) => {
        return registeredUser.login === user.login;
      });

      if (registeredUser) {
        this.error = "Логин занят";
      } else {
        this.userStore.addUser(user);
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>

<style scoped></style>
