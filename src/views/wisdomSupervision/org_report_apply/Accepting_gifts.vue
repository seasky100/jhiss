<template>
  <div class="talk_add">
		<div class="individual_title">
      收受礼金
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					③“移居国（境）外”是指取得外国国籍或者获取国（境）外永久居留资格、长期居留许可等情况。④配偶、子女原本就是外国公民或者香港、澳门、台湾居民的，也属于“移居国（境）外”情形。⑤应报告配偶和子女均已移居国（境）外的情况，也应报告配偶、子女中任何一人已移居国（境）外的情况。⑥“备注”栏填写移居国（境）外的变化情况，比如“已放弃”“无法放弃但已被列为公安机关登记备案人员”等。
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
				收受礼金
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
  name: "Accepting_gifts",
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
				{label:'事由',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'礼金总额（元）',type: 'input', prop: 'date', placeholder: ''},
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
		},
		// onSubmit() {
		// 	console.log(this.uploadFile)
		// 	console.log('submit!');
		// },
		// onCancle(){
		// 	this.$router.push({ path: '/talks'});
		// },
		// uploadSectionFile (param) {
    //   const _this = this
    //   let fileObj = param.file
    //   const isLt5M = fileObj.size / 1024 / 1024 < 2
    //   if (!isLt5M) {
    //     this.$message.error('上传附件大小不能超过 2MB!')
    //     // this.fileList = []
    //     return
    //   }
    //   if (fileObj.type === 'image/jpeg') {
		// 		debugger
    //     this.uploadFile = new File([fileObj], new Date().getTime() + '.jpg', {
    //       type: 'image/jpeg'
    //     })
    //     _this.uploadFileList.push(this.uploadFile)
    //   } else if (fileObj.type === 'image/png') {
    //     this.uploadFile = new File([fileObj], new Date().getTime() + '.png', {
    //       type: 'image/png'
    //     })
    //     _this.uploadFileList.push(this.uploadFile)
    //   } else {
    //     this.$message.error('只能上传jpg/png文件')
    //     // this.fileList = []
    //   }
    // }, 
		// changelag(){
		// 	this.org_flag = !this.org_flag
		// },
		// filterNode(value, data) {
		// 	if (!value) return true;
		// 	return data.name.indexOf(value) !== -1;
		// },
		// nodeClick(obj){
		// 	// console.log(obj)
		// 	this.form.name = obj.name
		// 	this.org_flag = false
		// 	// console.log(node)
		// 	// console.log(com)
		// },
		// getOrgData(){
		// 		this.$request.get(`/api/uums-server/organization/tree`)
		// 		.then(res => {
		// 				console.log(res.data)
		// 				this.dataTree = res.data
		// 		})
		// 		.catch(error => {
		// 				console.log(error)
		// 		})
		// },
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
