<template>
  <div class='person_home'>
    <iframe style="height: 100%;width: 100%;" src="http://10.121.128.1" ></iframe>
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
     // http://41.232.3.207/sys/sysPendings/toDealIndex.html?ownerUnit=&sysId=ZHJD&token=${token}` // 协作提效
     // http://10.121.252.53:1001 // 市局门户
    //  http://10.121.252.53:1001/login.aspx?cardId=${cardId}` //精细化
    // if(this.$route.name === sjmh){
    //   this.src = 'http://10.121.252.53:1001'

    // }else if(this.$route.query.token){
    //   this.src =`http://41.232.3.207/sys/sysPendings/toDealIndex.html?ownerUnit=&sysId=ZHJD&token=${token}`

    // }else if(this.$route.query.cardId){
    //   const cardId = this.$route.query.cardId
    //   this.src = `http://10.121.252.53:1001/login.aspx?cardId=${cardId}`
    // }

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
