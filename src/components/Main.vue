<template>
  <div class="main">
    <RecursiveTree :array-tree="addressesList"></RecursiveTree>
  </div>
</template>
<script>
import addressesList from "../addressesList";
import RecursiveTree from "./recursiveTree.vue";
export default {
  data() {
    return {
      addressesList: [],
    };
  },
  created() {
    this.addressesList = addressesList;
  },
  computed: {
    getSymbol(array, index) {
      if (index === 0) {
        return "";
      }
    },
  },
  methods: {
    showChild(target) {
      target.showChild = !target.showChild;
    },
    changeEquipAmount(equip, more) {
      if (more) {
        equip.amount += 1;
      } else {
        equip.amount -= 1;
      }
    },
  },
  components: { RecursiveTree },
};
</script>

<style>
.main {
  width: 1280px;
  min-height: 100vh;
}
</style>
