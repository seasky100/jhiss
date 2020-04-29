<template>
  <div class="container flex flex-direction-column" style="height: 100%;overflow: hidden;">
    <div class="page-title">
      <span>公车使用分析</span>
    </div>
    <div class="content flex-grow flex" style="background: none;padding: 0;overflow: hidden;">
      <div class="flex flex-direction-column" style="flex-basis: 50%;padding-right: 5px;">
        <div class="bg-fff">
          <div class="title">车辆状态</div>
          <div class="flex flex-justify-between car-static">
              <div class="flex">
              <img src="../../../assets/images/vehicle_home_gps@2x.png">
              <div class="flex flex-direction-column flex-justify-between count">
                <div class="num online">{{num}}</div>
                <div class="text">在线</div>
              </div>
            </div>
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
                <div id='department' style="height: 100%"></div>
              </div>
            </div>
            <div class="echart-item bg-fff">
              <div class="title">范围提醒</div>
              <div class="flex-grow" style="overflow: auto;">
                <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="carNumber"
                  label=""
                  width="110">
                </el-table-column>
                <el-table-column
                prop="line"
                label=""
                width="60"
                >
                <template slot-scope="scope">
                  <span  class="line">上线</span>
                  <!-- <span v-if="scope.row.consultStatus === 0" class="cr">未处理</span>
                  <span v-if="scope.row.consultStatus === 1" class="cg">已办结</span> -->
                </template>
              </el-table-column>                
                <el-table-column
                  prop="userName"
                  label=""
                  width="70">
                </el-table-column>   
                <el-table-column
                prop="approval"
                label=""
                width="70"
                >
                <template slot-scope="scope">
                  <span @click='approval(scope.row)' class="approval">审批单</span>
                </template>
              </el-table-column>                
                <el-table-column
                prop="type"
                label=""
                width="70"
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
  carStatusStatistics,
  warnInfoTypeStatistics,
  findCar
} from '@/api/warn.js';

