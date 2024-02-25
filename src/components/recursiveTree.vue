<template>
  <div class="tree">
    <div v-for="(item, index) in arrayTree" class="tree-level">
      <div class="tree-parent">
        <div
          class="tree-btn-show"
          :class="{ active: item.showChild }"
          @click.stop="showChild(item)"
        ></div>
        <span class="tree-parent-name">{{ item.name }}</span>
        <div class="action-menu">
          <actionMenu
            :row="item"
            @delete-row="deleteRow(index)"
            @add-row="showPopup(index)"
            @change-row="showPopup(index, true)"
          ></actionMenu>
        </div>
      </div>
      <div class="tree-child">
        <recursiveTree
          v-if="item.childs && item.showChild"
          :array-tree="item.childs"
        />
        <EquipTable v-if="item.equip && item.showChild" :equip="item.equip" />
      </div>
    </div>
    <addElementPopup
      v-if="showModal"
      :name="changingName"
      @submit-modal="saveRow"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import EquipTable from "./EquipTable.vue";
import actionMenu from "./actionMenu.vue";
import addElementPopup from "./addElementPopup.vue";
import { ref } from "vue";

const props = defineProps({
  arrayTree: Array,
});

let showModal = ref(false);
let changingName = ref("");
let changingRow = ref(null);

const showChild = (item) => {
  item.showChild = !item.showChild;
};

const deleteRow = (index) => {
  props.arrayTree.splice(index, 1);
};

const saveRow = ([newName, changeName]) => {
  if (changeName) {
    changingRow.name = newName;
  } else {
    changingRow.childs.push({ name: newName, childs: [] });
  }

  changingName = "";
  changingRow = null;
  showModal.value = false;
};

const showPopup = (index, changeName = false) => {
  changingRow = props.arrayTree[index];
  if (changeName) {
    changingName = changingRow.name;
  }
  showModal.value = true;
};

const closeModal = () => {
  changingName = "";
  showModal.value = false;
};
</script>

<style scoped>
.tree-parent {
  display: flex;
  gap: 6px;
  align-items: center;
}

.action-menu {
  opacity: 0;
  transition: opacity 0.3s;
}

.tree-parent:hover .action-menu {
  opacity: 1;
}

.tree-drag-point {
  width: 10px;
  height: 10px;
  background: black;
  cursor: pointer;
}
.tree-btn-show {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  border: solid 1px #5162ff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #5162ff;
}

.tree-btn-show:before,
.tree-btn-show:after {
  content: "";
  position: absolute;
  width: 1px;
  height: 9px;
  background-color: white;
}

.tree-btn-show:before {
  transform: rotate(90deg);
}

.tree-btn-show.active {
  background: white;
  border-color: black;
}

.tree-btn-show.active:after,
.tree-btn-show.active:before {
  background-color: black;
}

.tree-child {
  padding-left: 30px;
  max-width: 500px;
}
</style>
