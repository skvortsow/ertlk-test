<script>
import { useUserStore } from "../../stores";

export default {
  name: "Form",
  props: {
    btnText: String,
    error: String,
    title: String,
  },
  data() {
    return {
      login: "",
      password: "",
      errorText: "",
    };
  },
  created() {
    useUserStore().loadUsers();
  },
  methods: {
    sendForm() {
      event.preventDefault();
      const userData = {
        login: this.login,
        password: this.password,
      };
      if (!this.login || !this.password) {
        this.errorText = "Оба поля обязательны к заполнению";
        return;
      } else {
        this.$emit("sendForm", userData);
      }
    },
    resetError() {
      if (this.errorText) {
        this.errorText = "";
      }
    },
    //хуево работает приходящая ошибка
  },
  computed: {
    btnDisabled() {
      return this.errorText.length > 0;
    },
    actualError() {
      return this.errorText || this.error;
    },
  },
};
</script>

<template>
  <form class="ar-form">
    <span class="ar-form__title" v-text="title"></span>
    <input
      class="ar-form__input"
      type="text"
      placeholder="Логин"
      @input="resetError"
      v-model="login"
    />
    <input
      class="ar-form__input"
      type="text"
      placeholder="Пароль"
      @input="resetError"
      v-model="password"
    />
    <p class="ar-form__err" v-text="actualError"></p>
    <button
      class="ar-form__btn"
      @click="sendForm()"
      v-text="btnText"
      :disabled="btnDisabled"
    ></button>
  </form>
</template>

<style scoped>
.ar-form {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  border: 1px solid black;
  margin-bottom: 10px;
}

.ar-form__title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}

.ar-form__input {
  border-color: transparent;
  border-bottom-color: black;
  padding: 8px 4px;
  font-size: 16px;
}

.ar-form__input:focus-visible {
  outline: none;
  border-bottom-color: blue;
}
.ar-form__err {
  color: red;
}
</style>
