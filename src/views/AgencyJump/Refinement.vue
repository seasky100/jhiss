<template>
    <div class='r_content'>
      <div class='r_head'>
          <div class='c_title'>
              <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
              精细化管理
            </div>
      </div>
      <div class='r_center'>
    <div class='r_left'>
      <div class='r_menu'>
        <div class='menu_top'>
          <div class='t_left'>
              <img class="photo_img" src='../../utils/img/ren.png' />
          </div>
          <div class='t_right'>
            <div>张松</div>
            <div class='t_name'>机关纪委</div>
          </div>
        </div>
        <div class='menu_foot'>
          <div class="r_job">
            <div class='m_menu'>常用工作</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="r_job">
            <div class='m_menu' style="color: blue;">个人申请</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="r_job">
            <div class='m_menu'>部门管理</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="r_job">
            <div class='m_menu'>统计分析</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="r_job">
            <div class='m_menu'>系统设置</div>
            <div class='r_icon'>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='r_right'>
      <div class='r_top'>
        <img class="photo_img"  style="width: 99%;height:100%;" src="@/assets/images/banner.png" />
      </div>
      <div class='rc_content' ref="rc_content">
        <!-- <vue-drag-resize :w="200" :h="200"></vue-drag-resize> -->
        <!-- 左侧 -->
        <div class='rc_left'>
          <!-- 新增日志 -->
          <vue-drag-resize style="position:relative;top:0;left:0;" 
            :min-width="700" 
            :w="vw" :h="vh" 
            @resizing="onResize">
            <div class='rc_tap' :style="{width: + vw+ 'px',height:+vh+'px'}">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="日志考核" name="first">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 2}"
                    placeholder="发布一条日志"
                    v-model="textarea">
                  </el-input>
                  <div class='r_send'>发布</div>
                </el-tab-pane>
                <el-tab-pane label="审批审核" name="second">审批审核</el-tab-pane>
                <el-tab-pane label="会议记录" name="third">会议记录</el-tab-pane>
                <el-tab-pane label="党建工作" name="fourth">党建工作</el-tab-pane>
                <el-tab-pane label="谈心谈话" name="five">谈心谈话</el-tab-pane>
                <el-tab-pane label="上门家访" name="six">上门家访</el-tab-pane>
              </el-tabs>
              <el-button type="small" class='r_ask'>加班申请</el-button>
            </div>
          </vue-drag-resize>
          <!-- 日志内容 -->
          <div class='rc_tap' :style="{width: + vw+ 'px',height:+vh2+'px'}">
            <el-tabs v-model="activeName1" @tab-click="handleClick1">
              <template v-for="(item,index) of tabList">
                <el-tab-pane :key="index+'_tabs'" lazy :label="item.label" :name="index+'_tabs'">
                  <div v-if="recordsList.length == 0" class='r_log'>无数据</div>
                  <div v-else class='r_log'>
                    <div class='c_scont' v-for="(item2,index2) of recordsList" :key="index2+'_pane'">
                      <div class='c_top'>
                        <div>
                          <img style="margin-top: -9px;width: 48px;" src='../../utils/img/ren.png' />
                        </div>
                        <div class='ctitle'>
                          <span>{{item2.userName}}</span>
                          <span class="depName">{{item2.deptName}}</span>
                        </div>
                        <div class='e_date'>{{item2.noteDate2}}</div>
                      </div>
                      <div class='e_center e_center_content'>
                        <div>
                          <div v-if="item2.content != null" class='c_introduce'>{{item2.content}}</div>
                          <div v-else class='c_introduce'>无内容</div>
                        </div>
                      </div>
                      <!-- 未阅 -->
                      <div class='e_center' v-if="item2.comment == null || item2.comment == ''">
                        <div style="margin-left:30px;">
                          <el-input style="border: 1px solid #ccc;border-radius:5px;width: 98% !important;"
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="item2.comment2">
                          </el-input>
                          <el-button type="small" class='r_ask2' @click="updateWorkNoteClick(item2)">批阅</el-button>
                        </div>
                      </div>
                      <!-- 已阅 -->
                      <div class='e_center' v-else>
                        <div>
                          <div class='c_introduce'>
                            <span style="display:block;">审阅日期：{{item2.remarkTime}}</span>
                            {{item2.comment}} 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </template>
            </el-tabs>
            <el-button type="small" class='r_ask'>批量操作</el-button>
          </div>
        </div>
        <!-- 右侧 -->
        <div class='rc_right'>
          <div class='r_date'>
            <div class='' style="height: 15%;">
              <div style="margin-top: 15px;margin-left: 15px;font-weight: 600;">工作日历</div>
            </div>
            <div class='p_hevaluate' style="float : left; height: 245px;">
              <el-calendar v-model="value"></el-calendar>
            </div>
        <div>
          <div style="display: flex;text-align: center;margin: 0 10px;">
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" style="width: 20px;height: 25px;" src="@/assets/images/menu/daiban.png" />
              <div class='r_list'>代办(1)</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" style="width: 20px;height: 25px;" src="@/assets/images/menu/rizhi.png" />
              <div class='r_list'>日志(1)</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" style="width: 20px;height: 25px;" src="@/assets/images/menu/jixiao.png" />
              <div class='r_list'>绩效(1)</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" style="width: 20px;height: 25px;" src="@/assets/images/menu/shenpi.png" />
              <div class='r_list'>审批(1)</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" style="width: 20px;height: 25px;" src="@/assets/images/menu/huiyi.png" />
              <div class='r_list'>会议(1)</div>
            </div>
          </div>
        </div>
          </div>
          <div class='r_attendance'>
            <div class='' style="height: 15%;">
              <div style="margin-top: 15px;margin-left: 10px;font-weight: 600;padding-top: 10px;">个人考勤情况</div>
            </div>
            <div style="display: flex;margin:0 15px; margin-top: 20px;text-align: center;">
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" src="@/assets/images/menu/jiaban.png" />
              <div class='k_list'>加班申请</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" src="@/assets/images/menu/qingjia.png" />
              <div class='k_list'>请假申请</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img" src="@/assets/images/menu/buqian.png" />
              <div class='k_list'>考勤补签</div>
            </div>
            <div style="width:25%;cursor: pointer;">
              <img class="photo_img"  src="@/assets/images/menu/changyong.png" />
              <div class='k_list'>常用功能</div>
            </div>
          </div>
          </div>
          <div class='overtime'>
            <div class='c_type'>
              <div class='' style="height: 15%;">
                <div style="margin-top: 15px;margin-left: 15px;font-weight: 600;padding-top: 10px;">个人加班情况</div>
              </div>
              <div style='height: 80%;width: 100%'>
                <div id='hline' class='hline'></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import VueDragResize from 'vue-drag-resize' //缩放、拖拽
