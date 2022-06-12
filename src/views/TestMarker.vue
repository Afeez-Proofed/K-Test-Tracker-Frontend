<template>
  <div>
    <div class="test-marker-grid">
      <div class="test-marker-channel-1">
        <div class="test-marker-score-overview">
          <div class="score-section">
            <h5>Overall Score</h5>
            <span
              >{{ Correct }}/{{ CalculatedTotalMarks }}
              <span style="font-size: 11px">({{ CorrectPercent }}%)</span></span
            >
          </div>
          <div class="score-section">
            <h5>Boundaries</h5>
            <ul class="boundary-list">
              <li
                :class="
                  CorrectPercent >= TestData.TestType.high_pass_rate * 100
                    ? 'boundary-text-active'
                    : 'boundary-text'
                "
              >
                Distinction {{ TestData.TestType.high_pass_rate * 100 }}%
              </li>
              <li
                :class="
                  CorrectPercent >= TestData.TestType.pass_rate * 100 &&
                  CorrectPercent < TestData.TestType.high_pass_rate * 100
                    ? 'boundary-text-active'
                    : 'boundary-text'
                "
              >
                Pass {{ TestData.TestType.pass_rate * 100 }}%
              </li>
            </ul>
          </div>
          <div class="score-section">
            <h5>Overall Decision</h5>
            <span>{{ Decision }}</span>
          </div>
          <div
            :class="
              !TestData.final_results_submitted
                ? 'secondary-button pointer'
                : 'inactive-button notallowed-pointer'
            "
            data-target="#exampleModalLong"
            data-toggle="modal"
          >
            Submit Marks
          </div>
          <div
            style="margin-top: 12px"
            class="pointer tertiary-button"
            @click="saveMarks(true)"
            v-show="!TestData.final_results_submitted"
          >
            Save Marks
          </div>
        </div>
      </div>

      <div class="test-marker-channel-2">
        <div class="test-marker-test-overview">
          <div class="overview-header">
            <h5>
              {{
                !TestData.final_results_submitted
                  ? "Pending Results"
                  : "Already Marked"
              }}
            </h5>
            <h4>{{ TestData.TestType.test_type_name }}</h4>
            <p>{{ TestData.TestType.test_type_description }}</p>
            <DataRow
              v-if="false"
              :fieldName="'Editor Comments'"
              :fieldData="TestData.candidate_comments"
            />
          </div>
          <hr v-show="false" />
          <div class="overview-field-grid">
            <div>
              <DataRow
                :fieldName="'Email'"
                :fieldData="
                  TestData.candidate_email ? TestData.candidate_email : '-'
                "
              />
              <DataRow
                :fieldName="'ProofedID'"
                :fieldData="TestData.proofed_id"
                :linkURL="`https://team.getproofed.com/editors/edit/${TestData.proofed_id}`"
              />
              <DataRow
                :fieldName="'Attempt Num'"
                :fieldData="TestData.attempt_num"
              />
            </div>
            <div>
              <DataRow
                :fieldName="'Track Change & Clean Copy'"
                :fieldData="
                  TestData.track_change_url
                    ? 'Click to Download'
                    : 'Not Uploaded'
                "
                :linkURL="TestData.track_change_url"
              />
              <!-- <DataRow
                :fieldName="'Clean Copy'"
                :fieldData="
                  TestData.clean_copy_url ? 'Click to Download' : 'Not Uploaded'
                "
                :linkURL="TestData.clean_copy_url"
              /> -->
              <DataRow
                v-if="true"
                :fieldName="'Editor Comments'"
                :fieldData="TestData.candidate_comments"
              />
            </div>
          </div>
        </div>

        <div class="test-marker-test-overview" style="margin-top: 12px">
          <span style="font-size: 12px; margin: 0 0 20px 12px">Comments</span>
          <textarea
            :disabled="TestData.final_results_submitted"
            type="textarea"
            v-model="TestData.general_comments"
            class="tt-text-area"
            placeholder="Comments to Candidate"
          />
        </div>

        <div class="marking-tool">
          <table class="marking-tool-table">
            <thead>
              <td>Q. Num</td>
              <td v-if="ShowCommentsColumn">Editor Comments</td>
              <td>Reviewer Remarks</td>
              <td width="90">
                <img
                  @click="saveMarks(true)"
                  style="margin: 0 auto; cursor: pointer"
                  src="https://aux4.iconspalace.com/uploads/950447276790987536.png"
                  width="30"
                  v-show="!TestData.final_results_submitted"
                />
              </td>
            </thead>

            <tr
              v-for="Result in TestData.Result"
              :key="Result.ID"
              :style="
                Result.passed === true
                  ? 'background-color: #AADBC9'
                  : Result.passed === false
                  ? 'background-color: #FFE1E1'
                  : ''
              "
            >
              <td>{{ Result.question_id }} {{ Result.marks }} mark</td>
              <td v-if="ShowCommentsColumn">{{ Result.editor_comments }}</td>
              <td>{{ Result.marker_remarks }}</td>
              <td>
                <label
                  class="default-radio"
                  v-show="!TestData.final_results_submitted"
                >
                  <input type="radio" :value="false" v-model="Result.passed" />
                </label>

                <label
                  :class="{ redborder: false === true }"
                  v-show="!TestData.final_results_submitted"
                >
                  <input type="radio" :value="true" v-model="Result.passed" />
                </label>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <SaveModal
      @onSubmit="submitMarks()"
      :alreadyMarked="TestData.final_results_submitted"
    />
    <div id="save-snackbar" class="snackbar">Test Successfully Saved</div>
    <div id="submitted-snackbar" class="snackbar">
      Test Successfully Submitted
    </div>
  </div>
