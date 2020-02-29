<template>
  <div class="talk_add">
		<div class="individual_title">
      谈话谈心
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
  name: "TalkAdd",
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
				{
					label:'被谈话人',
          type: 'select_tree',
          prop: 'department',
          width: '100%',
          options: [
            {
              prop: 'deptName',
              placeholder: '请选择机构'
            },
            {
              prop: 'userName',
              placeholder: '请选择审批人'
            }
          ],
          change: row => console.log(row),
          placeholder: '所属部门'
				},
				{
					label:'谈话类型',
          type: 'select',
          prop: 'interviewType',
          width: '100%',
          options: [
            {label:'谈话谈心', value:'1'},
            {label:'家庭走访', value:'2'},
            {label:'约谈提醒', value:'3'},
            {label:'帮助教育', value:'4'},
            {label:'其他', value:'5'},
          ],
          change: row => console.log(row),
          placeholder: ''
        },
				{label:'谈话时间',type: 'date', prop: 'interviewTime',  placeholder: ''},
				{label:'谈话内容',type: 'textarea', prop: 'interviewContent',  placeholder: ''},
				{label:'附件',type: 'file', prop: '',  placeholder: ''},
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
      // console.log(row)
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
/*滚动条样式*/
::-webkit-scrollbar { width: 6px; height: 6px; background-color: #666;}
::-webkit-scrollbar-track { border-radius: 10px; background-color: #666;}
::-webkit-scrollbar-thumb { border-radius: 10px; background-color: #222;}
.date_pick{
    width: 100% !important;
}
.selectDiv{
  height:350px;
}
.el-scrollbar .el-scrollbar__wrap {overflow-y: hidden;}
.selectDiv .el-tree>.el-tree-node{display:inline-block;}
.talk_add
  margin: 2%
.selectDiv
	position absolute
	width 40%
	z-index 1
.individual_title
	height:40px;
	line-height:40px;
	padding:0 10px;
	font-size 16px
	font-weight bold
</style>
