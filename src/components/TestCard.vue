<template>
  <div class="test-card">
    <div style="display: flex; align-items: center">
      <div style="margin-right: 18px">
        <img :src="require(`@/assets/marked-test.svg`)" />
      </div>
      <div>
        <p class="subheading">Test ID</p>
        <p>{{ TestID }}</p>
      </div>
      <div style="flex-grow: 1"></div>
      <span v-if="!Marked">
        <a
          @click="assignTest(TestID, AssignedTo !== 'Not yet assigned')"
          class="primary-button pointer"
          style="padding: 6px 30px 6px 30px; color: white"
          >Mark</a
        >
      </span>
      <span v-if="Marked">
        <router-link
          class="primary-button pointer"
          style="padding: 6px 30px 6px 30px; color: white"
          :to="{ name: 'TestMarker', params: { id: TestID } }"
          >View</router-link
        >
      </span>
    </div>

    <DataRow :fieldName="'Test Type'" :fieldData="TestType" />

    <DataRow
      :fieldName="Marked ? 'Date Marked' : 'Date Submitted'"
      :fieldData="PDate"
    />

    <DataRow :fieldName="'Candidate ID'" :fieldData="CandidateID" />

    <DataRow :fieldName="'Assigned To'" :fieldData="AssignedTo" />

    <DataRow
      :fieldName="Marked ? 'Score' : 'Status'"
      :fieldData="Marked ? Score : Status"
    />
  </div>
</template>

<script>
import DataRow from "../components/DataRow.vue";
import moment from "moment";
import Repository from "../services/Repository";

export default {
  name: "TestCard",
  components: {
    DataRow,
  },
  props: [
    "Marked",
    "TestID",
    "TestType",
    "PDate",
    "CandidateID",
    "AssignedTo",
    "Status",
    "Score",
  ],
  methods: {
    formatDate: function (val) {
      return moment(val).fromNow();
    },
    assignTest(testID, isAssigned) {
      //let authSub = this.$auth.user.id;
      //let markerId = MarkerMapService.getMarkerIDByAuthSub(authSub);

      if (isAssigned) {
        this.$router.push({
          name: "TestMarker",
          params: { id: testID },
        });
        return;
      }

      let marker_email = this.$auth.user.email;
      Repository.post(`assign?test-id=${testID}&marker-email=${marker_email}`)
        .then((r) => {
          r;
          this.$router.push({
            name: "TestMarker",
            params: { id: testID },
          });
        })
        .catch((e) => {
          e;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.test-card
    background: white
    padding: 32px

.subheading
    color: #6174A0
    font-size: 14px
    margin-bottom: 0px

.field-data
    padding-top: 0px
    font-size: 18px
</style>
