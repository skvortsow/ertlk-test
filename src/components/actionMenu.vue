<script setup>
import { ref } from "vue";

const props = defineProps({
  row: null,
});

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const closeMenu = () => {
  menuVisible.value = false;
};
</script>

<template>
  <div class="action-menu" @mouseleave="closeMenu">
    <div class="action-menu__btn" @click="toggleMenu">
      <svg
        width="13"
        height="3"
        viewBox="0 0 13 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="1.44444" cy="1.44444" r="1.44444" fill="#D9D9D9" />
        <circle cx="6.49999" cy="1.44447" r="1.44444" fill="#D9D9D9" />
        <circle cx="11.5556" cy="1.44447" r="1.44444" fill="#D9D9D9" />
      </svg>
    </div>
    <div v-if="menuVisible" class="action-menu__popup">
      <div
        class="action-menu__row"
        :class="{ disable: !row.childs }"
        @click="$emit('addRow')"
      >
        Добавить
      </div>
      <div class="action-menu__divider"></div>
      <div class="action-menu__row" @click="$emit('changeRow')">Изменить</div>
      <div class="action-menu__divider"></div>
      <div class="action-menu__row" @click="$emit('deleteRow')">Удалить</div>
    </div>
  </div>
</template>

<style scoped>
.action-menu {
  position: relative;
}

.action-menu__btn {
  cursor: pointer;
  display: flex;
  padding: 20px 4px;
}

.action-menu__popup {
  position: absolute;
  left: 0;
  background-color: white;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

.action-menu__row {
  padding: 4px 16px;
  cursor: pointer;
}

.action-menu__divider {
  width: 100%;
  height: 1px;
  background: rgb(197, 197, 197);
}

.disable {
  pointer-events: none;
  cursor: not-allowed;
  color: rgb(206, 206, 206);
}
</style>
