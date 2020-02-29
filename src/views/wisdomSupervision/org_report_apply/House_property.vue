<template>
  <div class="talk_add">
		<div class="individual_title">
      房产变更
    </div>
		<div style="float:left;width:50%;margin:0 20px;">
			<div style="width:70%;margin:10px;padding:13px;border-radius:5px;font-size:14px;background:#f9f2ec;">
				<span style="color: #E6A061; background: '#F9F2EC'; userSelect:text;">
					本人、配偶、共同生活的子女房产变更（包括住宅、商用房、厂房、仓库、自建房、车库、车位、储藏间等）、装修等情况（以经备案的房屋买卖合同记载为准），事后7日内报告。
				</span>
			</div>
      <div class="formCon">
        <div>
          <span :style="[{background:index==active?'#235ff5':'#ccc'}]"
            v-for="(item,index) of form_arr" :key="index"
            @click="checkformobj(item,index)">
            {{item.type==0?'车库':item.type==1?'车位':'储藏室'}}
            {{item.input1}}
          </span>
        </div>
        <el-form ref="formobj" :model="formobj" label-width="90px">
          <el-form-item label="附房类型">
            <el-select :disabled="formobj.disabled" v-model="formobj.type" placeholder="请选择附房类型">
              <el-option label="车库" value="0"></el-option>
              <el-option label="车位" value="1"></el-option>
              <el-option label="储藏室" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-for="(item, index) in type_arr[formobj.type]" :key="index" :label="item.label">
            <el-input :disabled="formobj.disabled" 
              clearable
              v-model="formobj[item.prop]"
              :placeholder="item.placeholder"/>
          </el-form-item>
          <el-form-item>
            <el-checkbox style="margin-right:20px;" v-model="formobj.checked">保存</el-checkbox>
            <el-button @click="deleteformObj">删除当前附房</el-button>
            <el-button type="primary" @click="checkformobj('')">新增附房</el-button>
          </el-form-item>
        </el-form>
      </div>
			<e-search :inlineFlag="inlineFlag"
				:label_position="label_position"
        @handleSearch="handleSearch"
        :searchData="searchData"
        :searchForm="searchForm" />
		</div>
    <!-- 流程图 -->
		<div style="float:left;margin:40px 0 0 50px;">
			<div class="individual_title">
				房产变更
			</div>
			<el-steps direction="vertical" :active="1" finish-status="success">
				<el-step title="步骤 1">
					<i class="step01" slot="icon">
							<!-- <img :src="[commandmenubg==item.class?item.imgSrc_hover:item.imgSrc]"
									style="position: absolute;top: -6px;left: -6px;" /> -->
						<img />
					</i>
					<i slot="title" style="background:none;">
							步骤一一
					</i>
					<i slot="description" style="background:none;margin:0px 5px 20px;">
							详情意义
					</i>
				</el-step>
				<el-step title="步骤 2"></el-step>
				<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
			</el-steps>
		</div>
  </div>
