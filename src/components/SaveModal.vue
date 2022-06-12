<template>
  <div>
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header" v-show="!alreadyMarked">
        <h5 class="modal-title" id="exampleModalLongTitle">Are you sure?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-if="!alreadyMarked">
        Once the marks for this test have been submitted, you cannot change them. If you'd like to save the results and come back to them, click the save icon in the top right hand corner of the test marking table.
      </div>
      <div class="modal-body" v-if="alreadyMarked">
        This test has already been marked.
      </div>
      <div class="modal-footer">
        <div type="button" class="secondary-button" data-dismiss="modal">Close</div>
        <div v-show="!alreadyMarked" type="button" class="primary-button" style="min-width: 140px" data-dismiss="modal" @click="submitMarks()">Submit Marks</div>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
export default {
  name: "SaveModal",
  props: ["alreadyMarked"],
  methods: {
    submitMarks() {
      this.$emit("onSubmit");
    }
  }
};
</script>
<style>
</style>
