<template>
  <div class="com org_tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="text-center">
          <!-- :label-class-name="labelClassName" -->
          <vue2-org-tree
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
import { myPhotoSrc } from '@/utils/common.js';
export default {
  props: {
    data: {
      type: Object,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    collapsable: {
      type: Boolean,
      default: true,
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
    path_url: {
      type: String,
      default: null,
    },
    dep_list: {
      type: Array,
      default: null,
    },
    model: {
      type: String,
      default: '',
    },
  },
  watch:{
    data(){
      this. isGotoPerson_info=false;
    }
  },
  data() {
    return {
      labelClassName: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      defaultProps: {
        children: 'childrens',
        label: 'name',
      },
      isGotoPerson_info:false
    };
  },
  methods: {
    renderContent(h, data) {
      // return data.label
      // return (<div>{data.label}<br/>{data.position}</div>)
      // 弹出框
      // {require('../../images/logo.png')}
      if (data.level == 1) {
        let imgPath = myPhotoSrc(data.userInfo.userInfo);
        let img = (
          <el-image class="photo_img" src={imgPath} fit="fill" lazy>
            <div slot="error" class="image-slot">
              <el-image
                fit="fill"
                class="photo_img"
                src={require('../../assets/images/bg/person.png')}
              ></el-image>
            </div>
          </el-image>
        );
        return (
          <div
            style="height:100px;width:150px;"
            class="user_panel level_one leaderCon"
          >
            {img}
            <div class="panel_info">
              <span style="line-height:20px;">{data.userInfo.realName}</span>
              <br />
              <span class="post">{data.name}</span>
              <span class="post">{data.orgName}</span>
            </div>
          </div>
        );
      } else if (data.level == 2) {
        let imgPath = myPhotoSrc(data.userInfo);
        let img = (
          <el-image class="photo_img" src={imgPath} fit="fill" lazy>
            <div slot="error" class="image-slot">
              <el-image
                fit="fill"
                class="photo_img"
                src={require('../../assets/images/bg/person.png')}
              ></el-image>
            </div>
          </el-image>
        );
        let img_bg = require('../../assets/images/bg/person_bg' +
          (data.index % 11) +
          '.png');
        return (
          <div
            style={
              'height:100px;background-size:100% 100%;background:url(' +
              img_bg +
              ') no-repeat'
            }
            class="user_panel level_two"
          >
            {img}
            <div class="panel_info">
              <span style="line-height:20px;">{data.realName}</span>
              <br />
              <span class="post">{data.name}</span>
              <span class="post">{data.orgName}</span>
            </div>
          </div>
        );
      } else if (data.level == 3) {
        // let userInfo = sessionStorage.userInfo
        // let userId = ''
        // if(userInfo != null && userInfo.id != null && userInfo.id != ''){
        //   userId = JSON.parse(userInfo).id
        // }else{
        //   userId = 'fc7e5d3b2f91477f8ab329b18b4ccb30'
        // }
        return (
          <div class="user_panel depCon">
            {// class={item.userPid == userId ? 'user_panel level_three three_hover' : 'user_panel level_three'}
            data.dep.map((item, index) => (
              <div
                onclick={() => this.nodePanelClick(data, item, 'dep')}
                class="user_panel level_three three_hover"
                style="margin-bottom:5px;">
                <img class="dep_img"
                src={ require('../../assets/images/bg/dep_bg.png')}
                />
                <div class="depCon_info">{item.name}</div>
              </div>
            ))}
          </div>
        );
      } else {
        if (this.model == 'dep') {
          let imgPath = myPhotoSrc(data.userInfo);
          let img = (
            <el-image
              class="photo_img"
              style="width:40px;height:40px;display:block;border-radius:0;"
              src={imgPath}
              fit="scale-down"
              lazy
            >
              <div slot="error" class="image-slot">
                <el-image
                  fit="fill"
                  style="width:40px;height:40px;"
                  src={require('../../assets/images/bg/person.png')}
                ></el-image>
              </div>
            </el-image>
          );
          let routeUrl = '';
          if (data.id == JSON.parse(sessionStorage.userInfo).id) {
            routeUrl = 'person_info';
          }

          let handleEvent = () => this.nodePanelClick(data, '', routeUrl);
          console.log(this.isGotoPerson_info)
          return (
            <div class="user_panel_dep" onclick={routeUrl?handleEvent:()=>{}}>
              <div class='part_icon'>      
                  <img style="height: 16px;margin-left: 10px;" class="dep_img"src={ require('../../assets/images/dangyuan.png')}/></div>
              {img}
              <span 
                class={routeUrl? 'current_user': ''}>
                {data.realName}
              </span>
            </div>
          );
        } else if (this.model == 'person_info') {
          return (
            <div
              class={
                data.id ==JSON.parse(sessionStorage.userInfo).id
                  ? 'user_panel_others current_user_bg'
                  : 'user_panel_others'
              }
            >
              <span>
                {data.realName}
              </span>
            </div>
          );
        } else {
          return (
            <div class="user_panel_others">
              <span>加载中。。。</span>
            </div>
          );
        }
      }
    },
    popoverClick(key, node) {
      console.log(key, node);
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, 'expand', true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      // console.log(data);
      // console.log(data.label);
      if (data.url == null) {
        return false;
      } else {
        window.open(data.url);
      }
    },
    // 节点面板点击事件
    nodePanelClick(data, valueObj, model) {
      console.log(data, valueObj, model);
         // 无权限
      if (model == ''||this.path_url == null || this.path_url == '') {
        return;
      }
      let query = {};
      if (valueObj == '') {// 跳转层级人员
        query.value = data;
      } else { // 跳转层级部门
        query.id = valueObj.id;
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
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, 'expand', val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, 'expand', val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>
<style type="text/css">
.com.org_tree .org-tree-node-label {
  white-space: nowrap;
}
.com.org_tree .bg-white {
  background-color: white;
}
.com.org_tree .bg-orange {
  background-color: orange;
}
.com.org_tree .bg-gold {
  background-color: gold;
}
.com.org_tree .bg-gray {
  background-color: gray;
}
.com.org_tree .bg-lightpink {
  background-color: lightpink;
}
.com.org_tree .bg-chocolate {
  background-color: chocolate;
}
.com.org_tree .bg-tomato {
  background-color: tomato;
}
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
  border-radius: 20px;
  padding: 0;
  box-shadow: none;
}
.com.com.org_tree .user_panel {
  padding: 10px 20px;
  border-radius: 20px;
  width: 75px;
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
  border-radius: 20px;
  word-wrap: break-word;
  font-size: 12px;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.com.com.org_tree .depCon {
  box-shadow: none;
  padding: 0;
  width: 115px;
  height: 95px;
}
.com.com.org_tree .user_panel22:hover {
  background: red;
}
.com.com.org_tree .level_one,
.com.com.org_tree .level_two {
  background: url('../../assets/images/bg/preson_bg.png') no-repeat;
  background-size: 100% 100%;
}
.com.com.org_tree .leaderCon {
  background: url('../../assets/images/bg/person_leader.png') no-repeat;
  background-size: 100% 100%;
}
.com.com.org_tree .level_three {
  background: #ffffff;
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
.com.com.org_tree .user_panel .panel_info {
  position: absolute;
  bottom: 5px;
  width: calc(100% - 40px);
  color: #fff;
  line-height: 18px;
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
}
.com.com.org_tree .user_panel .photo_img,
.com.com.org_tree .user_panel_dep .photo_img {
  width: 45px;
  border-radius: 35px;
}
.com.com.org_tree .user_panel_dep .part_icon {
  width: 45px;
  border-radius: 35px;
  position: absolute;
  right: 0;
  z-index: 2;
  bottom: 19px;
}
.com.com.org_tree .user_panel_dep {
  padding: 8px 15px;
  width: 40px;
  height: 60px;
  background: #fff;
  border-radius: 10px;
  position: relative;
}
.com.com.org_tree .user_panel_dep .photo_img {
  margin-left: 5px;
  height: 30px;
  width: 30px;
}
.com.com.org_tree .user_panel_dep span {
  position: relative;
  top: 5px;
}
.com.com.org_tree .current_user {
  color: #320dac;
  cursor:pointer
}
.com.com.org_tree .current_user_bg {
  background: #235ff6;
  color: #ffffff;
  font-weight: bold;
}
</style>
