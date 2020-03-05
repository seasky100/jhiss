<template>
  <div class="garage">
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
      <el-tab-pane
        :closable="item.closable"
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <div v-if="index === editableTabs.length - 1" class="garage-content">
          <el-form ref="garageform" :model="garageForm" label-width="80px" size="small" label-position="top">
            <el-form-item label="附房类型" prop="status" class="require">
              <el-select v-model="garageForm.status" placeholder="请选择" @change="garageChangeHandler">
                <el-option
                  v-for="item in garageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${label}号码`" prop="garageNumber" class="require">
              <el-input v-model="garageForm.garageNumber"></el-input>
            </el-form-item>
            <el-form-item :label="`${label}面积`" prop="garageArea" class="require">
              <el-input v-model="garageForm.garageArea"></el-input>
            </el-form-item>
            <el-form-item :label="`${label}地址`" prop="address" class="require">
              <el-input v-model="garageForm.address"></el-input>
            </el-form-item>
            <div style="text-align: center;padding-bottom: 10px;">
              <el-button
                size="small"
                @click="addTab(editableTabsValue)"
              >
                新增附房
              </el-button>
            </div>
          </el-form>
        </div>
        <div v-else class="garage-content">
          <div class="garage-item">
            <label>{{`${item.label}类型`}}</label>
            <el-select v-model="item.status" placeholder="请选择" size="small" disabled>
              <el-option
                v-for="item in garageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="garage-item">
            <label>{{`${item.label}号码`}}</label>
            <el-input v-model="item.garageNumber" size="small" disabled></el-input>
          </div>
          <div class="garage-item">
            <label>{{`${item.label}面积`}}</label>
            <el-input v-model="item.garageArea" size="small" disabled></el-input>
          </div>
          <div class="garage-item">
            <label>{{`${item.label}地址`}}</label>
            <el-input v-model="item.address" size="small" disabled></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      editableTabsValue: '1',
      editableTabs: [
        {
          title: '新增附房',
          name: '1',
          status: '0',
          garageNumber: '',
          garageArea: '',
          address: '',
          label: '',
          closable: false
        }
      ],
      tabIndex: 1,
      // 附房
      label: '车库',
      garageForm: {
        status: '0',
        garageNumber: '',
        garageArea: '',
        address: ''
      },
      garageRules: {
        status: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        garageNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        garageArea: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      garageOptions: [
        {label:'车库', value:'0'},
        {label:'车位', value:'1'},
        {label:'储藏室', value:'2'}
      ],
    }
  },
  methods: {
    addTab(targetName) {
      if(this.garageForm.status && this.garageForm.garageNumber && this.garageForm.garageArea && this.garageForm.address) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.unshift({
          title: this.label + ' ' + this.garageForm.garageNumber,
          name: newTabName,
          status: this.garageForm.status,
          garageNumber: this.garageForm.garageNumber,
          garageArea: this.garageForm.garageArea,
          address: this.garageForm.address,
          label: this.label,
          closable: true
        });
        this.editableTabsValue = '1';
        // 初始化form
        this.initForm();
        this.$emit('setData', this.editableTabs);
      }else {
        this.$message({
          type: 'warning',
          message: '请填写附房表单'
        })
        return false;
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$emit('setData', this.editableTabs);
    },
    // 附房类型切换label
    garageChangeHandler(val) {
      this.garageOptions.map(item => {
        if(item.value === val) {
          this.label = item.label;
        }
      })
    },
    // 初始化form
    initForm() {
      this.garageForm.status = '0';
      this.garageForm.garageNumber = '';
      this.garageForm.garageArea = '';
      this.garageForm.address = '';
    }
  }
}
</script>

<style lang="stylus" scoped>
.garage
  box-sizing: border-box;
  border: 1px solid #c1d1dc;
  .garage-content
    height: 370px;
    padding: 10px 20px;
.garage-item
  margin-bottom: 18px;
  label
    display: inline-block;
    font-size: 14px;
    color: #606266;
    height: 32px;
    line-height: 32px;
.require
  /deep/ .el-form-item__label:before
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
/deep/ .el-select
  width: 100%;
/deep/ .el-form--label-top .el-form-item__label
  padding: 0;
</style>
