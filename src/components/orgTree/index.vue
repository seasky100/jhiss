<template>
  <div class="com org_tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="text-center">
          <!-- :label-class-name="labelClassName" -->
          <vue2-org-tree :key="tree_key"
            style="background:none;"
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :render-content="renderContent"
            :label-class-name="labelClassName"
            @on-expand="onExpand"
            @on-node-click="onNodeClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { myPhotoSrc } from "@/utils/common.js";
import { warnInfoTypeByUserId } from '@/api/warn.js'
export default {
  props: {
    data: {
      type: Object
    },
    warnList: {
      type: Object,
      default: () => {
        return null
      }
    },
    warnPersonList: {
      type: Object,
      default: () => {
        return null
      }
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    collapsable: {
      type: Boolean,
      default: true
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    path_url: {
      type: String,
      default: null
    },
    dep_list: {
      type: Array,
      default: null
    },
    model: {
      type: String,
      default: ""
    },
    personId: {
      type: String,
      default: () => {
        return null
      }
    },
    expandedKeys: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    // data() {
    //   this.isGotoPerson_info = false;
    // },
    // permissionFlag(newVal,oldVal){
    //   this.tree_key++
    // },
    // permissionFlag2(newVal,oldVal){
    //   this.tree_key++
    // },
    // personId(newVal,oldVal){
    //   this.tree_key++
    // },
    // expandedKeys(newVal,oldVal){
    //   this.tree_key++
    // },
  },
  created(){
    // 判断是否为董旭斌
    // this.permissionFlag = sessionStorage.userId.includes('39411b303f3346c69c7a7c507a6d0afd')
    // 判断是否为部门领导
    // this.permissionFlag2 = sessionStorage.userId.includes(this.data.userPid)
  },
  mounted(){
  },
  data() {
    return {
      permissionFlag: false, // 判断最大领导
      permissionFlag2: false, // 判断部门局领导
      tree_key: 1,
      labelClassName: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "childrens",
        label: "name"
      },
      isGotoPerson_info: false,
    };
  },
  methods: {
    renderContent(h, data) {
      this.permissionFlag = sessionStorage.userId.includes('39411b303f3346c69c7a7c507a6d0afd')
      // this.permissionFlag2 = sessionStorage.userId.includes(this.data.userPid)
      this.permissionFlag2 = false
      if(this.model == 'dep' && this.data.userPids != null){
        this.permissionFlag2 = this.data.userPids.includes(sessionStorage.userId)
      }
      // 
      let userId = ''
      if(!this.personId){
        userId = JSON.parse(sessionStorage.userInfo).id
      }else{
        userId = this.personId
      }
      //个人工作台界面
      if (this.model == "person_info") {
        return (
          <div
            class={
              data.id == userId
                ? "user_panel_others current_user_bg"
                : "user_panel_others"
            }
          >
            <span>{data.realName}</span>
          </div>
        );
      }
      let handleEvent = "";
      if (data.id == JSON.parse(sessionStorage.userInfo).id || this.permissionFlag || this.permissionFlag2 || this.expandedKeys.includes(data.id)) {
        handleEvent = () => this.nodePanelClick(data, "", "person_info");
      }
      // if(data.level == 0){
      //   return (
      //     <div class={'user_panel_others depNaN'}>
      //       <span>部门。。。</span>
      //     </div>
      //   );
      // } else
      //部门和全局
      if (data.level == 1) {
        // let img = this.getPersonImg(data.userInfo.userInfo||data.userInfo);
        if(this.model == 'dep'){
          // let flag = false
          // if (data.id == JSON.parse(sessionStorage.userInfo).id || this.permissionFlag) {
          //   flag = true
          // }
          // console.log(flag)
          return (
            <div style="position:relative;width:120px;height:161px;">
            <div class="depLeader">
            {
              data.userList.map((item, index) => {
                let warn_img = this.getUserWarn(item.userInfo)
                return(
                  <div class={'user_panel level_one leaderCon depLeaderCon'}
                   onclick={item.id == JSON.parse(sessionStorage.userInfo).id || this.permissionFlag || this.permissionFlag2 || this.expandedKeys.includes(item.id) ? () => this.nodePanelClick(item, "", "person_info") : ''}>
                    {warn_img}
                    {this.getPersonImg(item.userInfo)}
                    <div class="panel_info">
                      <span style="line-height:20px;font-size:15px">
                        <img src={require("../../assets/images/dangyuan.png")} />
                        <span class={item.id == JSON.parse(sessionStorage.userInfo).id || this.permissionFlag || this.permissionFlag2 ? "current_user" : ""}>
                          {item.realName || item.userInfo.realName}
                        </span>
                      </span>
                      <span class="post" style="position: relative;">
                        {item.userInfo.job || item.userInfo.userInfo.job}
                      </span>
                    </div>
                  </div>
                )
              })
            }
            </div>
            </div>
          );
        }else{
          let img = this.getPersonImg(data.userInfo.fileId?data.userInfo:data.userInfo.userInfo);
          return (
            <div class={'user_panel level_one leaderCon'}>
              {img}
              <div class="panel_info">
                <span style="line-height:20px;font-size:15px">
                  <img src={require("../../assets/images/dangyuan.png")} />
                  <span class={data.id == userId || this.permissionFlag || this.permissionFlag2 ? "current_user" : ""}>
                    {data.realName || data.userInfo.realName}
                  </span>
                </span>
                <span class="post" style="position: relative;">
                  {data.userInfo.job || data.userInfo.userInfo.job}
                </span>
              </div>
            </div>
          );
        }
      } else if (data.level == 2) {
        let img = this.getPersonImg(data.userInfo);
        let img_bg = require("../../assets/images/bg/person_bg" +
          (data.index % 11) +
          ".png");
        let warn_img = ''
        if(this.model == 'dep'){
          warn_img = this.getUserWarn(data.userInfo)
        }
        return (
          <div 
            onclick={handleEvent && this.model == 'dep' ? handleEvent : handleEvent? () => this.nodePanelClick(data, "leader", "person_info"):''}
            style={"background:url(" + img_bg + ") no-repeat"}
            class={'user_panel level_two'}>
            {warn_img}
            {img}
            <div class="panel_info">
              <img src={require("../../assets/images/dangyuan.png")} />
              <span
                style="line-height:20px;font-size: 15px;"
                class={handleEvent ? "current_user" : ""}
              >
                {data.realName}
              </span>
              <span class="post">{data.userInfo.job}</span>
            </div>
          </div>
        );
      } else if (data.level > 2) {
        // if(userInfo != null && userInfo.id != null && userInfo.id != ''){
        //   userId = JSON.parse(userInfo).id
        if (data.dep) {
          return (
            <div class="user_panel depCon">
              {// class={item.userPid == userId ? 'user_panel level_three three_hover' : 'user_panel level_three'}
              data.dep &&
                data.dep.map((item, index) => (
                  <div
                    onclick={() => this.nodePanelClick(data, item, "dep")}
                    class={'user_panel level_three three_hover'}
                  >
                    {this.warnStatusDep(item)}
                    <img
                      class="dep_img"
                      src={require("../../assets/images/bg/dep_bg.png")}
                    />
                    <div class="depCon_info">{item.name}</div>
                  </div>
                ))}
            </div>
          );
        } else {
          let img = this.getPersonImg(data.userInfo);
          let warn_img = ''
          if(this.model == 'dep'){
            warn_img = this.getUserWarn(data.userInfo)
          }
          return (
            <div
              class="user_panel_dep"
              onclick={handleEvent ? handleEvent : ""}
            >
              {warn_img}
              {img}
              <div
                style="margin-top:5px;text-align: center;"
                class={handleEvent ? "current_user" : ""}
              >
                <img src={require("../../assets/images/dangyuan.png")} />
                {data.realName}
              </div>
            </div>
          );
        }
      } else {
        return (
          <div class="user_panel_others">
            <span>正在加载。。。</span>
          </div>
        );
      }
    },
    warnStatusDep(value){
      let img = ''
      for(let i=0;i<this.warnList.length;i++){
        let obj = this.warnList[i]
        if(parseInt(obj.yjcount) > 0){
          img = <img class="warnStatus" src={require("../../assets/images/warn.png")} />
        }else if(parseInt(obj.gzcount) > 0){
          img = <img class="warnStatus" src={require("../../assets/images/careful.png")} />
        }
      }
      return img
    },
    getUserWarn(userInfo){
      let img = ''
      for(let key in this.warnPersonList){
        let obj = this.warnPersonList[key]
        if(userInfo.id.includes(key)){
          if(obj['预警'] > 0){
            img = <img class="warnStatus" src={require("../../assets/images/warn.png")} />
          }else if(obj['关注'] > 0){
            img = <img class="warnStatus" src={require("../../assets/images/careful.png")} />
          }
        }
      }
      return img
    },
    getPersonImg(userInfo) {
      let imgPath = myPhotoSrc(userInfo);
      let img = (
        <el-image class="photo_img" src={imgPath} fit="scale-down">
          <div slot="error" class="image-slot">
            <el-image
              fit="fill"
              style="width:40px;height:40px;"
              src={require("../../assets/images/bg/person.png")}
            ></el-image>
          </div>
        </el-image>
      );
      return img;
    },
    onExpand(e, data) {
      // this.$set(data, "expand", true);
      //收起
      if ("expand" in data) {
        data.expand = !data.expand;
        // this.$set(data, "expand", !data.expand);
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        //打开
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      data.url && window.open(data.url);
    },
    // 节点面板点击事件
    nodePanelClick(data, valueObj, model) {
      // 无权限
      let query = {};
      if(typeof valueObj=='string'&&valueObj.includes('leader')){
        // 全层级体系页面跳转层级人员
        query.id = data.id;
        query.realName = data.realName;
        query.userInfo = data.userInfo;
        this.$router.push({ path: '/Personnel_relation', query });
        return
      }else 
      if (model == "" || this.path_url == null || this.path_url == "") {
        return
      }
      if (valueObj == "") {
        // 跳转层级人员
        query.value = data;
      } else {
        // 跳转层级部门
        // query.id = valueObj.id;
        query.id = valueObj.orgId;
      }
      this.$router.push({ path: this.path_url, query });
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    //显示所有项目
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>
<style type="text/css">
.com.org_tree {
  height: 100%;
  width: 100%;
}
.com.org_tree .col-md-4 {
  display: inline-block;
  margin: 10px 20px;
}
.com.org_tree >>> .org-tree-container {
  height: 100%;
  padding: 0;
  background: none;
}
.com.org_tree .text-center {
  font-size: 14px;
  line-height: 20px;
}
.com.com.org_tree .org-tree-node-label-inner {
  border-radius: 10px;
  padding: 0;
}
.com.com.org_tree .user_panel {
  border-radius: 20px;
  width: 122px;
  height: 75px;
  word-wrap: break-word;
  font-size: 12px;
  line-height: 16px;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background: #fff;
}
.com.com.org_tree .user_panel_others {
  background: #eff2fe;
  padding: 10px 20px;
  border-radius: 10px;
  word-wrap: break-word;
  font-size: 12px;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.com.com.org_tree .depCon {
  box-shadow: none;
  padding: 0;
  width: 122px;
  height: 95px;
}
.com.com.org_tree .level_one,
.com.com.org_tree .level_two {
  padding-top: 16px;
  height: 126px;
  background: url("../../assets/images/bg/preson_bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.com.com.org_tree .leaderCon { 
  width: 220px;
  height: 144px;
  background: url("../../assets/images/bg/person_leader.png") no-repeat;
  background-size: 100% 100%;
}
.com.com.org_tree .depLeaderCon{
  width: 200px;
  margin: 0 10px;
}
.com.com.org_tree .depLeader{
  position:absolute;
  /* left: -50%; */
  left: 60px;
  transform: translateX(-50%);
  height:100%;
  display: flex;
  justify-content: space-around;
}
.com.com.org_tree .level_three {
  position: relative;
  padding: 10px 0px;
  margin-bottom: 10px;
  /* background: url('../../assets/images/bg/dep_bg.png') no-repeat;
  background-size: 100% 100%; */
}
.com.com.org_tree .level_three .dep_img {
  width: 40px;
  height: 40px;
}
.com.com.org_tree .three_hover:hover {
  border: 2px solid #bf1730;
}
.com.com.org_tree .warnStatus{
  position: absolute;
  top: -7px;
  right: -7px;
}
.com.com.org_tree .user_panel .panel_info {
  color: #fff;
  line-height: 17px;
}
.com.com.org_tree .user_panel .depCon_info {
  margin-top: 7px;
  width: 100%;
  font-size: 14px;
  color: #333;
  white-space: normal;
}
.com.com.org_tree .user_panel .panel_info .post {
  display: block;
  font-size: 12px;
  -webkit-transform: scale(0.9);
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
  position: absolute;
}
.com.com.org_tree .user_panel .photo_img,
.com.com.org_tree .user_panel_dep .photo_img {
  width: 50px;
}
.com.com.org_tree .part_icon {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 34px;
  z-index: 2;
  top: 67px;
  background-size: 100% 100%;
  background: url("../../assets/images/dangyuan.png") no-repeat;
}
.com.com.org_tree .user_panel_dep {
  width: 78px;
  height: 86px;
  background: #fff;
  border-radius: 10px;
  position: relative;
  padding-top: 10px;
}
.com.com.org_tree .user_panel_dep .photo_img {
  margin-left: 5px;
  height: 40px;
  width: 40px;
}
.com.com.org_tree .user_panel_dep span {
  top: 5px;
}
.com.com.org_tree .current_user {
  color: #1cc541;
  cursor: pointer;
}
.com.com.org_tree .current_user_bg {
  background: #235ff6;
  color: #ffffff;
  font-weight: bold;
}
</style>
