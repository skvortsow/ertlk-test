<template>
  <div class="main">
    <RecursiveTree :array-tree="localAddressesList"></RecursiveTree>
  </div>
</template>
<script setup>
import addressesList from "../addressesList";
import RecursiveTree from "./recursiveTree.vue";
import { ref } from "vue";

const localAddressesList = ref([]);
localAddressesList.value = addressesList;
</script>

<style>
.main {
  width: 1280px;
  min-height: 100vh;
}
</style>