export default {
  data() {
    return {
      mapUrl: require('../../../assets/images/map.png'),
      echartHeight: '',
      map: '',
      websocket:null,
      csData: 0,
      cwData: 0,
      wspData: 0,
      num:0,
      carNum:[],
      infowindow:null,
      socketData: [],
      carData:[],
      markerObj:{},
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
        },{
          num: '浙154687',
          line: '上线',
          name: '王小虎',
          approval: '审批单',
          type: '提醒'
        }],
      department:[],
      denum:[],
      vehicleCondition: [ // 1 使用 2 维护 0 空闲 
        // {
        //   imgUrl: require('../../../assets/images/vehicle_home_gps@2x.png'),
        //   count: 0,
        //   status: '在线',
        //   type: 3,
        //   color: 'online'
        // },
        {
          imgUrl: require('../../../assets/images/vehicle_home_idle@2x.png'),
          count: 0,
          status: '空闲',
          type: 0,
          color: 'free'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_occupied@2x.png'),
          count: 0,
          status: '使用中',
          type: 1,
          color: 'useing'
        },
        {
          imgUrl: require('../../../assets/images/vehicle_home_maintenance@2x.png'),
          count: 0,
          status: '维修中',
          type: 2,
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
    }
  },
  methods: {
    testWebSocket() { 
      const wsUri ="ws://41.232.3.191:4100/";
      this.websocket = new WebSocket(wsUri); 
      this.websocket.onopen = (evt)=> { 
          this.onOpen(evt) 
          console.log("成功")
      }; 
      this.websocket.onclose = (evt)=>{ 
        this.onClose(evt) 
      }; 
      this.websocket.onmessage= (evt)=> { 
        this.onMessage(evt) 
      }; 
      this.websocket.onerror = (evt)=> { 
        this.onError(evt) 
      }; 
    },
    onOpen(evt) { 
      this.writeToScreen("CONNECTED"); 
      this.doSend("WebSocket rocks"); 
    },  
 
    onClose(evt) { 
      this.writeToScreen("DISCONNECTED"); 
    },  
 
    onMessage(evt) { 
      this.socketData = evt.data
      // this.num++
        // onMessage(evt)
        const Data  = this.carData
        const socketData = JSON.parse(evt.data)
        for (let i = 0; i < Data.length; i++) {
          if(Data[i].gpsid == socketData.gid ){
            const pData = {
              id:socketData.gid,
              speed:Number(socketData.speed),
              date:socketData.date,
              carNumber:Data[i].carNumber,
              department:Data[i].department,
              detaildevtype:Data[i].detaildevtype,
              status: Data[i].status,
              lon:Number(socketData.longitude),
              lat:Number(socketData.latitude)
            }
            // const numdata = {
            //   carNumber:Data[i].carNumber,
            // }
            // this.carNum.push(numdata)
            this.toggleIconMarkers(pData);
          } 
        }
        // console.log('车牌号',this.carNum)
        // const arry = this.carNum
        // var hash = {}
        // const arr = arry.reduce((item,next) =>{
        //   hash[next.carNumber] ? '' : hash[next.carNumber] = true && item.push(next)
        //   return item
        // }, [])
        // console.log(arr)
        // for (let j = 0; j < arr.length; j++) {
        //       this.num++
        // }
        // writeToScreen('<span style="color: blue;">RESPONSE: '+ evt.data+'</span>'); 
        // this.websocket.close(); 
    },  
 
    onError(evt) { 
      this.writeToScreen('<span style="color: red;">ERROR:</span> '+ evt.data); 
    }, 
    doSend(message) { 
      this.writeToScreen("SENT: " + message);
      var msg = "FLAG=websocket&PASSWORD=greatmap_push&RESULTTYPE=JSON"// gps请求串
      msg = "FLAG=websocket&COMPANY=350M&RESULTTYPE=JSON";
      console.log("success");
    // this.ws.send(msg);
    this.websocket.send(msg); 
    }, 
    writeToScreen(message) { 
      var pre = document.createElement("p"); 
      pre.style.wordWrap = "break-word"; 
      pre.innerHTML = message; 
      // output.appendChild(pre); 
    },
	    //添加批量点图标
    toggleIconMarkers(positions) {
      var marker, markers = [];
      if (this.map) {
        if (this.markerObj[positions.id]) {
          this.toggleUpdateMarker(positions)
         } else {
          var opts = new IMAP.MarkerOptions();
          opts.anchor = IMAP["Constants"]["BOTTOM_CENTER"];
          // opts.icon=new IMAP.Icon(IMAP.MapConfig.API_REALM_NAME+"images/point_1.png",{"size":{"width":34,"height":30},"offset":{"x":markIcon[i][0],"y":markIcon[i][1]}});
          // ../../../assets/images/vehicle_home_gps@2x.png
          if(positions.detaildevtype == "摩托车"){
            opts.icon = new IMAP.Icon(require("../../../assets/images/muotuo.png"), { "size": new IMAP.Size(60, 60) });
          }else{
            opts.icon = new IMAP.Icon(require("../../../assets/images/jingche.gif"), { "size": new IMAP.Size(60, 60) });
            
          }
          // opts.icon = new IMAP.Icon(IMAP.MapConfig.API_REALM_NAME + "images/car.png", { "size": new IMAP.Size(43, 21) });
          var lnglat = new IMAP.LngLat(positions.lon, positions.lat);
          var marker = new IMAP.Marker(lnglat, opts);
          this.markerObj[positions.id] = marker.getId();
          markers.push(marker);
          marker.openInfoWindow(
            '<div style="line-height: 30px;"><span class="a_name">所属部门 ：</span><span>'+positions.department+'</span></div>'+
            '<div><span class="a_name">车牌号码 ：</span>' + positions.carNumber + '</div>'+
            '<div style="line-height: 30px;"><span class="a_name">车辆类型 ：</span>' + positions.detaildevtype + '</div>', { "size": new IMAP.Size(80, 55), "offset": new IMAP.Pixel(5, -45), "title": "", visible: true });
          var infowindow = marker.getInfoWindow();
          infowindow.addEventListener(IMAP.Constants.TIP_CLICK, function (evt) {
            document.getElementById("infowindow").checked = false;
          }, infowindow);
          this.map.getOverlayLayer().addOverlays(markers, false);
        }

      }
    },
      //更新点标注
    toggleUpdateMarker(positions) {
      let marker = this.map.getOverlayLayer().getOverlayById((this.markerObj[positions.id]));
      marker.setPosition(new IMAP.LngLat(positions.lon, positions.lat));
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      approval(data){
      },
      remind(data){

      },
    // 车辆使用频次统计
    getCarTimes() {
      getCarTimesStatistics().then(res => {
        if(res.success && res.data){
          console.log('频次1',res)
          let result = [];
          for (let item in res.data) {
            result.push({
              carNumber: item,
              count: res.data[item]
            })
          }
          console.log('频次',result)
          this.vehicleFrequency.rows = result;
        }
      })
    },
    // 部门用车
    getDepartmentTimes() {
      getDepartmentTimes().then(res => {
        if(res.success && res.data){
          this.department = Object.keys(res.data).sort()
          this.denum =  Object.keys(res.data).sort().map(item =>
          res.data[item])     
          this.getRadar3(); 
        }
      })
    },
    // 获取车辆信息
    findCar() {
      const params = {
        orgid: '330700BJ0000'
      }
      findCar().then(res => {
        if (res.success && res.data) {
          console.log(66666,res)
          this.carData = res.data     
          // this.getRadar3();
        }
      })
    },
    // 车辆使用异常统计
    warnInfoTypeStatistics() {
      const params = {
        warnType: 0
      }
      warnInfoTypeStatistics(params).then(res => {
        if (res.success && res.data) {
            if (res.data.length > 0) {
              this.csData = res.data['用车超时']
              this.cwData = res.data['用车超维']
              this.wspData = res.data['未审批用车']
            }  
          this.getRadar();
        }
      })
    },
    // 范围提醒列表
    getCarRecord() {
      getCarRecordPage().then(res => {
        console.log('4.133',res)
        this.tableData = res.data.records
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
        console.log('状态',res) // 1 使用 2 维护 0 空闲 
        let result = res.data;
        this.vehicleCondition.forEach(item => {
          if(result[item.type]) {
            item.count = result[item.type];
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
              { value: this.csData, name: '用车超时' },
              { value: this.wspData, name: '未审批用车' },
              { value: this.cwData, name: '用车超维' }
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
              // top: 20,
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
                  data: ['01', '02', '03', '04','05']
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
              data: [2,  7, 2.3, 9,0]
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
              data: this.department
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '用车',
              type: 'bar',
              barWidth: 13,
              color: '#8B69F6',
              stack: '广告',
              data: this.denum
          },
      ]
    }
      radarDom2.setOption(option)
  },
    //添加覆盖物
    toggleAddVector() {
      if (this.map) {
        var vectors = [];
        var polygonArr = [];
        polygonArr.push(new IMAP.LngLat(119.6533119678, 29.1170044477));
        polygonArr.push(new IMAP.LngLat(119.6547925472, 29.1169013446));
        polygonArr.push(new IMAP.LngLat(119.6547979116, 29.1155141283));
        polygonArr.push(new IMAP.LngLat(119.6532475948, 29.1156219195));
        polygonArr.push(new IMAP.LngLat(119.6533119678, 29.1170044477));
        console.log(99999,polygonArr)
        var polygon = new IMAP.Polygon(
          polygonArr, 
          {fillColor:'transparent' },
          );
        vectors.push(polygon);
        this.map.getOverlayLayer().addOverlays(vectors);
      }
    },
  },
  mounted() {
      this.map = new IMAP.Map('map', {
      minZoom: 3,
      maxZoom: 22,
      zoom: 9,//设置地图初始化级别
      center: new IMAP.LngLat(119.6533763409,29.1167841818),//设置地图中心点坐标
      animation: true//设置地图缩放动画效果
    });
    this.toggleAddVector();
    this.findCar();
    this.warnInfoTypeStatistics();
    this.testWebSocket();
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
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../styles/common.styl";
@import "../../../styles/common.css";
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
.el-table__header-wrapper{
   height: 10px !important;
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
