<template>
  <div class='person_home'>
    <iframe style="height: 100%;width: 100%;" :src="src" ></iframe>
  </div>
</template>
<script>
export default {
  name: "PersonalHome",
  data() {
    return {
      src: ''
    }
  },
  mounted() {
      const token = sessionStorage.token
      this.src = `http://41.232.3.207/sys/sysPendings/toDealIndex.html?ownerUnit=&sysId=ZHJD&token=${token}`
     // http://41.232.3.207/sys/sysPendings/toDealIndex.html?ownerUnit=&sysId=ZHJD&token=${token}` // 协作提效
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.person_home{
  height: 100%;
  width: 100%;
}
.police_career{
  height: 170px;
  background:#fff;
}
.person_title{
  border-left:3px solid red;
  padding-left: 5px;
  margin-left:8px
}
</style>
