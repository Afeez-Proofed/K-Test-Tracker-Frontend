<template>
  <div>
    <div class="content" v-if="true">
      <GreetingCard v-show="!$auth.isAuthenticated" />
      <div class="dash-grid" v-show="$auth.isAuthenticated">
        <DashItem
          :header="'Test Queue'"
          :body="'See a list of the tests that are yet to be marked as well as tests that are in progress.'"
          :linkTo="'UnmarkedTests'"
          :icon_path="'unmarked-test.svg'"
        />
        <DashItem
          :header="'Test Results'"
          :body="'See a list of previously marked tests.'"
          :linkTo="'MarkedTests'"
          :icon_path="'marked-test.svg'"
        />
        <DashItem
          :header="'Manage Tests'"
          :body="'Create, view, edit and delete questions from existing tests. Note - changes made here will not be reflected in tests that have already started to be marked.'"
          :linkTo="'SchemaEditor'"
          :icon_path="'edit.svg'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GreetingCard from "../components/GreetingCard.vue";
import DashItem from "../components/DashItem.vue";

export default {
  name: "Home",
  components: {
    GreetingCard,
    DashItem,
  },
  computed: {
    currentUser() {
      return this.$auth.user.email;
    },
  },
};
</script>

<style lang="sass" scoped>
.dash-grid
  display: grid
  grid-template-columns: 1fr 1fr
  margin: 0 4vw 0 4vw


@media only screen and (max-width: 700px)
  .dash-grid
    grid-template-columns: 1fr
</style>
