<template>
  <dialog class="modal" ref="modal">
    <div class="close" @click="closeModal"></div>
    <form @submit="submit" class="modal__form">
      <input type="text" v-model="newName" />
      <button class="modal__add" type="submit">{{ btnText }}</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits } from "vue";

const modal = ref(null);
const props = defineProps({
  name: String,
});
let changingName = ref(props.name.length > 0);
const btnText = changingName.value ? "Сохранить изменения" : "Добавить элемент";
let newName = ref(props.name);
const emit = defineEmits();

onMounted(() => {
  modal.value.showModal();
});

onUnmounted(() => {
  newName = "";
});

const submit = () => {
  event.preventDefault();
  emit("submitModal", [newName, changingName.value]);
};

const closeModal = () => {
  newName = "";
  emit("close");
};
</script>

<style>
.modal {
  padding: 30px;
  border: none;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.close {
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
  top: 5px;
  right: 5px;
}

.close:before,
.close:after {
  content: "";
  width: 1px;
  height: 9px;
  background-color: black;
  position: absolute;
}

.close:before {
  transform: rotate(45deg);
}

.close:after {
  transform: rotate(135deg);
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

.modal__add {
  padding: 6px;
  font-size: 14px;
  color: white;
  border-radius: 2px;
  background-color: #5162ff;
  text-align: center;
  cursor: pointer;
}
</style>
