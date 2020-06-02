<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="600px;" height="660px;"
    @close="colseHandle"
  >
    <el-form ref="form" :model="formData">
      <!-- <el-form-item label="所属部门：">
        <org-select v-model="formData.orgId" @change="change" :orgLabel.sync="formData.orgName"></org-select>
      </el-form-item> -->
      <el-form-item label="风险人姓名：">
        <el-select v-model="formData.userId" @change="userChange" filterable clearable>
          <el-option
            v-for="user in userList"
            :key="user.id"
            :label="user.realName"
            :value="user.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是本人新增：" prop="ifMyEntering">
          <el-select v-model="formData.ifMyEntering" placeholder="请选择">
            <el-option
              v-for="item in certificateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="风险内容：">
        <el-table :data="formData.riskContent">
          <el-table-column label="工作事项" prop="workMatters">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.workMatters" rows="4"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="岗位廉政风险" prop="riskContent">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.riskContent" rows="4"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="防控措施" prop="riskMesure">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.riskMesure" rows="4"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <!-- <template slot="header" slot-scope="scope">
              <el-button size="mini" type="primary" @click="addRiskContent">添加</el-button>
            </template> -->
            <template slot-scope="scope">
              <el-button
                :disabled="deleteDisable"
                size="mini"
                type="danger"
                @click="deleteRiskContent(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- <el-form-item label="层级领导：">
        <el-select clearable filterable v-model="formData.leaderId" @change="leaderChange">
          <el-option
            v-for="post in postList"
            :key="post.id"
            :value="post.userPid"
            :label="post.userPname"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="部门负责人：">
        <el-input readonly v-model="formData.orgLeaderName"></el-input>
      </el-form-item> -->
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <!-- <el-form-item label="附件" v-if="opeart === 'add'">
        <e-upload @changeHandler="handleChange" />
      </el-form-item> -->
    </el-form>
    <el-footer class="center">
      <div style="text-align: -webkit-center;">
        <el-button @click="back">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-footer>
  </el-dialog>
</template>

