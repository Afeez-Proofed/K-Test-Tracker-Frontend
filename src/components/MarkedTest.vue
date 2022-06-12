<template>
  <div>
    <div class="test-row">
        <span class="test-row-icon"></span>
        <span>{{ TestTypeName }}</span>
        <span>{{ DateMarked }}</span>
        <span>{{ CandidateEmail }}</span>
        <span>{{ Marker }}</span>
        <span>{{ Result }}</span> 
        <router-link class="primary-button" :to="{ name: 'TestMarker', params: { id: TestID }}">View</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "DateMarked",
    "TestTypeName",
    "CandidateEmail",
    "Marker",
    "Result",
    "TestID"
  ]
};
</script>

<style>
</style>
