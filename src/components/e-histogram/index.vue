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
      default: '400px'
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
        title: { ...this.title, left: 'center' },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
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
