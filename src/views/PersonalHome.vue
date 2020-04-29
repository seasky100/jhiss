<template>
  <div class='person_home'>
    <div class='person_body'>
      <div class='person_head police_career'>
        <div class="person_title p_clear">
          <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
          从警生涯
        </div>
        <!-- <div >aa</div> -->
        <div @mousedown="changeScroll('left')" @mouseup="stopScroll" class='p_nvleft'>
          <img style="width:30px;margin-left: 10px;" src="@/assets/images/bg/dir_left.png" />
        </div>
        <div class='person_career' ref='career_list'>   
        <div class='p_career' v-for="(item,index) in careerData" :key="index" >
        <div v-for="(item1,index1) in item.marks" :key="index1"  @click="agency(item1,index1)" >     
        <div class='p_card' >
          <div v-if='item1.career_type == "1" && item1.career_desc == "优秀"'>
            <el-divider content-position="left"><img v-if='!showSearch' src='../utils/img/num2.png' /> <img v-if='showSearch' src='../utils/img/num2-gray.png' /> </el-divider>
            <div class='p_year'>{{item1.happen_time}}</div>
            <div class='p_name'>{{item1.career_title}}<span style="color: rgb(15, 170, 22);font-weight: bolder;margin-left: 5px;">优秀</span></div>
          </div>
          <div v-else-if='item1.career_type == "2"'>
            <el-divider content-position="left"><img v-if='!showSearch' src='../utils/img/num1.png' /> <img v-if='showSearch' src='../utils/img/num1-gray.png' /> </el-divider>
            <div class='p_year'>{{item1.happen_time}}</div>
            <div class='p_name'>{{item1.career_title}}</div>
          </div> 
          <div v-else-if='item1.career_type == "3"'>
            <el-divider content-position="left"><img v-if='!showSearch' src='../utils/img/num3.png' />  <img v-if='showSearch' src='../utils/img/num3-gray.png' /> </el-divider>
            <div class='p_year'>{{item1.happen_time}}</div>
            <div class='p_name'>{{item1.career_title}}</div>
          </div>
          <div v-else-if='item1.career_type == "4"'>
            <el-divider content-position="left"><img v-if='!showSearch' src='../utils/img/num4.png' /><img v-if='showSearch' src='../utils/img/num4-gray.png' /> </el-divider>
            <div class='p_year'>{{item1.happen_time}}</div>
            <div class='p_name'>{{item1.career_title}}</div>
          </div>
          <div v-else-if='item1.career_type == "履历"'>
            <el-divider content-position="left"><img v-if='!showSearch' src='../utils/img/num4.png' /><img v-if='showSearch' src='../utils/img/num4-gray.png' /> </el-divider>
            <div class='p_year'>{{item1.happen_time}}</div>
            <div class='p_name'>{{item1.career_title}}</div>
          </div>
        </div>
      </div>
        <div class='p_node'>
          <el-divider content-position="left"><div style=" margin-left: -9px; color: blue;">{{item.endtime}}</div><img src='../utils/img/stage.png' /> </el-divider>
        </div>
      </div>
        </div>
        <div @mousedown="changeScroll('right')" @mouseup="stopScroll" class='p_nvright'>
          <img style="width:30px;margin-left: 10px;" src="@/assets/images/bg/dir_right.png" />
        </div>
      </div>
      <el-row class='content' :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="7" :xl="7">
          <div class='person_left'>
              <div class="person_title">
                  <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                  风险提醒
                </div>
                <div class="fengxian_body radar" id="radar"></div>
                <div class='p_warn'>
                  <div class='ptop'>
                    <div class='pli' v-for="(item,index) in warnList" @click='warncon' :key="index">
                      <div v-if='item.num == 0'>
                          <div class='h32 warn'><span class='wnum'>{{item.num}}</span></div>
                      </div>
                      <div v-else>
                          <div class='h32 warn'><span class='wnum'>{{item.num}}</span></div>
                      </div>
                      <div class='h32 warn'><span class='pname'>{{item.name}}</span></div>
                    </div>  
                  </div>
                  <div class='pfoot'>
                    <div v-if='countotal>=1'>
                        <div class='pft'><img style='margin-right: 10px;height: 19px;' src='../utils/img/cry.png' />当前<span class='ptotal' >{{countotal}}</span>项风险内容，请谨慎！！！</div>
                    </div>
                    <div v-else>
                        <div class='pft'><img style='margin-right: 10px;height: 19px;' src='../utils/img/smile.png' />当前<span class='ntotal' >{{countotal}}</span>项风险内容，请保持！！！</div>
                    </div>
                    
                  </div>
                </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="10" :xl="10">
          <div class='person_center'>
            <div class='p_top'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                    考勤情况
                  </div>
                <div id='kao' class='p_attendance'></div>
            </div>
            <div class='p_foot'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                    层级评价
                  </div>
                  <div class='p_evaluate' style="float : left; height: 85%; margin-left: 2.5em;width: 50%;border-right: 1px solid rgb(228, 233, 243);">
                    <div id='gauge'  class='p_gauge' ></div>
                  </div>
                  <div class='p_eright'>
                    <div style="height:15%;" @click='pchange'>切换</div>
                    <div v-show='change' >
                    <div style="height:16%;display:flex">
                      <div style="width: 25%">正面评价清单</div>
                      <el-progress style="width: 70%" :color="customColor1"  :stroke-width="15" :percentage="70">正面评价清单</el-progress>
                    </div>
                    <div style="height:16%;display:flex">
                      <div style="width: 25%">绩效评价清单</div>
                      <el-progress style="width: 70%" :color="customColor2" :stroke-width="15" :percentage="90" ></el-progress>
                    </div>
                    <div style="height:16%;display:flex">
                      <div style="width: 25%">负面评价清单</div>
                      <el-progress style="width: 70%" :color="customColor3" :stroke-width="15" :percentage="80" ></el-progress>
                    </div>
                    <div style="height:16%;display:flex">
                      <div style="width: 25%">层级评价清单</div>
                      <el-progress style="width: 70%" :color="customColor4" :stroke-width="15" :percentage="70" ></el-progress>
                    </div> 
                  </div>  
                  <div v-show='!change' style="height: 80%; width: 100%; ">
                    <svg ref="element" width="150" height="150" font-family="sans-serif" font-size="14" text-anchor="middle"></svg>
                  </div>     
                </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="7" :xl="7">
          <div class='person_right'>
            <div class='p_top'>
              <div class="person_title">
                <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                <span class='pl8 txt-bold' style="">待办事项</span>         
              <div class='flex flex-align-center flex-justify-center flex-grow' style="margin-top: 1em;">
                <div @click='xztxt' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">协作提效</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.4em; height: 5.4em; margin: 0.5em 0; background: #E8EFFF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4em; height: 4em; background: #235FF6"> 
                      <Link class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: 4em; height: 4em; background: #235FF6" title='待办箱'>
                        <span style="font-size: 1.5em">{{xztxNum}}</span>
                      </Link>
                    </div>
                  </div> 
                  <span style="color: #8092A8; font-size: 14px; font-weight: 400">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='jxh' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">队伍精细化</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.4em; height: 5.4em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4em; height: 4em; background: #8674f6">
                      <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4em'; height: 4em; background: #8674f6" title='待办箱'>
                        <span style="font-size: 1.5em">1</span>
                      </Link>
                    </div>
                  </div>
                  <span style="color: #8092A8; font-size: 14px; font-weight: 400">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='cjgx' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">层级关系</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.4em; height: 5.4em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4em; height: 4em; background: #F09B38">
                      <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4em'; height: 4em; background: #F09B38" title='待办箱'>
                        <span style="font-size: 1.5em">{{cjnum}}</span>
                      </Link>
                    </div>
                  </div>
                  <span style="color: #8092A8; font-size: 14px; font-weight: 400">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>               
            </div>
          </div>
        </div>
            <div class='p_foot'>
              <div class="person_title">
                <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                快速入口
              </div>
              <div class='flex flex-grow w-full h-full' style="margin-top: 0.2em;margin-left: 2em;">
                <div class='flex flex-column flex-grow' style="padding: 0.5em">
                  <div class='flex flex-grow w-full'>
                    <router-link to='/HierEvaluation' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                       <img style=" width: 26px; height: 26px;" class='cursor-pointer'  src='../utils/img/home_entrance_work_log@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                      <span class='cursor-pointer p_inter'>层级评价</span>
                    </router-link>
                    <router-link to='/talks' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_overtime_request@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                     <span class='cursor-pointer p_inter'>谈心谈话</span>
                   </router-link>
                    <router-link to='/organizationRequest' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 1px">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_receipt_notification@2x.png' /><!--src='/images/home_entrance_receipt_notification@2x.png'  --> 
                      <span class='cursor-pointer p_inter'>事项申报</span>
                    </router-link>            
                  </div>
                  <div class='flex flex-grow w-full'>                    
                    <router-link to='/IndividualReport' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 0">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_items_report@2x.png' /><!--src='/images/home_entrance_document_flow@2x.png' --> 
                      <span class='cursor-pointer p_inter'>事项即报</span>
                    </router-link>
                    <router-link to='/DocumentLiu' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_document_flow@2x.png' /><!-- src='/images/home_entrance_approval_items@2x.png'--> 
                      <span class='cursor-pointer p_inter'>公文流转</span>
                    </router-link>
                    <router-link to='/ApprovalMatters' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer' src='../utils/img/home_entrance_approval_items@2x.png' /><!--src='/images/home_entrance_travel_application@2x.png' --> 
                      <span class='cursor-pointer p_inter'>审批事项</span>
                    </router-link>         
                  </div>
                  <div class='flex flex-grow w-full'>
                    <router-link to='/TravelApplication' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 0">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_travel_application@2x.png' /><!--src='/images/home_entrance_document_flow@2x.png' --> 
                      <span class='cursor-pointer p_inter'>差旅申请</span>
                    </router-link>
                    <router-link to='/TravelApplication' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_expense_request@2x.png' /><!-- src='/images/home_entrance_approval_items@2x.png'--> 
                      <span class='cursor-pointer p_inter'>用车申请</span>
                    </router-link>
                    <router-link to='/Caution' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../utils/img/home_entrance_travel_application@2x.png' /><!--src='/images/home_entrance_travel_application@2x.png' --> 
                      <span class='cursor-pointer p_inter'>警示教育</span>
                    </router-link>        
                  </div>
              </div>
            </div>  
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { allWarnByType,indexRecordDeatil,sectorAverageStatistics,indexRecordCountDeatil,indexCalendar } from '@/api/warn.js';
  import { getPoliceCareer,getUserListByUserId } from '@/api/user-server.js';
  import { findWorknotePage,countWorkNote } from '@/api/report.js';
  // import { subDays,format } from 'date-fns';
  import { mapGetters } from 'vuex';