</template>

<script>
import DataRow from "../components/DataRow.vue";
import FileIcon from "../components/FileIcon.vue";
import SaveModal from "../components/SaveModal.vue";
import Repository from "../services/Repository";

export default {
  data() {
    return {
      CommentLengthBreakpoint: 60,
      TestData: {},
      testLoaded: false,
    };
  },
  components: {
    DataRow,
    FileIcon,
    SaveModal,
  },
  name: "TestMarker",
  created() {
    //fetch the test data
    let test_id = this.$route.params.id;

    Repository.get(`test/${test_id}`)
      .then((r) => {
        this.TestData = r.data;
        this.testLoaded = true;

        if (!this.TestData.final_results_submitted)
          this.autosave = setInterval(() => this.saveMarks(false), 10000);
      })
      .catch((e) => e);
  },
  mounted() {
    //Should only auto save for the assigned user
    let assigned_user_is_authed_user =
      this.TestData.marker_email == this.$auth.user.email;
    if (!assigned_user_is_authed_user) clearInterval(this.autosave);
  },
  computed: {
    ShowCommentsColumn() {
      return this.TestData.Result.some((r) => r.editor_comment != "");
    },
    Decision() {
      if (!this.testLoaded) {
        return "Loading...";
      }

      if (this.CorrectPercent / 100 >= this.TestData.TestType.high_pass_rate) {
        return "Distinction";
      } else if (
        this.CorrectPercent / 100 >=
        this.TestData.TestType.pass_rate
      ) {
        return "Pass";
      } else if (
        this.CorrectPercent / 100 >=
        this.TestData.TestType.fail_rate
      ) {
        return "Fail";
      } else {
        return "Fail";
      }
    },
    Correct() {
      return (
        this.testLoaded &&
        this.TestData.Result.filter((q) => q.passed)
          .map((q) => q.marks)
          .reduce((a, b) => a + b, 0)
      );
    },
    CorrectPercent() {
      return (
        this.testLoaded &&
        ((this.Correct / this.CalculatedTotalMarks) * 100).toFixed(1)
      );
    },
    NumUnmarked() {
      return (
        this.testLoaded &&
        this.TestData.Result.filter(
          (q) => q.passed === undefined || q.passed === null
        ).length
      );
    },
    CalculatedTotalMarks() {
      if (!this.testLoaded) {
        return 0;
      }

      let sum = 0;
      this.TestData.Result.forEach((r) => (sum += r["marks"]));
      return sum;
    },
  },
  beforeDestroy() {
    clearInterval(this.autosave);
  },
  methods: {
    submitMarks() {
      let testID = this.$route.params.id;

      //verify that all questions are assessed
      let anyUnmarked = this.TestData.Result.some((r) => {
        r.passed === null || r.passed === undefined;
      });

      if (anyUnmarked) {
        return;
      }

      //compile the results
      let results = [];
      this.TestData.Result.forEach((r) => {
        let resultObject = {
          result_id: r.result_id,
          passed: r.passed,
          marked: true, //above logic should guarantee that this is always true
          editor_comments: r.editor_comments,
          marker_remarks: r.marker_remarks,
        };
        results.push(resultObject);
      });

      Repository.put(`test/${testID}?submit=true`, {
        results: results,
        decision: this.Decision,
        score: this.CorrectPercent / 100,
        general_comments: this.TestData.general_comments,
        marker_email: this.$auth.user.email,
      })
        .then((r) => {
          r;
          this.$router.go({ name: "MarkedTest", params: { id: testID } });
          this.$notify({
            title: "Results Successfully Submitted",
            text: "",
            type: "info",
          });

          clearInterval(this.autosave);
        })
        .catch((e) => {
          this.$notify({
            title: "Error Submitted Results",
            text: e,
            type: "error",
          });

          clearInterval(this.autosave);
        });
    },
    saveMarks(showNotification) {
      let testID = this.$route.params.id;

      let results = [];
      this.TestData.Result.forEach((r) => {
        let resultObject = {
          result_id: r.result_id,
          passed: r.passed,
          marked: r.passed === null || r.passed === undefined ? false : true,
        };
        results.push(resultObject);
      });

      Repository.put(`test/${testID}`, {
        results: results,
        general_comments: this.TestData.general_comments,
      })
        .then((r) => {
          r;
          if (showNotification)
            this.$notify({
              title: "Test Successfully Saved",
              text: "Results will be here when you get back",
              type: "info",
            });
        })
        .catch((e) => {
          this.$notify({
            title: "Error Saving Test",
            text: e,
            type: "error",
          });

          clearInterval(this.autosave);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.test-marker-grid
    display: grid
    margin-top: 60px
    margin-right: calc(min(100px, 4vw))
    margin-left: calc(min(100px, 4vw))
    grid-template-columns: 2fr 10fr


.save-overview:hover
    background-color: rgba(0, 30, 98, 0.25)

.test-marker-score-overview
    padding: 24px
    background: white
    width: 90%
    margin: 0 12px 0 12px
    position: fixed
    top: 138px
    width: 14vw

    .score-section
        margin: 12px 0 20px 0

    span
        font-size: 18px


.overview-field-grid
    display: grid
    grid-template-columns: 1fr 1fr
    grid-column-gap: 40px

@media only screen and (max-width: 900px)
    .test-marker-grid
        grid-template-columns: 1fr

    .test-marker-score-overview
        margin-bottom: 24px
        position: static
        width: calc(100% - 50px)

    .test-marker-test-overview
        margin-top: 34px

    .overview-field-grid
        grid-template-columns: 1fr

.test-marker-test-overview
    background: white
    width: 90%
    margin: 0 12px 0 12px
    padding: 24px

.marking-tool
    width: 90%
    margin: 12px 12px 0 12px

.marking-tool-table
    font-size: 14px
    width: 100%
    margin-bottom: 60px

    thead
        background-color: #212065
        color: white

    tr
      background: white
      color: rgba(33, 32, 101, 1)
      font-size: 0.95em
      border-bottom: 1px solid lightgrey

    td
        padding: 10px

h4
    font-weight: 400

h5
    margin-bottom: 2px
    color: rgba(97, 116, 160, 1)
    font-size: 13px
    font-weight: 400

.default-radio
    font-size: 24px
    color: red
    margin: 0 20px 0 20px

input[type="radio"]
    -ms-transform: scale(2)
    -webkit-transform: scale(2)
    transform: scale(2)

    .correct[type="radio"]:after
        border: 2px solid red
        background-color: #d1d3d1

.pointer
    cursor: pointer

.notallowed-pointer
  cursor: not-allowed

.snackbar
    visibility: hidden
    min-width: 250px
    margin-left: -125px
    background-color: #333
    color: #fff
    text-align: center
    border-radius: 2px
    padding: 16px
    position: fixed
    z-index: 1
    left: 50%
    bottom: 30px
    &.show
      visibility: visible
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s
      animation: fadein 0.5s, fadeout 0.5s 2.5s

.tt-text-area
  background: #FFFFFF
  border: 1px solid #92A0BF
  box-sizing: border-box
  border-radius: 22px
  padding: 4px 20px
  min-height: 40px
  width: 100%
  font-size: 16px
  line-height: 28px
  resize: vertical
  overflow: visible

.boundary-list
  padding-left: 18px

.boundary-text
  font-size: 10pt !important
  color: #92A0BF


.boundary-text-active
  font-size: 10pt !important
  font-weight: 400
  color: #212065
</style>
