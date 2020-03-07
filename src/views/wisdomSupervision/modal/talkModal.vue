<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" @close="colseHandle">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="部门" prop="deptId">
        <select-tree
          :disabled="disabled"
          v-model="form.deptId"
          :props="config"
          :treeData="orgData"
          @change="orgChange"
          placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="被谈话人" prop="userId">
        <el-select v-model="form.userId" placeholder="请选择" @change="selectChange" :disabled="disabled">
          <el-option
            v-for="item in interviewMans"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谈话类型" prop="type">
         <el-select v-model="form.type" placeholder="请选择" :disabled="disabled">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谈话时间" prop="time">
        <el-date-picker :disabled="disabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="访谈人" prop="interviewMan">
         <el-input :disabled="disabled" v-model="form.interviewMan"></el-input>
      </el-form-item>
      <el-form-item label="谈话类容" prop="content">
        <el-input :disabled="disabled" type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <e-upload @changeHandler="changeHandler" />
      </el-form-item>
      <div style="text-align: center;">
        <el-button v-if="opeart === 'view'" type="primary" @click="visible = false;" size="small">确认</el-button>
        <el-button v-if="opeart === 'add'" type="primary" @click="onSubmit('add')" size="small">保存</el-button>
        <el-button v-if="opeart === 'update'" type="primary" @click="onSubmit('update')" size="small">保存</el-button>
        <el-button @click="visible = false;" size="small">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { saveInterView, getInterViewById, updateInterView } from '@/api/report.js';
import { getUserList } from '@/api/user-server.js';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '新增谈话',
      disabled: false,
      opeart: '',
      visible: false,
      form: {
        deptId: '',
        userId: '',
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
      options: [
        {
          value: 1,
          label: '谈话谈心'
        },
        {
          value: 2,
          label: '家庭走访'
        },
        {
          value: 3,
          label: '约谈提醒'
        },
        {
          value: 4,
          label: '帮助教育'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      interviewMans: [],
      files: [],
      orgName: '',
      realName: ''
    }
  },
  computed: {
    ...mapGetters([
      'orgData'
    ])
  },
  methods: {
    open(opeart, option) {
      this.opeart = opeart;
      this.visible = true;
      if(opeart === 'view') {
        this.title = '详情';
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
    colseHandle() {
      this.$refs['form'].resetFields();
    },
    // 查详情
    getDetail(option) {
      const params = {
        id: option.id
      }
      getInterViewById(params).then(res => {
        if(res.success) {
          this.form.deptId = res.data.deptId;
          this.form.userId = res.data.userId;
          this.form.type = res.data.interviewType;
          this.form.time = res.data.interviewTime;
          this.form.interviewMan = res.data.interviewMan;
          this.form.content = res.data.interviewContent;
        }
      })
    },
    // 人员下拉
    selectChange(val) {
      this.interviewMans.map(item => {
        if(item.id === val) {
          this.realName = item.realName;
        }
      })
    },
    // 机构人员 下拉change事件
    orgChange(orgId) {
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
      if(type === 'add') {
        msg = '添加';
      }else{
        msg = '修改';
      }
      let filesParam = new FormData();
      filesParam.append('userId', this.form.userId);
      filesParam.append('userName', this.realName);
      filesParam.append('deptId', this.form.deptId);
      filesParam.append('deptName', this.orgName);
      filesParam.append('type', this.form.type);
      filesParam.append('interviewMan', this.form.interviewMan);
      filesParam.append('time', this.form.time);
      filesParam.append('content', this.form.content);
      this.files.forEach(item => {
        filesParam.append('file', item.raw);
      })
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
    },
    // 修改
    // updateHandler() {
    //   let filesParam = new FormData();
    //   filesParam.append('userId', this.form.userId);
    //   filesParam.append('userName', this.realName);
    //   filesParam.append('deptId', this.form.deptId);
    //   filesParam.append('deptName', this.orgName);
    //   filesParam.append('type', this.form.type);
    //   filesParam.append('interviewMan', this.form.interviewMan);
    //   filesParam.append('time', this.form.time);
    //   filesParam.append('content', this.form.content);
    //   this.files.forEach(item => {
    //     filesParam.append('file', item.raw);
    //   })
    //   updateInterView(filesParam).then(res => {
    //     if(res.success) {
    //       this.$message({
    //         type: 'success',
    //         message: '修改成功'
    //       })
    //       this.$emit('query');
    //       this.visible = false;
    //     }else {
    //       this.$message({
    //         type: 'warning',
    //         message: '修改失败'
    //       })
    //       this.visible = false;
    //     }
    //   })
    // }
  }
}
</script>

<style lang="stylus" scoped>
/deep/ .el-textarea
  width: 100%;
  height: auto;
  .el-textarea__inner
    margin-left: 0;

/deep/ .el-select
  width: 100%;
</style>
