<template>
  <div class="overtime">
    <div class="c_type">
      <div style="margin-left: 15px;font-weight:600;padding-top: 5px;">日常考核</div>
      <div style="height: 200px;width: 100%">
        <div id="hline" class="hline"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { indexRecordDeatil, sectorAverageStatistics } from "@/api/warn.js";
import { mapGetters } from "vuex";
export default {
  name: "workChart",
  computed: {
    ...mapGetters([
      "userId",
      // 'userInfo',
      "orgId",
      "token"
    ])
  },
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.userInfo),
      worklength: [], //上班时长
      overtime: [], //加班时长
      clockDate: [], //考勤日期
      averageData: [] // 部门平均时长
    };
  },
  mounted() {
    this.sevenday()
    this.indexRecordDeatil();
    this.sectorAverageStatistics();
  },
  methods: {
      sevenday(){
        const today = this.$dayjs(new Date());
        const t7 = today.subtract(30, 'day');
        this.dateStart = t7.format('YYYY-MM-DD');
        this.dateEnd = today.format('YYYY-MM-DD');
      },
    // 查询七天上班时间统计数据
    indexRecordDeatil() {
      const _this = this;
      const params = {
        userId: this.userInfo.info,
        startTime: _this.dateStart,
        endTime: _this.dateEnd
      };
      indexRecordDeatil(params).then(res => {
        if (res.success) {
          const Data = res.data;
          _this.worklength = Data.map(({ worklength }) => worklength);
          _this.overtime = Data.map(({ overtime }) => overtime);
          _this.clockDate = Data.map(({ clock_date }) =>
            new Date(clock_date).toLocaleDateString().substring(5)
          );
          this.getRadar2();
        }
      });
    },
    // 查询部门平均上班时间数据
    sectorAverageStatistics() {
      const _this = this;
      const params = {
        department: _this.orgId,
        startTime: _this.dateStart,
        endTime: _this.dateEnd
      };
      sectorAverageStatistics(params).then(res => {
        if (res.success) {
          const Data = res.data;
          _this.averageData = Object.keys(Data)
            .sort()
            .map(item => Data[item]);
          this.getRadar2();
        }
      });
    },
    getRadar2() {
      let radarDom2 = this.$echarts.init(document.getElementById("hline"));
      const colors = ["#8ec6ad", "#947DFF", "#386db3"];
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: "cross"
          },
          formatter: params => {
            const data = params;
            var returnStr = "";
            for (let i = 0; i < data.length; i++) {
              returnStr +=
                data[i].seriesName + "：" + data[i].data + "小时" + "<br/>";
            }
            return returnStr;
          }
        },
        legend: {
          data: ["加班", "上班", "部门平均"],
          icon: "rect",
          top: "35",
          right: "35"
        },
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: "category",
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
            type: "value",
            axisLabel: {}
          }
        ],
        series: [
          {
            name: "加班",
            type: "line",
            smooth: true,
            symbol: "none", // 去掉折点
            itemStyle: {
              normal: {
                color: "#386db3", //折线点的颜色
                lineStyle: {
                  color: "rgba(255,0,0,.0)" //折线的颜色  透明色
                }
              }
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#4D8AFF"
                },
                {
                  offset: 1,
                  color: "#947DFF"
                }
              ])
            },
            data: this.overtime
          },
          {
            name: "上班",
            type: "line",
            smooth: true,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#947DFF", //折线点的颜色
                lineStyle: {
                  color: "rgba(255,0,0,.0)" //折线的颜色
                }
              }
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#633FFF"
                },
                {
                  offset: 1,
                  color: "#fee"
                }
              ])
            },
            data: this.worklength
          },
          {
            name: "部门平均",
            type: "line",
            smooth: true,
            symbol: "none",
            itemStyle: {
              normal: {
                color: "green", //折线点的颜色
                lineStyle: {
                  color: "green" //折线的颜色
                }
              }
            },
            data: this.averageData
          }
        ]
      };
      radarDom2.setOption(option);
      //折线图宽高自适应
      window.onresize = () => {
        radarDom2.resize();
      };
    }
  }
};
</script>
<style scoped>
.overtime {
  margin: 10px;
  background-color: #fff;
}
.c_type {
  width: 100%;
  height: 100%;
}

.hline {
  width: 100%;
  height: 100%;
}
</style>