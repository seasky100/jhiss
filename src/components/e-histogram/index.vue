<template>
  <ve-histogram
    :height="height"
    :data="chartData"
    :settings="chartSettings"
    :extend="chartExtend"
    :loading="loading"
    ></ve-histogram>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    chartData: Object,
    chartSettings: Object,
    title: Object,
    loading: {
      type: Boolean,
      default: false
    },
    xAxis: Object,
    yAxis: Object
  },
  data() {
    return {
      chartExtend: {
        legend:{
          show:false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '70',
          bottom: '15',
          left: '25',
          right: '25'
        },
        title: { 
          ...this.title, 
          top: '15',
          left: '20',
        },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        color: ['#3182FF'],
        series(v) {
          // 设置柱子的样式
          v.forEach(i => {
            i.barWidth = 40;
            // i.itemStyle={
            //   barBorderRadius:[10,10,10,10],
            //   color:'#FF6633',
            //   borderWidth:0,
            // };
            // i.label={
            //   color:'#666',
            //   show:true,
            //   position:'top',
            //   backgroundColor:'yellow',
            // };
          });
          return v;
        }
      }
    }
  }
}
</script>
