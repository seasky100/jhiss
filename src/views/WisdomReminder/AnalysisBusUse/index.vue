<template>
  <div>
    <p>公车使用分析</p>
    <div>
      <el-row>
        <el-col :span="14">
          <div>
            <div>车辆状态</div>
            <div class="flex flex-justify-between">
              <div class="flex" v-for="(item, index) in vehicleCondition" :key="index">
                <img :src="item.imgUrl" alt="">
                <div class="flex flex-direction-column flex-justify-between">
                  <div>{{item.count}}</div>
                  <div>{{item.status}}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-wrap">
              <div class="echart-item">
                <div>异常统计</div>
                <div>
                  <ve-ring :data="abnormalStatistics" height="350px"></ve-ring>
                </div>
              </div>
              <div class="echart-item">
                <div>用车频次</div>
                <div>
                  <ve-line :data="vehicleFrequency" :legend-visible="false" :extend="usageChartExtend"  height="350px"></ve-line>
                </div>
              </div>
              <div class="echart-item">
                <div>部门用车统计</div>
                <div>
                  <ve-histogram :data="departmentVehicleStatistics" :extend="usageChartExtend" height="350px"></ve-histogram>
                </div>
              </div>
              <div class="echart-item">
                <div>范围提醒</div>
                <div>
                  
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <div>用车统计</div>
            <div class="flex flex-justify-between">
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
        series: {
          smooth: false
        },
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
        rows: [
          { 'carNumber': '浙G 525E8', 'count': 82 },
          { 'carNumber': '浙G 52H73', 'count': 93 },
          { 'carNumber': '浙G 635P4', 'count': 90 },
          { 'carNumber': '浙G L8912', 'count': 129 },
          { 'carNumber': '浙G P3241', 'count': 133 },
          { 'carNumber': '浙G 321O0', 'count': 132 }
        ]
      },
      departmentVehicleStatistics: {
        columns: ['department', 'count'],
        rows: [
          { 'department': '商务部', 'count': 2 },
          { 'department': '公安部', 'count': 1 },
          { 'department': '人事部', 'count': 5 },
          { 'department': '总裁办', 'count': 0 },
          { 'department': '市场部', 'count': 4 },
          { 'department': '行政部', 'count': 1 },
          { 'department': 'GIS研发部', 'count': 3 }
        ]
      }
    }
  }
}
</script>

<style>
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
.echart-item{
  /* flex: 1; */
  width: 50%;
}
</style>
