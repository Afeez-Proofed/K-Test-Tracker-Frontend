<template>
  <div id="app" class="d-flex flex-column h-100">
    <notifications position="bottom left" />
    <!--<nav-bar />-->
    <TTHeader />
    <router-view v-show="!$auth.loading" style="margin-top: 84px;" />
    <h3
      class="animated-text-color"
      v-show="$auth.loading"
      style="margin: 0 auto; margin-top: 150px; font-weight: 400"
    >
      Loading...
    </h3>
  </div>
</template>

<script>
//import NavBar from "./components/NavBar";
import TTHeader from "./components/Header";
import Error from "./components/Error";

export default {
  components: {
    //  NavBar,
    Error,
    TTHeader,
  },
};
</script>

<style lang="sass">
body
  background-color: #F3F6FD
  color: #001E62

.primary-text-color
  color: rgba(0, 30, 98, 1)


#app
  font-family: helvetica neue, sans-serif
  background: #F3F6FD

.test-row
    background: white
    margin: 10px 0 10px 0
    display: flex
    justify-content: space-between
    align-items: center
    padding: 36px
    color: rgba(33, 32, 101, 1)
    font-size: 0.95em

.animated-text-color
  color: rgba(0, 30, 98, 1)
  animation: loading-color 0.8s
  animation-iteration-count: infinite


.primary-button
  height: 30px
  color: white
  min-width: 100px
  background: rgba(0, 30, 98, 1)
  border-radius: 22px
  text-align: center
  font-size: 14px
  line-height: 30px
  transition: 0.5s

.secondary-button:hover
  text-decoration: none
  color: white
  background: rgba(0, 30, 150, 0.7)

.no-tests-message
  margin: 0 auto
  text-align: center
  font-size: 1em
  color: #6174A0

.secondary-button
  min-width: 100px
  line-height: 30px
  font-size: 14px
  height: 30px
  color: white
  background: rgba(0, 179, 115, 1)
  border-radius: 22px
  text-align: center
  transition: 0.5s

.tertiary-button
  min-width: 100px
  line-height: 30px
  font-size: 14px
  height: 30px
  color: rgba(0, 30, 98, 1)
  background-color: rgba(0, 30, 98, 0.1)
  border-radius: 22px
  text-align: center
  transition: 0.5s

.secondary-button:hover
  text-decoration: none
  color: white
  background: #008F5C

.tertiary-button:hover
  background-color: rgba(0, 30, 98, 0.2)

.tertiary-button:active
  background-color: rgba(0, 30, 98, 0.35)

.pointer
  cursor: pointer

.inactive-button
  min-width: 100px
  line-height: 30px
  font-size: 14px
  height: 30px
  color: white
  background: darkgrey
  border-radius: 22px
  text-align: center

.proofed-logo
    text-decoration: none
    color: rgba(33, 32, 101, 1) !important
    font-weight: 400
    font-size: 24px
    line-height: 29px

.card-header-text
  color: #001E62
  font-size: 1.3em
  font-family: Georgia, 'Times New Roman', Times, serif

.subline
    margin-bottom: 2px
    color: rgba(97, 116, 160, 1)
    font-size: 13px
    font-weight: 400

@keyframes loading-color
  0%
    color: rgba(0, 30, 98, 1)
  50%
    color: rgba(0, 179, 115, 1)
  100%
    color: rgba(0, 30, 98, 1)
</style>
