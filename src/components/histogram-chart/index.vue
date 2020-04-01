<template>
    <ve-histogram
      v-if="chartData.rows && chartData.rows.length"
      :data="chartData"
      :extend="chartExtend"
      :settings="chartSettings"
      :events="events"
      :height="height"
    ></ve-histogram>
</template>

<script>
export default {
  props: {
    chartData: Object,
    height: {type: String, default: '300px'},
    color: {
      type: Array,
      default: () => {
        return ["#38E0FF", "#98D87D", "#FFD86E"];
      }
    },
    title: String,
    events: Object,
    labelMap: Object,
    barWidth: { type: [Number, String], default: "30%" },
    dataZoom: Array,
    gridBottom: { type: [Number, String], default: "5%" },
    gridTop: { type: [Number, String], default: 60 },
    legendShow: { type: Boolean, default: false },
    stack: Object,
    yAxisName: { type: String, default: "" }
  },
  data() {
    return {};
  },
  computed: {
    chartExtend() {
      return {
        // 多种柱子的颜色
        color: this.color,
        title: {
          text: this.title,
          top: '15',
          left: '20',
        },
        // 图例（即上方显示的数据类型）
        legend: {
          show: this.legendShow, // 显示图例
          icon: "circle", // 图例显示为圆形
          top: "5%",
          right: "5%",
          itemGap: 34
        },
        // 直角坐标系内绘图网格
        // grid: {
        //   top: this.gridTop,
        //   bottom: this.gridBottom,
        //   containLabel: true // 防止标签溢出
        // },
        grid: {
            top: '70',
            bottom: '15',
            left: '25',
            right: '25'
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: {
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            interval: 0, // 坐标轴刻度标签的显示间隔,设置0显示所有标签(防止文字重叠隐藏)
            // rotate: 10, // 刻度标签旋转的角度
            fontSize: 10, // 字体大小
            rich: {
              width: "5px"
            }
            // formatter: value => {
            //   let valueTxt = "";
            //   if (value.length > 4) {
            //     valueTxt = value.substring(0, 4) + "...";
            //   } else {
            //     valueTxt = value;
            //   }
            //   return valueTxt;
            // }
          }
        },
        // 直角坐标系 grid 中的 y 轴
        // yAxis: config => {
        //   config[0].name = this.yAxisName;
        //   config[0].nameLocation = 'middle';
        //   config[0].nameGap = 30;
        //   config.pop();
        //   return config;
        // },
        dataZoom: this.dataZoom,
        series: {
          barMaxWidth: 40,
          barWidth: this.barWidth, // 柱条的宽度
          barMinHeight: 2,
          barGap: "50%" // 不同系列的柱间距离
        }
      };
    },
    chartSettings() {
      return {
        labelMap: this.labelMap, // 修改别名
        stack: this.stack // 堆叠数据
      };
    }
  }
};
</script>

<style scoped>
</style>
