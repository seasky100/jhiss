<template>
  <div class='person_home'>
    <div class='person_body'>
      <div class='person_head police_career'>
        <div class="person_title p_clear">
          <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
          从警生涯
        </div>
        <div class='person_career' ref='career_list'>
        <div class='p_career' v-for="(item,index) in careerData" :key="index" >
        <div v-for="(item1,index1) in item.marks" :key="index1" @click="agency()"  >     
        <div class='p_card'>
          <el-divider content-position="left"><img src='../../utils/img/num2.png' /> </el-divider>
          <div class='p_year'>{{item1.happen_time}}</div>
          <div class='p_name'>{{item1.career_title}}</div>
        </div>
      </div>
        <div class='p_node'>
          <el-divider content-position="left"><div style=" margin-left: -9px; color: blue;">{{item.endtime}}</div><img src='../../utils/img/stage.png' /> </el-divider>
        </div>
      </div>
        </div>
      </div>
      <el-row class='content' :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="7">
          <div class='person_left'>
              <div class="person_title">
                  <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
                  风险提醒
                </div>
                <div class="fengxian_body radar" id="radar"></div>
                <div class='p_warn'>
                  <div class='ptop'>
                    <div class='pli' v-for="(item,index) in warnList" :key="index">
                      <div class='h32'><span class='pnum'>{{item.num}}</span></div>
                      <div class='h32'><span class='pname'>{{item.name}}</span></div>
                    </div>
                  </div>
                  <div class='pfoot'>
                    <div class='pft'>当前<span class='ptotal' >8</span>项风险内容，请谨慎！！！</div>
                  </div>
                </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="10">
          <div class='person_center'>
            <div class='p_top'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
                    考勤情况
                  </div>
                <div id='kao' class='p_attendance'></div>
            </div>
            <div class='p_foot'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
                    层级评价
                  </div>
                  <div class='p_evaluate' style="float : left; height: 90%; margin-left: 4em;">
                    <!-- <el-calendar v-model="value" id="calendar">
                      <template
                       slot="dateCell"
                       slot-scope="{date, data}">
                          <div>
                             <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
                                <div v-for="item in calendarData">
                                   <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                                     <div v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
                                          <el-tooltip class="item" effect="dark" :content="item.things"  placement="right">                                    
                                               <div class="is-selected">{{item.things}}</div>
                                          </el-tooltip>
                                       </div>
                                    <div v-else></div>
                                   </div>
                               <div v-else></div>
                             </div>
                          </div>
                      </template>
                </el-calendar> -->
                <div class='flex flex-justify-between' style="padding: 0 0.5em">
                  <div class='flex flex-align-center'>
                    <button class='r-half' style="width: 1.2em; height: 1.2em; background: #8593A7 url(../../utils/img/home_calendar_arrow_left.svg) no-repeat center/70%"
                      @click="prevMonth" title='上一月'></button>
                    <span class='font14 txt-bold mx4' >{{monthMap[ydata.month+1]}}</span>
                    <button class='r-half' style="width: 1.2em; height: 1.2em; background: #8593A7 url(/../../utils/img/home_calendar_arrow_right.svg) no-repeat center/70%"
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
                  <div class='p_eright'>
                  <div class='p_watch'>
                      <div id='gauge'  class='p_gauge' ></div>
                  </div>
                  <div class='p_score'>
                    <div class='p_tscore'>
                      <div class='p_lscore'>
                        <div class=''>
                          <span class='tscore'>80</span>
                        </div>
                        <div class='h32'>
                          <span class=''>今日评分</span>
                        </div>
                      </div>
                      <div class='p_rscore'>
                        <div id='pbar' class='pbar'></div>
                      </div> 
                    </div>
                    <div class='p_tscore'>
                      <div class='p_lscore'>
                        <div class=''>
                          <span class='bscore'>60</span>
                        </div>
                        <div class='h32'>
                          <span class=''>部门评分</span>
                        </div>
                      </div>
                      <div class='p_rscore'>
                        <div id='bbar' class='bbar'></div>
                      </div> 
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="7">
          <div class='person_right'>
            <div class='p_top'>
              <div class="person_title">
                <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
                <span class='pl8 txt-bold' style="">待办事项</span>         
              <div class='flex flex-align-center flex-justify-center flex-grow' style="margin-top: 3em;margin-left: 1.35em;">
                <div @click='xztxt' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">协作提效</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #E8EFFF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #235FF6"> 
                      <Link class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: 4.4em; height: 4.4em; background: #235FF6" title='待办箱'>
                        <span style="font-size: 1.5em">{{xztxNum}}</span>
                      </Link>
                    </div>
                  </div> 
                  <span style="color: #8092A8; font-size: 14px; font-weight: 700">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='jxh' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">队伍精细化</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #CC00FF">
                      <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4.4em'; height: 4.4em; background: #CC00FF" title='待办箱'>
                        <span style="font-size: 1.5em">1</span>
                      </Link>
                    </div>
                  </div>
                  <span style="color: #8092A8; font-size: 14px; font-weight: 700">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='jxh' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">层级关系</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #F09B38">
                      <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4.4em'; height: 4.4em; background: #F09B38" title='待办箱'>
                        <span style="font-size: 1.5em">1</span>
                      </Link>
                    </div>
                  </div>
                  <span style="color: #8092A8; font-size: 14px; font-weight: 700">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>               
            </div>
          </div>
        </div>
            <div class='p_foot'>
              <div class="person_title">
                <img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
                快速入口
              </div>
              <div class='flex flex-grow w-full h-full' style="margin-top: 0.2em;margin-left: 2em;">
                <div class='flex flex-column flex-grow' style="padding: 0.5em">
                  <div class='flex flex-grow w-full'>
                    <router-link to='/HierEvaluation' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                       <img class='cursor-pointer'  src='../../utils/img/home_entrance_work_log@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                      <span class='cursor-pointer p_inter'>层级评价</span>
                    </router-link>
                    <router-link to='/talks' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_overtime_request@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                     <span class='cursor-pointer p_inter'>谈心谈话</span>
                   </router-link>
                    <router-link to='/organizationRequest' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 1px">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_receipt_notification@2x.png' /><!--src='/images/home_entrance_receipt_notification@2x.png'  --> 
                      <span class='cursor-pointer p_inter'>事项申报</span>
                    </router-link>            
                  </div>
                  <div class='flex flex-grow w-full'>                    
                    <router-link to='/IndividualReport' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 0">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_items_report@2x.png' /><!--src='/images/home_entrance_document_flow@2x.png' --> 
                      <span class='cursor-pointer p_inter'>事项即报</span>
                    </router-link>
                    <router-link to='/DocumentLiu' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_document_flow@2x.png' /><!-- src='/images/home_entrance_approval_items@2x.png'--> 
                      <span class='cursor-pointer p_inter'>公文流转</span>
                    </router-link>
                    <router-link to='/ApprovalMatters' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer' src='../../utils/img/home_entrance_approval_items@2x.png' /><!--src='/images/home_entrance_travel_application@2x.png' --> 
                      <span class='cursor-pointer p_inter'>审批事项</span>
                    </router-link>         
                  </div>
                  <div class='flex flex-grow w-full'>
                    <router-link to='/TravelApplication' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 0">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_travel_application@2x.png' /><!--src='/images/home_entrance_document_flow@2x.png' --> 
                      <span class='cursor-pointer p_inter'>差旅申请</span>
                    </router-link>
                    <router-link to='/TravelApplication' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_expense_request@2x.png' /><!-- src='/images/home_entrance_approval_items@2x.png'--> 
                      <span class='cursor-pointer p_inter'>用车申请</span>
                    </router-link>
                    <router-link to='/TravelApplication' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                      <img class='cursor-pointer'  src='../../utils/img/home_entrance_travel_application@2x.png' /><!--src='/images/home_entrance_travel_application@2x.png' --> 
                      <span class='cursor-pointer p_inter'>差旅申请</span>
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
  import { allWarnByType,indexRecordDeatil,sectorAverageStatistics,indexRecordCountDeatil,indexCalendar } from '../../api/warn.js';
  import { getPoliceCareer } from '../../api/user-server.js';
  import { findWorknotePage } from '../../api/wisdom-reminder/evaluation-analysis.js';
  import { subDays,format } from 'date-fns';
  // import eleCalendar from 'ele-calendar'
  // import 'ele-calendar/dist/vue-calendar.css'
