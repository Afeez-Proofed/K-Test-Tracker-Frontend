<template>
  <div>
    <div class="test-toolbar">
      <!-- Old drop down
      <Dropdown
        :selected="testTypeToFilter"
        v-on:input="testTypeToFilter = $event"
        :options="uniqueTestTypeNames"
        :clearable="true"
        class="tt-drop-down"
        title="Filter Test Type"
      />
      -->
      <!-- <div>
        <v-select
          :options="testTypeOptions"
          class="tt-drop"
          placeholder="Test Type"
          v-model="testTypeToFilter"
        />
      </div> -->
      <div class="flex-spacer"></div>
      <div class="page_container" style="margin-right: 32px">
        <span style="color: #6174a0">Page</span>
        <div v-for="page in PaginationOptions.total_pages" :key="page">
          <div
            :class="
              page == SelectedPage ? 'selected_page_button' : 'page_button'
            "
            @click="setPage(page)"
          >
            {{ page }}
          </div>
        </div>
      </div>
      <div>
        <v-select
          :options="[50, 100, 200]"
          class="tt-drop"
          placeholder="Page Size"
          v-model="SelectedPageSize"
        ></v-select>
      </div>
    </div>

    <div class="test-table" style="margin-top: 12px">
      <p class="no-tests-message" v-show="Tests.length == 0">
        It doesn't look like there are any tests here.<br />If you believe there
        should be, please contact afeez@getproofed.com or sing@getproofed.com.
      </p>

      <!-- desktop -->
      <table class="test-list-table">
        <thead class="test-list-header" v-show="Tests.length > 0">
          <td></td>
          <td>Test ID</td>
          <td>Test Attempt</td>
          <td>{{ testColumnTwo }}</td>
          <td>Email</td>
          <td>{{ testColumnFour }}</td>
          <td>{{ testColumnFive }}</td>
          <td></td>
        </thead>

        <div></div>

        <tr v-for="(Test, index) in Tests" :key="index">
          <td></td>
          <td>{{ Test.ID }}</td>
          <td>{{ Test.TestType.test_type_name }}</td>
          <td v-if="!Marked">
            {{ Test.typeform_submission_date | formatDate }}
          </td>
          <td v-if="Marked">{{ Test.results_submitted_date | formatDate }}</td>
          <td>{{ Test.proofed_id }}</td>
          <td :style="Test.marker_email ? '' : 'color: #6174A0'">
            {{ Test.marker_email ? Test.marker_email : "Not yet assigned" }}
          </td>
          <td>
            <span v-if="!Marked"
              ><span
                class="dot"
                :style="
                  !Test.is_assigned
                    ? 'background-color: #E8AA0A'
                    : 'background-color: rgba(0, 179, 115, 1)'
                "
              ></span
              >{{ Test.is_assigned != 0 ? "In Progress" : "Not Started" }}</span
            >
            <br v-if="!Marked && Test.is_assigned" /><span
              style="font-size: 0.8em; color: #6174a0"
              v-if="!Marked && Test.is_assigned"
              >Updated {{ Test.UpdatedAt | formatDate }}</span
            >
            <span v-if="Marked"
              >{{ Test.overall_decision }} ({{
                (Test.overall_score * 100).toFixed(1)
              }}%)</span
            >
          </td>
          <td>
            <span v-if="!Marked">
              <a
                @click="assignTest(Test.ID, Test.is_assigned)"
                class="primary-button pointer"
                style="padding: 6px 30px 6px 30px; color: white"
                >Mark</a
              >
            </span>
            <span v-if="Marked">
              <router-link
                class="primary-button pointer"
                style="padding: 6px 30px 6px 30px; color: white"
                :to="{ name: 'TestMarker', params: { id: Test.ID } }"
                >View</router-link
              >
            </span>
          </td>
        </tr>
      </table>

      <!-- mobile -->
      <div class="test-card-container">
        <div v-for="Test in Tests" :key="Test.ID" style="margin-bottom: 24px">
          <TestCard
            :TestID="Test.ID"
            :Marked="Marked"
            :PDate="
              Marked
                ? Test.typeform_submission_date
                : Test.results_submitted_date | formatDate
            "
            :TestType="Test.TestType.test_type_name"
            :Marker="Test.marker_email ? Test.marker_email : 'Not yet assigned'"
            :AssignedTo="
              Test.marker_email ? Test.marker_email : 'Not yet assigned'
            "
            :CandidateID="Test.proofed_id"
            :Status="Test.is_assigned != 0 ? 'In Progress ' : 'Not Started'"
            :Score="Test.overall_decision"
          />
        </div>
      </div>

      <p
        style="margin: 0 auto; text-align: center; padding: 24px 0"
        v-if="Tests.length > 0"
      >
        Showing Tests {{ pageStart }} - {{ pageStart + numTests - 1 }} of
        {{ PaginationOptions.total_results }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Repository from "../services/Repository";
import Dropdown from "../components/Dropdown.vue";
import TestCard from "../components/TestCard.vue";

export default {
  name: "TestTable",
  components: {
    Dropdown,
    TestCard,
  },
  props: ["Marked"],
  data() {
    return {
      TestTypes: [],
      testTypeToFilter: null,
      Tests: [],
      PaginationOptions: {},
      SelectedPage: 1,
      SelectedPageSize: 50,
    };
  },
  created() {
    this.fetchTestTypes();

    this.fetchTests();
  },
  computed: {
    testColumnTwo() {
      return this.Marked ? "Date Marked" : "Date Submitted";
    },
    testColumnFour() {
      return "Assigned To";
    },
    testColumnFive() {
      return this.Marked ? "Score" : "Status";
    },
    uniqueTestTypes() {
      const TestTypeObj = (name, ID) => {
        return {
          name: name,
          ID: ID,
        };
      };

      let all_test_types = this.Tests.map((t) =>
        TestTypeObj(t.TestType.test_type_name, t.TestType.ID)
      );

      all_test_types = all_test_types.filter((tt) => tt.ID > 0);

      return all_test_types;
    },
    testTypeOptions() {
      const TestTypeObj = (label, id) => {
        return {
          label: label,
          id: id,
        };
      };

      return this.TestTypes.map((tto) =>
        TestTypeObj(tto.test_type_name, tto.ID)
      );
    },
    mappedTestType() {
      return true;
    },
    numTests() {
      return this.Tests.length;
    },
    pageStart() {
      return (this.SelectedPage - 1) * this.SelectedPageSize + 1;
    },
  },
  methods: {
    fetchTestTypes() {
      Repository.get("test-types").then((r) => {
        this.TestTypes = r.data;
      });
    },
    fetchTests() {
      let req = this.testTypeToFilter
        ? `marked-tests?page=${this.SelectedPage}&page_size=${this.SelectedPageSize}&test_type=${this.testTypeToFilter.id}`
        : `marked-tests?page=${this.SelectedPage}&page_size=${this.SelectedPageSize}`;

      req = this.Marked ? req : "un" + req;

      Repository.get(req).then((r) => {
        this.PaginationOptions = r.data["pagination"];
        this.Tests = r.data["data"];
      });
    },
    setPage(page) {
      this.SelectedPage = parseInt(page);
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
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
  },
  filters: {
    formatDate: function (val) {
      return moment(val).fromNow();
    },
  },
  watch: {
    testTypeToFilter() {
      this.SelectedPage = 1;
      this.fetchTests();
    },
    SelectedPage() {
      this.fetchTests();
    },
    SelectedPageSize() {
      this.SelectedPage = 1;
      this.fetchTests();
    },
  },
};
</script>

<style lang="sass" scoped>
.test-table
    margin-right: calc(min(100px, 4vw))
    margin-left: calc(min(100px, 4vw))

.test-list-table
    width: 90%
    margin: 0 auto
    text-align: center
    border-collapse: separate
    border-spacing: 0 14px

    .test-list-header td
        font-size: 0.9em
        line-height: 17px
        color: #6174A0

    tr
        padding: 10px 14px 10px 14px
        background: white
        color: rgba(0, 30, 98, 1)
        height: 80px

.test-table-header
    display: flex
    justify-content: space-around
    font-size: 0.9em
    line-height: 17px
    color: #6174A0

.dot
  height: 12px
  width: 12px
  border-radius: 50%
  display: inline-block
  margin-right: 8px

.tt-drop-down
  margin: 0 0 40px 5vw

.page_button
  cursor: pointer

.page_container
  display: flex
  align-items: center
  justify-content: space-evenly
  width: 120px
  height: fit-content
  font-size: 16px
  padding: 8px 14px
  max-width: 200px
  transition: 1s
  margin: 0


.selected_page_button
  background: #001E62
  padding: 2px 8px
  border-radius: 10px
  color: white
  margin: 0 8px

.page_button
  transition: 0.15s ease
  margin: 0 8px
  color: #001E62

.page_button:hover
  background: #6174A0
  padding: 2px 8px
  border-radius: 10px
  color: white

.flex-spacer
  flex-grow: 1

.test-toolbar
  align-items: center
  display: flex
  justify-content: space-between
  color: white
  width: 100vw
  z-index: 3
  padding: 24px 9vw
  font-size: 0.8rem

.tt-drop
  cursor: pointer
  background: white
  border-radius: 4px
  border: none
  color: #6174A0
  min-width: 100px

.test-card-container
  display: none

@media only screen and (max-width: 900px)
    .test-card-container
      display: block

    .test-list-table
      display: none
</style>
