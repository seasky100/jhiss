/* eslint-disable no-undef */
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
        <el-col :xs="12" :sm="8" :md="8" :lg="6.5" :xl="6.5">
          <div class='person_left'>
              <div class="person_title">
                  <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                  风险预警
                </div>
                <div class="fengxian_body radar" id="radar"></div>
                <div class='p_warn'>
                  <div class='ptop'>
                    <div class='pli' v-for="(item,index) in warnList" @click='warncon' :key="index">
                      <div v-if='item.num == 0'>
                          <div class='h32 warn'><span class='wnum'>{{item.num}}</span></div>
                      </div>
                      <div v-else>
                          <div class='h32 warn'><span class='pnum'>{{item.num}}</span></div>
                      </div>
                      <div class='h32 warn'><span class='pname'>{{item.name}}</span></div>
                    </div>  
                  </div>
                  <div class='pfoot'>
                    <div v-if='countotal>=1'>
                        <div class='pft'><img style='margin-right: 10px;height: 19px;' src='../utils/img/cry.png' />当前<span class='ptotal' >{{countotal}}</span>项风险内容，请注意！！！</div>
                    </div>
                    <div v-else>
                        <div class='pft'><img style='margin-right: 10px;height: 19px;' src='../utils/img/smile.png' />当前<span class='ntotal' >{{countotal}}</span>项风险内容，请保持！！！</div>
                    </div>
                    
                  </div>
                </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="11" :xl="11">
          <div class='person_center'>
            <div class='p_top'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                    考勤分析
                  </div>
                <div id='kao' class='p_attendance'></div>
            </div>
            <div class='p_foot'>
                <div class="person_title">
                    <img style='margin-top: 3px;' src='../utils/img/home_round_bar@2x.png' /> 
                    绩效评价
                  </div>
                  <div class='p_evaluate' style="float : left;height: calc(100% - 70px);width: 45%;border-right: 1px solid rgb(228, 233, 243);">
                    <div style="height: 10%;">
                      <select class='p_select' v-model='value' >
                        <option
                        v-for='item in options2'
                        :key='item.value'
                        :label='item.label'
                        :value='item.value'>
                      </option>
                      </select>
                    </div>
                    <div id='gauge'  class='p_gauge' ></div>
                  </div>
                  <div class='p_heright'>
                    <div style="height:10%;">
                      <div class='p_change' @click='pchange' >切换</div>
                    </div>
                    <div v-show='change' style="height:90%; margin-top: 2em;">
                    <div style="height:22%;display:flex">
                      <div class='p_list'>层级履职清单：</div>
                      <el-progress style="width: 70%" :color="customColor1"  :stroke-width="10" :percentage="70">正面评价清单</el-progress>
                    </div>
                    <div style="height:22%;display:flex">
                      <div class='p_list'>正面争优清单：</div>
                      <el-progress style="width: 70%" :color="customColor2" :stroke-width="10" :percentage="90" ></el-progress>
                    </div>
                    <div style="height:22%;display:flex">
                      <div class='p_list'>负面扣分清单：</div>
                      <el-progress style="width: 70%" :color="customColor3" :stroke-width="10" :percentage="80" ></el-progress>
                    </div>
                    <div style="height:22%;display:flex">
                      <div class='p_list'>季度评价清单：</div>
                      <el-progress style="width: 70%;" :color="customColor4" :stroke-width="10" :percentage="70" ></el-progress>
                    </div>
                  </div>
                  <keep-alive>
                    <div v-show='!change' ref="elementDiv" style="width:100%;height:calc(100% - 20px);">
                      <svg ref="element" :width="svgWidth" :height="svgHeight" font-family="sans-serif" font-size="14" text-anchor="middle"></svg>
                    </div>
                  </keep-alive>
                </div>
              </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="6.5" :xl="6.5">
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
                      <div class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: 4em; height: 4em; background: #235FF6" title='待办箱'>
                        <span style="font-size: 1.5em">{{xztxNum}}</span>
                      </div>
                    </div>
                  </div> 
                  <span style="color: #8092A8; font-size: 14px; font-weight: 400">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='jxh' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">队伍精细化</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.4em; height: 5.4em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4em; height: 4em; background: #8674f6">
                      <div  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4em'; height: 4em; background: #8674f6" title='待办箱'>
                        <span style="font-size: 1.5em">1</span>
                      </div>
                    </div>
                  </div>
                  <span style="color: #8092A8; font-size: 14px; font-weight: 400">待办</span>
                </div>
                <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
                <div @click='warncon' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                  <span class='flex flex-align-center txt-bold cursor-pointer' style="font-size: 14px;">层级关系</span>
                  <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.4em; height: 5.4em; margin: 0.5em 0; background: #F4F1FF">
                    <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4em; height: 4em; background: #F09B38">
                      <div  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                        style="width: '4em'; height: 4em; background: #F09B38" title='待办箱'>
                        <span style="font-size: 1.5em">{{countotal}}</span>
                      </div>
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
        change: true,
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
        ntoday: this.$dayjs(new Date()),
        nt7:'',
        daynum: 7,
        total: 0,
        userscore: '',
        deptscore: '',
        maxValue: 30,
        warnData:[30, 30, 30, 30, 30, 30, 30,30],
        xztxNum: 0,
        countotal: 0,
        countotal1: 0,
        infoData:[],       
        // userId:'',
        userInfo:[],
        timer:'',
        timer2:'',
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
        options2:[{value:'2020',label:'2020年'},{value:'2019',label:'2019年'}],
        value:"2020",
        warnList:[
        { name:'遵章守纪',type: '13',num:0},
        { name:'异常查询',type: '4',num:0},
        { name:'涉嫌违法',type: '6',num:0},
        { name:'护照保管',type: '8',num:0},
        { name:'日志业绩',type: '5',num:0},
        { name:'效能提醒',type: '3',num:0},
        { name:'违规用车',type: '7',num:0},
        { name:'考勤预警',type: '1',num:0}
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
        svgWidth: 260,
        svgHeight: 180,
    }
  },
  // created(){  
  // },
  beforeDestroy(){
    clearInterval(this.timer2)
  },
    mounted() {  
      this.setTimer2(); 
      this.setTimer(); 
      if(this.total == 3){
        clearInterval(this.timer)
        alert(44444)
      }
      this.userInfo = JSON.parse(sessionStorage.userInfo)
      this.getData();
      // this.getUserListByUserId();
      this.allWarnByType();
      this.sevenday();
      this.getPoliceCareer();
      this.indexRecordDeatil();
      this.sectorAverageStatistics();
      this.indexCalendar();
      // this.initCircle()
    },
    // watch: {
    //   'countotal' : (newVal,oldVal) =>{ 
    //     // this.$notify({
    //     //   title: '提示',
    //     //   message: '您有新的信息',
    //     //   duration: 0
    //     // })
    //   }     
    // },
    methods: {
      init() {
        this.getRadar()
        this.getRadar2()
        this.getRadar3()
      },
    pchange(){
      const width = this.svgWidth
      const height = this.svgHeight
      console.log(width, height)
      this.change = !this.change
      if(!this.change){
        this.$nextTick(() => {  
          this.initCircle(width,height)
        })
      }
      if(this.$refs.elementDiv.offsetWidth != 0){
        this.svgWidth = this.$refs.elementDiv.offsetWidth
        this.svgHeight = this.$refs.elementDiv.offsetHeight - 20
      }
    },
    initCircle(width,height) {
      const data = [
        { name: "争优", count: 6 }, 
        { name: "出勤", count: 10 },
        { name: "日志", count: 10 },
        { name: "重点", count: 20 },
        { name: "共性", count: 20 },
        { name: "业绩", count: 40 },
      ]      
      d3.select("svg").selectAll("g").remove();//清空作图区域
      // const svg = d3.select("svg"),width = +svg.attr("width"),height = +svg.attr("height");
      const svg = d3.select("svg")  
      const format = d3.format(",d");
      // var color = d3.scaleOrdinal(d3.schemeCategory20c);
      const color = ["#FF9700", "#416DF6","#63C073", "#8B6FFE", "#8B6FFE", "#FF9700", "#416DF6","#63C073", "#8B6FFE", "#8B6FFE", "#F34252"];//自定义颜色
      const pack = d3.pack().size([width, height]).padding(1.5);
      var num, pid;
      const root = d3.hierarchy({ children: data })
        .sum((d) => { return d.count; })
        .each((d) => {
          if (d.parent == null) { num = d.value }
          if (id == d.data.name) {
            var id
            d.id = id;
            d.class = id;
            // pid = num / (d.value);
            // d.colorPick = pid > 12 ? 5 : (pid > 10 ? 4 : (pid > 8 ? 3 : (pid > 5 ? 2 : 1)));
          }
        });
      const node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")"; });
      node.append("circle")
        .attr("id", (d) => { return d.id; })
        .attr("r", (d) => { 
          // console.log(d) 
          return d.r; 
        })
        .style("fill", (d) => { return color[Math.round(Math.random()*10)]; });

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
       // clickBubble(d.id);//自定义点击事件
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
                  returnStr += params.name[i]+ '：'+(this.maxValue - data[i])+'<br/>'           
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
                  name: '遵章守纪',
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
              { name: '异常查询', max: this.maxValue},
              { name: '涉嫌违法', max: this.maxValue},
              { name: '护照保管', max: this.maxValue},
              { name: '日志业绩', max: this.maxValue},
              { name: '效能提醒', max: this.maxValue},
              { name: '违规用车', max: this.maxValue},
              // { name: '异常查询', max: 30},
              // { name: '差旅管理', max: 30},
                     
              { name: '考勤预警', max: this.maxValue},
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
                    name: ['遵章守纪','异常查询 ','涉嫌违法','护照保管','日志业绩','效能提醒','违规用车','考勤预警'],
                    // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                            color: '#409eff',
                            // lineStyle: {
                            //     width: 1,
                            //     color: '#409eff',
                            // },
                        },
                    },
                  },
              ],
          }],
          }
          radarDom.setOption(option)
          $(window).resize(() => {//这是能够让图表自适应的代码
            radarDom.resize();
          }); 
        },
        getRadar2(){
          let radarDom2 = this.$echarts.init(document.getElementById('kao'))
          var colors = ['#8ec6ad', '#947DFF', '#386db3'];
          let option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    label: 'cross'
                },
              formatter:  (params) => {
                const data = params
                var returnStr = ''
                for (let i = 0; i < data.length; i++) {
                  returnStr += data[i].seriesName + '：' + data[i].data + '小时' + '<br/>'
                }
                return returnStr;
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
                    data: this.clockDate
                } 
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel:{
                    }
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
                    color: "green",//折线点的颜色
                    lineStyle: {
                      color: "green"//折线的颜色
                    }
                  }
                },
                data: this.averageData
              }
            ]
      }
        radarDom2.setOption(option)
            //折线图宽高自适应
            window.onresize = () => {
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
      barMaxWidth: 12, //圆环宽度
      radiusAxis: { //隐藏坐标
          show: false,
          type: 'category',
      },
      polar: { //设置圆环位置和大小
          center: ['50%', '50%'],
          radius: '100'
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
              radius: '58%',
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
              //  fontWeight: 'bolder',
              distance:-53,
              color: '#8593a7',
              shadowColor: 'green', //默认透明
              shadowBlur: 15,
              formatter:(b)=>{
                  var s=Number((b/3).toFixed(0))
                  if(s>0){
                  return  ""+(s)+'季度'+'\n100'
                      
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
                      fontSize: 10
                  },
                  offsetCenter: ["10", '-25%'] //位置偏移
              },
              detail: { //仪表盘数值
                formatter:  (params) => {
                  return ['{a|' + params + '}',
                    '{b|A}'].join('\n')
                },
                rich: {
                  a: {
                    color: '#155bff',
                    lineHeight: 30,
                    fontSize: 25
                  },
                  b: {
                    color: '#fff',
                    backgroundColor: '#155bff',
                    lineHeight: 30,
                    height: 20,
                    fontSize: 10,
                    width: 30,
                    borderRadius: 10

                  }
                },
                  color:'#155bff',
                  offsetCenter: ["0", '5%'],
              },
              data: [{
                  value: 98,
                  name: ''
              }]
          }
      ]
  }
    radarDom3.setOption(option)
      window.addEventListener("resize", () => { radarDom3.resize();});
},   
      setTimer2() { // 
        this.timer2 = setInterval(() => {
          this.allWarnByType();
        }, 3000)
      },
      // 查询分类风险提醒数据
      allWarnByType() {
        const _this = this;
        const params = {
          userId: sessionStorage.userId
        }
        allWarnByType(params).then(res => {
          if (res.success) {
            const tdata = res.data.thismonth
            const list = _this.warnList
            let total = 0
            if (tdata) {
              const array = [
                { name: '遵章守纪', type: '13', value: 30 },
                { name: '异常查询', type: '4', value: 30 },
                { name: '涉嫌违法', type: '6', value: 30 },
                { name: '护照保管', type: '8', value: 30 },
                { name: '日志业绩', type: '5', value: 30 },
                { name: '效能提醒', type: '3', value: 30 },
                { name: '违规用车', type: '7', value: 30 },
                { name: '考勤预警', type: '1', value: 30 }
              ]
              for (let i = 0; i < tdata.length; i++) {
                for (let j = 0; j < array.length; j++) {
                  if(tdata[i].warn_type ==array[j].type ){
                    array[j].value = array[j].value - tdata[i].countnum 
                  }                                
                }
                for (let k = 0; k < list.length; k++) {
                  if(tdata[i].warn_type == list[k].type){
                    list[k].num  = tdata[i].countnum
                    total += tdata[i].countnum
                  }                
                }
              }
              _this.countotal  = total
              // _this.countotal1++
              // _this.$store.commit('countotal',_this.countotal)
              let aa = localStorage.getItem('countotal')
              if(aa != _this.countotal){
                localStorage.setItem('countotal', _this.countotal)
              }
              _this.warnData = array.map((value) => {
                return value.value;
              })
            }
            _this.init();
          }
        })

      },
    // 根据用户ID查询所有下属用户
		// getUserListByUserId() {
    //     const _this = this;
    //     const params = {
    //       userId: _this.id 
    //     }
    //     getUserListByUserId(params).then(res => {
    //       if (res.success) {
		// 				_this.userIds = res.data.map(item => item.userInfo.info).join()
		// 				_this.countWorkNote();
    //       }
    //     })
    //   },
    // // 工作日志统计
		// countWorkNote(){
		// 	const _this = this
		// 	countWorkNote(
    //     Object.assign(
    //       {
		// 				user_id: _this.userIds
		// 				// user_id: '2020'
    //       },
    //     )
    //   ).then(res => {
		// 		// console.log(res)
		// 		if(res.success){
		// 			// _this.$message.success('成功！')
		// 			// _this.labelList[0].count = res.data.allnote
		// 			_this.cjnum = res.data.noaudit
		// 			// _this.labelList[2].count = res.data.audited
		// 		}
		// 	})
		// },
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
      // cjgx(){
      //   this.$router.push({path:'/HierEvaluation'})
      // },
      // 协作提效总数  http://192.168.1.102/sys/sysPendings/getAllDealCount
      getData() {
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
      setTimer(){ //动态展示近90天的考勤数据
        this.timer = setInterval(() => {
          // this.ntoday = this.$dayjs(new Date());
        this.nt7 = this.ntoday.subtract(this.daynum, 'day');
        this.dateStart = this.nt7.format('YYYY-MM-DD');
        this.dateEnd = this.ntoday.format('YYYY-MM-DD');
        // this.ntoday = this.nt7
        this.daynum = this.daynum + 10
        this.total++
        if (this.total == 9) { // 清除定时器
            clearInterval(this.timer)
          }
        this.indexRecordDeatil();
        this.sectorAverageStatistics();
        },2000)
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
        const _this = this;
        const params = {
          department: _this.orgId,
          startTime: _this.dateStart,
          endTime: _this.dateEnd
  
        }
        sectorAverageStatistics(params).then(res => {
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
      margin-bottom: 10px;
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
    margin-bottom: 10px;
  }
  .p_change{
    text-align: -webkit-center;
    margin-right: 1em;
    float: right;
    width: 55px;
    color: #8593a7;
    font-size: 12px;
    border-radius: 20px;
    border: 1px solid #f1f2f7;
    height: 23px;
    cursor: pointer;
  }
  .p_foot{
    width: 100%;
    background-color: white;
    height: calc(50% - 10px);
    margin-bottom: 15px;
  }
  /* .person_main{
    height: 40% !important;
  }
  .person_footer{
    background: white;
    height: 40% !important;
  } */

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
    .p_select{
      width: 67px;
      height: 26px;
      float: right;
      border: 1px solid #f1f2f7;
      border-radius: 5px;
      margin-right: 1.5em;
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
      margin-top: 3%;
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
    height: 82%;
    width: 100%;
    margin-top: 1.5em;
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
  /* .pbar{
    height: 100%;
    width: 100%;
  } */
  .p_heright{
    height: calc(100% - 70px);
      /* float: left; */
    width: 54%;
    float: right;
    margin-top: 2em;
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
  .p_list{
    width: 41%;
    color: #8593A7;
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
  </style>
  