</template>
<script>
export default {
  name: "House_property",
  data() {
    return {
			inlineFlag:false,
      label_position:'top',
      checked:false,
      active: 0,
			// org_flag: false,
      searchData: {
        userName: '',
        policeCode: '',
        department: '',
        problemType: '',
        startTime: '',
        endTime: ''
      },
      formobj:{
        name:'车库',
        type:'',
        disabled: false
      },
      form_arr:[],
      type_arr:[
        [
          {label:'号码',type: 'input', prop: 'input1',  placeholder: ''},
          {label:'面积',type: 'input', prop: 'input2',  placeholder: ''},
          {label:'地址',type: 'input', prop: 'input3',  placeholder: ''},
        ],
        [
          {label:'车位号码',type: 'input', prop: 'input1',  placeholder: ''},
          {label:'车位面积',type: 'input', prop: 'input2',  placeholder: ''},
          {label:'车位地址',type: 'input', prop: 'input3',  placeholder: ''},
        ],
        [
          {label:'储藏室号码',type: 'input', prop: 'input1',  placeholder: ''},
          {label:'储藏室面积',type: 'input', prop: 'input2',  placeholder: ''},
          {label:'储藏室地址',type: 'input', prop: 'input3',  placeholder: ''},
        ],  
      ],
			searchForm: [
        {
					label:'房产类型',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'商品房', value:'0'},
            {label:'福利房', value:'1'},
            {label:'经济适用房', value:'2'},
            {label:'限价房', value:'3'},
            {label:'自建房', value:'4'},
            {label:'商住房', value:'5'},
            {label:'厂房', value:'6'},
            {label:'仓库', value:'7'},
            {label:'其他', value:'8'},
          ],
          change: row => console.log(row),
          placeholder: ''
				},
				{label:'房屋坐落',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'建筑面积（平方米）',type: 'input', prop: 'date', placeholder: ''},
				{
					label:'装修情况',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'毛坯', value:'0'},
            {label:'简装', value:'1'},
            {label:'精装', value:'2'},
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {
					label:'产权归属',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'本人', value:'0'},
            {label:'父母', value:'1'},
            {label:'配偶', value:'2'},
            {label:'子女', value:'3'},
          ],
          change: row => console.log(row),
          placeholder: ''
				},
				{label:'房产总额（万元）',type: 'input', prop: 'policeCode',  placeholder: ''},
				{
					label:'交易类型',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'购买', value:'0'},
            {label:'继承', value:'1'},
            {label:'接受赠与', value:'2'},
            {label:'分割', value:'3'},
            {label:'合并', value:'4'},
            {label:'变更', value:'5'},
            {label:'交换', value:'6'},
            {label:'析产', value:'7'},
            {label:'赠与他人', value:'8'},
            {label:'其他去向', value:'9'},
            {label:'其他', value:'10'},
          ],
          change: row => console.log(row),
          placeholder: ''
				},
        {label:'交易时间',type: 'date', prop: 'policeCode',  placeholder: ''},
        {
					label:'贷款情况',
          type: 'select',
          prop: 'department',
          width: '100%',
          options: [
            {label:'全款', value:'0'},
            {label:'商业贷款', value:'1'},
            {label:'公积金贷款', value:'2'},
            {label:'组合贷款', value:'3'}
          ],
          change: row => console.log(row),
          placeholder: ''
        },
        {label:'备注',type: 'input', prop: 'policeCode',  placeholder: ''},
				{label:'附件',type: 'file', prop: 'policeCode',  placeholder: ''},
				{
					label:'审批人',
          type: 'select_tree',
          prop: 'department',
          width: '100%',
          options: [
            {
              prop: 'selectOrg',
              format: '',
              valueformat: '',
              placeholder: '请选择机构'
            },
            {
              prop: 'selectPerson',
              format: '',
              valueformat: '',
              placeholder: '请选择审批人'
            }
          ],
          change: row => console.log(row),
          placeholder: ''
				}
			],
    }
  },
  watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
    },
    'formobj.checked'(newVal,oldVal){
      this.$set(this.formobj,'disabled',newVal)
      if(newVal && (oldVal == undefined || oldVal == null)){
        this.formobj.disabled = true
        let arr = [...this.form_arr]
        arr.push(this.formobj)
        this.form_arr = arr
      }
    }
	},
  mounted() {
    this.init()
  },
  methods: {
		init() {
			// this.getOrgData()
		},
		// 查询
    handleSearch(params) {
      // Object.assign(this.searchData, params);
      console.log(params)
      // this.query();
    },
    checkformobj(val = '', index = this.form_arr.length - 1){
      this.active = index
      if(val == ''){
        if(!this.formobj.checked){
          this.$message('请先保存')
          return
        }
        this.formobj = {
          name:'车库',
          type:'',
          disabled: false,
          checked:null
        }
        this.checked = false
      } else {
        this.formobj = val
      }
    },
    deleteformObj(){
      let arr = [...this.form_arr]
      arr.splice(this.active,1)
      this.form_arr = arr
      let index = this.form_arr.length - 1
      this.checkformobj(arr[index],index)
    }
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
.individual_title
	height:40px;
	line-height:40px;
	padding:0 10px;
	font-size 16px
	font-weight bold
.formCon
  border 1px solid #ccc
  padding 5px 0
.formCon span 
  display inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background: #235ff5;
  margin: 5px;
  color: #fff;
  cursor: pointer;
</style>
