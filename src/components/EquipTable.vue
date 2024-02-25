<template>
  <div class="equip">
    <div v-for="(item, index) in equip" class="equip-row">
      <div class="equip-remove" @click="remove(index)"></div>
      <input class="equip-name" type="text" v-model="item.name" />
      <input class="equip-count" type="number" min="1" v-model="item.amount" />
      <div class="equip-menu"></div>
    </div>
    <div class="equip-add" @click="showModal">Добавить оборудование</div>
    <dialog class="modal" ref="modal">
      <div class="close" @click="closeModal"></div>
      <input type="text" class="modal__input" v-model="newEquipName" />
      <input
        type="number"
        class="modal__input"
        min="1"
        v-model="newEquipCount"
      />
      <div class="modal__add" @click="addEquip">Добавить оборудование</div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  equip: Array,
});

let newEquipName = "";
let newEquipCount = 1;

const modal = ref(null);

const remove = (index) => {
  props.equip.splice(index, 1);
};

const showModal = () => {
  modal.value.showModal();
};

const closeModal = () => {
  newEquipName = "";
  newEquipCount = 0;
  modal.value.close();
};

const addEquip = () => {
  const newEquip = {
    name: newEquipName,
    amount: newEquipCount,
  };
  props.equip.push(newEquip);
  closeModal();
};
</script>

<style scoped>
.equip {
  text-align: left;
  gap: 5px;
  display: flex;
  flex-direction: column;
}
.equip-row {
  display: flex;
  gap: 3px;
  align-items: center;
}
.equip-remove {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: solid 1px rgb(255, 86, 86);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  flex-shrink: 0;
  margin-right: 6px;
}

.equip-remove:before,
.equip-remove:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 9px;
  background-color: rgb(255, 86, 86);
}

.equip-remove:before {
  transform: rotate(135deg);
}

.equip-remove:after {
  transform: rotate(45deg);
}

.equip-name,
.equip-count,
.equip-input {
  border-radius: 3px;
  background-color: #f7f7f7;
  height: 30px;
  padding: 0 5px;
  box-sizing: border-box;
  border: solid 1px #ededed;
}

.equip-name,
.equip-count {
  width: 173px;
}

.equip-add {
  padding: 6px;
  font-size: 14px;
  color: white;
  border-radius: 2px;
  background-color: #5162ff;
  text-align: center;
  cursor: pointer;
}

.modal[open=""] {
  position: relative;
  padding: 30px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px black solid;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
  cursor: pointer;
}
</style>
