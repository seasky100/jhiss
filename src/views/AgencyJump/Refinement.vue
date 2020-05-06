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
        <img class="photo_img"  style="width: 99%;" src="@/assets/images/jxbj.png" />
      </div>
      <div class='rc_content'>
        <div class='rc_left'>
          <div class='rc_tap'>
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
          <div class='rc_tap'>
            <el-tabs v-model="activeName1" @tab-click="handleClick1">
              <el-tab-pane label="中层日志" name="1">
                <div class='r_log'>
                        <div class='c_scont' v-for="(item,index) of 3" :key="index">
                          <div class='c_top'>
                            <div>
                              <img style="margin-top: -9px;width: 48px;" src='../../utils/img/ren.png' />
                            </div>
                            <div class='ctitle'>张松</div>
                            <div class='e_date'>4天前</div>
                          </div>
                          <div class='e_center'>
                            <div>
                              <!-- <div class='c_cetitle'>最新回答</div> -->
                              <div class='c_introduce'>简短的课程介绍d收到了PDF开始了送皮肤靠就是双方都十分哦公对公PDF给
                                口热裤公平热狗恐怕热施工方将数据发送到上空的飞机喀什四道口附近上空房价多少斯克附近的上课JFK但是简短的课程介绍d收到了PDF开始了送皮肤靠就是双方都十分哦公对公PDF给
                                口热裤公平热狗恐怕热施工方将数据发送到上空的飞机喀什四道口附近上空房价多少斯克附近的上课JFK但是简短的课程介绍d收到了PDF开始了送皮肤靠就是双方都十分哦公对公PDF给
                                口热裤公平热狗恐怕热施工方将数据发送到上空的飞机喀什四道口附近上空房价多少斯克附近的上课JFK但是</div>
                            </div>
                          </div>
                        </div>
                      </div>
                <!-- <el-input
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 2}"
                  placeholder="发布一条日志"
                  v-model="textarea1">
                </el-input>
                <div class='r_send'>发布</div> -->
              </el-tab-pane>
              <!-- <el-tab-pane label="中层日志" name="second">中层日志</el-tab-pane> -->
              <el-tab-pane label="我的" name="2">我的</el-tab-pane>
              <el-tab-pane label="所有民警" name="3">所有民警</el-tab-pane>
              <el-tab-pane label="带批阅（10）" name="4">带批阅（10）</el-tab-pane>
              <el-tab-pane label="直接下属" name="5">直接下属</el-tab-pane>
              <el-tab-pane label="领导互评" name="6">领导互评</el-tab-pane>
            </el-tabs>
            <el-button type="small" class='r_ask'>批量操作</el-button>
          </div>
        </div>
        <div class='rc_right'>
          <div class='r_date'>
            <div class='' style="height: 15%;">
              <div style="margin-top: 15px;margin-left: 15px;font-weight: 600;">工作日历</div>
            </div>
            <div class='p_hevaluate' style="float : left; height: 56%;">
          <div class='flex flex-justify-between' style="padding: 9px 0.5em">
            <div class='flex flex-align-center'>
              <button class='r-half' style="width: 2.2em; height: 2.2em; background: #8593A7 url(../../utils/img/home_calendar_arrow_left.svg) no-repeat center/70%"
                @click="prevMonth" title='上一月'></button>
              <span class='font14 txt-bold mx4' >{{monthMap[ydata.month+1]}}</span>
              <button class='r-half' style="width: 2.2em; height: 2.2em; background: #8593A7 url(/../../utils/img/home_calendar_arrow_right.svg) no-repeat center/70%"
              @click="nextMonth" title='下一月'></button>
            </div>
            <button class='flex flex-align-center' @click="backToday">
              <img src='../../utils/img/home_calendar_back_today@2x.png' style="height: 1.2em" />
              <span class='pl4' style="color: #235FF6" :title="'今天是'+ nyear+'年' + nmonth+'月'+ ndate+'日'" >回到今天</span>
            </button>
          </div>
          <div class='flex flex-align-center flex-justify-between' style="margin-top: 0.5em">
            <div v-for="(item,index) in weekMap" :key="index">                            
              <div :key="index" class='flex-inline flex-grow flex-align-center flex-justify-center'
                style="flex-basis: 14.28%">{{item.name}}</div>
            </div>
          </div>
          <div class='flex flex-align-center flex-column mt8'>
              <div style="width: 100%;" v-for="(weekItem,index) in rData" :key="index">
                <div :key="index" class='w-full flex flex-align-center flex-justify-between py4'>
                  <div  v-for="(dayItem,index1) in weekItem" :key="index1">
                    <div v-if='dayItem.month() == ydata.month && isMarked(scoreItemOf(dayItem)) '>
                      <router-link  :key="index" to='/HierEvaluation'  class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="flex-basis: 14.28%; color: #121518" :title="titleOf(dayItem)" >
                       
                           <div class='flex flex-align-center flex-justify-center w16 h16 r-half' style=" background: #235FF5; border: 2px solid #235FF520; color: #121518;  ">
                            {{dayItem.date()}}
                          </div>
                          <div class='r-half' style="width: 4px; height: 4px; background: colorOf(scoreOf(dayItem))"></div>
                        </router-link>
                    </div>
                    <div v-else>
                      <div :key="index1" class='flex-inline flex-column flex-grow flex-align-center'>
                        <span style="color: #8593A7">{{dayItem.date()}}</span>
                        <div class='r-half bg-transparent' style="width: '4px'; height: 4px" >
                      </div>
                    </div>
                    </div>
                  <!-- {
                    weekItem.map((dayItem, index) =>
                      dayItem.month() === this.state.month && this.isMarked(this.scoreItemOf(dayItem))
                      ? <Link key={index} to={location => ({pathname: '/home/log', state: this.scoreItemOf(dayItem)})} 
                          class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none'
                          style={{flexBasis: '14.28%', color: '#121518'}} title={this.titleOf(dayItem)}
                       
                           <div class='flex flex-align-center flex-justify-center w16 h16 r-half' 
                            style={dayItem.date() === this.today.date() ? {background: '#235FF5', border: '2px solid #235FF520', color: '#121518'} : {}}>
                            {dayItem.date()}
                          </div>
                          <div class='r-half' style={{width: '4px', height: '4px', background: this.colorOf(this.scoreOf(dayItem))}} />
                        </Link>
                      :  -->
              
                    </div>
                  </div>
                    <!-- )
                  } -->
          </div>
          </div>
          <!-- <ele-calendar 
            defaultValue="2019-05" 
            @date-change="change"
            @pick="pick"
            :render-content="renderContent" 
            :data="datedef"
            :prop="prop">
          </ele-calendar> -->
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
            <div style="display: flex; margin-top: 20px;text-align: center;">
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
    export default {
      name: 'Refinement',
      props: {
        navMenus: {}
      },
      data() {
        return {
          textarea: '',
          activeName: 'first',
          activeName1: '1',
          nyear:'',
          nmonth:'',
          ndate:'',
          rData:[],
          weekMap : [
          { name:'日',num:'1'},
            { name:'一',num:'1'},
            { name:'二',num:'1'},
            { name:'三',num:'1'},
            { name:'四',num:'1'},
            { name:'五',num:'1'},
            { name:'六',num:'1'}
      ], 
      monthMap : {
      1: '一月',
      2: '二月',
      3: '三月',
      4: '四月',
      5: '五月',
      6: '六月',
      7: '七月',
      8: '八月',
      9: '九月',
      10: '十月',
      11: '十一月',
      12: '十二月'
    },
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
      }
      },
      mounted() {
        this.getRadar2()
        this.init()
      },
      methods: {
        init(){
        this.rData = this.getMonthDays(this.ydata.year, this.ydata.month).reduce(((prev, item, index) =>
                          index % 7
                          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
                          : [...prev, [item]]
                        ), [])
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
          console.log(tab, event);
        },
        handleClick1(tab, event) {
          console.log(tab, event);
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
  .r_content >>> .el-tabs__content{
    max-height: 535px;
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
    height: calc(90% - 10px);
    display: flex;
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
      text-indent: 24px;
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
      width: 70%;
      margin-left: 3em;
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
  