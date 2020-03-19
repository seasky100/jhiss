<template>
  <div class='person_home'>
    <div class='person_body'>
      <div class='person_head police_career'>Header</div>
      <!-- <el-row :gutter="10">
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="1"><div class="grid-content bg-purple"></div></el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
          </el-row>    -->
  
      <el-row class='content' :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
          <div class='person_left'>
              <div class="person_title">
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
                  <div class='pcenter'>
                      <div class='pli' v-for="(item2,index2) in warnList2" :key="index2">
                          <div class='h32'><span class='pnum'>{{item2.num}}</span></div>
                          <div class='h32'><span class='pname'>{{item2.name}}</span></div>
                        </div>                  
                  </div>
                  <div class='pfoot'>
                    <div class='pft'>当前<span class='ptotal' >8</span>项风险内容，请谨慎！！！</div>
                  </div>
                </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="12">
          <div class='person_center'>
            <div class='p_top'>
                <div class="person_title">
                    考勤情况
                  </div>
                <div id='kao' class='p_attendance'></div>
            </div>
            <div class='p_foot'>
                <div class="person_title">
                    层级评价
                  </div>
                  <div class='p_evaluate' style="float : left; height: 90%">
                      <el-calendar v-model="value" show-date-only :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="'结束时间'" :lang="lang" :position="position" :changePane="dayClick" :pane="1" :range-bus="getBus" :range-status="1"></el-calendar>
                  </div>
                  <div class='p_watch'>
                      <div id='gauge'  class='p_gauge' ></div>
                  </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="6">
          <div class='person_right'>
            <div class='p_top'>上</div>
            <div class='p_foot'>下</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import { allWarnByType,indexRecordDeatil,sectorAverageStatistics,indexRecordCountDeatil } from '../../api/warn.js';
  import { getPoliceCareer } from '../../api/user-server.js';
  import { subDays,format } from 'date-fns';
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
        xztxNum: 0,
        userId:'',
        userInfo:'',
        value: new Date(),
        timer:'',
        careerData:[],
        marksData:[],
        selected: 0,
        timeIndex: 0,
        warnList:[
          { name:'刷卡预警',num:'1'},
          { name:'出国分析',num:'1'},
          { name:'涉嫌违法',num:'1'},
          { name:'请假分析',num:'1'}
          ],
          warnList2:[
          { name:'日志预警',num:'1'},
          { name:'事项申报',num:'1'},
          { name:'用车预警',num:'1'},
          { name:'智慧考勤',num:'1'}
          ]          
    }
  },
  mounted() {

    this.getRadar()
    this.getRadar2()
    this.getRadar3()
    // this.allWarnByType();

  },
  methods: {
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
              data:['2015 降水量', '2016 降水量']
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
                              return '降水量  ' + params.value
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
              name: '2016 降水量',
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
              name: '2016 降水量',
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
              name: '2016 降水量',
              type: 'line',
              smooth: true,
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: "#947DFF",//折线点的颜色
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
      // $(window).resize(function() {//这是能够让图表自适应的代码
      //     radarDom.resize();
      //   }); 
  },
  getRadar3(){
        let radarDom3 = this.$echarts.init(document.getElementById('gauge'))
        // var colors = ['#8ec6ad', '#947DFF', '#386db3'];
        let option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}分'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
          series: [
            {
              startAngle: 180, //开始角度 左侧角度
              endAngle: 0, //结束角度 右侧
              type: 'gauge',
              min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
              max: 10,
              radius: '100%',
              axisLabel: {
                distance: -30
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
                length: 1,
                splitNumber: 1,
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
                distance: -10
              },
              min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
              max: 10,
              radius: '60%',
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
      // $(window).resize(function() {//这是能够让图表自适应的代码
      //     radarDom.resize();
      //   }); 
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
  }
}
</script>
<style lang="stylus" scoped>
  @import '../css/pseudo_classes.css';
.person_home{
  /* background: #f2f5f7; */
  height: 100%;
  width: 100%;
}
.person_body{
  height: 100%;
  width: 98%;
  margin: 1%;
}
.person_head{
  height: 25% !important;
  background-color: white;
  margin-bottom: 15px;
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
    border-left:5px solid #409eff;
    padding-left: 5px
  }
  .fengxian_body{
    float:left;
    width:100%;
    height:50%;
  }
  .p_warn{
    height: 50%;
    float: left;
    width: 100%;
  }
  .ptop{
    height: 30%;
  }
  .pcenter{
    height: 35%;
  }
  .pfoot{
    height: 20%;
  }
  .pli{
    width: 25%;
    height: 100%;
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
    margin-top: 3%;
    color: #838D9E;
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
    width: 58%;
    height: 70%;
}
.p_gauge{
  height: 100%;
  width: 100%;
}
  /* .left-score-image {
        width: 100% !important;
        height: 100% !important;
    } */
</style>