export default {
  name: "PersonalHome",
  data() {
    return {
      isCollapse: false,
        menuList: [],
        premonth:[], //本月风险提醒数据
        thismonth:[], //上月风险提醒数据
        worklength:[], //上班时长
        overtime:[], //加班时长
        clockDate:[], //考勤日期
        averageData:[], // 部门平均时长
        dateStart:'', //开始时间
        dateEnd:'',//结束时间
        tjData:'',//考勤数据
        rData:[],
        xztxNum: 0,
        userId:'',
        userInfo:'',
        value: new Date(),
        timer:'',
        year:'',
        month:'',
        date:'',
        careerData:[],
        marksData:[],
        selected: 0,
        timeIndex: 0,
        value1: '',
        nyear:'',
        nmonth:'',
        ndate:'',
        calendarData: [
                    { months: ['01', '02','03', '04','05','06','07','08','09','10','11','12'],days: ['12','13','14','15','16','17','18','26'],things: 8 },
                ],
                value: new Date(),
        warnList:[
          { name:'刷卡预警',num:'1'},
          { name:'出国分析',num:'1'},
          { name:'涉嫌违法',num:'1'},
          { name:'请假分析',num:'1'},
          { name:'日志预警',num:'1'},
          { name:'事项申报',num:'1'},
          { name:'用车预警',num:'1'},
          { name:'智慧考勤',num:'1'}
          ], 
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
  // components: {
  //           eleCalendar
  //       },
  mounted() {
    const today = this.$dayjs(new Date());
    this.ydata.year = today.year(),
    this.ydata.month = today.month(),
    this.ydata.date = today.date();
    this.nyear = today.year(),
    this.nmonth = today.month()+1,
    this.ndate = today.date();
    this.init();
    this.findWorknotePage();
    this.indexCalendar();
    this.getPoliceCareer();
    this.getRadar()
    this.getRadar2()
    this.getRadar3()
    this.getRadar4()
    this.getRadar5()
    // this.allWarnByType();
  },
  methods: {
    init(){
      debugger
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
       debugger
     item && '012345678910'.includes(item.noteScore)
     },
    
    scoreItemOf (d){
      debugger
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
    // 是否已评分
    // isMarked = item =>
    // item && '012345678910'.includes(item.noteScore);
    aa(){
      alert(33)

    },
    //设置dayStart
    setStart(date) {
      this.startMoney = event.toElement.innerText.slice(-3)

      this.startTime = date
      this.dayStart = this.msToDate(date).withoutTime
    },
    pick(date, mouseEvent, bbb) {
      debugger
      if (this.clickNum < 2) {
        // console.log('if-clickNum', this.clickNum)
        this.clickNum++
        if (this.clickNum == 1) {
          this.setStart(date)
        }

        if (this.clickNum == 2) {
          if (date > this.startTime) {
            this.endMoney = event.toElement.innerText.slice(-3)
            this.endTime = date
            this.dayEnd = this.msToDate(date).withoutTime
          } else {
            this.reset(date)
          }
        }
      }
    },
//重置日期
reset(date) {
      // console.log('ok')
      this.dayStart = ''
      this.startTime = 0

      this.dayEnd = ''
      this.endTime = 0

      this.datedef = []
      this.clickNum = 1

      this.setStart(date)
    },
    change() {
      this.dayStart = ''
      this.startTime = 0
      this.dayEnd = ''
      this.endTime = 0
      this.datedef = []
      this.clickNum = 0
    },
//中国标准时间转时间戳
dateToMs(date) {
      let result = new Date(date).getTime()
      return result
    },
    //中国标准时间转年月日
    msToDate(msec) {
      let datetime = new Date(msec)
      let year = datetime.getFullYear()
      let month = datetime.getMonth()
      let date = datetime.getDate()
      let hour = datetime.getHours()
      let minute = datetime.getMinutes()
      let second = datetime.getSeconds()

      let result1 =
        year +
        '-' +
        (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
        '-' +
        (date + 1 < 10 ? '0' + date : date) +
        ' ' +
        (hour + 1 < 10 ? '0' + hour : hour) +
        ':' +
        (minute + 1 < 10 ? '0' + minute : minute) +
        ':' +
        (second + 1 < 10 ? '0' + second : second)

      let result2 =
        year +
        '-' +
        (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
        '-' +
        (date + 1 < 10 ? '0' + date : date)

      let result = {
        hasTime: result1,
        withoutTime: result2
      }

      return result
    },
    jxh(){
        this.$router.push({path:'/Refinement'})
      },
      xztxt(){
        this.$router.push({path:'/CooperationAgency'})
      },
      // 协作提效总数  http://192.168.1.102/sys/sysPendings/getAllDealCount
      getData() {
        var _this = this
        const data = {
          sysId: 'ZHJD',
          token: sessionStorage.token
        }
        this.$request
          .get(`http://192.168.1.102/sys/sysPendings/getAllDealCount`, data)
          .then(res => {
            _this.xztxNum = res.data.number
          })
          .catch(error => {
            console.log(error)
          })
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
            enterable: true, //鼠标是否可以移动到tooltip区域内
         },
        radar: {
            shape: '',
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
                name: '智慧考勤',
                max: 30,
                //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: 'black',
                    showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                    showMinLabel: true, //显示最小数字，即中心点显示0
                },
            },
            { name: '请假分析', max: 30},
            { name: '出国分析', max: 30},
            { name: '事项申报', max: 30},
            { name: '用车预警', max: 30},
            // { name: '违规查询', max: 30},
            // { name: '差旅管理', max: 30},
            { name: '日志预警', max: 30},
            { name: '涉嫌违法', max: 30},
            { name: '刷卡预警', max: 30},
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
                    value: [30, 30, 30, 30, 13, 17, 30,30],
                    name: '本月',
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
              top: '15'
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
                  data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
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
                  color: '#947DFF'
                }, {
                  offset: 1,
                  color: '#4D8AFF'
                }
                ])
              },
              data: [9, 8, 11.1, 18.7, 8.3, 9.2, 21.6, 4.6, 5.4, 18.4, 10.3, 10.7]
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
              data: [19, 15, 11.1, 21.7, 34.3, 46.2, 21.6, 40.6, 45.4, 31.4, 10.3, 20.7]
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
              data: [29, 25, 25, 23, 26, 27, 28, 23, 21, 23, 20.3, 20.7]
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
          tooltip: {
            formatter: '{a} <br/>{b} : {c}分'
        },
          series: [
            {
              startAngle: 180, //开始角度 左侧角度
              endAngle: 0, //结束角度 右侧
              type: 'gauge',
              min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
              max: 10,
              radius: '100%',
			        center: ['50%', '65%'],//
              axisLabel: {
                distance: -20
              },
              axisLine: {
                lineStyle: {
                  width: 15,
                  color: [
                    [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0.1,
                      color: "#947DFF"
                    },
                    {
                      offset: 0.5,
                      color: "#947DFF"
                    },
                    {
                      offset: 1,
                      color: "#DF75FD"
                    }
                    ])]
                  ],
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              // 分割线
              splitLine: {
                show: true,
                length: 1,
                lineStyle: {
                  color: "auto"
                }
              },
              // 刻度线
              axisTick: {
                show: true,
                length: 0,
                splitNumber: 0,
                lineStyle: {
                  color: "auto"
                }
              },
              pointer: {
                width: 5,
                color: 'red'
              },
              title: {
                offsetCenter: ['-50%', '70%']
              },
              detail: { show: false },
              data: [{ value: 2, name: '' }]
            },
            {
              startAngle: 180, //开始角度 左侧角度
              endAngle: 0, //结束角度 右侧
              type: 'gauge',
              axisLabel: {
                distance: -52
              },
              min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
              max: 10,
              radius: '60%',
              center: ['50%', '65%'],//
              axisLine: {
                lineStyle: {
                  width: 15,
                  color: [
                    [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                      offset: 0.1,
                      color: "#947DFF"
                    },
                    {
                      offset: 0.5,
                      color: "#409eff"
                    },
                    {
                      offset: 1,
                      color: "#409eff"
                    }
                    ])]
                  ],
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              // 分割线
              splitLine: {
                show: true,
                length: 1,
                lineStyle: {
                  color: "auto"
                }
              },
              // 刻度线
              axisTick: {
                show: true,
                length: 1,
                splitNumber: 1,
                lineStyle: {
                  color: "auto"
                }
              },
              pointer: {
                width: 3
              },
              title: {
                offsetCenter: ['-50%', '70%']
              },
              detail: { show: false },
              data: [{ value: 6, name: '' }]
            }
          ]
    }
      radarDom3.setOption(option)
        window.addEventListener("resize", () => { radarDom3.resize();});
  },
    getRadar4() {
      let category = ['服务器数（台）'];
      let barData = [8];
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
      window.addEventListener("resize", () => { radarDom3.resize(); });
    },
    getRadar5() {
      let category = ['服务器数（台）'];
      let barData = [6];
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
                        color: '#CC00FF',
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
      window.addEventListener("resize", () => { radarDom3.resize(); });
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
          const pdata = res.data.premonth
          _this.thismonth = tdata.map((countnum) => {
            return countnum.countnum;
          })
          _this.premonth = pdata.map((countnum) => {
            return countnum.countnum;
          })
          _this.init();
        }
      })
    },
    agency(){
      alert(1)
    },
    // 从警生涯数据
    getPoliceCareer() {
      const _this = this;
      const params = {
        userId: '1D2G3F4H',
      }
      getPoliceCareer(params).then(res => {
       debugger
        if (res.success) {
          const Data = res.data
          _this.careerData = Data.reduce((prev, item) =>
            (item.career_type === '履历'
              ? [...prev, { ...item, marks: [item] }]
              : [...prev.slice(0, -1), { ...prev.slice(-1)[0], marks: prev.slice(-1)[0].marks.concat(item) }]), []
          );
          let width = _this.$refs.career_list.scrollWidth
          $(_this.$refs.career_list).animate({ scrollLeft: width }, 8000)
          for (var i = 0; i < _this.careerData.length; i++) {
            _this.marksData.push(_this.careerData[i].marks[i])
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
          }
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
    // 查询七天上班时间统计数据
    indexRecordDeatil() {
      const _this = this;
      const params = {
        userId: this.userInfo.info,
        startTime: _this.dateStart,
        endTime: _this.dateEnd

      }
      indexRecordDeatil(params).then(res => {
        console.log(res)
        if (res.success) {
          const Data = res.data
          _this.worklength = Data.map(({ worklength }) => worklength)
          _this.overtime = Data.map(({ overtime }) => overtime)
          this.clockDate = Data.map(({ clock_date }) => new Date(clock_date).toLocaleDateString().substring(5))
        }
      })
    },
    // 查询部门平均上班时间数据
    sectorAverageStatistics() {
      const _this = this;
      const params = {
        department: sessionStorage.orgId,
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
    // 查询首页日历评分数据
    findWorknotePage() {
      const _this = this;
      const params = {
        department: sessionStorage.orgId,
        startTime: _this.dateStart,
        endTime: _this.dateEnd

      }
      findWorknotePage(params).then(res => {
        console.log(res)
        if (res.success) {
          // const Data = res.data
          // _this.averageData = Object.keys(Data).sort().map(item => Data[item]);
          // _this.init();
        }
      })
    },  
    // 个人今日评分  部门评分
    indexCalendar(){
      const _this = this;
      const params = {
        userId: '4616',
        department: '831',
        startTime: '2020-01-01',
        endTime: '2020-01-31'

      }
      indexCalendar(params).then(res => {
        debugger
        console.log(res)
        if (res.success) {
          // const Data = res.data
          // _this.averageData = Object.keys(Data).sort().map(item => Data[item]);
          // _this.init();
        }
      })
      
    },
  }
}
</script>
<style lang="stylus" scoped>
  @import '../css/pseudo_classes.css';
  @import '../css/assembly.css';
  @import '../css/hover-min.css';
  @import '../css/media.css';
.person_home{
  /* background: #f2f5f7; */
  height: 100%;
  width: 100%;
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
    margin-top: 39px;
    color: blue;
    margin-left: 19px;
    line-height: 29px;
}
.p_title{
  float: left;
   width: 10%;
  margin-top: 28px;
}
.person_career{
  width: 100%;
  height: calc(88% - 30px);
  overflow: auto hidden; 
  display: flex;
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
  width: 136px;
   margin-top: 28px;
}
    /* 定义滚动条样式 */
    ::-webkit-scrollbar {
    /* width: 16px; */
    height: 6px;
    background-color: rgb(238, 236, 236);
  }
   
  /*定义滚动条轨道 内阴影+圆角*/
  /* ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
    border-radius: 5px;
    background-color: rgba(240, 240, 240, .5);
  } */
   
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(19, 13, 13, 0.5);
    background-color: rgba(19, 13, 13, 0.5);
    width: 20px;
    height: 20px;
  }
  /* .scroll-list ul{
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0 0.1rem;
      margin-bottom: -.2rem;
      overflow: -moz-scrollbars-none;
      overflow: -moz-scrollbars-none;
  } */
  .scroll-list ul::-webkit-scrollbar{
      display: none;
  }
.p_node{
  /* float: left; */
  width: 136px;
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
  height: 74%;
  
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
    font-size:16px;
    font-weight:bold;
    line-height:30px;
    /* border-left:5px solid #409eff; */
    padding-left: 5px
  }
  .fengxian_body{
    float:left;
    width:100%;
    height:50%;
  }
  .p_warn{
    height: 50%;
    /* float: left; */
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
    height: 20%;
  }
  .pli{
    width: 25%;
    /* height: 100%; */
    display: inline-block;
    margin-top: 7%;
  }
  .h32{
    text-align: center;
  }
  .pnum{
    font-weight: 700;
    font-size: 23px;
    color: red;
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
    font-weight: 700;
}
.ptotal{
  margin: 10px;
  color: red;
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
  width: 74%;
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
  width: 24%;
    height: 100%;
    float: left;
}
.p_rscore{
  width: 76%;
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
    float: left;
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
    
  /* .left-score-image {
        width: 100% !important;
        height: 100% !important;
    } */
</style>
