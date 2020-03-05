<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" @close="colseHandle">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="部门" prop="deptId">
        <select-tree 
          v-model="form.deptId"
          :props="config"
          :treeData="orgData"
          @change="orgChange"
          placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="被谈话人" prop="interviewMan">
        <el-select v-model="form.interviewMan" placeholder="请选择">
          <el-option
            v-for="item in interviewMans"
            :key="item.id"
            :label="item.realName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谈话类型" prop="interviewType">
         <el-select v-model="form.interviewType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="谈话时间" prop="interviewTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.interviewTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="谈话类容" prop="interviewContent">
        <el-input type="textarea" v-model="form.interviewContent"></el-input>
      </el-form-item>
      <div style="text-align: center;">
        <el-button v-if="opeart === 'view'" type="primary" @click="visible = false;" size="small">确认</el-button>
        <el-button v-if="opeart === 'add'" type="primary" @click="onSubmit" size="small">保存</el-button>
        <el-button v-if="opeart === 'update'" type="primary" @click="updateHandler" size="small">保存</el-button>
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
      opeart: '',
      visible: false,
      form: {
        deptId: '',
        interviewMan: '',
        interviewTime: '',
        interviewType: '',
        interviewContent: ''
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
      interviewMans: []
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
        this.title = '详情'
        this.getDetail(option);
      }else if(opeart === 'add') {
        this.title = '新增谈话';
      }else if(opeart === 'update') {
        this.title = '修改';
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
          this.form = res.data;
        }
      })
    },
    // 机构人员 下拉change事件
    orgChange(orgId) {
      this.getUserListData(orgId);
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
    // 保存
    onSubmit() {

    },
    // 修改
    updateHandler() {

    }
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
