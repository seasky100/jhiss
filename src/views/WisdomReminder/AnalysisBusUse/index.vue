<template>
  <div class="container flex flex-direction-column" style="height: 100%;overflow: hidden;">
    <div class="page-title">
      <span>公车使用分析</span>
    </div>
    <div class="content flex-grow flex" style="background: none;padding: 0;overflow: hidden;">
      <div class="flex flex-direction-column" style="flex-basis: 58%;padding-right: 5px;">
        <div class="bg-fff">
          <div class="title">车辆状态</div>
          <div class="flex flex-justify-between car-static">
            <div class="flex" v-for="(item, index) in vehicleCondition" :key="index">
              <img :src="item.imgUrl" alt="">
              <div class="flex flex-direction-column flex-justify-between count">
                <div class="num" :class="item.color">{{item.count}}</div>
                <div class="text">{{item.status}}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;overflow: hidden;" class="flex-grow flex flex-direction-column">
          <div class="flex" style="margin-bottom: 10px;height: 50%;">
            <div class="flex" style="width: 100%;">
              <div class="echart-item bg-fff flex flex-direction-column" style="margin-right: 10px;">
                <div class="title">异常统计</div>
                <div class="flex-grow" ref="echartItem" style="overflow: hidden;">
                  <div id='abnormal' style="height: 90%"></div>
                  <!-- <ve-ring :data="abnormalStatistics" :height="echartHeight"></ve-ring> -->
                </div>
              </div>
              <div class="echart-item bg-fff">
                <div class="title">用车频次</div>
                <div class="flex-grow" style="overflow: hidden;height: 90%;">
                  <!-- <ve-line
                    :settings="frequencyChartSettings"
                    :data="vehicleFrequency"
                    :legend-visible="false"
                    :extend="usageChartExtend"
                    :height="echartHeight"></ve-line> -->
                  <div id='frequency' style="height: 100%"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex" style="height: 50%;">
            <div class="echart-item bg-fff" style="margin-right: 10px;">
              <div class="title">部门用车统计</div>
              <div class="flex-grow" style="overflow: hidden;height: 90%">
                <!-- <e-histogram
                  :height="echartHeight"
                  :chartSettings="departmentSettings"
                  :chartData="departmentVehicleStatistics"
                  :xAxis="departxAxisOptions"
                /> -->
                <div id='department' style="height: 100%"></div>
              </div>
            </div>
            <div class="echart-item bg-fff">
              <div class="title">范围提醒</div>
              <div class="flex-grow" style="overflow: hidden;">
                <!-- <e-table
                  :style="{height: echartHeight}"
                  ref="recordSpTableRef"
                  :tableList="tableList"
                  :options="options"
                  :columns="columns"
                /> -->
                <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="num"
                  label=""
                  width="100">
                </el-table-column>
                <el-table-column
                prop="line"
                label=""
                width="100"
                >
                <template slot-scope="scope">
                  <span  class="line">上线</span>
                  <!-- <span v-if="scope.row.consultStatus === 0" class="cr">未处理</span>
                  <span v-if="scope.row.consultStatus === 1" class="cg">已办结</span> -->
                </template>
              </el-table-column>                
                <el-table-column
                  prop="name"
                  label=""
                  width="100">
                </el-table-column>   
                <el-table-column
                prop="approval"
                label=""
                width="100"
                >
                <template slot-scope="scope">
                  <span @click='approval(scope.row)' class="approval">审批单</span>
                </template>
              </el-table-column>                
                <el-table-column
                prop="type"
                label=""
                width="100"
                >
                <template slot-scope="scope">
                  <span @click='remind(scope.row)' class="remind">提醒</span>
                  <!-- <span v-if="scope.row.consultStatus === 0" class="cr">未处理</span>
                  <span v-if="scope.row.consultStatus === 1" class="cg">已办结</span> -->
                </template>
              </el-table-column>              
              </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-direction-column" style="flex-basis: 42%;padding-left: 5px;">
        <div class="bg-fff">
          <div class="title">用车统计</div>
          <div class="flex flex-justify-between car-static">
            <div class="flex" v-for="(item, index) in usageStatistics" :key="index">
              <img :src="item.imgUrl" alt="">
              <div class="flex flex-direction-column flex-justify-between count">
                <div class="num" :class="item.color">{{item.count}}</div>
                <div class="text">{{item.status}}</div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 10px;overflow: hidden;" class="flex-grow flex flex-direction-column bg-fff">
          <div id="map"  style="width:100%;height:100%;"></div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCarTimesStatistics,
  getDepartmentTimes,
  getCarRecordPage,
  usedCarsStatistics,
  carStatusStatistics
} from '@/api/warn.js';

