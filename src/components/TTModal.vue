<template>
  <div class="modal-container" v-show="show" @click="close">
    <div class="tt-modal">
      {{ header }}
      {{ message }}

      <div class="modal-buttons">
        <div class="tertiery-button">Close</div>
        <div class="primary-button" @click="confirm">Confirm</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TTModal",
  props: ["header", "message", "show"],
  methods: {
    confirm() {
      this.$emit("onConfirm");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-container
  width: 100vw
  height: calc(100vh + 80px)
  background: black
  position: fixed
  z-index: 100
  top: -80px
  opacity: 0.3

.tt-modal
  top: 250px
  left: calc(50vw - 125px)
  width: 400px
  background: white
  margin: 0 auto
  z-index: 101

.modal-buttons
  display: flex

  div
    margin: 0 12px
</style>
