<template>
  <div :style="cssVars">
    <!--
    <TTModal
      v-show="showDeleteModal"
      @onConfirm="deleteTestQuestion()"
      header="Are you Sure?"
      message="Yes mate"
    />
    -->
    <Dropdown
  
      :selected="testTypeToFilter"
      v-on:input="testTypeToFilter = $event"
      :options="uniqueTestTypes"
      class="tt-drop-down"
      title="Select Test Type"
    />
    <div class="schema-container">
      <div
        class="test-type-overview schema-container-item"
        style="max-height: 500px"
      >
        <p class="card-header-text">{{ Schema.test_type_name }}</p>
        <p style="font-size: 0.9em; margin-top: 0">
          {{ Schema.test_type_description }}
        </p>
        <DataRow :fieldName="'Total Marks'" :fieldData="Schema.total_marks" />
        <DataRow
          :fieldName="'Payment Amount'"
          :fieldData="`$${(Schema.payment_amount_cents / 100).toFixed(2)}`"
        />
        <DataRow
          :fieldName="'Show Granular Feedback'"
          :fieldData="Schema.show_granular ? 'Yes' : 'No'"
        />
        <DataRow
          :fieldName="'High Pass Rate'"
          :fieldData="`${Schema.high_pass_rate * 100}%`"
        />
        <DataRow
          :fieldName="'Pass Rate'"
          :fieldData="`${Schema.pass_rate * 100}%`"
        />
        <DataRow
          :fieldName="'Fail Rate'"
          :fieldData="`${Schema.fail_rate * 100}%`"
        />
      </div>

      <div class="test-question-list schema-container-item">
        <p class="subline" v-show="editQuestionState.showForm">Editing</p>
        <p>
          <span
            class="card-header-text pointer"
            :style="
              !editQuestionState.showForm
                ? 'display: flex; justify-content: space-between'
                : ''
            "
            @click="editQuestionState.showForm = false"
          >
            <span>{{ editorHeader }}</span
            ><span
              v-show="showQuestionView"
              @click="createQuestionState.showForm = true"
              class="subline"
              style="font-family: sans-serif"
            >
              + New Question
            </span>
          </span>
          <span class="card-header-text" v-show="editQuestionState.showForm">
            / ID {{ editQuestionState.questionID }}
          </span>
        </p>

        <!-- question creator -->
        <div v-if="createQuestionState.showForm" class="create-question-form">
          <span class="form-label">Question Identifier</span>
          <input
            type="text"
            class="thin-text-area"
            placeholder="Q ID"
            v-model="createQuestionState.newQuestionForm.question_identifier"
          />

          <span class="form-label">Marks</span>
          <input
            type="number"
            class="thin-text-area"
            placeholder="marks"
            v-model="createQuestionState.newQuestionForm.marks"
          />

          <span class="form-label">Marker Remarks</span>
          <textarea
            class="thicc-text-area"
            placeholder="Marker Remarks"
            v-model="createQuestionState.newQuestionForm.marker_remarks"
          />

          <span class="form-label">Editor Feedback</span>
          <textarea
            class="thicc-text-area"
            placeholder="Editor Feedback"
            v-model="createQuestionState.newQuestionForm.editor_comments"
          />
          <div
            class="secondary-button pointer"
            style="height: 36px; line-height: 36px"
            @click="createTestQuestion"
          >
            Create Test Question for {{ testTypeToFilter }}
          </div>
          <div
            @click="createQuestionState.showForm = false"
            class="tertiary-button pointer"
            style="height: 36px; line-height: 36px; margin-top: 12px"
          >
            Return to Questions
          </div>
        </div>

        <!-- question editor -->

        <div v-if="editQuestionState.showForm">
          <span class="form-label">Question Identifier</span>
          <input
            type="text"
            class="thin-text-area"
            placeholder="Q ID"
            v-model="
              Schema.TestQuestions.filter(
                (q) => q['SchemaID'] == editQuestionState.questionID
              )[0]['question_id']
            "
          />

          <span class="form-label">Marks</span>
          <input
            type="number"
            class="thin-text-area"
            placeholder="marks"
            v-model="
              Schema.TestQuestions.filter(
                (q) => q['SchemaID'] == editQuestionState.questionID
              )[0]['marks']
            "
          />

          <span class="form-label">Marker Remarks</span>
          <textarea
            class="thicc-text-area"
            placeholder="Marker Remarks"
            v-model="
              Schema.TestQuestions.filter(
                (q) => q['SchemaID'] == editQuestionState.questionID
              )[0]['marker_remarks']
            "
          />

          <span class="form-label">Editor Feedback</span>
          <textarea
            class="thicc-text-area"
            placeholder="Editor Feedback"
            v-model="
              Schema.TestQuestions.filter(
                (q) => q['SchemaID'] == editQuestionState.questionID
              )[0]['editor_comments']
            "
          />
          <div
            class="secondary-button pointer"
            style="height: 36px; line-height: 36px"
            @click="updateTestQuestion"
          >
            Update Test Question
          </div>
          <div
            @click="editQuestionState.showForm = false"
            class="tertiary-button pointer"
            style="height: 36px; line-height: 36px; margin-top: 12px"
          >
            Return to Questions
          </div>
        </div>

        <div v-show="showQuestionView">
          <input
            v-model="questionSearch"
            class="thin-text-area"
            placeholder="Search"
          />

          <div v-if="testTypeToFilter !== 'EEDSTR01'" v-for="(question, index) in filteredQuestions" :key="index">
            <TestQuestion
              :testQuestion="question"
              @updateQ="triggerTQForm"
              @deleteQ="deleteQuestion"
            />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Repository from "../services/Repository";
