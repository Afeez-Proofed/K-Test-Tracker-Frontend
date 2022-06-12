<template>
  <div>
    <div class="card-heading">
      <div>
        <img :src="require(`@/assets/${icon_path}`)" />
      </div>

      <span style="margin-left: 32px" class="card-header-text">{{
        header
      }}</span>
    </div>
    <div class="dash-card">
      <p>{{ body }}</p>
      <router-link
        class="secondary-button"
        :to="{ name: linkTo }"
        style="padding: 10px; width: 200px"
        >Proceed</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DashItem",
  props: ["header", "body", "linkTo", "icon_path"],
};
</script>

<style lang="sass" scoped>
.dash-card
    background: white
    width: calc(100% - 48px)
    margin: 24px
    padding: 40px
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.025)
    text-align: left
    color: #001E62
    align-items: center


.card-heading
    margin: 50px 30px 10px 30px
    display: flex
    align-items: center
    justify-content: left
    box-sizing: border-box
    line-height: 2

.card-header-text
    color: #001E62
    font-size: 1.3em
    font-family: Georgia, 'Times New Roman', Times, serif
</style>