export default {
  data() {
    return {
      mapUrl: require('../../../assets/images/map.png'),
      echartHeight: '',
      map: '',
      tableData: [{
          num: '浙154687',
          line: '上线',
          name: '王小虎',
          approval: '审批单',
          type: '提醒'
        }, {
          num: '浙154687',
          line: '上线',
          name: '王小虎',
          approval: '审批单',
          type: '提醒'
        }, {
          num: '浙154687',
          line: '上线',
          name: '王小虎',
          approval: '审批单',
          type: '提醒'
        }, {
          num: '浙154687',
          line: '上线',
          name: '王小虎',
          approval: '审批单',
          type: '提醒'
        }],
      vehicleCondition: [
        {
          imgUrl: require('../../../assets/images/vehicle_home_gps@2x.png'),
          count: 0,
          status: '在线',
          color: 'online'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_idle@2x.png'),
          count: 0,
          status: '空闲',
          color: 'free'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_occupied@2x.png'),
          count: 0,
          status: '使用中',
          color: 'useing'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_maintenance@2x.png'),
          count: 0,
          status: '维修中',
          color: 'maintenance'
        }
      ],
      usageStatistics: [
        {
          imgUrl: require('../../../assets/images/vehicle_home_total_times@2x.png'),
          count: 0,
          status: '用车总次',
          color: 'total'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_month_times@2x.png'),
          count: 0,
          status: '本月用车次数',
          color: 'month'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_exception@2x.png'),
          count: 0,
          status: '异常次数',
          color: 'abnormal'
        }
      ],
      usageChartExtend: {
        // series: {
        //   smooth: false
        // },
        'xAxis.0.axisLabel.rotate': 30
      },
      abnormalStatistics: {
        columns: ['type', 'count'],
        rows: [
          { 'type': '用车超时', 'count': 4 },
          { 'type': '未审批用车', 'count': 4 },
          { 'type': '用车超维', 'count': 4 }
        ]
      },
      vehicleFrequency: {
        columns: ['carNumber', 'count'],
        rows: []
      },
      frequencyChartSettings: {
        labelMap: {
          count: '使用次数'
        }
      },
      departmentVehicleStatistics: {
        columns: ['department', 'count'],
        rows: []
      },
      departxAxisOptions: {
        axisLabel: {
          rotate: 30
        }
      },
      departmentSettings: {
        labelMap: {
          count: '人次'
        }
      },
      tableList: [

      ],
      options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        hasPagination: false,
        showHeader: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'350'
      },
      columns: [
        {
          prop: 'policeCode',
          label: '车牌',
          align: 'left',
          width: '20%'
        },
        {
          prop: 'a',
          label: '在线',
          align: 'left',
          width: '20%'
        },
        {
          prop: 'userName',
          label: '姓名',
          align: 'left',
          width: '20%'
        },
        {
          prop: 'c',
          label: '审批状态',
          align: 'left',
          width: '20%'
        },
        {
          prop: 'd',
          label: '提醒状态',
          align: 'left',
          width: '20%'
        }
      ]
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      debugger
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      approval(data){
        debugger
      },
      remind(data){

      },
    // 车辆使用统计
    getCarTimes() {
      getCarTimesStatistics().then(res => {
        if(res.success && res.data){
          let result = [];
          for (let item in res.data) {
            result.push({
              carNumber: item,
              count: res.data[item]
            })
          }
          this.vehicleFrequency.rows = result;
        }
      })
    },
    // 部门用车
    getDepartmentTimes() {
      getDepartmentTimes().then(res => {
        // console.log(res);
        if(res.success && res.data){
          let department = [];
          for (let item in res.data) {
            department.push({
              department: item,
              count: res.data[item]
            })
          }
          this.departmentVehicleStatistics.rows = department;
        }
      })
    },
    // 范围提醒列表
    getCarRecord() {
      getCarRecordPage().then(res => {
        // console.log(res)
        this.$refs.recordSpTableRef.setPageInfo(
          1,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
    },
    // 用车统计
    getUsedCarsStatistics() {
      usedCarsStatistics().then(res => {
        // console.log(res)
        const userCardResult = res.data;
        this.usageStatistics.forEach(item => {
          if(userCardResult[item.status]) {
            item.count = userCardResult[item.status];
          }
        })
      })
    },
    // 车辆状态
    getCarStatusStatistics() {
      carStatusStatistics().then(res => {
        // console.log(res)
        let result = res.data;
        this.vehicleCondition.forEach(item => {
          if(result[item.status]) {
            item.count = result[item.status];
          }
        })
      })
    },
    // 获取高度
    calcHeight() {
      const height = this.$refs.echartItem.getBoundingClientRect().height;
      this.echartHeight = height + 'px';
    },
    getRadar(){
        let radarDom2 = this.$echarts.init(document.getElementById('abnormal'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          align: 'left', //图例小图标在图例文字的哪个方向，这里设置为左侧
          y: 'center',
          // x: 'right',
          icon: 'circle', //设置图例小图标的样式，这里控制
          right: '1%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#999',
            fontSize: 16,
            rich: {
              white: {
                color: 'red',
                fontSize: 8,
              },
            },
          },
          data: ['用车超时', '未审批用车', '用车超维']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            color: ['#235FF6', '#FFC700', '#F7622E'],
            center: ['35%', '52%'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '用车超时' },
              { value: 310, name: '未审批用车' },
              { value: 234, name: '用车超维' }
            ]
          }
        ]
      }
      radarDom2.setOption(option)
  },
  getRadar2(){
        let radarDom2 = this.$echarts.init(document.getElementById('frequency'))
        var colors = [ '#947DFF'];
        let option = {
          color: colors,
          tooltip: {
              trigger: 'none',
              axisPointer: {
                  type: 'cross'
              }
          },
          // legend: {
          //     data:['加班', '上班','部门平均'],
          //     icon:'rect',
          //     top: '15'
          // },
          grid: {
              top: 20,
              bottom: 50
          },
          xAxis: [
              {
                  type: 'category',
                  // axisTick: {
                  //     alignWithLabel: true
                  // },
                  // axisLine: {
                  //     onZero: false,
                  //     lineStyle: {
                  //         color: colors[1]
                  //     }
                  // },
                  axisPointer: {
                      label: {
                          formatter: function (params) {
                              return '小时' + params.value
                                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                          }
                      }
                  },
                  data: ['01', '02', '03', '04', '05', '06']
              }
    
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
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
                  color: '#195FFF'
                }, {
                  offset: 1,
                  color: '#6191FF'
                }
                ])
              },
              data: [5, 15, 11.1, 21.7, 34.3, 2]
            },
          ]
    }
      radarDom2.setOption(option)
          //折线图宽高自适应
          window.onresize = function () {
            radarDom2.resize();
        }
  },
  getRadar3(){
        let radarDom2 = this.$echarts.init(document.getElementById('department'))
        let option = {
          tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      // legend: {
      //     padding:[30,0,0,0],
      //     data: ['加班', '上班', '部门平均']
      // },
      grid: {
          top: '15%',
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              data: ['01', '02', '03', '04', '05', '06']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '上班',
              type: 'bar',
              barWidth: 13,
              color: '#8B69F6',
              stack: '广告',
              data: [19, 15, 11.1, 21.7, 34.3, 46.2]
          },
      ]
    }
      radarDom2.setOption(option)
  },
  initMap() {
    debugger
    var map = new IMAP.Map('map', {
      minZoom: 3,
      maxZoom: 22,
      zoom: 9,//设置地图初始化级别
      center: new IMAP.LngLat(120.143671, 30.286106),//设置地图中心点坐标
      animation: true//设置地图缩放动画效果
    });
    // return map;
  }
    	// initMap(); addRoadNetLayer() //添加路网图层    
  },
  mounted() {
    this.getRadar3();
    this.getRadar2();
    this.getRadar();
    this.getCarTimes();
    this.getDepartmentTimes();
    this.getCarRecord();
    this.getUsedCarsStatistics();
    this.getCarStatusStatistics();
    this.calcHeight();
    window.addEventListener('resize', this.calcHeight);
    this.map = this.initMap(map);
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl";
.approval{
  color: #8A68F6;
  cursor: pointer;
}
.remind{
  color:#2D62F6;
  cursor: pointer;
}
.line{
  color:#8ACA77;
}
.flex-grow{
  height: 90%;
}
.flex
  display: flex;

.flex-justify-between
  justify-content: space-between;
  
.flex-direction-column
  flex-direction: column !important;

.flex-wrap
  flex-wrap: wrap !important;

.flex-grow
  flex-grow: 1 !important;

.echart-item
  flex: 1;

.online
  color: rgb(45, 98, 246);
.free
  color: rgb(138, 202, 119);
.useing
  color: rgb(240, 160, 57);
.maintenance
  color: rgb(233, 67, 78);
.total
  color: rgb(138, 104, 246);
.month
  color: rgb(241, 161, 58);
.abnormal
  color: rgb(233, 63, 75);

.count
  margin-left: 10px;
  padding: 5px 0;
  .num
    font-size: 18px;
    font-weight: 700;
  .text
    color: rgb(136, 147, 165);
.title
  height 26px;
  line-height: 26px;
  padding: 3px 0 3px 20px;
  color: rgb(18, 21, 24);
  font-weight: 700;
  position: relative
  &:before{
    position: absolute;
    top: 22%;
    left: 10px;
    content: ' ';
    width: 4px;
    height: 56%;
    border-radius: 26px;
    background: #005bff;
  }
.car-static
  padding: 16px 16px;
</style>
