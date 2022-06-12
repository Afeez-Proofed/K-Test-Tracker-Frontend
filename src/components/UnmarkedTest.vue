<template>
  <div>
    <div class="test-row">
        <span>{{ TestTypeName }}</span>
        <span>{{ DateSubmitted }}</span>
        <span>{{ CandidateEmail }}</span>
        <span>{{ AssignedTo ? AssignedTo : '-' }}</span>
        <span><span class="dot" :style="statusBool ? 'background-color: #E8AA0A' : 'background-color: rgba(0, 179, 115, 1)'"></span>{{ status }}</span> 
        <a @click="assignTest" class="primary-button pointer" style="color: white">Mark</a>
    </div>
  </div>
</template>

<script>
import FileIcon from "../components/FileIcon.vue";
import Repository from "../services/Repository";
//import MarkerMapService from "../services/MarkerMap";

export default {
  props: [
    "DateSubmitted",
    "TestTypeName",
    "CandidateEmail",
    "AssignedTo",
    "TestID"
  ],
  components: { FileIcon },
  computed: {
    status() {
      return this.AssignedTo ? "Pending" : "Not Started";
    },
    statusBool() {
      return this.AssignedTo ? true : false;
    }
  },
  methods: {
    assignTest() {
      //let authSub = this.$auth.user.id;
      //let markerId = MarkerMapService.getMarkerIDByAuthSub(authSub);

      if (this.AssignedTo != 0) {
        this.$router.push({
          name: "TestMarker",
          params: { id: this.TestID }
        });
        return
      }

      Repository.post(`assign?test=${this.TestID}&marker=${1}`)
        .then(r => {
          r;
          this.$router.push({
            name: "TestMarker",
            params: { id: this.TestID }
          });
        })
        .catch(e => {
          e;
        });
    }
  }
};
</script>

<style lang="sass" scoped>
.dot 
  height: 12px
  width: 12px
  border-radius: 50%
  display: inline-block
  margin-right: 8px

</style>
