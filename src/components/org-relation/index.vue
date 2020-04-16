<template>
  <div class="relationCon">
    <div class="personCon"
      v-for="(item,index) of data" :key="index">
      <div class="photo_img_con">
        <img class="photo_img" src="../../assets/images/bg/person.png" />
        <!-- <div style="display:inline-block;margin-top:15px;">
          <span style="margin-left:20px;">{{(item.userPname == 'undefined' || item.userPname == undefined || item.userPname == null)? '未知' : item.userPname}}</span>
          <span :style="[{background:color_arr[index2].bg,color:color_arr[index2].color}]"
            class="label_body"
            v-for="(item2,index2) of item.label" :key="index2">
            {{item2}}
          </span><br/>
          <span style="margin-left: 20px;line-height:25px;">{{item.orgPname}}</span>
        </div> -->
      </div>
      <div class="nameSpan" style="margin-top:10px;">
        {{(item.userPname == 'undefined' || item.userPname == undefined || item.userPname == null)? '未知' : item.userPname}}
      </div>
      <div class="nameSpan position">{{item.orgPname}}</div>
      <span :style="[{background:color_arr[index2].bg,color:color_arr[index2].color}]"
        class="label_body"
        v-for="(item2,index2) of item.label" :key="index2">
        {{item2}}
      </span>
      <!-- <div class="person_ul">
        <li class="person_li" @click="handleClick(item3, item)"
          v-for="(item3,index3) of projectList" :key="index3">
          <span>{{item3.name}}</span>
        </li>
      </div> -->
      <div class="person_ul">
        <span class="person_li" @click="handleClick(item3, item)"
          v-for="(item3,index3) of projectList" :key="index3">
          <img class="menuImg" :src="item3.imgPath" />
          <span>{{item3.name}}</span>
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
    }
  },
  data() {
    return {
      projectList: [
        {name: '工作日志', path: '/HierEvaluation', imgPath: require('@/assets/images/bg/menu1.png')},
        {name: '岗位预警', imgPath: require('@/assets/images/bg/menu2.png')},
        {name: '谈话谈心', path: '/talks', imgPath: require('@/assets/images/bg/menu3.png')},
        {name: '责任清单', imgPath: require('@/assets/images/bg/menu4.png')}
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
    handleClick(value, personInfo){
      if(value.path == null){
        if(value.name=='岗位预警') {
          let userId = personInfo.userPid
          this.$parent.getRiskByUserData(userId)
        }else{
          // console.log('责任清单')
          this.$parent.dialogVisible2 = true
        }
      }else {
        this.MenuPage.activeMenu = value.path
        this.$router.push({path: value.path})
      }
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
      height 80px
      margin-top 15px
      padding-top 10px
      text-align center
      border-top 1px solid #cccccc
      .menuImg
        width 40px
        height 40px
        border-radius 40px
      .person_li
        width 25%
        float left
        color #AB2C31
        font-size 16px
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
        border 3px solid #cccccc
        border-radius 80px
        width 55px
        height 55px
    .label_body
      padding: 5px 10px
      margin-top 15px
      background #ccc
      font-size 13px
      border-radius 5px
      maegin: 5px
      margin-left 10px
      display inline-block
</style>