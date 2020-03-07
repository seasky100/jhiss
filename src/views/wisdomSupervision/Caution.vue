<template>
  <div class="Caution" style="height:100%;">
    <div class='organization_alarm flex flex-column w-full' style="height:100%;">
        <div class='flex flex-align-center flex-no-shrink bg-fff' style="height:40px; padding:0 12px">
          <span class='font14 txt-bold'>警示曝光栏</span>
        </div>
        <div class='flex flex-column' style="padding:8px 12px;height:100%;">
          <div class='flex flex-justify-between w-full' style="min-height:300px;height: 50%;">
            <div class='bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">曝光内容</span>
              </div>
              <div class='flex flex-column mt4' style="overflow:auto;">
                    <div v-for="(item,index) of ExposureList" :key="index"
											class='flex flex-align-center flex-justify-between h32'>
											<span>{{item.title}}</span>
                      <span class='color-grey' style="">{{new Date(item.gmtCreate).toLocaleDateString()}}</span>
                    </div>
              </div>
            </div>
            <div class='flex flex-column bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">学习状态</span>
              </div>
              <div class='flex flex-align-center flex-justify-between mt8 px8'>
                <div class='flex flex-align-center h32'>
                  <span class='' style="color:#121518">已学</span>
                  <span class='px6' style="color:#235FF6">18</span>
                  <span class='px6 color-grey' style="">期</span>
                </div>
                <div class='flex flex-align-center h32'>
                  <span class='' style="color:#121518">待学</span>
                  <span class='px6' style="color:#F7622E">30</span>
                  <span class='px6 color-grey' style="">期</span>
                </div>
              </div>
              <div id='study_time_statistics' class='w-full flex-align-center' style="marginTop:6px; height:50%"></div>
              <div class='flex flex-align-center flex-justify-around h32 mb8 mt-auto' style="">
                <div class='flex flex-align-center'>
                  <div class='inline-block w12 h12 r-half bg-fff border-box' style="border:2px solid #235FF6" />
                  <span class='ml4 color-grey' style="">上午</span>
                  <span class='txt-bold ml8' style="color:#235FF6; fontSize:16px">{{morning}}H</span>
                </div>
                <div class='flex flex-align-center'>
                  <div class='inline-block w12 h12 r-half bg-fff border-box' style="border:2px solid #FFC700" />
                  <span class='ml4 color-grey' style="">下午</span>
                  <span class='txt-bold ml8' style="color:#FFC700; fontSize:16px">{{afternoon}}H</span>
                </div>
                <div class='flex flex-align-center'>
                  <div class='inline-block w12 h12 r-half bg-fff border-box' style="border:2px solid #F7622E" />
                  <span class='ml4 color-grey' style="">晚上</span>
                  <span class='txt-bold ml8' style="color:#F7622E; fontSize:16px">{{night}}H</span> 
                </div>
              </div>
            </div>
            <div class='flex flex-column bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">学习感悟</span>
              </div>
              <div class='flex flex-align-center flex-justify-between mt8 px8'>
                <div class='flex flex-align-center h32'>
                  <span class='' style="color:#121518">您参加过讨论</span>
                  <span class='px6' style="color:#235FF6">{{xuexi_total}}</span>
                  <span class='px6 color-grey' style="">次</span>
                </div>
                <div class='flex flex-align-center h32'>
                  <span class='' style="color:#121518">您已学习</span>
                  <span class='px6' style="color:#F7622E">30</span>
                  <span class='px6 color-grey' style="">个小时</span>
                </div>
              </div>
              <div ref='learnContainer' class='flex flex-grow flex-column mt8'>
                <div ref='learnContent' class='flex flex-column'>
										<div v-for="(item,index) of xuexi" :key="index" class='flex flex-align-center h32'> 
											<span style="color:blue; padding:0px 6px 0px 0px">{{index + 1}}.</span>
											<span>{{item.title}}</span>
										</div>
                </div>
              </div>
            </div>
          </div>
          <div class='flex flex-justify-between w-full mt8' style="min-height:300px;min-height:50%;">
            <div class='flex flex-column bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">违纪类型统计</span>
              </div>
              <div id='political_status_statistics' class='w-full flex-align-center mt-auto' style="height:80%"></div>
            </div>
            <div class='bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">违纪警种占比</span>
              </div>
              <div id='political_type_statistics' class='w-full flex-align-center' style="marginTop:44px; height:67%"></div>              
            </div>
            <div class='bg-fff r5 border-box' style="width:32.8%; padding:6px 8px 8px 14px">
              <div class='flex flex-align-center h24 w-full border-box' style="color:#121518">
                <div class='flex-inline' style="width:5px; height:21px; borderRadius:2.5px; background:#235FF6"></div>
                <span class='pl8 txt-bold font14' style="">处理情况</span>
              </div>
              <div id='violation_type_statistics' class='w-full flex-align-center' style="marginTop:16px; height:85%"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { findExposurePage, queryPeriodStudy } from '@/api/warn.js'
