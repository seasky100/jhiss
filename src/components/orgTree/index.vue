<template>
  <div class="com org_tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="row" v-if="settingFlag">
          <div class="col-md-8 col-md-offset-2">
            <form class="form-horizontal row">
              <div class="col-md-4">
                <div class="form-group">
                  <label class="control-label col-md-5">背景色选择：</label>
                  <div class="col-md-7" style="display:inline-block;">
                    <select class="form-control" v-model="labelClassName">
                      <option value="bg-white">bg-white</option>
                      <option value="bg-orange">bg-orange</option>
                      <option value="bg-gold">bg-gold</option>
                      <option value="bg-gray">bg-gray</option>
                      <option value="bg-lightpink">bg-lightpink</option>
                      <option value="bg-chocolate">bg-chocolate</option>
                      <option value="bg-tomato">bg-tomato</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="horizontal" /> 横排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="collapsable" /> 竖排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" v-model="expandAll" @change="expandChange" /> 显示所有项
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="text-center">
          <!-- :label-class-name="labelClassName" -->
          <vue2-org-tree style="background:none;"
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
    <!-- 对话框 -->
    <el-dialog title="添加组织机构" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="机构名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="责任人" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择责任人">
            <el-option label="责任人一" value="shanghai"></el-option>
            <el-option label="责任人二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
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
    settingFlag: {
      type: Boolean,
      default: false
    },
    path_url:{
      type: String,
      default: null
    },
    popoverFlag: {
      type: Boolean,
      default: false
    },
    dep_list: {
      type: Array,
      default: null
    },
    model: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      labelClassName: "",
      dialogFormVisible: false,
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
      formLabelWidth: '120px',
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
    };
  },
  methods: {
    renderContent(h, data) {
      // return data.label
      // return (<div>{data.label}<br/>{data.position}</div>)
      // 弹出框
      if(this.popoverFlag){
        return (<el-popover
          placement="bottom"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" onclick={() => this.popoverClick('cancle', data)}>取消</el-button>
            <el-button type="primary" size="mini" onclick={() => this.popoverClick('submit', data)}>确定</el-button>
            <el-button type="primary" size="mini" onclick={() => this.popoverClick('del', data)}>删除</el-button>
            <el-button type="primary" size="mini" onclick={() => this.popoverClick('add', data)}>新增</el-button>
          </div>
          <div slot="reference" class="user_panel" onclick={() => this.nodePanelClick(data)}>{data.label}{data.userNames}<br/>{data.name} {data.orgName}</div>
        </el-popover>)
      }else{
        // {require('../../images/logo.png')}
        if(data.level == 1){
          return (<div style="height:100px;width:150px;" class="user_panel level_one leaderCon">
              <img class="photo_img" src={require('../../assets/images/bg/person.png')}></img>
              <div class="panel_info">
                <span style="line-height:20px;">{data.userPname}</span><br/>
                <span class="post">{data.name}</span>
                <span class="post">{data.orgPname}</span>
              </div>
            </div>)
        }else if(data.level == 2){
          let img = require('../../assets/images/bg/person_bg'+data.level%11+'.png')
          return (<div
              style={'height:100px;background-size:100% 100%;background:url('+img+') no-repeat'}
              class="user_panel level_two">
              <img class="photo_img" src={require('../../assets/images/bg/person.png')}></img>
              <div class="panel_info">
                <span style="line-height:20px;">{data.realName}</span><br/>
                <span class="post">{data.userInfo.politicalStatus}</span>
                <span class="post">{data.userInfo.policeRank}</span>
              </div>
            </div>)
        }else if(data.level == 3){
          return (<div class="user_panel depCon">
                {
                  // {id, name, userPname}
                  data.dep.map((item,index) => 
                    <div onclick={() => this.nodePanelClick(data, item, 'dep')}
                      class="user_panel level_three" 
                      style="margin-bottom:5px;">
                      <img class="dep_img" src={index==0?require('../../assets/images/bg/dep_bg2.png'):index==1?require('../../assets/images/bg/dep_bg3.png'):require('../../assets/images/bg/dep_bg.png')} />
                      <div class="depCon_info">{item.name}</div>
                    </div>
                  )
                }
            </div>)
        }else {
          if(this.model == 'dep'){
            // border:3px solid #1ACE80;
            return (<div class="user_panel_dep" onclick={() => this.nodePanelClick(data,'','person_info')}>
              <img class="photo_img" style="display:block;"
                src={require('../../assets/images/bg/person.png')}></img>
              <span class={ this.$store.state.user.userId == data.id ? 'current_user' : '' }>
                {(data.userPname == 'undefined' || data.userPname == undefined || data.userPname == null)? '未知' : data.userPname}
              </span>
            </div>)
          }else if(this.model == 'person_info'){
            return (<div class="user_panel_others">
              <span class={ this.$store.state.user.userId == data.id ? 'current_user' : '' }>
                {(data.userPname == 'undefined' || data.userPname == undefined || data.userPname == null)? '未知' : data.userPname}
              </span>
            </div>)
          }else{
            return (<div class="user_panel_others">
              <span>三个字</span>
            </div>)
          }
        }
      }
      
    },
    popoverClick(key, node){
      console.log(key, node)
      if(key === 'add') {
        this.dialogFormVisible = true
      }else if (key === 'del') {
        if (node.children && node.children.length > 0) {
          this.$message.info('当前部门存在子部门，请先删除子部门')
        } else {
          // 删除节点，刷新数据
          console.log('删除节点，刷新数据')
        }
      } else {
        // this.$refs.modifyDept.showModal(key, node)
        console.log(key, node)
      }
    },
    onExpand(e, data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
    onNodeClick(e, data) {
      // console.log(data);
      // console.log(data.label);
      if(data.url==null){
        return false
      }else{
        window.open(data.url)
      }
    },
    // 几点面板点击事件
    nodePanelClick(data, valueObj, model){
      // console.log(data)
      // console.log(valueObj)
      const _this = this
      let query = {}
      if(valueObj == '') {
        query.value = data
        query.model = model
        // 当前用户才可点击
        // if(data.id != _this.$store.state.user.userId){
        //   return 
        // }
      }else{
        query.value = valueObj
        query.list = _this.dep_list
        query.model = model
      }
      if(this.path_url == null || this.path_url == ''){
        return 
      }
      this.$router.push({path: this.path_url, query})
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
.com.org_tree{
  height: 100%;
  width: 100%;
}
.com.org_tree .col-md-4{
  display: inline-block;
  margin: 10px 20px;
}
.com.org_tree >>>	.org-tree-container{
  height: 100%;
	padding: 0;
  background: none;
}
.com.org_tree .text-center{
  font-size: 14px;
  line-height: 20px;
}
.com.com.org_tree .org-tree-node-label-inner{
  border-radius: 20px;
  padding:0;
  box-shadow: none;
}
.com.com.org_tree .user_panel{
  padding: 10px 20px;
  border-radius: 20px;
  width: 75px;
  height: 75px;
  word-wrap:break-word;
  font-size: 12px;
  line-height:16px;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  background:#fff;
}
.com.com.org_tree .user_panel_others{
  background:#EFF2FE;
  padding: 10px 20px;
  border-radius: 20px;
  word-wrap:break-word;
  font-size: 12px;
  -webkit-box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.com.com.org_tree .depCon{
  box-shadow:none;
  padding:0;
  width: 115px;
  height: 95px;
}
.com.com.org_tree .user_panel22:hover{
  background:red;
}
.com.com.org_tree .level_one,.com.com.org_tree .level_two{
  background: url('../../assets/images/bg/preson_bg.png') no-repeat;
  background-size: 100% 100%;
}
.com.com.org_tree .leaderCon{
  background: url('../../assets/images/bg/person_leader.png') no-repeat;
  background-size: 100% 100%;
}
.com.com.org_tree .level_three{
  background: #ffffff;
  /* background: url('../../assets/images/bg/dep_bg.png') no-repeat;
  background-size: 100% 100%; */
}
.com.com.org_tree .level_three .dep_img{
  width: 40px;
  height:40px;
}
.com.com.org_tree .level_three:hover{
  border:2px solid #bf1730;
}
.com.com.org_tree .user_panel .panel_info{
  position: absolute;
  bottom: 5px;
  width: calc(100% - 40px);
  color: #fff;
  line-height: 18px;
}
.com.com.org_tree .user_panel .depCon_info{
  margin-top: 7px;
  width: 100%;
  font-size: 14px;
  color:#333;
  white-space:normal;
}
.com.com.org_tree .user_panel .panel_info .post{
  display: block;
  font-size: 12px;
  -webkit-transform: scale(0.9);
}
.com.com.org_tree .user_panel .photo_img,.com.com.org_tree .user_panel_dep .photo_img{
  width: 45px;
  border-radius: 35px;
}
.com.com.org_tree .user_panel_dep{
  padding: 8px 15px;
  width:40px;
  height: 60px;
  background: #fff;
  border-radius: 10px;
}
.com.com.org_tree .user_panel_dep .photo_img{
  margin-left:5px;
  height: 30px;
  width:30px;
}
.com.com.org_tree .user_panel_dep span{
  position: relative;
  top: 5px;
}
.com.com.org_tree .current_user{
  color:#bf1730;
}
</style>