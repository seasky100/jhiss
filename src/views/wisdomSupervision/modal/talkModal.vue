<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px; height: 660px;" @close="colseHandle">
    <el-form  ref="form" :model="form" :rules="rules" label-width="80px" size="small">
      <div v-if="opeart === 'add'">
      <el-form-item label="部门" required prop="deptId">
        <select-tree
          :disabled="disabled"
          v-model="form.deptId"
          :props="config"
          :treeData="orgData"
          @change="orgChange"
          placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="被谈话人" required prop="man">
        <el-select v-model="form.man"  placeholder="被谈话人" @change="selectChange2" :disabled="disabled">
          <el-option
            v-for="item in interviewMans"
            :key="item.realName"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="岗位风险" prop="id">
          <el-select v-model="form.id" multiple placeholder="请选择" :disabled="disabled">
           <el-option
             v-for="item in riskData"
             :key="item.name"
             :label="item.name"
             :value="item.title">
           </el-option>
         </el-select>
       </el-form-item> -->
      <el-form-item label="谈话类型" required prop="type">
         <el-select v-model="form.type" placeholder="请选择" :disabled="disabled">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谈话时间" required prop="time">
        <el-date-picker :disabled="disabled" type="datetime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="访谈人" prop="interviewMan">
         <el-input :disabled="disabled" v-model="form.interviewMan"></el-input>
      </el-form-item>
      <el-form-item v-if="opeart === 'add'"  label="内容：" required prop="content">
          <editor :binddata.sync="form.content " ref="editor" style="height:280px">
            </editor>
      </el-form-item>
      <el-form-item v-if="opeart === 'view'"  label="内容：" required prop="content">
          <editor :binddata.sync="form.content " :disabled="disabled" ref="editor" style="height:280px">
            </editor>
        <!-- <el-input :disabled="disabled" type="textarea"  v-model="form.content"  v-html ='form.content'></el-input> -->
      </el-form-item>
    </div>
      <!-- <el-form-item v-if="opeart === 'view'"  label="内容：" required prop="content">
          <div></div>
      </el-form-item>       -->
      <div v-if="opeart === 'view'">
      <div style="text-align: -webkit-center;font-size: 19px;font-weight: 600;margin-bottom: 13px;">党员谈心谈话记录</div>
      <div style="margin: 0 auto;">
      <span class='t_talk'>部门：<span>{{deptName}}</span></span>
      <span class='t_talk'>被谈话人：<span>{{form.man}}</span></span>
      <span class='t_talk'>谈话类型：<span>{{options2[form.type]}}</span></span>
    </div>
    <div class='' style="font-size: 16px;text-indent:1.5em;line-height: 30px;margin-top: 18px;" v-html = 'form.content' ></div>
      <el-form-item v-if="opeart === 'view'" required prop="content">
          <el-button v-show='signature'  style="float:right;" type="primary" @click="confirm" size="small">确认签字</el-button>
          <img  v-show='!signature' style="height: 20px;margin-left: 10px;float: right;margin-right: 25px;" class="photo_img" :src="selfSignature" />
        </el-form-item>
        <div>
            <span class='t_talk'>谈话时间：<span>{{form.time}}</span></span>
            <span class='t_talk'>谈话领导：<span>{{form.interviewMan}}</span></span>
          </div>
      </div>
      <el-form-item label="附件"  v-if="opeart === 'add'">
        <e-upload @changeHandler="changeHandler" />
      </el-form-item>
      <el-form-item>
      <div style="text-align: end;">
        <!-- <el-button v-if="opeart === 'view'" type="primary" @click="visible = false;" size="small">确认</el-button> -->
        <el-button v-if="opeart === 'add'" type="primary" @click="onSubmit('add')" size="small">保存</el-button>
        <el-button v-if="opeart === 'update'" type="primary" @click="onSubmit('update')" size="small">保存</el-button>
        <el-button @click="visible = false;" size="small">返回</el-button>
      </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { saveInterView, getInterViewById, updateInterView,getRiskByUserId,getSignatureById } from '@/api/report.js';
