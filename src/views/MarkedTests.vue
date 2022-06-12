<template>
  <div>
    <TestTable :Marked="true" />
  </div>
</template>

<script>
import TestTable from "../components/TestTable.vue";

///import Repository from "../services/Repository";

export default {
  name: "MarkedTests",
  components: {
    TestTable,
  },
};
</script>

<style></style>
