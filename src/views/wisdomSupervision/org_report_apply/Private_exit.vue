<template>
  <div class="talk_add">
		<div class="individual_title">
      因私出境
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					本人因私出国（境）出发前7日内，报告出发的时间、同行人员、事由、所赴国家（地区）及停留时间，资金来源等。回国后10日内将本人因私出国（境）证照交政工部门集中保管列为公安机关登记备案人员”等。
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
				因私出境
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
        {label:'所到国家（地区）',type: 'input', prop: 'policeCode',  placeholder: ''},
        {
					label:'事由',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'探亲', value:'0'},
            {label:'访友', value:'1'},
            {label:'学术交流', value:'2'},
            {label:'就医', value:'3'},
            {label:'旅游', value:'4'},
            {label:'继承、接受或处理财产', value:'5'},
            {label:'其它', value:'6'},
          ],
          change: row => console.log(row),
          placeholder: ''
				},
				{label:'同行人姓名',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'出发时间',type: 'date', prop: 'date', placeholder: ''},
				{label:'归国时间',type: 'date', prop: 'date', placeholder: ''},
        {label:'资金来源',type: 'input', prop: 'policeCode',  placeholder: ''},
				{
					label:'证件类型',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'护照', value:'0'},
            {label:'港澳通行证', value:'1'},
            {label:'其他', value:'2'},
          ],
          change: row => console.log(row),
          placeholder: ''
				},
				{label:'证件号码',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'其他说明',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'附件',type: 'file', prop: 'policeCode',  placeholder: ''},
				{
					label:'审批人1',
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
				},
				{
					label:'审批人2',
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
				},
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
