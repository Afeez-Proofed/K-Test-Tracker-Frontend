<template>
  <div class="drop-down">
    <span @click="toggleDropdown" class="pointer" style='margin-right: 10px'>{{
      selectedOptionIndex >= 0 ? selectedOption + " " : title + " "
    }}</span>
    <span
      style="float: right"
      @click="toggleDropdown"
      class="toggle-switch pointer"
      >{{ toggleButton }}</span
    >
    <span
      @click="clearOption"
      v-if="selectedOptionIndex >= 0 && clearable"
      class="pointer"
      style="float: right; margin-right: 4px"
      >❌</span
    >
    <ul v-show="opened">
      <li v-for="(option, index) in options" ƒ :key="index">
        <span @click="selectOption(index)" class="pointer">{{ option }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["options", "testTypeToFilter", "title", "clearable"],
  model: {
    prop: "testTypeToFilter",
    event: "input",
  },
  data() {
    return {
      opened: false,
      selectedOptionIndex: -1,
    };
  },
  methods: {
    toggleDropdown() {
      this.opened = !this.opened;
    },
    selectOption(val) {
      this.selectedOptionIndex = val;
      this.$emit("input", this.selectedOption);
      this.opened = !this.opened;
    },
    clearOption() {
      this.selectedOptionIndex = -1;
      this.$emit("input", "");
      this.opened = false;
    },
  },
  computed: {
    selectedOption() {
      return this.options[this.selectedOptionIndex];
    },
    toggleButton() {
      return this.opened ? " ⬆️" : " ⬇️";
    },
  },
};
</script>

<style lang="sass" scoped>
.drop-down
    border-radius: 22px
    border: 1px solid #92A0BF
    font-size: 16px
    padding: 8px 14px
    max-width: 200px
    background: #fafafa
    color: #6174a0
    transition: 1s
    margin: 0

.drop-down ul
    margin: 8px 0 0 0
    list-style: none
    padding: 0
    text-decoration: none
    transition: 1s

.drop-down li
  padding: 6px 0
  border-top: 1px dashed lightgrey
  list-style-type: none
  text-align: center
  transition: 0.33s ease

.drop-down li:hover
  color: #008F5C
</style>