import elementResizeDetectorMaker from 'element-resize-detector'
import { format } from 'date-fns';
import { findWorknotePage, updateWorkNote, noteAduit, countWorkNote } from '@/api/report.js';
export default {
  name: 'Refinement',
  components: {
    VueDragResize
  },
  props: {
    navMenus: {}
  },
  data() {
    return {
      value: new Date(),
      textarea2: '',
      searchData: [
        {deptId: this.$store.state.user.orgId},
        {userId: this.$store.state.user.userInfo.info},
        {},
        {audited: '2'},
      ],
      tabList: [
        {label: '部门日志', name: '', data: [{name:''}]},
        {label: '我的', name: '', data: []},
        {label: '所有民警', name: '', data: []},
        {label: '待批阅', name: '', data: [{name:''}]},
        // {label: '直接下属', name: '', data: [{name:''}]},
        // {label: '领导互评', name: '', data: [{name:''}]},
      ],
      recordsList: [],
      textarea: '',
      activeName: 'first',
      activeName1: '0_tabs',
      nyear:'',
      nmonth:'',
      ndate:'',
      rData:[],
      scores: [
        6, 6, 7, 6, 8, 7, 8, 8, 8, 8,
        8, 7, 6, 7, 7, 7, 7, 8, 9, 7,
        7, 6, 7, 7, 6, 6, 6, 7, 7, 8
      ],
      ydata:{
        year:'',
        month:'',
        date: '',
      },     
      vw: 200,
      vh: 200,
      vh2: 200,
      top: 0,
      left:0 
    }
  },
  mounted() {
    this.listenCon()
    this.getRadar2()
    this.init()
    this.query()
  },
  methods: {
    listenCon(){
      const _this = this
      this.vw = this.$refs.rc_content.offsetWidth*0.7 - 20
      this.vh2 = this.$refs.rc_content.offsetHeight - _this.vh - 20
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.rc_content,(element)=>{
        _this.$nextTick(()=>{
          _this.vw = element.offsetWidth*0.7 - 20
          _this.vh2 = this.$refs.rc_content.offsetHeight - _this.vh - 50
          let dom = $('.r_content .el-tabs__content')
          dom[0].style.height = (this.vh - 50) + 'px'
          dom[1].style.height = (this.vh2 - 50) + 'px'
        })
      })
    },
    onResize(newRect) {
      this.vw = this.$refs.rc_content.offsetWidth*0.7 - 20
      this.vh = newRect.height;
      this.vh2 = this.$refs.rc_content.offsetHeight - this.vh - 50
      let dom = $('.r_content .el-tabs__content')
      dom[0].style.height = (this.vh - 50) + 'px'
      dom[1].style.height = (this.vh2 - 50) + 'px'
      this.x = 0;
      this.y = 0;
    },
    onResize2(newRect){
      this.vw = this.$refs.rc_content.offsetWidth*0.7 - 20
      this.vh2 = newRect.height;
      this.vh = this.$refs.rc_content.offsetHeight - this.vh2 - 50
      let dom = $('.r_content .el-tabs__content')
      dom[0].style.height = (this.vh - 50) + 'px'
      dom[1].style.height = (this.vh2 - 50) + 'px'
      this.x = 0;
      this.y = 0;
    },
    init(){
      this.rData = this.getMonthDays(this.ydata.year, this.ydata.month).reduce(((prev, item, index) =>
        index % 7
        ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
        : [...prev, [item]]
      ), [])
    },   
    updateWorkNoteClick(data){
      const _this = this
      updateWorkNote(
        Object.assign(
          {
            id: data.id,
            comment: `审阅人：${this.$store.state.user.realName}    审阅内容：${data.comment2}`,
            remarkTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            userModified: this.$store.state.user.userInfo.info,
            leaderId: this.$store.state.user.userInfo.info,
          }
        )
      ).then(res => {
        if(res.success){
          data.comment = res.data.comment
          data.remarkTime = res.data.remarkTime
        }
      })
    },              
    getMonthDays(year, month) {
      const firstDayOfMonth = this.$dayjs(new Date(year, month, 1));
      const from = firstDayOfMonth.subtract(firstDayOfMonth.day(), 'day');
      const lastDayOfMonth = firstDayOfMonth.add(1, 'month').subtract(1, 'day');
      const to = lastDayOfMonth.add(6 - lastDayOfMonth.day(), 'day');
      return new Array(firstDayOfMonth.daysInMonth() + firstDayOfMonth.day() + 6 - lastDayOfMonth.day()).fill(0).map((item, index) =>
        from.add(index, 'day')
      );
    },
    // 查询列表
    query(nCurrent = 1,index = 0) {
      const _this = this;
      findWorknotePage(
        Object.assign(
          {
            nCurrent: nCurrent,
            nSize: 20,
            // staffed: this.userIds,
            orderByField: 'noteDate',
            orderFlag: false,
            // userId: JSON.parse(sessionStorage.userInfo).id
          },_this.searchData[index])).then(res => {
            // console.log(res.data.records)
            _this.recordsList = res.data.records.map(obj => {
              obj.remarkTime2 = format(new Date(obj.remarkTime), 'yyyy-MM-dd HH:mm:ss')
              obj.noteDate2 = format(new Date(obj.noteDate), 'yyyy-MM-dd')
              return obj
            })
      })
    },
    prevMonth() {
      const d = this.$dayjs(new Date(this.ydata.year, this.ydata.month, this.ydata.date)).subtract(1, 'month');
      this.rData = []
      this.ydata.year = d.year()
      this.ydata.month = d.month()
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(((prev, item, index) =>
        index % 7
          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
          : [...prev, [item]]
      ), [])
      // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);

    },
    nextMonth(){
      const d = this.$dayjs(new Date(this.ydata.year, this.ydata.month, this.ydata.date)).add(1, 'month');
      this.rData = []
      this.ydata.year = d.year()
      this.ydata.month = d.month()
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(((prev, item, index) =>
        index % 7
          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
          : [...prev, [item]]
      ), [])
      // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);
    },
    backToday(){
      const d = this.$dayjs(new Date());
      this.rData = []
        this.ydata.year = d.year()
        this.ydata.month = d.month()
        this.rData = this.getMonthDays(d.year(), d.month()).reduce(((prev, item, index) =>
          index % 7
            ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
            : [...prev, [item]]
        ), [])
        // this.commitQuery(d.year(), d.month(), this.props.userInfo.userInfo.info);
    },
    // 是否已评分
    isMarked (item){
      item && '012345678910'.includes(item.noteScore)
    },
    scoreItemOf (d){ 
      this.scores.find(item =>
      new Date(item.noteDate).getDate() === d.date()
      )
    },
    scoreOf (d){
      (this.scoreItemOf(d) || {}).noteScore
    },
    colorOf (score)  {
      if(score >= 9){
        '#73CD6C'
      }
      if(score >= 7){
        '#235FF6'
      }else {
        if('0123456'.includes(score)){
          '#DB0F2C'
        }
        
      }
    },
    titleOf (d)  {
      const scoreItem = this.scores.find(item =>
        new Date(item.noteDate).getDate() === d.date()
      );
      if(scoreItem && '012345678910'.includes(scoreItem.noteScore)){
        return d.format('YYYY/MM/DD') + ' 已评分' + scoreItem.noteScore;
      }else{
        return d.format('YYYY/MM/DD') + ' 未评分';
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClick1(tab, event) {
      // console.log(tab.index)
      this.query(1, tab.index)
    },
    getRadar2() {
    var colors = ['#5793f3', '#d14a61', '#675bba'];

    let radarDom2 = this.$echarts.init(document.getElementById('hline'))
    let option = {
      color: colors,

      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      //   legend: {
      // 	  data: ['2016 降水量']
      //   },
      grid: {
        left: '2%',
        right: '4%',
        top: '3%',
        bottom: '44%',
        // containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
        lineStyle: {
          color: 'gray',
          type: 'dashed'
        },
      },
          axisPointer: {
            label: {
              formatter: function (params) {
                return '占比' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['01', '02', '03', '04', '05', '06', '07',]
        },
      ],
      yAxis: [
        {
          show:false,
          type: 'value'
        }
      ],
      series: [
        {
          name: '2016 降水量',
          type: 'line',
          smooth: true,
          data: [31.9, 52.9, 111.1, 118.7, 48.3, 69.2, 231.6, 46.6]
        }
      ]
    }
    radarDom2.setOption(option)
    //多图表自适应
          //折线图宽高自适应
    window.onresize = function () {
      radarDom2.resize();
    }
  }
  }
};
</script>
  <style lang="stylus" scoped>
    @import url('../css/commom.css');
  .r_content{
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* display: flex; */
  }
  .r_content >>> .el-calendar-table .el-calendar-day{
    text-align: center;
  }
  .r_content >>> .el-calendar__header{
    margin-bottom:5px;
  }
  .r_content >>> .el-tabs__content{
    overflow: auto;
  }
  .r_list{
    font-size: 12px;
  }
  .r_left{
    width: 15%;
  }
  .r_right{
    width: 90%;
    height: 100%;
  }
  .r_top{
    height: 10%;
    margin-bottom: 5px;
  }
  .rc_content{
    height: calc(90% - 20px);
    display: flex;
    margin-top:10px;
  }
  .rc_left{
    width: 70%;
    /* display: flex; */
  }
  .rc_right{
    width: 30%;
  }
  .r_head{
    height: 5%;
    width: 100%;
  }
  .r_center{
    height: 95%;
    display: flex;
    width: 95%;
  }
  .c_title{
      float: left;
      width: 100%;
      margin-bottom: 0;
      font-size: 15px;
      font-weight: bold;
      line-height: 30px;
      padding-left: 10px;
      background-color: white;
      padding-top: 6px;
    }
    .r_menu{
      height: 38%;
      background-color: #fff;
      width: 88%;
      float: right;
      margin-right: 10px;
    }
    .menu_top{
      display: flex;
      height: 20%;
      padding-left: 10px;
    }
    .t_left{
      width: 28%;
      margin: 8px;
    }
    .t_right{
      line-height: 20px;
      margin-top: 10px;
    }
    .t_name{
      color: #235FF6;
    }
    .m_menu{
      cursor: pointer;
      line-height: 25px;
      margin-left: 20px;
      margin-top: 10px;
      width: 80%;
    }
    .rc_tap{
      position:relative;
      height: auto;
      background-color: #fff;
      padding: 10px;
      width: calc(100% - 20px);
      margin-bottom: 10px;
      float: left;
    }
    .r_send{
      margin-right: 30px;
      float: right;
      cursor: pointer;
      width: 63px;
      height: 28px;
      /* background-color: #faebd7; */
      text-align: center;
      /* margin: 0 auto; */
      border: 1px solid #EEEEEE;
      margin-top: 15px;
    }
    .r_ask{
      position: absolute;
      top: 15px;
      right: 15px;
    }
    .r_ask2{
      float: right;
      position: relative;
      margin-top: -47px;
      margin-right: 30px;
    }
    .c_top{
      height: 10%;
      padding-top: 22px;
      padding-left: 15px;
      display: flex;
    }
    .ctitle{
      width: 74%;
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(51,51,51,1);
    }
    .e_date{
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(141,154,173,1);
    }
    .e_learn{
      display: flex;
      padding-top: 10px;
    }
    .c_cetitle{
      width: 30%;
      padding-left: 24px;
      /* color: #ff0e02; */
      margin-top: 20px;
      font-size: 14px;
      font-weight: bolder;
    }
    .c_introduce{
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #515a6e;
      margin-top: 5px;
      margin-right: 10px;
      margin-left: 28px;
      text-indent: 0px;
      line-height: 22px;
      letter-spacing: 1px;
    }
    .e_foot{
      display: flex;
      padding-top: 10px;
    }
    .c_scont{
      background-color: white;
    }
    .r_date{
      height: 43%;
      /* margin: 10px; */
      margin-left: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      margin-right: 10px;
      display: grid;
    }
    .r_attendance{
      height: 22%;
      margin: 10px;
      background-color: #fff;
    }
    .overtime{
      height: 27%;
      margin: 10px;
      background-color: #fff;
    }
    .r_log{
      /* overflow: scroll; 
      overflow: auto; */
    }
    .c_type{
      width: 100%;
      height: 100%;
    }
    .hline{
      width: 100%;
      height: 100%;
    }
    .k_list{
      margin-top: 10px;
    }
    .r_job{
      width: 100%;
      display: flex;
      margin-bottom: 7px;
    }
    .r_icon{
      width: 15%;
      line-height: 25px;
      margin-left: 20px;
      margin-top: 10px;
  }
  .menu_foot{
    margin-top: 16px;
  }
  .p_hevaluate{
    float: left;
    height: 90%;
    margin-left: 1em;
    margin-right:2em;
  }
  .depName {
    display: block;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
  }
  .e_center{
    margin:10px;
  }
  .e_center_content{
    padding-bottom:10px;
    border-bottom:1px solid #ccc;
  }
  .e_center >>> .el-textarea__inner{
    margin:0;
    padding: 7px 90px 0px 8px;
  }
  </style> 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <!-- <template>
    <div class='person_home'>
      <iframe style="height: 100%;width: 100%;" :src="src" ></iframe>
    </div>
  </template>
  <script>
  export default {
    name: "PersonalHome",
    data() {
      return {
        src: '',
        userInfo:'',
        cardNum:''
      }
    },
    mounted() {
      this.userInfo = JSON.parse(sessionStorage.userInfo)
      this.cardNum = this.userInfo.cardNum
      this.src = `http://10.121.252.53:1001/login.aspx?cardId=${this.cardNum}`
      //  http://10.121.252.53:1001/login.aspx?cardId=${cardId}` //精细化
  
    },
    methods: {
    }
  }
  </script>
  <style lang="stylus" scoped>
  .person_home{
    height: 100%;
    width: 100%;
  }
  .police_career{
    height: 170px;
    background:#fff;
  }
  .person_title{
    border-left:3px solid red;
    padding-left: 5px;
    margin-left:8px
  }
  </style> -->
  