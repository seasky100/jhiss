<template>
  <div class="talk_add">
		<div class="individual_title">
      个人事项申报
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<e-search :inlineFlag="inlineFlag"
        :disabled="disabled"
				:label_position="label_position"
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm" />
		</div>
    <!-- 流程图 -->
		<div style="float:left;margin:40px 0 0 50px;">
			<div class="individual_title">
				其他报告事项
			</div>
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
</template>
<script>
export default {
  name: "organizationRequestAdd",
  data() {
    return {
			inlineFlag:false,
      label_position:'top',
      disabled: false,
			// org_flag: false,
      searchData: {
        userName: '',
        policeCode: '',
        department: '',
        problemType: '',
        startTime: '',
        endTime: ''
			},
			searchForm: [
        {label:'事由',type: 'input', prop: 'formData',  placeholder: '请输入事由'},
				{
					label:'事项类型',
          type: 'select',
          prop: 'reportType',
          width: '100%',
          options: [
            {label:'饮酒', value:'201'},
            {label:'离开单位', value:'202'},
            {label:'离开辖区', value:'203'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {label:'申报开始时间',type: 'date', prop: 'gmtCreate',  placeholder: '请输入事由'},
        {label:'申报结束时间',type: 'date', prop: 'gmtCreate',  placeholder: '请输入事由'},
				{
					label:'审批人',
          type: 'select_tree',
          prop: 'department',
          width: '100%',
          options: [
            {
              prop: 'department',
              placeholder: '请选择机构'
            },
            {
              prop: 'sponsorName',
              placeholder: '请选择审批人'
            }
          ],
          change: row => console.log(row),
          placeholder: '所属部门'
				}
			],
    }
  },
  watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},
  mounted() {
    this.init()
  },
  methods: {
		init() {
			let row = this.$route.query
      console.log(row)
      if(Object.keys(row).length > 0){
        this.disabled = true
        this.searchData = row
      }
		},
		// 查询
    handleSearch(params) {
      // Object.assign(this.searchData, params);
      console.log(params)
      // this.query();
		}
  }
}
</script>
<style lang="stylus" scoped>
.individual_title
	height:40px;
	line-height:40px;
	padding:0 10px;
	font-size 16px
	font-weight bold
</style>
