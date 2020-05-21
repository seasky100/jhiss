<template>
  <div class="relationCon">
    <div class="personCon"
      v-for="(item,index) of data" :key="index">
      <div class="photo_img_con">
        <el-image class="photo_img"
          :src="$parent.getPhotoPath(item.userInfo)" fit="fill" lazy>
          <div slot="error" class="image-slot">
            <el-image fit="fill" :src="require('@/assets/images/bg/person.png')"></el-image>
          </div>
        </el-image>
      </div>
      <div class="nameSpan" style="margin-top:10px;">
          <img src="../../assets/images/dangyuan.png"/>{{item.realName}}
      </div>
      <div class="nameSpan position">{{item.orgPname}}</div>
      <span :style="[{color:color_arr[0].color}]"
      class="label_body">
      <img style="height:25px" :src=" require('@/assets/images/bg/yujing1.png')"/>
    </span>
      <span @click="handleClick2(item)" :style="[{color:color_arr[0].color}]"
      class="label_body"><img  :src=" require('@/assets/images/dzzrs.png')"/>责任书
    </span>
      <div class="person_ul">
       <span class="person_li" @click="funcObj(item3, item)"
          :style="[{'cursor': level == 1 ? 'pointer' : ''}]"
          v-for="(item3,index3) of projectList" :key="index3">
          <img class="menuImg" :title="item3.name" :src="item3.imgPath" />
          <!-- <span>{{item3.name}}</span> -->
        </span>
      </div>
      <!-- 111111 -->
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
    },
          level:{
      type: Number,
      default: () => {
        return 1
      }
    },
    
  },
  data() {
    return {
            funcObj: (item3, item) => {
        // console.log(this.level)
        if(this.level == 1){
          this.handleClick(item3, item)
        }
      },
      projectList: [
        // {name: '工作日志', path: '/HierEvaluation', imgPath: require('@/assets/images/bg/menu1.png')},
        {name: '岗位风险', imgPath: require('@/assets/images/bg/menu3.png')},
        {name: '谈话谈心', path: '/talks', imgPath: require('@/assets/images/bg/menu2.png')},
        // {name: '责任清单', imgPath: require('@/assets/images/bg/menu4.png')},
        // {name: '风险评估', path: '/JobRisk', imgPath: require('@/assets/images/bg/xxjy.png')},
        {name: '预警管控', path: '/RiskControl',imgPath: require('@/assets/images/bg/yjgk.png')},
        {name: '学习教育', path: '/LearnEducation', imgPath: require('@/assets/images/bg/fxpg.png')},
      ],
      labelList: [
        {label: '预警'}
        // {label: '在岗'}
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
    // console.log(this.data)
  },
  methods: {
    handleClick(value, personInfo){
      this.$parent.handleClick(value, personInfo)
      // console.log(value,personInfo)
      // if(value.path == null){
      //   if(value.name=='岗位风险') {
      //     let userId = personInfo.id
      //     this.$parent.getRiskByUserData(userId,personInfo)
      //   }else{
      //     // console.log('责任清单')
      //     console.log('人员ID：',personInfo.userPid)
      //     this.$parent.dialogVisible2 = true
      //   }
      // }else {
      //   this.MenuPage.activeMenu = value.path
      //   this.$router.push({path: value.path})
      // }
    },
    handleClick2(value){
      this.$parent.responsibility(value)
    }
    // 
  }
};
</script>
<style type="text/css" lang="stylus" scoped>
.relationCon
  .personCon
    float left
    border 1px solid #ccc
    width calc(33.3% - 42px)
    margin 0px 10px
    padding 5px 10px
    margin-bottom 10px
    font-size 14px
    text-align center
    .position
      color #b7b7b7
      font-size 12px
    &:hover
      background #fbfbfb
    .person_ul
      line-height 30px
      height 53px
      margin-top 15px
      padding-top 10px
      text-align center
      border-top 1px solid #cccccc
      .menuImg
        width 30px
        height 30px
        border-radius 40px
      .person_li
        width 25%
        float left
        color #AB2C31
        font-size 16px
        margin-bottom 5px
        cursor pointer
        span 
          display block
          font-size 13px
          margin-top 7px
          color #333
          &:hover
            color #ab2c31
    .photo_img_con
      margin-top 10px
      .photo_img
        width 55px
    .label_body
      padding: 2px 0px
      margin-top 15px
      background #fff
      font-size 13px
      border-radius 5px
      maegin: 5px
      cursor: pointer
      margin-left 8px
      display inline-block
</style>