<script>
import orgSelect from '@/components/orgSelect';
import {
  getUserDetail,
  saveUserRisk,
  getDetail,
  updateUserRisk
} from "@/api/report";
import { getUserList } from "@/api/user-server.js";
export default {
  name: "addOrUpdata",
   components: {
    orgSelect
  },
  data() {
    return {
      id: "",
      title:'新增',
      opeart:'add',
      postList: [],
      deleteDisable: true,
      visible: false,
      formData: {
        orgId:sessionStorage.orgId,
        leaderName:sessionStorage.realName,
        leaderId:sessionStorage.userId,
        ifMyEntering:'',
        fileUrl: '',
        orgName: '',
        postName: '',
        riskContent: [
          {
            workMatters: "",
            riskContent: "",
            riskMesure: ""
          }
        ]
      },
      certificateOptions: [
        {label:'是', value:'0'},
        {label:'否', value:'1'}
      ],
      userList: []
    };
  },
  computed: {
    riskContenLength() {
      return this.formData.riskContent ? this.formData.riskContent.length : 0;
    }
  },
  watch: {
    riskContenLength(val) {
      this.deleteDisable = val === 1 ? true : false;
    }
  },
  created() {
    const {
      query: { id }
    } = this.$route;
    this.id = id;
    if (id) {
      this.getDetail(id);
    }
  },
  methods: {
    open(opeart, option) {
      console.log(this.visible);
      this.opeart = opeart;
      this.visible = true;
      if (opeart === "view") {
        this.title = "详情";
        this.disabled = true;
        this.getDetail(option);
      } else if (opeart === "add") {
        this.title = "新增风险";
        this.disabled = false;
      } else if (opeart === "update") {
        this.title = "修改";
        this.disabled = false;
        this.getDetail(option);
      }
    },
    colseHandle() {
      this.$refs["form"].resetFields();
    },
    // 获取详情
    getDetail(id) {
      getDetail({ id }).then(res => {
        if (res && res.success === true) {
          const { data } = res;
          const key = [
            "id",
            "userId",
            "orgId",
            "policeCode",
            "leaderId",
            "orgLeaderId",
            "remark"
          ];
          for (const item of key) {
            this.$set(this.formData, item, data[item]);
          }
          this.userChange();
          this.leaderChange();
          this.$set(
            this.formData,
            "riskContent",
            data.riskContentList.map(item => ({
              workMatters: item.workMatters,
              riskContent: item.riskContent,
              riskMesure: item.riskMesure
            }))
          );
          console.log(this.formData.riskContent);
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    change() {
      // this.formData.userId = '';
      const orgId = sessionStorage.orgId;
      getUserList({ orgId }).then(res => {
        if (res && res.success === true) {
          debugger
          const { data } = res;
          this.userList = data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    userChange() {
      this.$forceUpdate();
      if (!this.formData.userId) return;
      const userId = this.formData.userId;
      console.log(getUserDetail)
      getUserDetail({ userId }).then(res => {
        if (res && res.success === true) {
          const { data } = res;
          this.formData.fileUrl = res.data.userInfo.fileId
          this.formData.orgName = res.data.userInfo.label
          this.formData.postName = res.data.userInfo.rank
          const { organizations } = data;
          // const nowOrg = organizations.find(
          //   item => item.id === this.formData.orgId
          // );
          // this.$set(this.formData, "orgLeaderName", nowOrg.principal);
          this.postList = data.posts;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    leaderChange() {
      const post = this.postList.find(
        item => item.userPid === this.formData.leaderId
      );
      if (post) {
        this.formData.leaderName = post.userPname;
        this.formData.postName = post.name;
        this.formData.postId = post.id;
      }
    },
    addRiskContent() {
      this.formData.riskContent.push({
        workMatters: "",
        riskContent: "",
        riskMesure: ""
      });
    },
    deleteRiskContent(content) {
      const index = this.formData.riskContent.indexOf(content);
      this.formData.riskContent.splice(index, 1);
    },
    handleChange(file) {
      this.formData.file = file.raw;
    },
    back() {
      this.visible = false;
    },
    async submit() {
     const _this = this
      if (this.id) {
        this.formData.id = this.id;
      }
      const leadInfo = JSON.parse(sessionStorage.userInfo)  
      const user = this.userList.find(item => item.id === this.formData.userId);
      this.formData.policeCode = user.userInfo.policeCode;
      this.formData.userName = user.realName;
      // this.formData.ifMyEntering = this.formData.ifMyEntering;
      // this.formData.riskContent = JSON.stringify(this.formData.riskContent);
      let filesParam = new FormData();
      filesParam.append('orgId', sessionStorage.orgId);
      filesParam.append('leaderName', sessionStorage.realName);
      filesParam.append('userId', this.formData.userId);
      filesParam.append('ifMyEntering', this.formData.ifMyEntering);
      filesParam.append('userName', this.formData.userName);
      filesParam.append('policeCode', this.formData.policeCode);
      filesParam.append('leaderId', sessionStorage.userId);
      filesParam.append('fileUrl', this.formData.fileUrl);
      filesParam.append('orgName', this.formData.orgName);
      filesParam.append('postName', this.formData.postName);
      filesParam.append('leaderUrl', leadInfo.fileId);
      filesParam.append('leaderCode', leadInfo.policeCode);
      filesParam.append('leaderPost', leadInfo.rank);
      filesParam.append('leaderDept', leadInfo.label);
      filesParam.append('riskContent', JSON.stringify(this.formData.riskContent));
      let res = null;
      if (this.formData.id) {
        res = await updateUserRisk(this.formData);
      } else {
        console.log('风险',this.formData)
        res = await saveUserRisk(filesParam);
      }

      if (res && res.success === true) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        _this.visible = false;
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    }
  },
  mounted() {
    this.change();// 默认获取本部门
  }
};
</script>

<style lang="stylus" >
  .el-dialog__headerbtn .el-dialog__close {
    display: none !important;
}
</style>
