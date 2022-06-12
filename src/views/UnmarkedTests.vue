<template>
  <div>
    <TestTable :Marked="false" />
  </div>
</template>

<script>
import TestTable from "../components/TestTable.vue";

///import Repository from "../services/Repository";

export default {
  name: "UnmarkedTests",
  components: {
    TestTable,
  },
};
</script>

<style></style>
