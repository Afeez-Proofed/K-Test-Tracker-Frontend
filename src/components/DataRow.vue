<template>
  <div class="data-row-container">
    <span style="color: rgba(97, 116, 160, 1)">{{ fieldName }} </span>
    <span v-if="!linkURL" style="" class="field-data">{{ fieldData }} </span>

    <a v-if="linkURL" :href="linkURL" class="field-data">{{
      linkNotEmpty ? fieldData : "-"
    }}</a>
  </div>
</template>

<script>
export default {
  name: "DataRow",
  props: ["fieldName", "fieldData", "linkURL"],
  computed: {
    linkNotEmpty() {
      return this.linkURL.length > 0;
    },
  },
};
</script>

<style lang="sass" scoped>
.data-row
  width: 100%

.data-row-container
  display: flex
  padding: 8px 0
  justify-content: space-between
  border-top: 1px dashed lightgrey


.field-data
  margin: 2px 0
  padding-left: 20px
  text-align: left
</style>
