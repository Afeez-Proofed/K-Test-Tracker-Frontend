<template>
  <div>
      <div class="greeting-card">
          <!-- <img :src="'k_logo_home.jpg'"/> -->
          <h3>Knowadays 👋 </h3>
          <p>{{Message}}</p>
          <div class="login-greeting secondary-button" v-on:click="login">Login</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "GreetingCard",
  data() {
    return {
      Message:
        "Welcome to the Knowadays Test Tracker. Please be aware that this app is still in a beta phase. You can report bugs and feedback to Sing Lee & Afeez Asiru via Slack. Thank you. "
    };
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="sass" scoped>
.greeting-card
    background: white
    width: 400px
    padding: 40px
    top: 30vh
    position: absolute
    left: calc(50vw - 200px)
    margin: 0 auto
    box-shadow: 0px 0px 15px 10px rgba(0, 0, 0, 0.05)
    text-align: center

.greeting-card img
  margin-bottom:15px
.login-greeting
    cursor: pointer
</style>
