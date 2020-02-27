<template>
  <div class="container">
    <div class="page-title">
      <span>公车使用分析</span>
    </div>
    <div class="content" style="background: none;padding: 0;">
      <el-row>
        <el-col :span="14" style="padding-right: 5px;">
          <div class="bg-fff">
            <div class="title">车辆状态</div>
            <div class="flex flex-justify-between car-static">
              <div class="flex" v-for="(item, index) in vehicleCondition" :key="index">
                <img :src="item.imgUrl" alt="">
                <div class="flex flex-direction-column flex-justify-between">
                  <div>{{item.count}}</div>
                  <div>{{item.status}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 10px;">
            <div class="flex" style="margin-bottom: 10px;">
              <div class="flex" style="width: 100%;">
                <div class="echart-item bg-fff" style="margin-right: 10px;">
                  <div class="title">异常统计</div>
                  <div>
                    <ve-ring :data="abnormalStatistics" height="350px"></ve-ring>
                  </div>
                </div>
                <div class="echart-item bg-fff">
                  <div class="title">用车频次</div>
                  <div>
                    <ve-line
                      :settings="frequencyChartSettings"
                      :data="vehicleFrequency"
                      :legend-visible="false"
                      :extend="usageChartExtend"
                      height="350px"></ve-line>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex" style="width: 100%;">
              <div class="echart-item bg-fff" style="margin-right: 10px;">
                <div class="title">部门用车统计</div>
                <div>
                  <e-histogram
                    :height="'350px'"
                    :chartSettings="departmentSettings"
                    :chartData="departmentVehicleStatistics"
                    :xAxis="departxAxisOptions"
                  />
                </div>
              </div>
              <div class="echart-item bg-fff">
                <div class="title">范围提醒</div>
                <div>
                  <e-table
                    ref="recordSpTableRef"
                    :tableList="tableList"
                    :options="options"
                    :columns="columns"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10" style="padding-left: 5px;">
          <div class="bg-fff">
            <div class="title">用车统计</div>
            <div class="flex flex-justify-between car-static">
              <div class="flex" v-for="(item, index) in usageStatistics" :key="index">
                <img :src="item.imgUrl" alt="">
                <div class="flex flex-direction-column flex-justify-between">
                  <div>{{item.count}}</div>
                  <div>{{item.status}}</div>
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
      vehicleCondition: [
        {
          imgUrl: require('../../../assets/images/vehicle_home_gps@2x.png'),
          count: 0,
          status: '在线'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_idle@2x.png'),
          count: 0,
          status: '空闲'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_occupied@2x.png'),
          count: 0,
          status: '使用中'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_maintenance@2x.png'),
          count: 0,
          status: '维修中'
        }
      ],
      usageStatistics: [
        {
          imgUrl: require('../../../assets/images/vehicle_home_total_times@2x.png'),
          count: 0,
          status: '用车总次'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_month_times@2x.png'),
          count: 0,
          status: '本月用车次数'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_exception@2x.png'),
          count: 0,
          status: '异常次数'
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
        // console.log(res);
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
        console.log(res)
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
    }
  },
  mounted() {
    this.getCarTimes();
    this.getDepartmentTimes();
    this.getCarRecord();
    this.getUsedCarsStatistics();
    this.getCarStatusStatistics();
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl"
.flex{
  display: flex;
}
.flex-justify-between {
  justify-content: space-between;
  
}
.flex-direction-column {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}

.echart-item
  flex: 1;

.title
  height 26px;
  line-height: 26px;
  padding-left: 20px;
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
