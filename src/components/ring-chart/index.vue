<template>
    <ve-ring
            :data="chartData"
            :extend="chartExtend"
            :settings="chartSettings"
            :height="height"
    ></ve-ring>
</template>

<script>
export default {
    props: {
        chartData: Object,
        height: {type: String, default: '400px'},
        ringColor: Array,
        limitShowNum: {
            type: Number,
            default: 0
        },
        title: String
    },
    data() {
        return {
            chartExtend: {
                tooltip: {
                    confine: true // 兼容 overflow: hidden 溢出问题
                },
                title: {
                    text: this.title,
                    left: 'center'
                },
                legend: {
                    type: "plain",
                    top: 50,
                    // icon: "circle",
                    itemGap: 20,
                    // textStyle: {
                    //     fontSize: "12px"
                    // }
                },
                avoidLabelOverlap: false,
                series: {
                    color: this.ringColor,
                    label: {
                        show: false
                    },
                    // center: ["30%", "50%"], // 等同于总面积文本坐标
                    radius: ["0", "50%"] // 圆环半径大小
                    // minAngle: 5 // 设置饼图扇区最小角度
                }
            },
            chartSettings: {
                limitShowNum: this.limitShowNum
            }
        };
    }
};
</script>

<style scoped>
</style>
