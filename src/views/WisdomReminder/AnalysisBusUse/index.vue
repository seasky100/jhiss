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
                  <ve-ring :data="abnormalStatistics" :height="echartHeight"></ve-ring>
                </div>
              </div>
              <div class="echart-item bg-fff">
                <div class="title">用车频次</div>
                <div class="flex-grow" style="overflow: hidden;">
                  <ve-line
                    :settings="frequencyChartSettings"
                    :data="vehicleFrequency"
                    :legend-visible="false"
                    :extend="usageChartExtend"
                    :height="echartHeight"></ve-line>
                </div>
              </div>
            </div>
          </div>
          <div class="flex" style="height: 50%;">
            <div class="echart-item bg-fff" style="margin-right: 10px;">
              <div class="title">部门用车统计</div>
              <div class="flex-grow" style="overflow: hidden;">
                <e-histogram
                  :height="echartHeight"
                  :chartSettings="departmentSettings"
                  :chartData="departmentVehicleStatistics"
                  :xAxis="departxAxisOptions"
                />
              </div>
            </div>
            <div class="echart-item bg-fff">
              <div class="title">范围提醒</div>
              <div class="flex-grow" style="overflow: hidden;">
                <e-table
                  :style="{height: echartHeight}"
                  ref="recordSpTableRef"
                  :tableList="tableList"
                  :options="options"
                  :columns="columns"
                />
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
          <el-image
            :src="mapUrl"></el-image>
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
    }
  },
  mounted() {
    this.getCarTimes();
    this.getDepartmentTimes();
    this.getCarRecord();
    this.getUsedCarsStatistics();
    this.getCarStatusStatistics();
    this.calcHeight();
    window.addEventListener('resize', this.calcHeight);
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
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
    top: 10%;
    left: 10px;
    content: ' ';
    width: 5px;
    height: 80%;
    border-radius: 5px;
    background: #005BFF; 
  }
.car-static
  padding: 16px 16px;
</style>