export default {
  name: "Caution",
  data() {
    return {
			userId:'5ba98b66cd3549b9b92ea8723e89207e',
      typeMap: {
				0: '违反政治纪律',
				1: '违反组织纪律',
				2: '违反财经纪律',
				3: '违反群众纪律',
				4: '违反工作纪律',
				5: '违反廉洁纪律',
				6: '违反生活纪律',
				7: '违反国家法律法规'
			},
			xuexi:[
				{title: '金之在冶即是超越自我、提纯自己.'},
				{title: '加强自身的思想纪律建设,严格自律为警清廉.'},
				{title: '奉献是一种精神，奉献是一种使命.'},
				{title: '我奉献，我快乐，我付出，我幸福.'},
				{title: '改革创新是引领发展的第一动力.'},
				{title: '事者，生于虑，成于务，失于傲.'}
			],
			nCurrent: 1,
			nSize:10,
			ExposureList:[],
			PeriodStudyList: [],
			morning:0,
			afternoon:0,
			night:0,
			xuexi_total:0
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
		init() {
			this.createChart()
			this.creatPie()
			this.findExposurePage()
			this.queryPeriodStudy()
		},
		findExposurePage(){
			const _this = this
			findExposurePage(
        Object.assign(
          {
						nCurrent: 1,
						nSize: 15
          },
        )
      ).then(res => {
				// console.log(res)
				let data = res.data.records
				_this.xuexi = data
				_this.ExposureList = data
				_this.xuexi_total = res.data.total
			})
		},
		queryPeriodStudy(){
			const _this = this
			queryPeriodStudy(
        Object.assign(
          {
						user_id: _this.userId
          },
        )
      ).then(res => {
				// console.log(res)
				let data = res.data
					console.log(data)
					data = data.map(obj => {
						if(obj.timefrom == 'afternoon'){
							obj.timefrom = '下午'
							_this.afternoon = obj.studyleng
						}else if(obj.timefrom == 'morning'){
							obj.timefrom = '上午'
							_this.morning = obj.studyleng
						}else{
							obj.timefrom = '晚上'
							_this.night = obj.studyleng
						}
						obj.value = obj.studyleng
						obj.name = obj.timefrom
						return obj
					})
					_this.PeriodStudyList = data
					let study_time_statistics = this.$echarts.init(document.getElementById('study_time_statistics'))
					let option = this.getPieOption('学习时长',data)
					study_time_statistics.setOption(option)
			})
		},
		creatPie(){
			// let study_time_statistics = this.$echarts.init(document.getElementById('study_time_statistics'))
			let political_type_statistics = this.$echarts.init(document.getElementById('political_type_statistics'))
			let data =  [
				{value: 335, name: '派出所'},
				{value: 310, name: '交管所'},
				{value: 234, name: '扫毒所'},
				{value: 135, name: '巡特警'},
				{value: 1548, name: '治安'},
				{value: 1548, name: '警保'},
				{value: 1548, name: '政工'},
				{value: 1548, name: '其他'}
			]
			let option = this.getPieOption('违纪警钟',data)
			// study_time_statistics.setOption(option)
			option.series[0].radius = ['30%', '90%']
			political_type_statistics.setOption(option)
		},
		createChart(){
			let political_status_statistics = this.$echarts.init(document.getElementById('political_status_statistics'))
			let violation_type_statistics = this.$echarts.init(document.getElementById('violation_type_statistics'))
			let option = this.getBarData()
			political_status_statistics.setOption(option)
			option.xAxis[0].axisLabel.rotate = 40
			option.series[0].type = 'line'
			violation_type_statistics.setOption(option)
		},
		getPieOption(name,data){
			let option = {
						tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				// legend: {
				// 		orient: 'vertical',
				// 		left: 10,
				// 		data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
				// },
				series: [
					{
						name: name,
						type: 'pie',
						radius: ['70%', '90%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: false,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
								normal: {
										show: false
								}
						},
						data: data
					}
				]
			}
			return option
		},
		getBarData(){
			let option = {
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					top:'15%',
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						axisLabel:{
							rotate: 0
						},
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						name: '违纪数量',
						type: 'value'
					}
				],
				series: [
					{
						name: '直接访问',
						type: 'bar',
						barWidth: '60%',
						// barWidth: 14,
						itemStyle: {
							emphasis: {
								barBorderRadius: [7,7,0,0]
							},
							normal: {
								barBorderRadius: [7,7,0,0]
							}
						},
						data: [10, 52, 200, 334, 390, 330, 220]
					}
				]
			}
			return option
			// political_status_statistics.setOption(option)
			// 
		},
  }
}
</script>
<style lang="stylus" scoped>
@import'../css/assembly.css';
@import "../css/hover-min.css";
@import "../css/media.css";
@import "../css/pseudo_classes.css";

</style>
