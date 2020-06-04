<template>
  <div class='person_home'>
    <iframe style="height: 100%;width: 100%;" :src='src' ></iframe>
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
  beforeCreate(){

  },
  mounted() {
    debugger
    let getToken = () => {
      let tokenRaw = document.cookie.split(';').find(item =>
        /token=([a-zA-Z0-9]+)/.test(item)
      );
      return tokenRaw ? RegExp.$1 : '';
    }
    let token = getToken()
    console.log('token22',token);
    let userId = sessionStorage.userId
    this.src = `http://41.232.3.207/sys/indexOA.shtml?ownerUnit=&sysId=ZHJD&userId=${userId}&token=${token}`
    console.log('this.src',this.src)
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
