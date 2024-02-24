<template>
  <Form
    :btnText="'Войти'"
    :title="'Войти'"
    :error="error"
    v-on:sendForm="login"
  ></Form>
  <router-link to="/registration" class="link">Зарегистрироваться</router-link>
</template>
<script>
import Form from "./Form/Form.vue";
import usersList from "../usersList";
import { useUserStore } from "../stores/index.js";

export default {
  data() {
    return {
      error: "",
      userStore: null,
    };
  },
  components: {
    Form,
  },
  mounted() {
    this.userStore = useUserStore();
  },
  methods: {
    login(user) {
      const userIsRegistered = this.userStore.userIsRegistered(user);
      if (userIsRegistered) {
        this.userStore.setUser(user);
        this.$router.push({ name: "main" });
      } else {
        this.error = "Логин или пароль введены неверно";
      }
    },
  },
};
</script>
