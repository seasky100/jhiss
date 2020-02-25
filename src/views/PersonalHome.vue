<template>
  <div class="person_home">
    <div class="police_career">
      <div class="person_title">
        从警生涯
      </div>
      <div class="w_full">
        <img />
      </div>
    </div>
    <!-- 风险提醒 -->
    <div class="police_career" style="height:400px;background:none;">
      <div class="fengxian" style="width:66%;">
        <div class="person_title">
          风险提醒
        </div>
        <div class="fengxian_body radar" id="radar"></div>
        <div class="fengxian_body">
            <div class='flex flex-align-center flex-justify-center' style="font-size: 1.2em">
                <!-- <img src='/images/home_smile_face@2x.png' /> -->
                <span class='ml6 color-grey'>当前0项风险内容，请继续保持！</span>
              </div>
              <div class='flex flex-justify-center'>
                  <div>
                    <div class='h12 w12 r-half inline-block' style="background: #1F77B4"/>
                    <span class='ml8'>本月分析</span>
                  </div>
                  <div>
                    <div class='h12 w12 r-half inline-block' style="background: #FF7F0E" />
                    <span class='ml8'>上月分析</span>
                  </div>
                </div>
          <div class='flex flex-column flex-grow flex-justify-between' style="margin-top: 2em; padding: 0 20%;text-align: center">
            <div class='flex-justify-between h24' style="line-height: 2.5em">
              <div class='flex-inline' style="width: 40%">
                <span>智慧考勤</span>
                <span style="margin: 0 0.5em">2</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>请假分析</span>
                <span style="margin: 0 0.5em">3</span>
                <span>项</span>
              </div>
            <div class='flex-justify-between h24' style="line-height: 2.5em">
              <div class='flex-inline' style="width: 40%">
                <span>出国预警</span>
                <span style="margin: 0 0.5em">5</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>事项申报</span>
                <span style="margin: 0 0.5em">4</span>
                <span>项</span>
              </div>
            </div>
            <div class='flex-justify-between h24'>
              <div class='flex-inline' style="width: 40%">
                <span>用车预警</span>
                <span style="margin: 0 0.5em">2</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>违规查询</span>
                <span style="margin: 0 0.5em">8</span>
                <span>项</span>
              </div>
            </div>
            <div class='flex-justify-between h24'>
              <div class='flex-inline' style="width: 40%">
                <span>差旅预警</span>
                <span style="margin: 0 0.5em">6</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>日志预警</span>
                <span style="margin: 0 0.5em">7</span>
                <span>项</span>
              </div>
            </div>
            <div class='flex-justify-between h24'>
              <div class='flex-inline' style="width: 40%">
                <span>涉嫌违法</span>
                <span style="margin: 0 0.5em">4</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>刷卡预警</span>
                <span style="margin: 0 0.5em">2</span>
                <span>项</span>
              </div>
            </div>
            <div class='flex-justify-between h24'>
              <div class='flex-inline' style="width: 40%">
                <span>就餐预警</span>
                <span style="margin: 0 0.5em">3</span>
                <span>项</span>
              </div>
              <div class='flex-inline' style="width: 40%">
                <span>审批预警</span>
                <span style="margin: 0 0.5em">3</span>
                <span>项</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="fengxian" style="width:33.3%;margin-left:0.7%;">
        <div class="person_title">
            <!-- <img src='/images/home_round_bar@2x.png' /> -->
            <span class='pl8 txt-bold' style="font-size: 1.2em">待办事项</span>         
          <div class='flex flex-align-center flex-justify-center flex-grow' style="margin-top: 3em">
            <div class='flex flex-column flex-align-center flex-grow'>
              <span class='flex flex-align-center txt-bold cursor-pointer' style="height: 2.4em">协作提效</span>
              <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #E8EFFF">
                <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #235FF6">                  
                  <Link to='' class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                    style="width: 4.4em; height: 4.4em; background: #235FF6" title='待办箱'>
                    <span style="font-size: 1.5em">22</span>
                  </Link>
                </div>
              </div>
              <span style="color: #8092A8">待办</span>
            </div>
            <div style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
            <div class='flex flex-column flex-align-center flex-grow'>
              <span class='flex flex-align-center txt-bold cursor-pointer' style="height: 2.4em">队伍精细化</span>
              <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #F4F1FF">
                <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #8674F6">
                  <Link to='' class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                    style="width: '4.4em'; height: 4.4em; background: #8674F6" title='待办箱'>
                    <span style="font-size: 1.5em">1</span>
                  </Link>
                </div>
              </div>
              <span style="color: #8092A8">待办</span>
            </div>
            <div style="width: 0; border:0.5px solid #E4E9F3; height: '11.428em'; margin: auto 0" />
            <div class='flex flex-column flex-align-center flex-grow'>
              <span class='flex flex-align-center txt-bold cursor-pointer' style="height: 2.4em">层级关系</span>
              <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #FFF5EA">
                <Link to='' class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                  style="width: 4.4em; height: 4.4em; background: #F09B38" title='待办箱'>
                  <span style="font-size: 1.5em">4</span>
                </Link>
              </div>
              <span style="color: #8092A8">待办</span>
            </div>    
          </div>
        </div>
      </div>      
    </div>
    <!-- 层级管理 -->
    <div class="police_career" style="height:400px;background:none;">
      <div class="fengxian" style="width:33%;">
        <div class="person_title">
          层级评价
        </div>
      </div>
      <div class="fengxian" style="width:32.3%;margin-left:0.7%;">
        <div class="person_title">
          考勤情况
        </div>
      </div>
      <div class="fengxian" style="width:33.3%;margin-left:0.7%;">
        <div class="person_title">
          快速入口
        </div>
      </div>      
    </div>
    <!--  -->
  </div>
