<template>
  <div class="com org_tree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="row">
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
        <p>
          <br/>
        </p>
        <div class="text-center">
          <vue2-org-tree
            name="test"
            :data="data"
            :horizontal="horizontal"
            :collapsable="collapsable"
            :label-class-name="labelClassName"
            :render-content="renderContent"
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
    }
  },
  data() {
    return {
      horizontal: false,
      collapsable: true,
      expandAll: false,
      labelClassName: "bg-white",
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
      formLabelWidth: '120px'
    };
  },
  methods: {
    renderContent(h, data) {
      // return data.label
      // return (<div>{data.label}<br/>{data.position}</div>)
      // 弹出框
      return (<el-popover
        placement="bottom"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <p>这是一段内容这是一段内容确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" onclick={() => this.popoverClick('cancle', data)}>取消</el-button>
          <el-button type="primary" size="mini" onclick={() => this.popoverClick('submit', data)}>确定</el-button>
          <el-button type="primary" size="mini" onclick={() => this.popoverClick('del', data)}>删除</el-button>
          <el-button type="primary" size="mini" onclick={() => this.popoverClick('add', data)}>新增</el-button>
        </div>
        <div slot="reference">{data.label}<br/>{data.position}</div>
      </el-popover>)
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
}
.com.org_tree .text-center{
  font-size: 14px;
  line-height: 20px;
}
</style>