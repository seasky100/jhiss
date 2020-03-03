<template>
  <div class="person_home">
    <div class="police_career">
    </div>
    <!-- 风险提醒 -->
    <div class="police_career" style="height:calc(100% - 140px);background:none;">
			<!-- 个人信息 -->
      <div class="fengxian" style="width:400px;">
      </div>
			<!-- 领导属下信息 -->
      <div class="fengxian" style="width:calc(99% - 400px);margin-left:0.7%;">
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: "Personnel_relation",
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    init() {
    },

  }
}
</script>
<style lang="stylus" scoped>
.person_home{
  margin: 1%;
	width 98%;
	height:98%;
}
.police_career{
  height: 120px;
  background:#fff;
  margin-bottom 15px;
}
.fengxian{
  float:left;
  background #fff;
  height:100%;
}
.person_title{
  float:left;
  width:100%;
  height:30px;
  margin: 10px;
  margin-bottom 0;
  font-size:16px;
  font-weight:bold;
  line-height:30px;
  border-left:5px solid red
  padding-left: 5px
}
</style>
