<template>
  <div class="talk_add">
		<div class="individual_title">
      境外投资
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					父母、配偶、子女及其配偶投资非上市公司、企业的情况，注册个体工商户、个人独资企业或合伙企业的情况，以及本人、配偶、共同生活的子女在国（境）外投资、存款等情况，事后7日内报告。
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
				境外投资
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
  name: "Offshore_Touzi",
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
        {label:'投资人姓名',type: 'input', prop: 'policeCode',  placeholder: ''},
        {
					label:'与本人关系',
          type: 'select',
          prop: 'department1',
          width: '100%',
          options: [
            {label:'妻子', value:'0'},
            {label:'丈夫', value:'1'},
            {label:'儿子（共同生活）', value:'2'},
            {label:'女儿（共同生活）', value:'3'},
          ],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {label:'投资的国家（地区）及城市',type: 'input', prop: 'policeCode',  placeholder: ''},
        {
					label:'投资情况',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'房产', value:'0'},
            {label:'投资', value:'1'},
            {label:'股票', value:'2'},
            {label:'基金', value:'3'},
            {label:'投资型保险', value:'4'},
            {label:'其他', value:'5'}
          ],
          change: row => console.log(row),
          placeholder: '所属部门'
        },
        {label:'币种',type: 'input', prop: 'policeCode',  placeholder: ''},
        {label:'投资金额（万元）',type: 'input', prop: 'policeCode',  placeholder: ''},
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
