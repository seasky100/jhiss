<template>
  <div class="relationCon">
    <div class="personCon"
      v-for="(item,index) of data" :key="index">
      <div class="photo_img_con">
        <img class="photo_img" src="../../assets/images/bg/person.png" />
        <div style="display:inline-block;margin-top:15px;">
          <span style="margin-left:20px;">{{(item.userPname == 'undefined' || item.userPname == undefined || item.userPname == null)? '未知' : item.userPname}}</span>
          <span :style="[{background:color_arr[index2].bg,color:color_arr[index2].color}]"
            class="label_body"
            v-for="(item2,index2) of item.label" :key="index2">
            {{item2}}
          </span><br/>
          <span style="margin-left: 20px;line-height:25px;">{{item.orgPname}}</span>
        </div>
      </div>
      <div class="person_ul">
        <li class="person_li" @click="handleClick(item3)"
          v-for="(item3,index3) of projectList" :key="index3">
          <span>{{item3.name}}</span>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['MenuPage'],
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      projectList: [
        {name: '工作日志', path: '/HierEvaluation'},
        {name: '岗位预警'},
        {name: '谈话谈心'},
        {name: '责任清单'}
      ],
      labelList: [
        {label: '党员'},
        {label: '岗位状态'},
        {label: '岗位状态'}
      ],
      color_arr: [
        {bg: '#EAE9EF',color: '#A52126'},
        {bg: '#E6FAF5',color: '#81D5C0'},
        {bg: '#D6E9FF',color: '#4D86F0'}
      ]
    }
  },
  watch:{
  },
  mounted() {
    console.log(this.data)
  },
  methods: {
    handleClick(value){
      this.MenuPage.activeMenu = value.path
      this.$router.push({path: value.path})
    }
  }
};
</script>
<style type="text/css" lang="stylus" scoped>
.relationCon
  .personCon
    float left
    border 1px solid #ccc
    width calc(49% - 42px)
    margin 0px 0.5%
    padding 15px 20px
    margin-bottom 10px
    font-size 14px
    &:hover
      background #fbfbfb
    .person_ul
      margin-left 100px
      line-height 30px
      .person_li
        width 50%
        float left
        color #AB2C31
        font-size 16px
        cursor pointer
        span 
          font-size 14px
          color #333
          &:hover
            color #ab2c31
    .photo_img_con
      .photo_img
        border 3px solid #cccccc
        border-radius 80px
      .label_body
        padding: 5px 10px
        background #ccc
        border-radius 15px
        maegin: 5px
        margin-left 10px
        display inline-block
</style>