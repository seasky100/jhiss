<template>
  <div class="hello">
    <e-search 
      @handleSearch="handleSearch"
      :searchData="searchData"
      :searchForm="searchForm"
      :rules="rules" />
  </div>
</template>

<script>

const sexs=[{label:'男',value:'M'},{label:'女',value:'F'}]
const sexProps={label:'label',value:'value'}
const intersts=[{label:'羽毛球',value:'badminton'},{label:'篮球',value:'basketball'},{label:'足球',value:'football'},{label:'兵乓球',value:'pong'}]
const interstProps={label:'label',value:'value'}


export default {
  name: 'Table',
  data () {
    return {
      searchData:{
        name: null,
        age: null,
        sex: 'M',
        date: '',
        starttime: '',
        endtime: ''
      },
      searchForm:[
        {type: 'input',label: '姓名：',prop: 'name',width: '120px',placeholder: '请输入姓名'},
        {type: 'input',label: '年龄',prop: 'age',width: '120px',placeholder: '请输入年龄'},
        {type: 'date',label: '日期',prop: 'date',width: '120px',placeholder: '请选择日期'},
        {
          type: 'daterange',
          label: '日期范围',
          // prop: 'daterange',
          options: [
            {
              prop: 'starttime',
              format: '',
              valueformat: '',
              placeholder: '起始时间'
            },
            {
              prop: 'endtime',
              format: '',
              valueformat: '',
              placeholder: '结束时间'
            }
          ]
        },
        {type: 'select',label: '性别',prop: 'sex',width: '120px',options: sexs,props:sexProps,change: row => console.log(row),placeholder: '请选择性'}
      ]
  },
  methods: {
    handleSearch(val) {
      console.log(val)
    }
  }
}
</script>