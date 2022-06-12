<template>
  <div>
    <nav class="header">
      <span class="proofed-logo"
        ><router-link class="primary-text-color" to="/"
          >Knowadays</router-link
        ></span
      >
      <span v-show="$auth.isAuthenticated">
        <router-link
          to="/unmarked-tests"
          class="primary-text-color nav-bar-link"
          >Test Queue</router-link
        >
      </span>
      <span v-show="$auth.isAuthenticated">
        <router-link to="/marked-tests" class="primary-text-color nav-bar-link"
          >Test Results</router-link
        >
      </span>
      <span v-show="$auth.isAuthenticated">
        <router-link to="/schema-editor" class="primary-text-color nav-bar-link"
          >Manage Tests</router-link
        >
      </span>
      <a
        class="secondary-button logout-button"
        v-if="$auth.isAuthenticated"
        @click.prevent="logout"
        >Log out</a
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "TTHeader",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="sass" scoped>
.header
    margin: 0
    padding: 24px
    background-color: #e4e9f5
    align-items: center
    z-index: 100
    display: flex
    justify-content: space-between
    position: fixed
    width: 100vw
    min-height: 84px

.logout-button
  color: white !important
  cursor: pointer


.nav-bar-link
  transition: 0.1s ease

.nav-bar-link:hover
  padding: 8px
  background: #ced7eb
  border-radius: 10px
  text-decoration: none
  text-underline-position: none
</style>
