<template>
  <div class="talk_add">
		<div class="individual_title">
      涉纪涉诉事项
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					本人、父母、配偶、子女及其配偶涉及民事诉讼的情况，事发7日内报告。
				</span>
			</div>
			<e-search :inlineFlag="inlineFlag"
				:label_position="label_position"
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm" />
		</div>
    <!-- 流程图 -->
		<div style="float:left;margin:40px 0 0 50px;">
			<div class="individual_title">
				涉纪涉诉事项
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
  name: "Matters_involved",
  data() {
    return {
			inlineFlag:false,
			label_position:'top',
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
        {label:'姓名',type: 'input', prop: 'policeCode',  placeholder: ''},
        {
					label:'与本人关系',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'配偶', value:'0'},
            {label:'子女', value:'1'},
            {label:'子女配偶', value:'2'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {
					label:'类型',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'民事诉讼', value:'0'},
            {label:'执纪执法机关查处', value:'1'},
            {label:'涉嫌犯罪', value:'2'},
            {label:'非正常死亡', value:'3'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {label:'发生时间',type: 'date', prop: 'policeCode',  placeholder: ''},
        {label:'事由',type: 'input', prop: 'policeCode',  placeholder: ''},
        {
					label:'处理阶段',
          type: 'select',
          prop: 'department1',
          width: '100%',
          options: [
            {label:'立案侦查', value:'0'},
            {label:'审查起诉', value:'1'},
            {label:'刑事审判', value:'2'},
            {label:'刑罚执行', value:'3'},
            {label:'执行完毕', value:'4'},
            {label:'其它', value:'5'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {label:'处理结果',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'备注',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'附件',type: 'file', prop: 'policeCode',  placeholder: ''},
				{
					label:'审批人',
          type: 'select_tree',
          prop: 'department',
          width: '100%',
          options: [
            {
              prop: 'selectOrg',
              format: '',
              valueformat: '',
              placeholder: '请选择机构'
            },
            {
              prop: 'selectPerson',
              format: '',
              valueformat: '',
              placeholder: '请选择审批人'
            }
          ],
          change: row => console.log(row),
          placeholder: ''
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
			// this.getOrgData()
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
