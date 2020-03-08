<template>
    <div class="person_home">
      <div class="police_career p_head">
        <div class="person_title p_clear">
          从警生涯
        </div>
        <div class="w_full"  style="height: 190px; width: 100%;float: left;">
            <div style=" width: 5%;height: calc(100% - 30px);margin-left: 15px;float: left;">
            <img src='../utils/img/tree_20191225154138.png' class='mb-auto' style="height: 5.5em" />
          </div>
            <div ref='career_list' style="overflow: auto;height: 100%;overflow-y: hidden;" @mouseenter="penter()" @mouseleave="pleave()"> 
              <div style="width: 91%;height: calc(100% - 30px);display: -webkit-inline-box!important; margin-bottom: 14px;">
                <div class='p_card' v-for="(item,index) in careerData" :key="index" @click="agency(item,index)" > <!--:class='index==selected?"selected":""'-->
                    <img src='../utils/img/home_career_reward_unselected@2x.png' style="float: right;margin: 10px;"  />
                    <div class='p_time'>{{item.endtime}}</div>
                    <div class='p_name'>{{item.career_desc}}</div>
                    <div class="timeLine" style="margin-top: 6px;">
                        <div class="ul_box">
                            <ul class="my_timeline" ref="mytimeline">
                                <li class="my_timeline_item" >
                                    <!--圈圈节点-->
                                    <div class="my_timeline_node" style = "background-color: #e4e7ed; width: 28px; height: 28px" @click="changeActive(index)" :class="{active: index == timeIndex}"></div>
                                    <!--线-->
                                    <div class="my_timeline_item_line"></div>
                                    <!--标注-->
                                    <div class="my_timeline_item_content" >
                                        {{item.marks[0].happen_time}}至{{item.marks[0].endtime}}{{item.dept_name}}
                                        <!-- {{item.happen_time}}至{{item.endtime}}就任于{{item.dept_name}} -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
              </div> 
          </div>   
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
                  <!-- <span class='ml6 color-grey'>当前0项风险内容，请继续保持！</span> -->
                </div>
                <div class='flex flex-justify-center'>
                    <div style="width: 39%;">
                      <div class='h12 w12 r-half inline-block' style="background: #1F77B4"/>
                      <span class='ml8'>本月分析</span>
                    </div>
                    <div style="width: 36%;">
                      <div class='h12 w12 r-half inline-block' style="background: #FF7F0E" />
                      <span class='ml8'>上月分析</span>
                    </div>
                  </div>
            <div class='flex flex-column flex-grow flex-justify-between' style="margin-top: 2em;text-align: center">
              <div class='flex-justify-between h24' style="line-height: 2.5em">
                <div class='flex-inline' style="width: 40%">
                  <span>智慧考勤</span>
                  <span style="margin: 0 0.5em">{{thismonth[0]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>请假分析</span>
                  <span style="margin: 0 0.5em">{{thismonth[1]||'-'}}</span>
                  <span>项</span>
                </div>
                
              <div class='flex-justify-between h24' style="line-height: 2.5em">
                <div class='flex-inline' style="width: 40%">
                  <span>出国预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[2]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>事项申报</span>
                  <span style="margin: 0 0.5em">{{thismonth[3]||'-'}}</span>
                  <span>项</span>
                </div>
              </div>
              <div class='flex-justify-between h24'>
                <div class='flex-inline' style="width: 40%">
                  <span>用车预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[4]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>违规查询</span>
                  <span style="margin: 0 0.5em">{{thismonth[5]||'-'}}</span>
                  <span>项</span>
                </div>
              </div>
              <div class='flex-justify-between h24'>
                <div class='flex-inline' style="width: 40%">
                  <span>差旅预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[6]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>日志预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[7]||'-'}}</span>
                  <span>项</span>
                </div>
              </div>
              <div class='flex-justify-between h24'>
                <div class='flex-inline' style="width: 40%">
                  <span>涉嫌违法</span>
                  <span style="margin: 0 0.5em">{{thismonth[8]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>刷卡预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[9]||'-'}}</span>
                  <span>项</span>
                </div>
              </div>
              <div class='flex-justify-between h24'>
                <div class='flex-inline' style="width: 40%">
                  <span>就餐预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[10]||'-'}}</span>
                  <span>项</span>
                </div>
                <div class='flex-inline' style="width: 40%">
                  <span>审批预警</span>
                  <span style="margin: 0 0.5em">{{thismonth[11]||'-'}}</span>
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
              <div @click='xztxt' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                <span class='flex flex-align-center txt-bold cursor-pointer' style="height: 2.4em">协作提效</span>
                <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #E8EFFF">
                  <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #235FF6"> 
                    <!-- <router-link to="/PersonalHome2" ><div class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none' style="width: 4.4em; height: 4.4em; background: #235FF6" title='待办箱'><span style="font-size: 1.5em">2</span></div></router-link>                  -->
                    <Link class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
                      style="width: 4.4em; height: 4.4em; background: #235FF6" title='待办箱'>
                      <span style="font-size: 1.5em">22</span>
                    </Link>
                  </div>
                </div>
                <span style="color: #8092A8">待办</span>
              </div>
              <div  style="width: 0; border: 0.5px solid #E4E9F3; height: 11.428em; margin: auto 0"/>
              <div @click='jxh' class='flex flex-column flex-align-center flex-grow cursor-pointer'>
                <span class='flex flex-align-center txt-bold cursor-pointer' style="height: 2.4em">队伍精细化</span>
                <div class='r-half flex flex-align-center flex-justify-center' style="width: 5.8em; height: 5.8em; margin: 0.5em 0; background: #F4F1FF">
                  <div class='r-half flex flex-align-center flex-justify-center color-fff' style="width: 4.4em; height: 4.4em; background: #8674F6">
                    <!-- <router-link to="/PersonalHome2" ><div class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none' style="width: 4.4em; height: 4.4em; background: #8674F6" title='待办箱'><span style="font-size: 1.5em">2</span></div></router-link> -->
                    <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
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
                  <Link  class='r-half flex flex-align-center flex-justify-center color-fff txt-deco-none'
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
          <div class='' style="width: 61%;float: left;height: 90%">
                <el-calendar v-model="value" show-date-only :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="'结束时间'" :lang="lang" :position="position" :changePane="dayClick" :pane="1" :range-bus="getBus" :range-status="1"></el-calendar>
            </div>
            <div class='' style="float: right;height: 90%;width: 39%;position: relative">
              <div id='gauge' style="height: 63%;margin-top: 10%;" class='' ></div>
              <span class='txt-bold' style="color: rgb(35, 95, 246);text-align: center;position: absolute; margin: 0 auto;width: 100%;margin-top: -35px">月平均分</span>
              </div>
         </div>
        <div class="fengxian" style="width:32.3%;margin-left:0.7%;">
          <div class="person_title">
            考勤情况
          </div>
            <div id='kao' class='mt-auto' style="height: 90%"></div>
            <div class='p_foot' style="height: 10%">
                <div style=" width: 24%;float: left;margin-left: 48px;margin-top: 10px;">上班：<span style=" color: #9363FF">{{tjData[0]}}小时</span></div>
                <div style="width: 20%;float: left;margin-top: 10px;">加班：<span style=" color: #F09B38">{{tjData[2]}}小时</span></div>
                <div style=" width: 20%;float: left;margin-top: 10px;">请假：<span style=" color: #235FF6">{{tjData[1]}}小时</span></div>
                <div style=" width: 20%;float: left;margin-top: 10px;">出差：<span style=" color: #235FF6">{{tjData[3]}}小时</span></div>
            </div>   
        </div>
        <div class="fengxian" style="width:33.3%;margin-left:0.7%;">
          <div class="person_title">
            快速入口
          </div>
          <div class='flex flex-grow w-full h-full' style="margin-top: 0.2em">
            <div class='flex flex-column flex-grow' style="padding: 0.5em">
              <div class='flex flex-grow w-full'>
                <router-link to='/HierEvaluation' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                   <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_work_log@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">层级评价</span>
                </router-link>
                <router-link to='/talks' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 0">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_overtime_request@2x.png' /> <!--src='/images/home_entrance_work_log@2x.png' -->
                 <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">谈心谈话</span>
               </router-link>
                <router-link to='/organizationRequest' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 1px 1px 1px">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_receipt_notification@2x.png' /><!--src='/images/home_entrance_receipt_notification@2x.png'  --> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">事项申报</span>
                </router-link>
                <router-link to='/IndividualReport' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 0 0 1px 1px">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_items_report@2x.png'/><!--src='/images/home_entrance_items_report@2x.png' --> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">事项即报</span>
                </router-link>
              </div>
              <div class='flex flex-grow w-full'>
                <router-link to='/xztx/document' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 0">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_document_flow@2x.png' /><!--src='/images/home_entrance_document_flow@2x.png' --> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">公文流转</span>
                </router-link>
                <router-link to='/xztx/approval' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_approval_items@2x.png' /><!-- src='/images/home_entrance_approval_items@2x.png'--> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">审批事项</span>
                </router-link>
                <router-link to='/xztx/travel' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 1px 0 1px">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_travel_application@2x.png' /><!--src='/images/home_entrance_travel_application@2x.png' --> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">差旅申请</span>
                </router-link>
                <router-link to='' class='flex-inline flex-column flex-grow flex-align-center flex-justify-center txt-deco-none' style="border: solid #E4E9F3; border-width: 1px 0 0 1px">
                  <img class='cursor-pointer' style="width: 2.4em" src='../utils/img/home_entrance_expense_request@2x.png' /><!--src='/images/home_entrance_expense_request@2x.png' --> 
                  <span class='cursor-pointer' style="margin-top: 1.428em; color: #121518">用车申请</span>
                </router-link>
              </div>
          </div>
        </div>      
      </div>
    </div>
    </div>
  </template>
  <script>
  import { allWarnByType,indexRecordDeatil,sectorAverageStatistics,indexRecordCountDeatil } from '@/api/warn.js';
  import { getPoliceCareer } from '@/api/user-server.js';
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
        value: new Date(),
        timer:'',
        careerData:[],
        marksData:[],
        selected: 0,
        timeIndex: 0,
        warnList:[
          { name:'出国分析',name2:'事项申报'},
          { name:'用车预警',name2:'违规查询'},
          { name:'差旅管理',name2:'日志预警'},
          { name:'涉嫌违法',name2:'刷卡预警'},
          { name:'就餐预警',name2:'审批预警'},
          ]
      }
    },
    mounted() {
      this.$nextTick(() => {
            // 点击前一个月
            let prevBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)');
            prevBtn.addEventListener('click',() => {
            })
          })
      this.getPoliceCareer();
      this.sevenday();
      this.indexRecordCountDeatil();
      this.sectorAverageStatistics();
      this.indexRecordDeatil();
      this.allWarnByType();
    },
    methods: {
      init() {
        this.getRadar()
        this.getRadar2()
        this.getRadar3()
      },
      dayClick () {
        // console.log(date);
        // console.log(dateStr);
        // console.log(this.value);
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
                    value: this.thismonth,
                    name: '本月',
                    // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                            color: '#1F77B4',
                            lineStyle: {
                                width: 1,
                                color: '#1F77B4',
                            },
                        },
                    },
                },
                 {
                    value: this.premonth,
                    name: '上月',
                    itemStyle: {
                        normal: {
                          color: '#FF7F0E',
                          lineStyle: {
                              color: '#FF7F0E',
                          },
                      },
                    },
                },
            ],
        }],
        }
        radarDom.setOption(option)
      },
      getRadar2(){
        let radarDom2 = this.$echarts.init(document.getElementById('kao'))
        let option = {
          tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      legend: {
          padding:[30,0,0,0],
          data: ['加班', '上班', '部门平均']
      },
      grid: {
          // top: '2%',
          left: '3%',
          right: '5%',
          bottom: '1%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
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
              type: 'bar',
              barWidth : 20,
              color: '#F09B38',
              stack: '广告',
              data: this.overtime
          },
          {
              name: '上班',
              type: 'bar',
              color: '#9363FF',
              stack: '广告',
              data: this.worklength
          },
          {
              name: '部门平均',
              type: 'line',
              color: '#235FF6',
              stack: '广告',
              data: this.averageData
          },
      ]
    }
      radarDom2.setOption(option)
  },
      getRadar3() {
        let radarDom3 = this.$echarts.init(document.getElementById('gauge'))
        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} {c}分"
          },
          series: [
            {
              min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
              max: 10,
              name: '月度评分',
              // radius:'20%',
              type: 'gauge',
              detail: { formatter: '{value}' }, //仪表盘显示数据
              axisLine: { //仪表盘轴线样式
                lineStyle: {
                  width: 12
                }
              },
              splitLine: { //分割线样式
                length: 10
              },
              data: [{ value: 2, name: '' }],
  
              markPoint: {
                symbol: 'circle',
                symbolSize: 5,
                data: [
                  //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                  { x: 'center', y: 'center', itemStyle: { color: '#FFF' } }
                ]
              },
            }
          ]
        }
        radarDom3.setOption(option)
      },
      // 查询分类风险提醒数据
      allWarnByType() {
        const _this=this;
        const params = {
          userId: '5ba98b66cd3549b9b92ea8723e89207e'
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
      // 查询七天上班时间统计数据
      indexRecordDeatil() {
        const _this=this;
        const params = {
          userId: '5ba98b66cd3549b9b92ea8723e89207e',
          startTime:_this.dateStart,
          endTime:_this.dateEnd
  
        }
        indexRecordDeatil(params).then(res => {
          console.log(res)
          if (res.success) {
            const Data =res.data
            _this.worklength = Data.map(({worklength}) => worklength)
            _this.overtime = Data.map(({overtime}) => overtime)
            this.clockDate = Data.map(({clock_date}) => new Date(clock_date).toLocaleDateString().substring(5))
            _this.init();
          }
        })
      },
      // 查询上班时间统计数据
      indexRecordCountDeatil() {
        const _this = this;
        const params = {
          userId: '5ba98b66cd3549b9b92ea8723e89207e',
          startTime: _this.dateStart,
          endTime: _this.dateEnd
  
        }
        indexRecordCountDeatil(params).then(res => {
          console.log(res)
          if (res.success) {
            _this.tjData = res.data.map(({ worklength }) => worklength)
          }
        })
      },
       // 查询部门平均上班时间数据
      sectorAverageStatistics() {
        const _this=this;
        const params = {
          department: '机关纪委',
          startTime:_this.dateStart,
          endTime:_this.dateEnd
  
        }
        sectorAverageStatistics(params).then(res => {
          console.log(res)
          if (res.success) {
            const Data = res.data
            _this.averageData =Object.keys(Data).sort().map(item => Data[item]);
            _this.init();
          }
        })
      },
    //   agency(item, key) {    //     
    //     this.selected = key;
    // },
      // 从警生涯数据
      getPoliceCareer(){
        const _this=this;
        const params = {
          userId: '1D2G3F4H'
        }
        getPoliceCareer(params).then(res => {          
          console.log(res)
          if (res.success) {
            const Data = res.data
            _this.careerData = Data.reduce((prev, item) => 
            (item.career_type === '履历'
            ? [...prev, {...item, marks: [item]}]
            : [...prev.slice(0, -1), {...prev.slice(-1)[0], marks: prev.slice(-1)[0].marks.concat(item)}]), []
          );
          let width = this.$refs.career_list.scrollWidth
          $(this.$refs.career_list).animate({scrollLeft:width },8000)
          for(var i=0; i<_this.careerData.length; i++){
            _this.marksData.push(_this.careerData[i].marks[0])
            _this.careerData[i].marks[0].happen_time = new Date(_this.careerData[i].marks[0].happen_time).toLocaleDateString()
            _this.careerData[i].marks[0].endtime = new Date(_this.careerData[i].marks[0].endtime).toLocaleDateString()
             _this.careerData[_this.careerData.length-1].marks[0].endtime = "至今"
             _this.careerData[_this.careerData.length-1].endtime = "至今"
          }
        }
      })
    },
      jxh(){
        const userInfo = JSON.parse(sessionStorage.userInfo)
        const id= userInfo.policeCode
        this.$router.push({path:'/PersonalHome2',query:{cardId:id}})
      },
      xztxt(){
        const token = sessionStorage.token
        this.$router.push({path:'/PersonalHome2',query:{token:token}})
      },
      changeActive(index) {
              this.timeIndex = index;
          },
          moveLeft()  {
              let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
              let listNum = 0;
              if(marginLeft <= 10 && (marginLeft >= -650)){
                  this.$refs.mytimeline.style.marginLeft = marginLeft - 220 + 'px';
              }
          },
          moveRight() {
              let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
              if(marginLeft < (-200)){
                  this.$refs.mytimeline.style.marginLeft = marginLeft + 220 + 'px';
              }
          },
      // change(data){
      //   alert(data)
      //   //:style="[{backgroundColor:isCollapse?'#409eff':'#f1f5fb'}]"
      //   // this.isCollapse[data] = !this.isCollapse[];
  
      // },
      sevenday(){
        const today = this.$dayjs(new Date());
        const t7 = today.subtract(7, 'day');
        this.dateStart = t7.format('YYYY-MM-DD');
        this.dateEnd = today.format('YYYY-MM-DD');
      }
  
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
    /* overflow auto; */
  }
  .police_career{
    height: 220px;
    background:#fff;
    margin-bottom:15px;
  }
    /* 定义滚动条样式 */
    ::-webkit-scrollbar {
    /* width: 16px; */
    height: 6px;
    background-color: rgb(187, 179, 179);
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
    background-color: rgba(240, 240, 240, .5);
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
  .p_card{
      width: 200px;
      height: 85px;
      background-color: #F1F5FB;
      border-left: 4px solid #409EFF;
      border-top-right-radius: 19px;
      border-bottom-right-radius: 19px;
      margin-left: 19px;
  }
  .fengxian{
    float:left;
    background :#fff;
    height:100%;
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
    border-left:5px solid red;
    padding-left: 5px
  }
  .p_clear{
    margin-bottom: 13px;
  }
  .p_time{
    margin: 10px;
      color: #409eff;
  }
  .p_name{
    margin: 17px 0px 0px 10px;
    color: #409eff;
  }
  .my_timeline_prev, .my_timeline_next {
      float: left;
      display: inline-block;
      background-color: #fff;
      cursor: pointer;
  }
  .p_head{
    height: 266px;
  }
  .my_timeline_prev {
      width: 200px;
      float: left;
  }
  .my_timeline_next {
      width: 34px;
      margin-left: -22px;
  }
  .ul_box {
    display: inline-block;
    /* float:left; */
  }
  .my_timeline_item {
      display: table-cell;
      /* width: 220px; */
  }
  .my_timeline_node {
      box-sizing: border-box;
      border-radius: 50%;
      cursor: pointer;
  }
  .my_timeline_node.active {
      background-color: #fff !important;
      border: 6px solid #f68720;
  }
  .my_timeline_item_line {
      width: 100%;
      height: 10px;
      margin: -14px 0 0 28px;
      border-top: 2px solid #E4E7ED;
      border-left: none;
  }
  .my_timeline_item_content {
      /* margin: 10px 0 0 -10px; */
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
    scrollbar-width:none;
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
  .el-calendar-table .el-calendar-day {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 8px;
      height: 0px !important;
  }
  .fengxian_body{
    float:left;
    width:44%;
    margin: 3% 3%;
    margin-top:0;
    height:calc(94% - 60px)
  }
  </style>
  