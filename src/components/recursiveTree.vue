<template>
  <div class="tree">
    <div v-for="item in arrayTree" class="tree-level">
      <div class="tree-parent">
        <div
          class="tree-btn-show"
          :class="{ active: item.showChild }"
          @click.stop="showChild(item)"
        ></div>
        <span class="tree-parent-name">{{ item.name }}</span>
        <div class="tree-drag-point"></div>
      </div>
      <div class="tree-child">
        <recursiveTree
          v-if="item.childs && item.showChild"
          :array-tree="item.childs"
        />
        <EquipTable v-if="item.equip && item.showChild" :equip="item.equip" />
      </div>
    </div>
  </div>
</template>

<script setup>
import EquipTable from "./EquipTable.vue";

defineProps({
  arrayTree: Array,
});

const showChild = (item) => {
  item.showChild = !item.showChild;
};
</script>

<style scoped>
.tree-parent {
  display: flex;
  gap: 6px;
  align-items: center;
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
