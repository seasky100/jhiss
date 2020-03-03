<template>
  <div class="relationCon">
    <div class="personCon"
      v-for="(item,index) of data_arr" :key="index">
      <div>

      </div>
      <ul>
        <li v-for="(item2,index2) of projectList" :key="index2">
          {{item2.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      data_arr: [
        {name:'张三'},
        {name:'张三'},
        {name:'张三'},
        {name:'张三'},
        {name:'张三'}
      ],
      projectList: [
        {name: '工作日志'},
        {name: '岗位预警'},
        {name: '谈话谈心'},
        {name: '责任清单'}
      ],
    }
  },
  methods: {
  }
};
</script>
<style type="text/css" lang="stylus">
.relationCon
  .personCon
    float left
    border 1px solid #ccc
    width calc(49% - 2px)
    margin 0px 0.5%
    margin-bottom 10px
    font-size 14px
</style>