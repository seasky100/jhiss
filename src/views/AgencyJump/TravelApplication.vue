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
    const getToken = () => {
      const tokenRaw = document.cookie.split(';').find(item =>
        /token=([a-zA-Z0-9]+)/.test(item)
      );
      return tokenRaw ? RegExp.$1 : '';
    }
    const token = getToken()
      this.src = `http://41.232.3.207/workflow/wfEntity/add.shtml?id=&wfDefineInfoId=ff8080816e43f74e016e5939609102b8&listState=&wfTypeLibId=ff8080816e0171bd016e027158610054&ownerUnit=&sysId=ZHJD&token=${token}`
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
