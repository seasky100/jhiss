<template>
  <div class="organizationRequestDetail">
    <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
			<div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
			<span class='pl8 txt-bold font14' style="">详情（事项申报）</span>
		</div>
    <div class="detail_left">
      <table class="detail_tab">
        <tr>
          <td>事项类型：</td>
          <td>饮酒</td>
        </tr>
        <tr>
          <td>事由：</td>
          <td>饮酒</td>
        </tr>
        <tr>
          <td>事项时间：</td>
          <td>饮酒</td>
        </tr>
      </table>
    </div>
    <div class="detail_right">
      <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
        <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
        <span class='pl8 txt-bold font14' style="">审批详情</span>
      </div>
      <!-- 步骤条 -->
      <div style="margin-top:10px;">
        <el-steps direction="vertical" :active="1" finish-status="success">
          <el-step title="步骤 1">
            <i class="step01" slot="icon">
                <!-- <img :src="[commandmenubg==item.class?item.imgSrc_hover:item.imgSrc]"
                    style="position: absolute;top: -6px;left: -6px;" /> -->
              <img />
            </i>
            <i slot="title" style="background:none;">
                步骤一一
            </i>
            <i slot="description" style="background:none;margin:0px 5px 20px;">
                详情意义
            </i>
          </el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "organizationRequestDetail",
  data() {
    return {
      id:'',
      flowCode:'',
      isCollapse: false,
      menuList: []
    }
  },
  watch: {},
  mounted() {
    this.id = this.$route.query.id
    this.flowCode = this.$route.query.flowCode
		console.log(this.flowCode)
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData(){
      const _this = this
      this.$request.get(`/police/gaism-server/weddingBanquet/getApprovalById?flowCode=${this.flowCode}`)
          .then(res => {
					let data = res.data
          console.log(data)
      })
      .catch(error => {
          console.log(error)
      })
          
    }
  }
}
</script>
<style lang="stylus" scoped>
.organizationRequestDetail{
  margin: 2%;
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
.detail_left,.detail_right
  float left 
  width 50% 
  padding-top:50px
.detail_tab
  margin: 0px 5%
.detail_tab tr td
  text-align right
</style>