import { getUserList,getList } from '@/api/user-server.js';
import { mapGetters } from 'vuex';
import editor from "@/components/editor.vue";
export default {
  data() {
    return {
      title: '新增谈话',
      disabled: false,
      opeart: '',
      selfSignature:"",
      id:'', //谈话id
      signature: true,
      arryData:[],
      listData:[],
      visible: false,
      rules: {
        deptId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        interviewId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入', trigger: 'blur' },
        ]
      },
      form: {
        deptId: sessionStorage.orgId,
        man: '',
        interviewId: '',
        userId: sessionStorage.userId,
        id:'',
        type: '',
        time: '',
        interviewMan: '',
        content: ''
      },
      config: {
        value: 'id',
        label: 'name',
        children: 'childrens',
        disabled: true
      },
      riskData: [],
      options2: {
            1: "谈话谈心",
            2: "家庭走访",
            3: "约谈提醒",
            4: "帮助教育",
            5: "其他"
      },
      options: [],
      interviewMans: [],
      files: [],
      orgName: '',
      deptName: sessionStorage.orgName,
      realName: ''
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  components: {editor},
  mounted(){
    this.init();
    this.getList();
    this.orgChange(sessionStorage.orgId);
  },
  methods: {
    init() {
      const data = this.orgData[0].childrens
      // const arryData = []
      const orgId = sessionStorage.orgId
      debugger
      // 38b725929f444e0b9e02c9abaa6e1c99
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === orgId) {
          this.arryData.push(data[i])
        }
      }
      this.form.interviewMan = sessionStorage.realName
    },
    open(opeart, option) {
      this.opeart = opeart;
      this.visible = true;
      if(opeart === 'view') {
        this.id = option.id
        this.title = '';
        this.disabled = true;
        this.getDetail(option);
      }else if(opeart === 'add') {
        this.title = '新增谈话';
        this.disabled = false;
      }else if(opeart === 'update') {
        this.title = '修改';
        this.disabled = false;
        this.getDetail(option);
      }
    },
    // 谈话谈心字典值
    getList() {
      getList(
        Object.assign(
          {
            appId: 'c62d6b0a56b045b597b2069cd9b9e6b9',
            type: '谈话谈心'
          },
        )
      ).then(res => {
        if (res.success) {
          const dicData = res.data
          for (let i = 0; i < dicData.length; i++) {
            const list = {
              label: dicData[i].label,
              value: dicData[i].value
            }
            this.listData.push(list)
          }
          // const aa = dicData.map(inventor => `label:${inventor.label},value:${inventor.value}`)
          // console.log(aa)
          this.options = this.listData
          this.options=   [{
            label: "谈话谈心",value:1},
            {label: "家庭走访",value:2},
            {label: "约谈提醒",value:3},
            {label: "帮助教育",value:4},
            {label: "其他",value:5}
          ]
        }
      })
    },
    colseHandle() {
      this.$refs['form'].resetFields();
    },
    // 查详情
    getDetail(option) {
      const params = {
        id: option.id
      }
      this.selfSignature=''
      getInterViewById(params).then(res => {
        if(res.success) {
          debugger
          if(res.data.interviewId == sessionStorage.userId){
            this.signature = true
          }else{
            this.signature = false
          }
          this.form.deptId = res.data.deptId+'';
          this.form.userId = res.data.userId;
           this.interviewMans=[{id:res.data.userId,realName:res.data.userName}]
          this.form.type = res.data.interviewType;
          this.form.time = res.data.interviewTime;
          this.form.interviewMan = res.data.interviewMan;
          this.form.man = res.data.userName;
          this.form.content = res.data.interviewContent;
          if(res.data.selfSignature){
            this.signature = false;
            this.selfSignature = res.data.selfSignature;
          }
          
        }
      })
    },
    // 人员下拉
    selectChange(val) {
      debugger
      let optionId = val
      this.interviewMans.map(item => {
        if(item.id === val) {
        }
      })
      this.getRiskByUserData(optionId)
    },
    // 人员下拉
    selectChange2(val) {
      debugger
      let optionId = val
      this.form.interviewId = optionId
      this.interviewMans.map(item => {
        if (item.id === val) {
          this.realName = item.realName;
        }
      })
      this.getRiskByUserData(optionId)
    },
    // 个人岗位预警
    getRiskByUserData(userId) {
      const _this = this
      _this.riskData = [],
      getRiskByUserId(
        Object.assign(
          {
            userId: userId
          },
        )
      ).then(res => {
        console.log(res)
        if (res.success == true&&res.data.length>0) {
          const arry = res.data[0].riskContentList
          const dataArry = [];
          for (let i = 0; i < arry.length; i++) {
            const data = {
              title:arry[i].id,
              name:arry[i].workMatters
            }
            dataArry.push(data)
          }
          this.riskData = dataArry
        } else {
          console.log(res.message)
        }
      })
    },
    // 机构人员 下拉change事件
    orgChange(orgId) {
      debugger
      const item = this.deepQuery(orgId);
      this.orgName = item.name;
      this.getUserListData(orgId);
    },
    // 根据id找名字
    deepQuery(id){
      const tree = this.orgData;
      var stark = [];
      stark = stark.concat(tree);

      while(stark.length) {
        var temp = stark.shift();
        if(temp.childrens) {
            stark = temp.childrens.concat(stark);
        }
        if(id === temp.id) {
            return temp;
        }
      }
    },
    // 获取机构对应的人员
    getUserListData(id) {
      const params = {
        orgId: id
      }
      getUserList(params).then(res => {
        if(res.success && res.data && res.data.length > 0) {
          this.interviewMans = res.data;
        }
      })
    },
    // 文件
    changeHandler(fileList) {
      this.files = fileList;
    },
    // 保存
    onSubmit(type) {
      let msg = '';
      let filesParam = new FormData();
      filesParam.append('userId',  this.form.userId);
      filesParam.append('interviewId', this.form.interviewId);
      console.log('this.form.userId',this.form.userId)
      // filesParam.append('id', this.form.id);
      filesParam.append('userName', this.realName);
      filesParam.append('departId', this.form.deptId);
      filesParam.append('deptName', this.orgName);
      filesParam.append('type', this.form.type);
      filesParam.append('interviewMan', this.form.interviewMan);
      filesParam.append('time', this.form.time);
      filesParam.append('content', this.form.content);
      this.files.forEach(item => {
        filesParam.append('file', item.raw);
      })
       if(type === 'add') {
        msg = '添加';
         saveInterView(filesParam).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: `${msg}成功`
          })
          this.$emit('query');
          this.visible = false;
        }else {
          this.$message({
            type: 'warning',
            message: `${msg}失败`
          })
          this.visible = false;
        }
      }) 
      }else{
        msg = '修改';
         updateInterView(filesParam).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: `${msg}成功`
          })
          this.$emit('query');
          this.visible = false;
        }else {
          this.$message({
            type: 'warning',
            message: `${msg}失败`
          })
          this.visible = false;
        }
      })
      }
      this.riskData = []    
    },
    // 个人的电子签名
    confirm() {
      debugger
      const _this = this
      getSignatureById(
        Object.assign(
          {
            userId: JSON.parse(sessionStorage.userInfo).id
          },
        )
      ).then(res => {
        // console.log(res)
        if (res.success == true) {
          _this.selfSignature = res.data
          _this.signature = false
          _this.updateHandler()
          // let qmurl = res.data
          // _this.updateElectronic(qmurl)
        } else {
          console.log(res.message)
        }
      })
    },
    // 修改
    updateHandler() {
      // debugger
      // let filesParam = new FormData();
      // filesParam.append('id', parseInt(this.form.userId));
      // // filesParam.append('userName', this.realName);
      // filesParam.append('deptId', this.form.interviewId);
      // // filesParam.append('deptName', this.orgName);
      // // filesParam.append('type', this.form.type);
      // // filesParam.append('interviewMan', this.form.interviewMan);
      // filesParam.append('selfSignature', this.selfSignature);
      // filesParam.append('content', this.form.content);
      const params = {
        id: this.id,
        departId: this.form.deptId,
        selfSignature:this.selfSignature,
        content : this.selfSignature
      }
      // this.files.forEach(item => {
      //   filesParam.append('file', item.raw);
      // })
      updateInterView(params).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$emit('query');
          this.visible = false;
        }else {
          this.$message({
            type: 'warning',
            message: '修改失败'
          })
          this.visible = false;
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .t_talk{
    margin-right: 14px;
    width: 201px;
    font-family: cursive;
    font-size: 16px;
    /* top: 10px; */
    font-weight: 700;
  }
/deep/ .el-textarea
  width: 100%;
  height: auto;
  .el-textarea__inner
    margin-left: 0;

/deep/ .el-select
  width: 100%;
</style>