export default {
  name: "PersonalHome",
  computed: {
  ...mapGetters([
    'userId',
    // 'userInfo',
    'orgId',
    'token'
  ])
},
  data() {
    return {
      id: this.$store.state.user.userId,
      showSearch: false,
      change:false,
      customColor1: '#FF9711',
      customColor2: '#155BFF',
      customColor3: '#1989fa',
      customColor4: '#8B6FFE',
      premonth:[], //本月风险提醒数据
      thismonth:[], //上月风险提醒数据
      worklength:[], //上班时长
      overtime:[], //加班时长
      clockDate:[], //考勤日期
      averageData:[], // 部门平均时长
      dateStart:'', //开始时间
      dateEnd:'',//结束时间
      tjData:'',//考勤数据
      userscore: '',
      deptscore: '',
      maxValue: 30,
      warnData:[30, 30, 30, 30, 30, 30, 30, 32],
      xztxNum: 0,
      countotal: 0,
      infoData:[], 
      cjnum: 0,       
      // userId:'',
      userInfo:[],
      value: new Date(),
      timer:'',
      year:'',
      month:'',
      date:'',
      nyear:'',
      nmonth:'',
      ndate:'',
      careerData:[],
      marksData:[],
      selected: 0,
      timeIndex: 0,
      warnList:[
        { name:'刷卡预警',num:0},
        { name:'出国分析',num:0},
        { name:'涉嫌违法',num:0},
        { name:'请假分析',num:0},
        { name:'日志预警',num:0},
        { name:'事项申报',num:0},
        { name:'用车预警',num:0},
        { name:'智慧考勤',num:0}
        ], 
      weekMap: [
        { name: '日', num: '1' },
        { name: '一', num: '1' },
        { name: '二', num: '1' },
        { name: '三', num: '1' },
        { name: '四', num: '1' },
        { name: '五', num: '1' },
        { name: '六', num: '1' }
      ],  
      monthMap:{
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
        12: '十二月',
      },
      scores: [],
      ydata: {
        year: '',
        month: '',
        date: '',
      }, 
  }
},
// created(){  
// },
    mounted() {
      debugger
      this.initCircle()
      this.getRadar3()
      this.userInfo = JSON.parse(sessionStorage.userInfo)
      const today = this.$dayjs(new Date());
      this.ydata.year = today.year(),
      this.ydata.month = today.month(),
      this.ydata.date = today.date();
      this.nyear = today.year(),
      this.nmonth = today.month() + 1,
      this.ndate = today.date();
      this.rData = this.getMonthDays(this.ydata.year, this.ydata.month).reduce(((prev, item, index) =>
        index % 7
          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
          : [...prev, [item]]
      ), [])
      this.commitQuery(this.ydata.year, this.ydata.month, this.userInfo.info);
      this.getData();
      this.getUserListByUserId();
      this.allWarnByType();
      this.sevenday();
      this.getPoliceCareer();
      this.indexRecordDeatil();
      this.sectorAverageStatistics();
      this.indexCalendar();
    },
  methods: {
    init() {
      
      this.getRadar()
      this.getRadar2()
      // this.getRadar3()
      this.getRadar4()
      this.getRadar5()
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
    backToday() {
      const d = this.$dayjs(new Date());
      this.rData = []
      this.ydata.year = d.year()
      this.ydata.month = d.month()
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(((prev, item, index) =>
        index % 7
          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
          : [...prev, [item]]
      ), [])
      this.commitQuery(d.year(), d.month(), this.userInfo.info);
    },
   // 是否已评分
    isMarked(item) {
     return item && '012345678910'.includes(item.noteScore)
    },
    scoreItemOf(d) {
       return  this.scores.find(item =>
          new Date(item.noteDate).getDate() === d.date()
        )
      },
    // 查询首页日历评分数据
    commitQuery(year, month, userId) {
      debugger
      const _this = this;
      const first = _this.$dayjs(new Date(year, month, 1))
      const last = first.add(1, 'month').subtract(1, 'day')
      const params = {
        staffed: userId,
        startTime: first.format('YYYY/MM/DD'),
        endTime: last.format('YYYY/MM/DD'),
        orderByField: 'noteDate',
        nCurrent: 1,
        nSize: 100,
        orderFlag: false
      }
      findWorknotePage(params).then(res => {
        if (res.success) {
          debugger
          _this.scores = res.data.records
        }
      })
    },  
    prevMonth() {
      debugger
      const d = this.$dayjs(new Date(this.ydata.year, this.ydata.month, this.ydata.date)).subtract(1, 'month');
      this.rData = []
      this.ydata.year = d.year()
      this.ydata.month = d.month()
      this.rData = this.getMonthDays(d.year(), d.month()).reduce(((prev, item, index) =>
        index % 7
          ? [...prev.slice(0, -1), prev.slice(-1)[0].concat(item)]
          : [...prev, [item]]
      ), [])
      this.commitQuery(d.year(), d.month(), this.userInfo.info);
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
      this.commitQuery(d.year(), d.month(), this.userInfo.info);
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
  pchange(){
    this.change = !this.change
  },
    initCircle() {
      // const data = this.qpdata
      const data = [
        { name: "争优", count: 324 }, 
        { name: "业绩", count: 174 },
        { name: "考勤", count: 278 },
        { name: "重点", count: 294 },
        { name: "共性", count: 250 }
      ]
      debugger
      d3.select("svg").selectAll("g").remove();//清空作图区域
      const svg = d3.select("svg"),width = +svg.attr("width"),height = +svg.attr("height");
      const format = d3.format(",d");

      //       var color = d3.scaleOrdinal(d3.schemeCategory20c);
      const color = ["#FF9700", "#416DF6","#63C073", "#8B6FFE", "#F34252"];//自定义颜色
      const pack = d3.pack()
        .size([width, height])
        .padding(1.5);
      var num, pid;
      const root = d3.hierarchy({ children: data })
        .sum((d) => { return d.count; })
        .each((d) => {
          if (d.parent == null) { num = d.value };
          if (id = d.data.name) {
            var id
            d.id = id;
            d.class = id;
            pid = num / (d.value);
            d.colorPick = pid > 50 ? 5 : (pid > 50 ? 4 : (pid > 20 ? 3 : (pid > 2 ? 2 : 1)));
            console.log(d.colorPick);
          }
        });
      const node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });

      node.append("circle")
        .attr("id", (d) => { return d.id; })
        .attr("r", (d) => { return d.r; })
        .style("fill", (d) => { return color[d.colorPick]; });

      node.append("clipPath")
        .attr("id", (d) => { return "clip-" + d.id; })
        .append("use")
        .attr("xlink:href", (d) => { return "#" + d.id; });

      node.append("text")
        .attr("clip-path", (d) => { return "url(#clip-" + d.id + ")"; })
        .selectAll("tspan")
        .data((d) => {
          var arr = new Array();
          arr.push(d.class);
          arr.push(d.data.count);
          return arr;//圆内显示内容
        })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => { return 25 + (i - nodes.length / 2 - 0.5) * 20; })
        .text((d) => { return d; });

      node.append("title")
        .text((d) => { return d.id + "\n" + format(d.value); });
      node.on("click", (d) => {
        clickBubble(d.id);//自定义点击事件
      })
    },
  changeScroll(direction = 'right'){
    // const _this = this
    let scroll = this.$refs.career_list.scrollLeft
    let width = this.$refs.career_list.scrollWidth
    let n = 0
    if(direction == 'left'){
      // $(this.$refs.career_list).animate({scrollLeft: scroll - 300 },1000)
      this.timer = setInterval(() =>{ 
        if(n > scroll){
          clearInterval(this.timer)
        }
        $(this.$refs.career_list).animate({scrollLeft: scroll - n },0)
        n++
      }, 0);
    }else {
      // $(this.$refs.career_list).animate({scrollLeft: width },width - scroll)
      this.timer = setInterval(() =>{ 
        if(n + scroll > width){
          clearInterval(this.timer)
        }
        $(this.$refs.career_list).animate({scrollLeft: scroll + n },0)
        n++
      }, 0);
    }
  },
  stopScroll(){
    clearInterval(this.timer)
    this.timer = null
  },
    titleOf(d) {
      const scoreItem = this.scores.find(item =>
        new Date(item.noteDate).getDate() === d.date()
      );
      if (scoreItem && '012345678910'.includes(scoreItem.noteScore)) {
        return d.format('YYYY/MM/DD') + ' 已评分' + scoreItem.noteScore;
      } else {
        return d.format('YYYY/MM/DD') + ' 未评分';
      }
    },
    sevenday(){
      const today = this.$dayjs(new Date());
      const t7 = today.subtract(7, 'day');
      this.dateStart = t7.format('YYYY-MM-DD');
      this.dateEnd = today.format('YYYY-MM-DD');
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
        grid: { // 控制图的大小，调整下面这些值就可以，
          x: 140,
          x2: 200,
          y2: 150// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
      },
         tooltip : {
         //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
            confine: true,
            trigger:'item',
            enterable: true, //鼠标是否可以移动到tooltip区域内
            formatter: (params) =>{
              var returnStr = '';
              const data = params.value;
              for (let i = 0; i< data.length; i++) {
                returnStr += params.name[i]+ ':'+(this.maxValue - data[i])+'<br/>'           
              }
              return returnStr;
            }
         },
        radar: {
            shape: '',
            splitNumber: 5, // 雷达图圈数设置
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
                name: '智慧考勤',
                max: this.maxValue,
                //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                axisLabel: {
                    show: false,
                    fontSize: 12,
                    color: 'black',
                    showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                    showMinLabel: true   , //显示最小数字，即中心点显示0
                },
            },
            { name: '请假分析', max: this.maxValue},
            { name: '出国分析', max: this.maxValue},
            { name: '事项申报', max: this.maxValue},
            { name: '用车预警', max: this.maxValue},
            // { name: '违规查询', max: 30},
            // { name: '差旅管理', max: 30},
            { name: '日志预警', max: this.maxValue},
            { name: '涉嫌违法', max: this.maxValue},
            { name: '刷卡预警', max: this.maxValue},
            // { name: '就餐预警', max: 30},
            // { name: '审批预警', max: 30},
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
                    value: this.warnData,
                    name: ['智慧考勤','请假分析','出国分析','事项申报','用车预警','日志预警','涉嫌违法','刷卡预警'],
                    // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                            color: '#409eff',
                            lineStyle: {
                                width: 1,
                                color: '#409eff',
                            },
                        },
                    },
                },
                //  {
                //     value: [30, 15, 30, 12, 30, 30, 30, 30, 30,30,30,30],
                //     name: '上月',
                //     itemStyle: {
                //         normal: {
                //           color: '#FF7F0E',
                //           lineStyle: {
                //               color: '#FF7F0E',
                //           },
                //       },
                //     },
                // },
            ],
        }],
        }
        radarDom.setOption(option)
        $(window).resize(function() {//这是能够让图表自适应的代码
          radarDom.resize();
        }); 
      },
      getRadar2(){
        let radarDom2 = this.$echarts.init(document.getElementById('kao'))
        var colors = ['#8ec6ad', '#947DFF', '#386db3'];
        let option = {
          color: colors,
          tooltip: {
              trigger: 'none',
              axisPointer: {
                  type: 'cross'
              }
          },
          legend: {
              data:['加班', '上班','部门平均'],
              icon:'rect',
              top: '35',
              right: '35'
          },
          grid: {
              top: 70,
              bottom: 50
          },
          xAxis: [
              {
                  type: 'category',
                  axisTick: {
                      alignWithLabel: true
                  },
                  axisLine: {
                      onZero: false,
                      lineStyle: {
                          color: colors[1]
                      }
                  },
                  axisPointer: {
                      label: {
                          formatter: function (params) {
                              return '小时' + params.value
                                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                          }
                      }
                  },
                  data: this.clockDate
              } 
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
            {
              name: '加班',
              type: 'line',
              smooth: true,
              symbol: 'none', // 去掉折点
              itemStyle: {
                normal: {
                  color: "#386db3",//折线点的颜色
                  lineStyle: {
                    color: "rgba(255,0,0,.0)"//折线的颜色  透明色
                  }
                }
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#4D8AFF'
                }, {
                  offset: 1,
                  color: '#947DFF'
                }
                ])
              },
              data: this.overtime
            },
            {
              name: '上班',
              type: 'line',
              smooth: true,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: "#947DFF",//折线点的颜色
                  lineStyle: {
                    color: "rgba(255,0,0,.0)"//折线的颜色
                  }
                }
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                  offset: 0,
                  color: '#633FFF'
                }, {
                  offset: 1,
                  color: '#fee'
                }
                ])
              },
              data: this.worklength
            },
            {
              name: '部门平均',
              type: 'line',
              smooth: true,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: "red",//折线点的颜色
                  lineStyle: {
                    color: "red"//折线的颜色
                  }
                }
              },
              data: this.averageData
            }
          ]
    }
      radarDom2.setOption(option)
          //折线图宽高自适应
          window.onresize = function () {
            radarDom2.resize();
        }
  },
  getRadar3(){
        let radarDom3 = this.$echarts.init(document.getElementById('gauge'))
        // var colors = ['#8ec6ad', '#947DFF', '#386db3'];
        let option = {
          backgroundColor: '#fff',
        angleAxis: {
            show: false,
            max: 12 * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
            type: 'value',
            startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
            splitLine: {
                show: false //隐藏坐标
            }
        },
        barMaxWidth: 18, //圆环宽度
        radiusAxis: { //隐藏坐标
            show: false,
            type: 'category',
        },
        polar: { //设置圆环位置和大小
            center: ['50%', '50%'],
            radius: '250'
        },
        series: [{
                type: 'bar',
                data: [{ //上层圆环，用于显示真实数据
                    value: 5,
                    itemStyle: {
                        color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1, //从左到右 0-1
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#2CABFC' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#CD48AE' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                    }
                }],
                coordinateSystem: 'polar', //类型，极坐标
                roundCap: true, //顶端圆角
                z: 5 //圆环层级，和zindex相似
            }, 
            { //仪表盘
                type: 'gauge',
                radius: '80%',
                startAngle: 210, //起始角度，同极坐标
                endAngle: -30, //终止角度，同极坐标
                max: 12,
                splitNumber: 4, //分割线个数（除原点外）
                axisLine: { // 坐标轴线
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLabel: {
                    // 坐标轴数字
                 fontWeight: 'bolder',
                distance:-80,
                color: '#8593a7',
                shadowColor: 'green', //默认透明
                shadowBlur: 5,
                formatter:(b)=>{
                    var s=Number((b/3).toFixed(0))
                    if(s>0){
                    return  ""+(s)+'季度\n'+'\n100'
                        
                    }else{
                        return '2020年度'
                    }
                }
                },
                axisTick: { // 坐标轴标记
                splitNumber:10,
                    length: 10,
                    lineStyle: {
                        color: "#13B5FC"
                    }
                },
                 splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 2,
                    color: '#78849a',
                }
            },
                title: { //标题，显示'馆藏量'
                    textStyle: {
                        color: '#155bff',
                        shadowColor: '#fff',
                        fontSize: 30
                    },
                    offsetCenter: ["0", '-35%'] //位置偏移
                },
                detail: { //仪表盘数值
                  formatter: function (params) {
                    return ['{a|' + params + '}',
                      '{b|A}'].join('\n')
                  },
                    rich:{
                        a:{
                            color: '#155bff',
                            lineHeight: 50,
                        fontSize:50
                        },
                        b:{
                            color:'#fff',
                            backgroundColor:'#155bff',
                             lineHeight: 30,
                             height: 20,
                             fontSize:20,
                             width:40,
                             borderRadius:10
                             
                        }
                    },
                    color:'#155bff',
                    offsetCenter: ["0", '5%'],
                },
                data: [{
                    value: 100,
                    name: ''
                }]
            }
        ]
        //   tooltip: {
        //     formatter: '{a} <br/>{b} : {c}分'
        // },
        //   series: [
        //     {
        //       startAngle: 180, //开始角度 左侧角度
        //       endAngle: 0, //结束角度 右侧
        //       type: 'gauge',
        //       min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
        //       max: 10,
        //       splitNumber: 0.5,
        //       radius: '100%',
        //       center: ['50%', '75%'],//
        //       axisLabel: {
        //         distance: -10
        //       },
        //       axisLine: {
        //         lineStyle: {
        //           width: 10,
        //           color: [
        //             [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        //               offset: 0.1,
        //               color: "#59BCFf"
        //             },
        //             {
        //               offset: 0.5,
        //               color: "#409eff"
        //             },
        //             {
        //               offset: 1,
        //               color: "#E373FF"
        //             }
        //             ])]
        //           ],
        //           shadowColor: '#fff', //默认透明
        //           shadowBlur: 8
        //         }
        //       },
        //       // 分割线
        //       splitLine: {
        //         show: false,
               
        //       },
        //       // 刻度线
        //       axisTick: {
        //         show: false,
              
        //       },
        //       pointer: {
        //         width: 5,
        //         color: 'red'
        //       },
        //       title: {
        //         offsetCenter: ['-30%', '70%']
        //       },
        //       detail: { show: false },
        //       data: [{ value: this.deptscore, name: '' }]
        //     },
        //     {
        //       startAngle: 180, //开始角度 左侧角度
        //       endAngle: 0, //结束角度 右侧
        //       type: 'gauge',
        //       axisLabel: {
        //         distance: -68
        //       },
        //       min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
        //       max: 10,
        //       splitNumber: 5,
        //       radius: '55%',
        //       center: ['50.5%', '75%'],//
        //       axisLine: {
        //         lineStyle: {
        //           width: 8,
        //           color: [
        //             [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        //               offset: 0.1,
        //               color: "#59BCFF"
        //             },
        //             {
        //               offset: 0.5,
        //               color: "#409eff"
        //             },
        //             {
        //               offset: 1,
        //               color: "#E373FF"
        //             }
        //             ])]
        //           ],
        //           shadowColor: '#fff', //默认透明
        //           shadowBlur: 5
        //         }
        //       },
        //       // 分割线
        //       splitLine: {
        //         show: false,
        
        //       },
        //       // 刻度线
        //       axisTick: {
        //         show: false,
           
        //       },
        //       pointer: {
        //         width: 3
        //       },
        //       title: {
        //         offsetCenter: ['-50%', '70%']
        //       },
        //       detail: { show: false },
        //       data: [{ value: this.userscore, name: '' }]
        //     }
        //   ]
    }
      radarDom3.setOption(option)
        window.addEventListener("resize", () => { radarDom3.resize();});
  },
    getRadar4() {
      debugger
      let category = ['服务器数（台）'];
      let barData = [this.userscore];
      let lineData = [10]
      let radarDom4 = this.$echarts.init(document.getElementById('pbar'))
      let option = {
        backgroundColor: 'white',
        grid: [{ //控制显示位置的属性grid
            left: '',
            bottom: '',
            top: '',
            right: '48%' //在此图中可用于控制柱子的长度
        }],
        xAxis: {
            show: false
        },
        yAxis: {
            data: category,
            show: true,
            axisLabel: {
                verticalAlign: 'left',
                color: 'white',
                fontSize: '30'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
    
            { // 蓝柱下面方块
                name: '',
                type: 'pictorialBar',
                symbol: 'roundRect',
                barWidth: '30%',
                symbolOffset: ['200%', '-30%'],
                itemStyle: {
                    normal: {
    
                        color: '#235FF6'
                    }
                },
                z: -41,
                symbolRepeat: true,
                symbolSize: ['50%', '150%'],
                data: lineData,
                barGap: 10,
                barCategoryGap:20,
                animationEasing: 'elasticOut',
    
            },
    
    
            { // 蓝柱
                name: '', // blue bar
                type: 'pictorialBar',
                symbol: 'roundRect',
                barWidth: '30%',
                symbolOffset: ['200%', '-30%'],
                itemStyle: {
                    normal: {
                        barMaxWidth: '20%',
                        barBorderRadius: 100,
                        color: '#409eff',
                    }
                },
                symbolRepeat: true,
                symbolSize: ['50%', '150%'],
                // symbolClip: true,
                data: barData,
            },
    
        ],
      }
      radarDom4.setOption(option)
      window.addEventListener("resize", () => { radarDom4.resize(); });
    },
    getRadar5() {
      let category = ['服务器数（台）'];
      let barData = [this.deptscore];
      let lineData = [10]
      let radarDom5 = this.$echarts.init(document.getElementById('bbar'))
      let option = {
        backgroundColor: 'white',
        grid: [{ //控制显示位置的属性grid
            left: '',
            bottom: '',
            top: '',
            right: '48%' //在此图中可用于控制柱子的长度
        }],
        xAxis: {
            show: false
        },
        yAxis: {
            data: category,
            show: true,
            axisLabel: {
                verticalAlign: 'left',
                color: 'white',
                fontSize: '20'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            { // 蓝柱下面方块
                name: '',
                type: 'pictorialBar',
                symbol: 'roundRect',
                barWidth: '30%',
                symbolOffset: ['200%', '-30%'],
                itemStyle: {
                    normal: {
    
                        color: '#838d9e'
                    }
                },
                z: -41,
                symbolRepeat: true,
                symbolSize: ['50%', '150%'],
                data: lineData,
                barGap: 10,
                barCategoryGap:20,
                animationEasing: 'elasticOut',
    
            },
            { // 蓝柱
                name: '', // blue bar
                type: 'pictorialBar',
                symbol: 'roundRect',
                barWidth: '30%',
                symbolOffset: ['200%', '-30%'],
                itemStyle: {
                    normal: {
                        barMaxWidth: '20%',
                        barBorderRadius: 10,
                        color: '#8162FF',
                    }
                },
                symbolRepeat: true,
                symbolSize: ['50%', '150%'],
                // symbolClip: true,
                data: barData,
            },
        ],
      }
      radarDom5.setOption(option)
      // $(window).resize(function() {//这是能够让图表自适应的代码
      window.addEventListener("resize", () => { radarDom5.resize(); });
    },
    // 查询分类风险提醒数据
    allWarnByType() {
      const _this = this;
      const params = {
        userId: this.userInfo.info
      }
      allWarnByType(params).then(res => {
        console.log(res)
        if (res.success) {
          const tdata = res.data.thismonth
          if (tdata) {
            // const pdata = res.data.premonth
            const data = tdata.map((countnum) => {
              return countnum.countnum;
            })
            for (let i = 0; i < data.length; i++) {
              const Data = _this.maxValue - data1[i]
              _this.warnData.push(Data)
            }
          }else{

          }
          // _this.premonth = pdata.map((countnum) => {
          //   return countnum.countnum;
          // })
  //         const riskThisMonth = (this.props.riskResult.thismonth || []).reduce((prev, item) => ({
  //   ...prev,
  //   [item.warn_type]: item.countnum || 0
  // }), {});
          _this.init();
        }
      })
    },
  // 根据用户ID查询所有下属用户
  getUserListByUserId() {
    debugger
      const _this = this;
      const params = {
        userId: _this.id 
      }
      getUserListByUserId(params).then(res => {
        if (res.success) {
          _this.userIds = res.data.map(item => item.userInfo.info).join()
          _this.countWorkNote();
        }
      })
    },
  // 工作日志统计
  countWorkNote(){
    const _this = this
    countWorkNote(
      Object.assign(
        {
          user_id: _this.userIds
          // user_id: '2020'
        },
      )
    ).then(res => {
      // console.log(res)
      if(res.success){
        // _this.$message.success('成功！')
        // _this.labelList[0].count = res.data.allnote
        _this.cjnum = res.data.noaudit
        // _this.labelList[2].count = res.data.audited
      }
    })
  },
    agency(dt,data){
      // this.showSearch = ! this.showSearch
    },
    warncon(){
      this.$router.push({ path: '/agency' });
    },
    // 从警生涯数据
    getPoliceCareer() {
      const _this = this;
      const params = {
        userId: _this.userId,
      }
      getPoliceCareer(params).then(res => {
        if (res.success) {
          const Data = res.data
          _this.careerData = Data.reduce((prev, item) =>
            (item.career_type === '履历' ? [...prev, { ...item, marks: [item] }]: [...prev.slice(0, -1), { ...prev.slice(-1)[0], marks: prev.slice(-1)[0].marks.concat(item) }]), []
          );
          for (var i = 0; i < _this.careerData.length; i++) {  
            // _this.marksData.push(_this.careerData[i].marks[i])
            _this.careerData[i].happen_time = _this.conversion(
              _this.careerData[i].happen_time
            )
            _this.careerData[i].endtime = _this.conversion(
              _this.careerData[i].endtime
            )
            if (_this.careerData[i].marks != null) {
                                var data = _this.careerData[i].marks
                                for (var j = 0; j < data.length; j++) {
                                    data[j].happen_time = _this.conversion(data[j].happen_time) // 把时间戳转化为时间格式
                                    data[j].endtime = _this.conversion(data[j].endtime) // 把时间戳转化为时间格式
                                }
                            }
            _this.careerData[_this.careerData.length - 1].marks[0].endtime = "至今"
            _this.careerData[_this.careerData.length - 1].endtime = "至今"

            const dd = _this.careerData[i].marks
            const cc =[]
            for (let k = 0; k < _this.careerData[i].marks.length; k++) {
              if(_this.careerData[i].marks[k].career_type== '1'&& _this.careerData[i].marks[k].career_desc=='优秀'){
                cc.push(_this.careerData[i].marks[k])
              } 
              if(_this.careerData[i].marks[k].career_type== '2'){
                cc.push(_this.careerData[i].marks[k])
              }            
              if(_this.careerData[i].marks[k].career_type== '3'){
                cc.push(_this.careerData[i].marks[k])
              }  
              if(_this.careerData[i].marks[k].career_type== '4'){
                cc.push(_this.careerData[i].marks[k])
              } 
              if(_this.careerData[i].marks[k].career_type== '履历'){
                cc.push(_this.careerData[i].marks[k])
              }         
            }
            _this.careerData[i].marks = ''
            _this.careerData[i].marks = cc
          }
          let width = _this.$refs.career_list.scrollWidth
          $(_this.$refs.career_list).animate({ scrollLeft: width }, 8000)
        }
      })
    },
    conversion(timestamp) {
            // 时间戳转化为时间格式
            var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '.'
            var M =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '.'
            var D = date.getDate() + ' '
            // var h = date.getHours() + ':'
            // var m = date.getMinutes() + ':'
            // var s = date.getSeconds()
            return Y + M + D 
    },
    jxh(){
      this.$router.push({path:'/Refinement'})
    },
    xztxt(){
      this.$router.push({path:'/CooperationAgency'})
    },
    cjgx(){
      this.$router.push({path:'/HierEvaluation'})
    },
    // 协作提效总数  http://192.168.1.102/sys/sysPendings/getAllDealCount
    getData() {
      debugger
      var _this = this
      const data = {
        sysId: 'ZHJD',
        token: _this.token
      }
      _this.$request
        .get(`http://41.232.3.197/sys/sysPendings/getAllDealCount`, data) 
        .then(res => {
          _this.xztxNum = res.data.number
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 查询七天上班时间统计数据
    indexRecordDeatil() {
      const _this = this;
      const params = {
        userId: this.userInfo.info,
        startTime: _this.dateStart,
        endTime: _this.dateEnd

      }
      indexRecordDeatil(params).then(res => {
        debugger
        console.log(res)
        if (res.success) {
          const Data = res.data
          _this.worklength = Data.map(({ worklength }) => worklength)
          _this.overtime = Data.map(({ overtime }) => overtime)
          _this.clockDate = Data.map(({ clock_date }) => new Date(clock_date).toLocaleDateString().substring(5))
          _this.init();
        }
      })
    },
    // 查询部门平均上班时间数据
    sectorAverageStatistics() {
      debugger
      const _this = this;
      const params = {
        department: _this.orgId,
        startTime: _this.dateStart,
        endTime: _this.dateEnd

      }
      sectorAverageStatistics(params).then(res => {
        console.log(res)
        if (res.success) {
          const Data = res.data
          _this.averageData = Object.keys(Data).sort().map(item => Data[item]);
          _this.init();
        }
      })
    }, 
  // 个人今日评分  部门评分
  indexCalendar(){
    const _this = this;
    const params = {
      userId: '4616',
      deptId: '831',
      startTime: '2020-01-01',
      endTime: '2020-01-31'

    }
    indexCalendar(params).then(res => {
      debugger
      console.log(res)
      if (res.success) {
        const Data = res.data.yearscore
        for (let i= 0; i < Data.length; i++) {
          if(Data[i].userscore ==='userscore'){
            _this.userscore = Data[i].score
          }
          if(Data[i].userscore ==='deptscore'){
            _this.deptscore = Data[i].score
          }
        }
        // _this.averageData = Object.keys(Data).sort().map(item => Data[item]);
        _this.init();
      }
    })
    
  }, 
  }
}
</script>
<style lang="stylus" scoped>
  @import './css/pseudo_classes.css';
.p_nvleft{
  float: left;
  display: inline-block;
  position: relative;
  width: 4%;
  margin-top: 2%;
  /* bottom: 65px; */
  height: calc(84% - 30px);
  cursor: pointer
}
.p_nvright{
  display: inline-block;
  position: relative;
  width: 4%;
  margin-top: 2%;
  /* bottom: 65px; */
  height: calc(84% - 30px);
  cursor: pointer;
  float: right;
}
.person_home{
  /* background: #f2f5f7; */
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.p_career{
  display: flex;

}
.p_person {
    float: left;
    width: 249px;
    margin-top: 28px;
}
.p_name{
  text-align: center;
    margin-left: 4px;
    width: 142px;
    height: 13px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #8593a7;
    line-height: 20px;
}
.p_year{
  text-align: center;
  margin-top: 27px;
  color: #00f;
  margin-left: 19px;
  line-height: 29px;
}
.p_title{
  float: left;
   width: 10%;
  margin-top: 28px;
}
.person_career{
  float: left;
  width: 92%;
  height: calc(84% - 30px);
  overflow: hidden; 
  display: flex;
  overflow-y: hidden;
}
.person_body{
  height: 100%;
  width: 98%;
  margin: 1%;
}
.person_head{
    height: 25% !important;
    background-color: #fff;
    margin-bottom: 15px;
    width: 100%;
    /* overflow: auto hidden; */
}
.p_card{
  /* float: left; */
  width: 115px;
  margin-top: 28px;
}

.p_node{
  /* float: left; */
  width: 93px;
  margin-top: 4px;
}
.person_left{
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-right: 15px;
}
.person_right {
  width: 100%;
  height: 100%;
}
.person_center {
  margin-right: 15px;
  width: 100%;
  height: 100%;
}
.content{
  display: flex;
  height: calc(75% - 45px);
  
}
.h-full {
    height: 88%!important;
}
.w-full {
    width: 98%!important;
}
.w-full {
    width: 98%!important;
}
.p_top{
  background-color: white;
  height: 50%;
  width: 100%;
  margin-bottom: 15px;
}
.p_foot{
  width: 100%;
  background-color: white;
  height: calc(50% - 15px);
  margin-bottom: 15px;
}
/* .person_main{
  height: 40% !important;
}
.person_footer{
  background: white;
  height: 40% !important;
} */
/*  */
.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .person_title{
    float:left;
    width:100%;
    height:30px;
    margin: 10px;
    margin-bottom :0;
    font-size:14px;
    font-weight:bold;
    line-height:30px;
    /* border-left:5px solid #409eff; */
    padding-left: 5px
  }
  .fengxian_body{
    float: left;
    width: 100%;
    height: calc(50% - 30px);
  }
  .p_warn{
    height: 50%;
    float: left;
    /* display: grid; */
    width: 100%;
  }
  .ptop{
    height: 70%;
    float: left;
    width: 100%;
  }
  .pcenter{
    height: 35%;
  }
  .pfoot{
    height: 30%;
    float: left;
    width: 100%;
    margin-top: 5%;
  }
  .pli{
    width: 25%;
    /* height: 100%; */
    display: inline-block;
    margin-top: 7%;
    cursor: pointer;
  }
  .h32{
    text-align: center;
  }
  .warn{
    margin-bottom: 10px;
  }
  .pnum{
    font-weight: 400;
    font-size: 20px;
    color: red;
    margin-bottom: 17px;
  }
  .wnum{
    font-weight: 400;
    font-size: 20px;
    color: green;
    margin-bottom: 17px;
  }
  .pname{
    font-size: 12px;
    font-weight: 700;
    color: #838D9E;
  }
.pft{
    text-align: center;
    /* margin-top: 3%; */
    color: #838D9E;
}
.p_inter{
    margin-top: 1em;
    color: #838d9e;
    font-size: 14px;
    /* font-weight: 700; */
}
.ptotal{
  margin: 10px;
  color: red;
  font-weight: 700;
}
.ntotal{
  margin: 10px;
  color: green;
  font-weight: 700;
}
.p_attendance{
  height: 100%;
  width: 100%;
} 
.p_watch{
  float: left;
    /* width: 58%; */
    height: 50%;
    width: 100%
}
.p_gauge{
  height: 100%;
  width: 100%;
}
.p_tscore{
  width: 72%;
  height: 50%;
  margin-left: 27%;
}
.p_score{
  float: left;
  height: 34%;
    width: 100%;
  text-align: center;
}
.p_lscore{
  width: 30%;
    height: 100%;
    float: left;
}
.p_rscore{
  width: 68%;
  height: 100%;
  float: left;
}
.pbar{
  height: 100%;
  width: 100%;
}
.bbar{
  height: 100%;
  width: 100%;
}
.p_eright{
  height: 100%;
    /* float: left; */
    width: 44%;
    float: right;
}
.tscore{
  color:  rgb(51, 11, 230)
}
.bscore{
  color: #CC00FF
}
.crea_left{
  width: 12%;
    float: left;
}
.calendar-day{
      text-align: center;
      color: #202535;
      line-height: 30px;
      font-size: 12px;
  }
  .is-selected{
      color: green;
      background-color: green;
      font-size: 10px;
      margin-top: 20px;
      width: 13px;
      height: 13px;
      margin-left: 8px;
      border-radius: 10px;

  }
  .no-selected{
      color: red;
      background-color: red;
      font-size: 10px;
      margin-top: 20px;
      width: 13px;
      height: 13px;
      margin-left: 8px;
      border-radius: 10px;

  }
  #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
      content: '当月';
  }
  .bubble circle{
            stroke: black;
            stroke-width: 2px;
        }
 
        .bubble text{
            fill: black;
            font-size: 14px;
            font-family: arial;
            text-anchor: middle;
        }
  /* .left-score-image {
        width: 100% !important;
        height: 100% !important;
    } */
</style>
