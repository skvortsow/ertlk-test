<script setup>
import { useUserStore } from "../../stores";
import { onMounted, defineEmits, computed } from "vue";

const props = defineProps({
  btnText: String,
  error: String,
  title: String,
});

let login = "";
let password = "";
let errorText = "";
const emit = defineEmits();

const btnDisabled = computed(() => {
  return errorText.length > 0;
});
const actualError = computed(() => {
  return errorText || props.error;
});

onMounted(() => {
  useUserStore().loadUsers();
});

const sendForm = () => {
  event.preventDefault();
  const userData = {
    login: login,
    password: password,
  };
  if (!login || !password) {
    errorText = "Оба поля обязательны к заполнению";
    return;
  } else {
    emit("sendForm", userData);
  }
};
const resetError = () => {
  if (errorText) {
    errorText = "";
  }
};
//хуево работает приходящая ошибка
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
