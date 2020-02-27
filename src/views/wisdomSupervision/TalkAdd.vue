<template>
  <div class="talk_add">
		<div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
			<div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
			<span class='pl8 txt-bold font14' style="">谈话谈心</span>
		</div>
		<div style="margin:30px 20px;">
			<!-- label-position="top" -->
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="被谈话人">
					<!-- <el-input v-model="form.name" style="width:40%;"></el-input> -->
					<el-input readonly @click.native="changelag"
						style="width:40%;"
						placeholder="输入关键字进行过滤"
						v-model="form.name">
					</el-input>
					<div v-show="org_flag" class="selectDiv">
						<el-input size="mini"
							placeholder="输入关键字进行过滤"
							v-model="filterText">
						</el-input>
						<el-tree
							class="filter-tree el-scrollbar el-scrollbar__wrap"
							@node-click="nodeClick"
							:data="dataTree"
							:props="defaultProps"
							default-expand-all
							:filter-node-method="filterNode"
							ref="tree">
						</el-tree>
					</div>
				</el-form-item>
				<el-form-item label="谈话类型">
					<el-select style="width:40%;" v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="谈话时间">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="谈话内容">
					<el-input style="width:40%;" type="textarea" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item label="附件">
					<el-upload style="width:40%;" 
						class="upload-demo" limit=1
						:http-request="uploadSectionFile"
						action="https://jsonplaceholder.typicode.com/posts/"
						:on-change="handleChange"
						:file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交</el-button>
					<el-button @click="onCancle">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
    
  </div>
</template>
<script>
export default {
  name: "TalkAdd",
  data() {
    return {
			org_flag: false,
      form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			defaultProps: {
				children: 'childrens',
				label: 'name'
			},
			filterText:'',
			dataTree:null,
			fileList:[],
			uploadFile:null,
			uploadFileList:[],
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
			this.getOrgData()
		},
		onSubmit() {
			console.log(this.uploadFile)
			console.log('submit!');
		},
		onCancle(){
			this.$router.push({ path: '/talks'});
		},
		saveInterView(){
			const _this = this
			this.$request.post(`/police/gaism-server/InterView/saveInterView`,{
				interview:{
					// as_delete (integer, optional),
					// content_url (string, optional), //附件地址（文件服务器上的地址） ,
					// deptId (integer, optional), //部门id ,
					// deptName (string, optional), //用户姓名 ,
					// gmtCreate (string, optional), //数据插入时间 ,
					// gmtModified (string, optional), //数据修改时间 ,
					// id (integer, optional), //主键 ,
					// interviewContent (string, optional), //案例内容 ,
					// interviewMan (string, optional), //访谈人 ,
					// interviewTime (string, optional), //谈话时间 ,
					// interviewType (integer, optional), //谈话类型 ,
					// userCreate (string, optional), //数据添加用户id ,
					// userId (string, optional), //用户id ,
					// userModified (string, optional), //数据修改用户id ,
					// userName (string, optional), //用户姓名 ,
					// version (integer, optional) //版本号
				},
				file: _this.uploadFileList
			})
			.then(res => {
				console.log(res.data)
				// this.person_arr = res.data
			})
			.catch(error => {
				console.log(error)
			})
		},
		uploadSectionFile (param) {
      const _this = this
      let fileObj = param.file
      const isLt5M = fileObj.size / 1024 / 1024 < 2
      if (!isLt5M) {
        this.$message.error('上传附件大小不能超过 2MB!')
        // this.fileList = []
        return
      }
      if (fileObj.type === 'image/jpeg') {
				debugger
        this.uploadFile = new File([fileObj], new Date().getTime() + '.jpg', {
          type: 'image/jpeg'
        })
        _this.uploadFileList.push(this.uploadFile)
      } else if (fileObj.type === 'image/png') {
        this.uploadFile = new File([fileObj], new Date().getTime() + '.png', {
          type: 'image/png'
        })
        _this.uploadFileList.push(this.uploadFile)
      } else {
        this.$message.error('只能上传jpg/png文件')
        // this.fileList = []
      }
    }, 
		changelag(){
			this.org_flag = !this.org_flag
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		nodeClick(obj){
			// console.log(obj)
			this.form.name = obj.name
			this.org_flag = false
			// console.log(node)
			// console.log(com)
		},
		getOrgData(){
				this.$request.get(`/api/uums-server/organization/tree`)
				.then(res => {
						console.log(res.data)
						this.dataTree = res.data
				})
				.catch(error => {
						console.log(error)
				})
		},
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
</style>