import TestQuestion from "../components/TestQuestion.vue";
import DataRow from "../components/DataRow.vue";
import TTModal from "../components/TTModal.vue";
import TestTable from "../components/TestTable.vue";
import Dropdown from "../components/Dropdown.vue";
// import e from "express";

export default {
  name: "SchemaEditor",
  components: { TestQuestion, DataRow, TTModal, TestTable, Dropdown },
  data() {
    return {
      Schema: {},
      questionSearch: "",
      showDeleteModal: false,
      editQuestionState: {
        showForm: false,
        questionID: 130,
      },
      AllTestTypes: [],
      testTypeToFilter: "EEDSTR01",
      createQuestionState: {
        showForm: false,
        newQuestionForm: {
          question_identifier: "",
          marker_remarks: "",
          editor_comments: "",
          marks: 1,
          issue_type: "",
          test_type: -1,
        },
      },
    };
  },

  created() {
    Repository.get(`test-type/${this.testTypeToFilter}`).then((r) => {
      this.Schema = r.data;
    });

    Repository.get("test-types").then((r) => {
      this.AllTestTypes = r.data;
    });
  },
  methods: {
    
    triggerTQForm(SchemaID) {
      this.editQuestionState.showForm = true;
      this.editQuestionState.questionID = SchemaID;
    },
    deleteQuestion(SchemaID) {
      Repository.delete(`test-question/${SchemaID}`)
        .then((r) => {
          r;
          this.Schema.TestQuestions = this.Schema.TestQuestions.filter(
            (q) => q["SchemaID"] != SchemaID
          );

          this.$notify({
            title: "Successfully Deleted",
            text: "",
            type: "info",
          });
        })
        .catch((e) => {
          this.$notify({
            title: "Error Deleting",
            text: e,
            type: "error",
          });
        });
    },

    createTestQuestion() {
      let newQData = this.createQuestionState.newQuestionForm;
      let payload = {
        question_identifier: newQData.question_identifier,
        marker_remarks: newQData.marker_remarks,
        editor_comments: newQData.editor_comments,
        marks: parseInt(newQData.marks),
        issue_type: "",
        test_type: this.Schema.ID,
      };
      Repository.post("test-question", payload)
        .then((r) => {
          this.$notify({
            title: "Successfully Created",
            text: r.data,
            type: "info",
          });

          this.resetCreateState();

          //reload schema
          Repository.get(`test-type/${this.testTypeToFilter}`).then((r) => {
            this.Schema = r.data;
          });
        })
        .catch((e) => {
          this.$notify({
            title: "Test Creation Was Unsuccessful",
            text: e,
            type: "warn",
          });
        });
    },

    updateTestQuestion() {
      if (!this.editQuestionState.showForm) return;

      let testQuestion = this.Schema.TestQuestions.filter(
        (q) => q["SchemaID"] == this.editQuestionState.questionID
      )[0];

      let payload = {
        question_identifier: testQuestion["question_id"],
        marker_remarks: testQuestion.marker_remarks,
        editor_comments: testQuestion.editor_comments,
        info_url: "",
        marks: parseInt(testQuestion.marks),
        issue_type: "",
        test_type: testQuestion.TestType.id,
      };

      Repository.put(
        `test-question/${this.editQuestionState.questionID}`,
        payload
      )
        .then((r) => {
          r;
          this.editQuestionState.showForm = false;
          this.editQuestionState.questionID = 0;

          this.$notify({
            title: "Successfully Updated",
            text: "",
            type: "info",
          });
        })
        .catch((e) => {
          this.$notify({
            title: "Error Updating",
            text: e,
            type: "error",
          });
        });
    },
    resetCreateState() {
      this.createQuestionState = {
        showForm: false,
        newQuestionForm: {
          question_identifier: "",
          marker_remarks: "",
          editor_comments: "",
          marks: 1,
          issue_type: "",
          test_type: -1,
        },
      };
    },
  },
  computed: {
    cssVars() {
      let status = undefined;
      if (this.createQuestionState.showForm) {
        status = "Creating New Question";
      } else if (this.editQuestionState.showForm) {
        status = "Editing Question";
      }
      return {
        "--text": JSON.stringify(status),
      };
    },
    filteredQuestions() {
      let query = this.questionSearch.toLowerCase();

      if (query.length > 0) {
        return this.Schema.TestQuestions.filter(
          (q) =>
            q["marker_remarks"].toLowerCase().indexOf(query) > -1 ||
            q["editor_comments"].toLowerCase().indexOf(query) > -1
        );
      } else {
        return this.Schema.TestQuestions;
      }
    },
    uniqueTestTypes() {
      // return this.AllTestTypes.map((r) => r["test_type_name"]);
      return [
        "acadfad",
        "adsfadfa",
        "adsfasdfa",
        "acadfad",
        "adsfadfa",
        "adsfasdfa",
        "acadfad",
        "adsfadfa",
        "adsfasdfa",
        "acadfad",
        "adsfadfa",
        "adsfasdfa",
        "acadfad",
        "adsfadfa",
        "adsfasdfa",
      ]
    },
    showQuestionView() {
      return (
        !this.createQuestionState.showForm && !this.editQuestionState.showForm
      );
    },
    editorHeader() {
      if (this.createQuestionState.showForm) {
        return `Creating New Question for ${this.testTypeToFilter}`;
      } else if (this.editQuestionState.showForm) {
        return `Editing Question`;
      } else {
        return `${this.testTypeToFilter} Questions`;
      }
    },
  },
  watch: {
    testTypeToFilter: function () {
      Repository.get(`test-type/${this.testTypeToFilter}`).then((r) => {
        this.Schema = r.data;
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.schema-editor-container
    background: white
    height: 640px
    width: 640px
    padding: 64px
    margin: 64px auto


.schema-container
  display: grid
  grid-template-columns: 1fr 2fr
  grid-column-gap: 24px
  margin: 94px 120px 64px 120px

.tt-drop-down
  position: absolute
  margin-left: 120px
  margin-top: 30px
  overflow-y: scroll
  max-height: 400px

.schema-container-item
  background: white
  padding: 32px

.form-label
  font-size: 12px
  line-height: 16px
  color: #001E62


.thin-text-area
  width: 100%
  background: #FFFFFF
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-sizing: border-box
  border-radius: 22px
  padding: 8px
  color: #001E62
  padding-left: 22px
  margin: 0 0 12px 0

.thicc-text-area
  width: 100%
  background: #FFFFFF
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-sizing: border-box
  border-radius: 22px
  padding: 8px
  color: #001E62
  padding-left: 22px
  min-height: 64px
  margin: 0 0 12px 0

.thin-text-area:focus
  box-shadow: none
  border: 2px solid #00B373

.test-type-select-container
  display: flex
  justify-content: space-around
  margin: 40px 80px 0
  max-width: 100%

.create-question-form
  background: white

.test-question-list
  position: relative

.test-question-list::before
  position: absolute
  content: var(--text)
  text-align: center
  background: rgba(0, 30, 98, 1)
  color: white
  width: 100%
  height: auto
  padding: 2px
  font-size: 10pt
  left: -0px
  top: -24px

@media only screen and (max-width: 900px)
  .schema-container
    grid-template-columns: 1fr
    margin: 16px

  .schema-container-item
    margin: 16px
</style>
