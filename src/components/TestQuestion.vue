<template>
  <div class="test-question-item">
    <div class="tq-box">
      <div>
        <span class="subline">Marker Remarks</span>
        <p>{{ testQuestion.marker_remarks }}</p>
        <span class="subline">Editor Feedback</span>
        <p>{{ testQuestion.editor_comments }}</p>
      </div>
      <span class="action_icons"
        ><a class="tq_action delete_tooltip">
          <div @click="deleteQ">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="20px"
              height="20px"
              viewBox="0 0 29.5 34.3"
              class="svg-icon"
              style="enable-background: new 0 0 29.5 34.3; margin: 10px"
              xml:space="preserve"
            >
              <defs></defs>
              <g id="_x34_zVlNu_2_">
                <g>
                  <path
                    class="st0"
                    d="M1.4,7.7c9.1,0,17.7,0,26.6,0c0.1,0.8,0.2,1.6,0.2,2.3c0,6.7,0,13.4,0,20.1c0,3.3-0.9,4.2-4.1,4.2
			c-6.2,0-12.4,0-18.7,0c-3.1,0-4-0.9-4-4C1.4,22.9,1.4,15.4,1.4,7.7z"
                  />
                  <path
                    class="st0"
                    d="M14.8,4.3c-4,0-8,0.1-11.9-0.1c-1,0-1.9-0.8-2.8-1.3c0.9-0.5,1.7-1.2,2.7-1.3c1.5-0.2,3,0.1,4.5-0.1
			C8.4,1.3,9.7,0.5,11,0.4c2.4-0.2,5.2-0.9,7.3,0c1.9,0.8,3.5,1,5.4,1c1.1,0.1,2.2-0.2,3.2,0.1c1,0.2,1.8,0.9,2.7,1.4
			c-0.9,0.4-1.7,1.2-2.6,1.2c-3.4,0.1-6.8,0.1-10.2,0.1C16.1,4.3,15.4,4.3,14.8,4.3z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </a>
        <a class="tq_action update_tooltip">
          <div @click="updateQ">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="20px"
              height="20px"
              viewBox="0 0 80.1 85"
              class="svg-icon"
              style="enable-background: new 0 0 80.1 85; margin: 10px"
              xml:space="preserve"
            >
              <defs></defs>
              <g>
                <path
                  class="st0"
                  d="M24.4,76.2c-0.1-0.5-0.2-1-0.3-1.4c-0.2-2.1-1.4-3.2-3.8-3.1c-1.1,0-2.1,0-3.2-0.1c-3.7-0.2-4.3-0.7-4.6-4
		c-0.1-1.2-0.2-2.5-0.2-3.7c0-2.5-0.2-4.9-4.6-4.7c13.2-14,25.9-27.5,38.9-41.2c1.3,1.3,2.4,2.5,3.6,3.7c4,4.2,7.9,8.4,11.9,12.5
		c0.9,1,0.9,1.6,0,2.6C49.7,49.8,37.3,62.9,24.9,76C24.9,76,24.8,76.1,24.4,76.2z"
                />
                <path
                  class="st0"
                  d="M70.1,28.1C64.8,22.4,59.6,17,54.5,11.5c-0.3-0.4-0.3-1.4,0-1.8c2.4-2.7,4.9-5.5,7.6-8
		c2.4-2.3,5.9-2.2,8.2,0.1c2.8,2.7,5.4,5.4,7.9,8.3c2.5,3,2.3,6.6-0.1,9.6c-0.3,0.4-0.6,0.7-0.9,1C74.9,23.1,72.7,25.4,70.1,28.1z"
                />
                <path
                  class="st0"
                  d="M3.1,71.1c3.6,3.8,6.6,7,9.8,10.4c-3.3,1.2-6.2,2.4-9.2,3.4c-1.8,0.6-4.1-1.1-3.7-3.1C0.7,78.4,2,75,3.1,71.1z
		"
                />
              </g>
            </svg>
          </div>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestQuestion",
  props: ["testQuestion"],
  methods: {
    updateQ() {
      this.$emit("updateQ", this.testQuestion.SchemaID);
    },
    deleteQ() {
      this.$emit("deleteQ", this.testQuestion.SchemaID);
      //trigger Modal
    },
  },
};
</script>

<style lang="sass" scoped>
.test-question-item
    margin-top: 6px
    padding: 20px
    border-bottom: 2px dashed rgba(0, 30, 98, 0.1)
    color: #001E62

.tq-box
    display: flex
    justify-content: space-between

.tq_action
    color: #001E62

.action_icons
    display: flex
    position: relative
    align-items: center
    justify-content: center
    transition: 0.33s ease


.delete_tooltip:hover:before
  content: 'Delete Question'
  font-size: 0.8rem
  min-width: 120px
  text-align: center
  position: absolute
  top: -2px
  left: -20px
  padding: 8px
  background: #001E62
  color: white
  z-index: 100
  transition: 0.33s ease


.update_tooltip:hover:before
  content: 'Update Question'
  font-size: 0.8rem
  min-width: 120px
  text-align: center
  position: absolute
  top: -2px
  left: 0px
  padding: 8px
  background: #001E62
  color: white
  z-index: 100
  transition: 0.33s ease



.svg-icon
  fill: #001E62
  transition: 0.25s
  cursor: pointer

.svg-icon:hover
  transform: translateY(-2px)
</style>
