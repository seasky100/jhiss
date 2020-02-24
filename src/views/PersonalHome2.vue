<template>
  <div class="person_home">
    222222222222222
  </div>
</template>
<script>
export default {
  name: "PersonalHome",
  data() {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>
<style lang="stylus" scoped>
.person_home{
  margin: 2%;
  overflow auto;
}
.police_career{
  height: 170px;
  background:#fff;
}
.person_title{
  border-left:3px solid red
  padding-left: 5px
  margin-left:8px
}
</style>
