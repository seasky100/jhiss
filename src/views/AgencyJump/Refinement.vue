<template>
  <div class="person_home">
    <iframe style="height: 100%;width: 100%;" :src="src"></iframe>
  </div>
</template>
  <script>
export default {
  name: "PersonalHome",
  data() {
    return {
      src: "",
      userInfo: "",
      cardNum: ""
    };
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.userInfo);
    this.cardNum = this.userInfo.cardNum;
    this.src = `http://10.121.252.53:1001/login.aspx?cardId=${this.cardNum}`;
    //  http://10.121.252.53:1001/login.aspx?cardId=${cardId}` //精细化
  },
  methods: {}
};
</script>
  <style lang="stylus" scoped>
  .person_home {
    height: 100%;
    width: 100%;
  }

  .police_career {
    height: 170px;
    background: #fff;
  }

  .person_title {
    border-left: 3px solid red;
    padding-left: 5px;
    margin-left: 8px;
  }
</style>
  