<template>
  <div class="talk_add">
		<div class="individual_title">
      婚丧宴请
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					本人及直系亲属婚(喜庆)事、直系亲属丧事的办理情况,包括是否举办宴请、宴请对象范围、酒席桌数、餐费标准等，婚(喜庆)事事前7日内报告；丧事事后7日内报告。收受礼金、礼品等情况，事后7日内报告。
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
				婚丧宴请
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
  name: "Weddings",
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
        {
					label:'办理类型',
          type: 'select',
          prop: 'department1',
          width: '100%',
          options: [
            {label:'婚（喜庆）事', value:'0'},
            {label:'丧事', value:'1'},
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {
					label:'是否宴请',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'否', value:'0'},
            {label:'是', value:'1'},
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {
					label:'宴请对象范围',
          type: 'checkbox',
          prop: 'department',
          width: '100%',
          checkboxs: [
            {label:'亲戚', value:'0'},
            {label:'朋友', value:'1'},
            {label:'同事', value:'2'},
            {label:'同学', value:'3'},
            {label:'其他', value:'4'}
          ],
          change: row => console.log(row),
          placeholder: ''
				},
				{label:'酒席桌数（桌）',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'餐费标准（元）',type: 'input', prop: 'date', placeholder: ''},
				{
					label:'与本人关系',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'本人', value:'0'},
            {label:'子女', value:'1'},
            {label:'父母', value:'2'},
            {label:'祖父母', value:'3'},
            {label:'外祖父母', value:'4'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
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