</template>
<script>
export default {
  name: "PersonalHome",
  data() {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  watch: {},
  mounted() {
    this.init();
    this.getData();
  },
  methods: {
    init() {
      this.getRadar()
    },
    getRadar(){
      let radarDom = this.$echarts.init(document.getElementById('radar'))
      let option = {
        title: {
          text: '',
          textStyle: {
              color: 'rgba(221,221,221,1)', //标题颜色
              fontSize: 14,
              lineHeight: 20,
          },
          // 标题的位置，此时放在图的底边
          left: 'center',
          top: 'bottom',
      },
      // 图表的位置
      grid: {
          position: 'center',
       },
       tooltip : {
       //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
          confine: true,
          enterable: true, //鼠标是否可以移动到tooltip区域内
       },
      radar: {
          shape: 'circle',
          splitNumber: 6, // 雷达图圈数设置
          name: {
              textStyle: {
                  color: '#838D9E',
              },
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
              lineStyle: {
                  color: '#DFDFDF',
                  },
          },
          indicator: [{
              name: '智慧考勤', max: 30,
              //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
              axisLabel: {
                  show: true,
                  fontSize: 12,
                  color: 'black',
                  showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                  showMinLabel: true, //显示最小数字，即中心点显示0
              },
          },
          { name: '请假分析', max: 50},
          { name: '出国分析', max: 30},
          { name: '事项申报', max: 30},
          { name: '用车预警', max: 30},
          { name: '违规查询', max: 30},
          { name: '差旅管理', max: 30},
          { name: '日志预警', max: 30},
          { name: '涉嫌违法', max: 30},
          { name: '刷卡预警', max: 30},
          { name: '就餐预警', max: 30},
          { name: '审批预警', max: 30},
          ],
          //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea : {
              show : false,
              areaStyle : {
                  color: '#DFDFDF', // 图表背景的颜色
              },
          },
          splitLine : {
              show : true,
              lineStyle : {
                  width : 1,
                  color : '#DFDFDF', // 设置网格的颜色
              },
          },
      },
      series: [{
          name: '雷达图', // tooltip中的标题
          type: 'radar', //表示是雷达图
          symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
          symbolSize: 8, // 拐点的大小
  
          areaStyle: {
              normal: {
                  width: 1,
                  opacity: 0.2,
              },
          },
          data: [
              {
                  value: [17, 24, 27, 29, 26, 16, 13, 17, 25, 28 , 24, 20],
                  name: '本月',
                  // 设置区域边框和区域的颜色
                  itemStyle: {
                      normal: {
                          color: 'rgba(255,225,0,.3)',
                          lineStyle: {
                              color: 'rgba(255,225,0,.3)',
                          },
                      },
                  },
                  //在拐点处显示数值
                  // label: {
                  //     normal: {
                  //         show: true,
                  //         formatter: (params: any) => {
                  //             return params.value
                  //         },
                  //     },
                  // },
              },
              // {
              //     value: [5, 20, 19, 11, 22, 17, 8, 19, 16],
              //     name: '上月',
              //      itemStyle: {
              //         normal: {
              //             color: 'rgba(60,135,213,.3)',
              //             lineStyle: {
              //                 width: 1,
              //                 color: 'rgba(60,135,213,.3)',
              //             },
              //         },
              //     },
              // },
               {
                  value: [7, 18, 19, 13, 22, 17, 8, 25, 9],
                  name: '上月',
                  itemStyle: {
                      normal: {
                          color: 'rgba(255,74,74,.3)',
                          lineStyle: {
                              width: 1,
                              color: 'rgba(255,74,74,.3)',
                          },
                      },
                  },
              },
          ],
      }],
      }
      radarDom.setOption(option)
    },
    // 查询分类风险提醒数据
    async getData() {
      debugger
      const id =''
      this.$request.get(`/police/warn/allWarnByType?userId=${id}`)
        .then(res => {
          if (res.success == true) {
            this.tableData = res.data.records
            // this.total = res.result.total
          } else {
            console.log(res.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}
</script>
<style lang="stylus" scoped>
  /* @import './css/assembly.css'; */
  @import './css/hover-min.css';
  @import './css/media.css';
  @import './css/pseudo_classes.css';
.person_home{
  margin: 1%;
  overflow auto;
}
.police_career{
  height: 220px;
  background:#fff;
  margin-bottom 15px;
}
.fengxian{
  float:left;
  background #fff;
  height:100%;
}
.person_title{
  float:left;
  width:100%;
  height:30px;
  margin: 10px;
  margin-bottom 0;
  font-size:16px;
  font-weight:bold;
  line-height:30px;
  border-left:5px solid red
  padding-left: 5px
}

.flex-grow {
    -webkit-flex-grow: 1!important;
    /* flex-grow: 1!important; */
}
.flex-column {
    -webkit-flex-direction: column!important;
    /* flex-direction: column!important; */
}
.flex-justify-center {
    -webkit-justify-content: center!important;
    justify-content: center!important;
}
.h12 {
    height: 0.857em!important;
}
.w12 {
    width: 0.857em!important;
}
.inline-block {
    display: inline-block!important;
}
.r-half {
    border-radius: 50%!important;
}
.ml8 {
    margin-left: 0.571em!important;
}
body{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section {
  display: block
}

html {
  box-sizing: border-box
}

h1,h2,h3,h4,h5,h6 {
  font-weight: 400
}

ol,ul {
  list-style: none
}

blockquote,q {
  quotes: none
}

blockquote:after,blockquote:before,q:after,q:before {
  content: none
}

table {
  border-collapse: collapse;
  border-spacing: 0
}

body,button,hr,img {
  margin: 0;
  border: 0
}

button {
  background: 0 0;
  color: inherit;
  font: inherit;
  padding: 0;
  width: auto;
  text-align: left;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  border-radius: 0
}

button:focus {
  font-weight: bold;
  outline: none
}

button:disabled {
  cursor: default
}

button::-moz-focus-inner {
  padding: 0;
  border: 0
}

svg {
  display: inline-block
}

img {
  max-width: 100%;
  vertical-align: top
}

video {
  width: 100%;
  height: auto
}

q::after,q::before {
  content: ''
}

legend,pre {
  display: block
}

pre {
  white-space: pre-wrap;
  -moz-tab-size: 2;
  tab-size: 2
}

legend {
  width: 100%
}

body,input,textarea,select {
  color: #1f3349;
  font-size: 0.857em;
  font-family: Microsoft YaHei;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
}

select, input[type=checkbox], input[type=radio] {
  cursor: pointer
}

input[type=checkbox] {
  height: 1.142em;
  width: 1.142em
}

.font-100 {
  font-size: 100%
}

.font12 {
  font-size: 0.857em
}

.font14 {
  font-size: 1em
}

.line-h100 {
  line-height: 100%
}

.txt-bold {
  font-weight: 700!important
}

.txt-light {
  font-weight: lighter!important
}

.txt-normal {
  font-weight: 400!important
}

.txt-em {
  font-style: italic!important
}

.txt-underline,.txt-underline-on-hover:hover {
  text-decoration: underline!important
}

.txt-nowrap {
  white-space: nowrap!important
}

.txt-break-word {
  word-break: break-all!important
}

.txt-truncate {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden
}

.align-l {
  text-align: left!important
}

.align-r {
  text-align: right!important
}

.align-center {
  text-align: center!important
}

.align-t {
  vertical-align: top!important
}

.align-b {
  vertical-align: bottom!important
}

.align-middle {
  vertical-align: middle!important
}

.table-fixed {
  table-layout: fixed
}

input:disabled {
  pointer-events: none
}

.border-box {
  box-sizing: border-box!important
}

.r2 {
  border-radius: 0.142em!important
}

.r5 {
  border-radius: 0.357em!important
}

.r8 {
  border-radius: 0.571em!important
}

.r-half {
  border-radius: 50%!important
}

.cursor-default {
  cursor: default!important
}

.cursor-pointer {
  cursor: pointer!important
}

.cursor-crosshair {
  cursor: crosshair!important
}

.cursor-move {
  cursor: move!important
}

.cursor-notallowed {
  cursor: not-allowed!important
}

.inline {
  display: inline!important
}

.block,.clearfix::after {
  display: block!important
}

.inline-block {
  display: inline-block!important
}

.fixed {
  position: fixed!important
}

.absolute {
  position: absolute!important
}

.relative {
  position: relative!important
}

.static {
  position: static!important
}

.top {
  top: 0!important
}

.right {
  right: 0!important
}

.left {
  left: 0!important
}

.bottom {
  bottom: 0!important
}

.z0 {
  z-index: 0!important
}

.z1 {
  z-index: 1!important
}

.z2 {
  z-index: 2!important
}

.z3 {
  z-index: 3!important
}

.z4 {
  z-index: 4!important
}

.z5 {
  z-index: 5!important
}

.mx-auto {
  margin-left: auto!important;
  margin-right: auto!important
}

.flex {
  display: -webkit-flex!important;
  display: flex!important
}

.flex-inline {
  display: -webkit-inline-flex!important;
  display: inline-flex!important
}

.flex-column {
  -webkit-flex-direction: column!important;
  flex-direction: column!important
}

.flex-column-reverse {
  -webkit-flex-direction: column-reverse!important;
  flex-direction: column-reverse!important
}

.flex-row {
  -webkit-flex-direction: row!important;
  flex-direction: row!important
}

.flex-row-reverse {
  -webkit-flex-direction: row-reverse!important;
  flex-direction: row-reverse!important
}

.flex-align-center {
  -webkit-align-items: center!important;
  align-items: center!important
}

.flex-align-start {
  -webkit-align-items: flex-start!important;
  align-items: flex-start!important
}

.flex-align-end {
  -webkit-align-items: flex-end!important;
  align-items: flex-end!important
}

.flex-justify-start {
  -webkit-justify-content: flex-start!important;
  justify-content: flex-start!important
}

.flex-justify-end {
  -webkit-justify-content: flex-end!important;
  justify-content: flex-end!important
}

.flex-justify-center {
  -webkit-justify-content: center!important;
  justify-content: center!important
}

.flex-wrap {
  -webkit-flex-wrap: wrap!important;
  flex-wrap: wrap!important
}

.flex-align-stretch {
  -webkit-align-items: stretch!important;
  align-items: stretch!important
}

.flex-justify-between {
  -webkit-justify-content: space-between!important;
  justify-content: space-between!important
}

.flex-justify-around {
  -webkit-justify-content: space-around!important;
  justify-content: space-around!important
}

.flex-child {
  display: block;
  max-width: 100%
}

.flex-grow {
  -webkit-flex-grow: 1!important;
  flex-grow: 1!important
}

.flex-no-shrink {
  -webkit-flex-shrink: 0!important;
  flex-shrink: 0!important
}

.float-none {
  float: none!important
}

.clearfix::after {
  content: ''!important;
  clear: both!important
}

.my0 {
  margin-top: 0!important;
  margin-bottom: 0!important
}

.my2 {
  margin-top: 0.142em!important;
  margin-bottom: 0.142em!important
}

.my4 {
  margin-top: 0.285em!important;
  margin-bottom: 0.285em!important
}

.my6 {
  margin-top: 0.428em!important;
  margin-bottom: 0.428em!important
}

.my8 {
  margin-top: 0.571em!important;
  margin-bottom: 0.571em!important
}

.mx0 {
  margin-left: 0!important;
  margin-right: 0!important
}

.mx2 {
  margin-left: 0.142em!important;
  margin-right: 0.142em!important
}

.mx4 {
  margin-left: 0.285em!important;
  margin-right: 0.285em!important
}

.mx6 {
  margin-left: 0.428em!important;
  margin-right: 0.428em!important
}

.mx8 {
  margin-left: 0.571em!important;
  margin-right: 0.571em!important
}

.mt-auto {
  margin-top: auto!important
}

.mt0 {
  margin-top: 0!important
}

.mt2 {
  margin-top: 0.142em!important
}

.mt4 {
  margin-top: 0.285em!important
}

.mt6 {
  margin-top: 0.428em!important
}

.mt8 {
  margin-top: 0.571em!important
}

.mr-auto {
  margin-right: auto!important
}

.mr0 {
  margin-right: 0!important
}

.mr2 {
  margin-right: 0.142em!important
}

.mr4 {
  margin-right: 0.285em!important
}

.mr6 {
  margin-right: 0.428em!important
}

.mr8 {
  margin-right: 0.571em!important
}

.mb-auto {
  margin-bottom: auto!important
}

.mb0 {
  margin-bottom: 0!important
}

.mb2 {
  margin-bottom: 0.142em!important
}

.mb4 {
  margin-bottom: 0.285em!important
}

.mb6 {
  margin-bottom: 0.428em!important
}

.mb8 {
  margin-bottom: 0.571em!important
}

.ml-auto {
  margin-left: auto!important
}

.ml0 {
  margin-left: 0!important
}

.ml2 {
  margin-left: 0.142em!important
}

.ml4 {
  margin-left: 0.285em!important
}

.ml6 {
  margin-left: 0.428em!important
}

.ml8 {
  margin-left: 0.571em!important
}

.mxy5 {
  margin: 0.357em!important
}

.mxy10 {
  margin: 0.714em!important
}

.py0 {
  padding-top: 0!important;
  padding-bottom: 0!important
}

.py2 {
  padding-top: 0.142em!important;
  padding-bottom: 0.142em!important
}

.py4 {
  padding-top: 0.285em!important;
  padding-bottom: 0.285em!important
}

.py6 {
  padding-top: 0.428em!important;
  padding-bottom: 0.428em!important
}

.py8 {
  padding-top: 0.571em!important;
  padding-bottom: 0.571em!important
}

.px0 {
  padding-left: 0!important;
  padding-right: 0!important
}

.px2 {
  padding-left: 0.142em!important;
  padding-right: 0.142em!important
}

.px4 {
  padding-left: 0.285em!important;
  padding-right: 0.285em!important
}

.px6 {
  padding-left: 0.428em!important;
  padding-right: 0.428em!important
}

.px8 {
  padding-left: 0.571em!important;
  padding-right: 0.571em!important
}

.pt0 {
  padding-top: 0!important
}

.pt2 {
  padding-top: 0.142em!important
}

.pt4 {
  padding-top: 0.285em!important
}

.pt6 {
  padding-top: 0.428em!important
}

.pt8 {
  padding-top: 0.571em!important
}

.pr0 {
  padding-right: 0!important
}

.pr2 {
  padding-right: 0.142em!important
}

.pr4 {
  padding-right: 0.285em!important
}

.pr6 {
  padding-right: 0.428em!important
}

.pr8 {
  padding-right: 0.571em!important
}

.pb0 {
  padding-bottom: 0!important
}

.pb2 {
  padding-bottom: 0.142em!important
}

.pb4 {
  padding-bottom: 0.285em!important
}

.pb6 {
  padding-bottom: 0.428em!important
}

.pb8 {
  padding-bottom: 0.571em!important
}

.pl0 {
  padding-left: 0!important
}

.pl2 {
  padding-left: 0.142em!important
}

.pl4 {
  padding-left: 0.285em!important
}

.pl6 {
  padding-left: 0.428em!important
}

.pl8 {
  padding-left: 0.571em!important
}

.pxy5 {
  padding: 0.357em!important
}

.pxy10 {
  padding: 0.714em!important
}

.w0 {
  width: 0!important
}

.w6 {
  width: 0.428em!important
}

.w12 {
  width: 0.857em!important
}

.w16 {
  width: 1.142em!important
}

.w24 {
  width: 1.714em!important
}

.w28 {
  width: 2em!important
}

.w32 {
  width: 2.285em!important
}

.w48 {
  width: 3.428em!important
}

.w64 {
  width: 4.571em!important
}

.w-full {
  width: 100%!important
}

.w-half {
  width: 50%!important
}

.w-fit {
  width: fit-content!important
}

.w-auto {
  width: auto!important
}

.wmax-full {
  max-width: 100%!important
}

.h0 {
  height: 0!important
}

.h6 {
  height: 0.428em!important
}

.h12 {
  height: 0.857em!important
}

.h16 {
  height: 1.142em!important
}

.h24 {
  height: 2em!important
}

.h28 {
  height: 2em!important
}

.h32 {
  height: 2.285em!important
}

.h48 {
  height: 3.428em!important
}

.h64 {
  height: 4.571em!important
}

.h-full {
  height: 100%!important
}

.h-half {
  height: 50%!important
}

.h-fit {
  height: fit-content!important
}

.h-auto {
  height: auto!important
}

.events-none {
  -webkit-touch-callout: none;
  pointer-events: none
}

.events-all {
  -webkit-touch-callout: default;
  pointer-events: all
}

.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

.selectable {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text
}

.transition {
  transition: all .125s
}

.transition-none {
  transition: auto
}

.scroll-always {
  overflow: scroll!important
}

.scroll-auto {
  overflow: auto!important;
  -webkit-overflow-scrolling: touch
}

.scroll-hidden {
  overflow: hidden!important
}

.bg-transparent {
  background-color: transparent!important
}

.bg-fff {
  background-color: #fff!important
}

.bg-f2f5f7 {
  background-color: #f2f5f7!important
}

.bg-blue {
  background-color: #467cd4!important
}

.bg-4446 {
  background-color: rgba(64, 64, 64, 0.6)
}

.bg-ccc {
  background-color: #cccccc
}

.opa6 {
  opacity: 0.6
}

.border-cdd {
  border: 1px solid #c1d1dc
}

.border-wt0 {
  border-top: 0!important
}

.border-wr0 {
  border-right: 0!important
}

.border-wb0 {
  border-bottom: 0!important
}

.border-wl0 {
  border-left: 0!important
}

.border-wx0 {
  border-left: 0!important;
  border-right: 0!important
}

.border-wy0 {
  border-top: 0!important;
  border-bottom: 0!important
}

.color-blue {
  color: #4264fb
}

.color-fff {
  color: #ffffff
}

.color-grey {
  color: #8593A7
}

.shadow-darken25 {
  box-shadow: 0 0 0.714em 0.142em rgba(31,51,73,.25)!important
}

.txt-deco-none {
  text-decoration: none!important
}

.hide-scroll-bar::-webkit-scrollbar {
  width: 0!important
}
.hide-scroll-bar {
  height: 0;
  scrollbar-width: none;
}
.thin-scroll-bar::-webkit-scrollbar {
  width: 0.428em;
  height: 0.428em;
  border-radius: 3px;
  background-color: #F8F8F8;
}
.thin-scroll-bar::-webkit-scrollbar-thumb {
  width: 0.428em;
  height: 0.428em;
  border-radius: 3px;
  background-color: #C3C3C350;
}

.firefox-compatible-for-scroll {
  height: 0
}

.highcharts-tooltip-box {
  stroke-width: 0!important
}
.fengxian_body
  float:left;
  width 44%;
  margin: 3% 3%;
  margin-top:0;
  height calc(94% - 60px)

</style>
