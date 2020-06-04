<template>
		<div class="Caution" style="height:100%;">
			  <div class='c_title'>
				<img style='margin-top: 3px;' src='../../utils/img/home_round_bar@2x.png' /> 
				警示曝光栏
			  </div>
			  <div class='c_head'>
				<div class='c_left content'>
					<!-- <div class='c_education'>
						<div class='c_tip'>警示教育</div>
						<img style="margin-top: 18px;height: 80px;width: 80px;" src='../../utils/img/weducation.png' />
					</div> -->
					<div id="yiBiao" class="yiBiao"></div>
					<!-- <div class='c_tlearn'>
						<div class='c_tip'>{{totalData.unLearned}}</div>
						<img style="margin-top: 3px;height: 48px;width: 48px;" src='../../utils/img/tlearn.png' />
						<div class='c_learn'>待学习</div>
					</div>
					<div class='c_tlearn'>
						<div class='c_tip'>{{totalData.alreadyLearned}}</div>
						<img style="margin-top: 3px;height: 48px;width: 48px;" src='../../utils/img/alearn.png' />
						<div class='c_learn'>已学习</div>
					</div> -->
				</div>
				<div class='c_right' style="display:flex">
					<div v-show='charts' style="width: 95%;height: 100%;display: flex;">
						<div class='c_handle'>
							<div style="width: 100%;height: 100%;">
								<div class='' style="height: 15%;">
									<div style="margin-top: 15px;margin-left: 15px;">违纪类型统计</div>
								</div>
								<div id='hline' class='hline'></div>
							</div>
						</div>
						<!-- <div class='c_type'>
										<div class='' style="height: 15%;">
											<div style="margin-top: 15px;margin-left: 15px;">违纪警种占比</div>
										</div>
										<div id='hbar2' class='hbar'></div>
									</div> -->
						<div class='c_category'>
							<div class='' style="height: 10%;">
								<div style="margin-top: 15px;margin-left: 15px;">处理情况</div>
							</div>
							<div id='hbar' class='hbar'></div>
							<!-- <div class='' style="height: 15%;">
											<div style="margin-top: 15px;margin-left: 15px;">违纪警种占比</div>
										</div>
										<div id='hbar2' class='hbar'></div> -->
						</div>
					</div>
					<div v-show='!charts' style="width: 95%;height: 100%;display: flex;">
							<div class='c_handle'>
								<div style="width: 100%;height: 100%;">
									<div class='' style="height: 15%;">
										<div style="margin-top: 15px;margin-left: 15px;">地区分布</div>
									</div>
									<div id='hline1' class='hline'></div>
								</div>
							</div>
							<!-- <div class='c_type'>
											<div class='' style="height: 15%;">
												<div style="margin-top: 15px;margin-left: 15px;">违纪警种占比</div>
											</div>
											<div id='hbar2' class='hbar'></div>
										</div> -->
							<div class='c_category'>
								<div class='' style="height: 14%;">
									<div style="margin-top: 15px;margin-left: 15px;">违纪警种占比</div>
								</div>
								<div id='hbar2' class='hbar'></div>
								<!-- <div class='' style="height: 15%;">
												<div style="margin-top: 15px;margin-left: 15px;">违纪警种占比</div>
											</div>
											<div id='hbar2' class='hbar'></div> -->
							</div>
						</div>
					<div >
						<div style="height: 76%;">
						<div class='c_change' @click='chartChange'>切换</div>
					</div>
					<div style="margin-left: -23px;">
							<div style="height: 10%;">
									<select class='p_select' v-model='value' >
									  <option
									  v-for='item in options2'
									  :key='item.value'
									  :label='item.label'
									  :value='item.value'>
									</option>
									</select>
								  </div>
					</div>

					</div>

					<!-- <div class='c_change' @click=''>切换</div> -->
				</div>
			</div>
			  <div class='c_content'>
				<div class='c_cleft'>
					<div class='e_title'>
						<div class='c_exposure'>
							学习感悟
						</div>
					</div>
					<div class="c_cleft_top" v-for="(item,index) in zuiXinData" :key="index">
						<div @click='tolearn(item.id)' class='c_cleft_topOne'><p>【{{item.title}}】</p><p style="width:41px;height:15px;" class='weixue' v-if="item.leanStatus == 0">未学习</p><p class='yixue' style="width:41px;height:15px;" v-if="item.leanStatus == 1">已学习</p></div>
						<div class="c_cleft_topTwo">
							<!-- <p class="kaiXue" @click='tolearn(item.id)' v-if='item.leanStatus == 0'>开始学习</p> -->
							<!-- <p class="zaiXue" @click='tolearn(item.id)' v-if='item.leanStatus == 1'>再次学习</p> -->
							<p>{{item.gmtCreate}}</p>
						</div>
					</div>
					<div class="c_cleft_pingLun">
						<div class="c_cleft_pingLunTitle">{{pinLunNum}}条评论</div>
						<div class="c_cleft_pingLunCon">
							<div class="c_cleft_pingConDiv" v-for="(item,index) in nodeData" :key="index">
								<div class="pingConLeft"><img :src="item.headUrl" alt=""></div>
								<div class="pingConRight">
									<div class="pingConName"><p>{{item.name}}</p><p>{{item.gmtCreate}}</p></div>
									<div class="pingConText">
										{{item.noteContent}}
									</div>
									<div class="pingConZan" title="点赞" ><p @click='updateLike(item)'><img style="width: 15px;height:12px;" src='../../utils/img/zan.png' />{{item.praiseCount}}</p></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				  <div class='c_cright'>
					<div class='e_title'>
						<div class='c_exposure'>
							历史记录
						</div>
					</div>
					<div class="c_crightCon">
						<div class="c_crightConDiv" v-for="(item,index) in listData" :key="index">
							<div @click='tolearn(item.id)' class="c_crightName">
								<p>【{{item.title}}】</p>
								<p> {{item.gmtCreate}}</p>
							</div>
							<div style="width:71px;margin-top: 10px;text-align: -webkit-center;" class="c_crightXue">
								<!-- <p class="yixue" v-if="item.leanStatus == 1">已学习</p> -->
								<!-- <p class="yixue" v-if="item.leanStatus == 1">已学习</p> -->
								<!-- <p class='e_cetitle' v-if="item.leanStatus == 0">未学习</p><p class='e_cetitle' v-if="item.leanStatus == 1">已学习</p> -->
							</div>
							<div class="c_crightXueStart">
								<p class="kaiXue" v-if='item.leanStatus == 0' @click='tolearn(item.id)'>未学习</p><p class='yixue' v-if="item.leanStatus == 1">已学习</p>
								<!-- <p class="zaiXue" v-if='item.leanStatus == 1' @click='tolearn(item.id)'>已学习</p> -->
								<!-- <p class="zaiXue" v-if='item.leanStatus == 1' @click='tolearn(item.id)'>再次学习</p> -->
							</div>
						</div>
					</div>
					<div class="fenYe" style="text-align: -webkit-center;">
							<el-pagination
								background
								layout="prev, pager, next"
								:current-page.sync="pagenum"
								@current-change="findExposurePage"
								:total="totals"
								:page-size="5"
								>
							</el-pagination>
						</div>
					<!-- <div class='e_head'>
						<el-card class='c_hexposure'>
							<li class='c_scont'>
								<div class='c_htop'>
									<div>
										<img style="margin-top: -9px;width: 30px;" :src='oneData.headUrl' />
									</div>
									<div class='ctitle'>【{{oneData.exposureTitle}}】</div>
									<div class='e_date'>{{oneData.gmtCreate}}</div>
								</div>
								<!-- <div class='e_center'>
									<div>
										<div class='c_cetitle'>最新回答</div>
										<div class='c_introduce'>{{oneData.noteContent}}</div>
									</div>
								</div> -->
								<!-- <div class='e_foot'> 
									<div class='h32' style="width: 7%;margin-top: 10px;margin-left: 27px;">点赞{{oneData.praiseCount}}</div>
									<div class='h32' style="margin-top: 10px;width: 79%;">评论</div>
									<div class='h32' style="margin-top: 10px; display: flex;"  title='我要点赞' @click='updateLike(item)'>
										<img style="margin-left: 30%;margin-top: 18%;width: 15px;height:12px;" src='../../utils/img/zan.png' />
										<div style="margin-top: 3px;">{{oneData.praiseCount}}</div>
									</div>
								</div>
							</li>
						</el-card>
					</div> -->
					  <!-- <div class='c_sentiment'>
						  <div id="parent" class="parent">
							<div id="child1" class="child">
								<li class='c_scont' v-for="(item,index) in nodeData" :key="index">
									<div class='c_top'>
										<div>
											<img style="margin-top: -9px;width: 30px;" :src='item.headUrl' />
										</div>
										<div class='ctitle'>【{{item.exposureTitle}}】</div>
										<div class='e_date'>{{item.gmtCreate}}</div>
									</div>
									<div class='e_center'>
										<div>
											<div class='c_cetitle'>最新回答</div>
											<div class='c_introduce'>{{item.noteContent}}</div>
										</div>
									</div>
									<div class='e_foot'>
										<div class='h32' style="width: 7%;margin-top: 10px;margin-left: 27px;">点赞{{item.praiseCount}}</div>
										<div class='h32' style="margin-top: 10px;width: 79%;">评论</div>
										<div class='h32' style="margin-top: 10px; display: flex;"  title='我要点赞' @click='updateLike(item)'>
											<img style="margin-left: 30%;margin-top: 18%;width: 15px;height:12px;" src='../../utils/img/zan.png' />
											<div style="margin-top: 3px;">{{item.praiseCount}}</div>
										</div>
									</div>
								</li>
							</div>	
							  <div id="child2" class="child"></div>
						  </div>
					  </div> -->
				</div>
			  </div>
		</div>
	</template>
	<script>
	import { findExposurePage, findLearningStatus,findPraiseCount,updateLike } from '@/api/warn.js';
	import { mapGetters } from 'vuex';
	export default {
		name: "Caution",
		computed: {
			...mapGetters([
				'userId'
			])
		},
		data() {
			return {
				listData:[],
				totalData:[],
				charts: true,
				value:"2019",
				options2:[{value:'2019',label:'2019年'}],
				timer2:'',
				countTotal: 0,
				alearned:0,
				nodeData:[],//最新一期评论列表
				oneData:[],
				zuiXinData:[],//最新一期数据
				pinLunNum:'',//最新一期评论数
				pagenum:0,//当前页数
			}
		},
		watch: {},
		mounted() {
			// this.init();
			this.findExposurePage();
			this.findLearningStatus();
			this.getRadar()
			this.getRadar4()
			this.getRadar2()
			this.getRadar3()
			this.yiBiaoPan()//仪表盘
		},
		methods: {
			// init() { //轮播
			// 	const parent = document.getElementById('parent');
			// 	const child1 = document.getElementById('child1');
			// 	// const child2 = document.getElementById('child2');
			// 	child2.innerHTML = child1.innerHTML;
			// 	setInterval(() => {
			// 		if (parent.scrollTop >= child1.scrollHeight) {
			// 			parent.scrollTop = 0;
			// 		} else {
			// 			parent.scrollTop++;
			// 		}
			// 	}, 20);
	
			// },
			// 添加点赞
			updateLike(data) {
				const _this = this;
				const params = {
					version: data.version,
					praiseCount: data.praiseCount,
					userId: sessionStorage.userId,
					id: data.id,
				}
				updateLike(params).then(res => {
					debugger
					// console.log(res);
					if (res.success) {
						if(res.data == false){
							this.$message({
							type: 'success',
							message: '已赞'
						})
						}else{
							this.$message({
							type: 'success',
							message: '评价成功'
						})
						}
						_this.findPraiseCount()
					} else {
						this.$message({
							type: 'error',
							message: '提交失败'
						})
					}
				})
			},

		// 查询曝光栏内容
		findExposurePage() {
			const _this = this;
			const params = {
				nCurrent: _this.pagenum,
				nSize: 5,
				userId: _this.userId
			}
			findExposurePage(params).then(res => {
				if (res.success) {
					debugger
					this.totals=res.data.total
					_this.listData=res.data.records
					let data = res.data.records
						for (let i = 0; i < data.length; i++) {
							data[i].gmtCreate = _this.conversion(data[i].gmtCreate )		
						}
					if (res.data.current == 1) {
						_this.zuiXinData = []
						res.data.records[0].gmtCreate = _this.conversion(res.data.records[0].gmtCreate)
						_this.zuiXinData.push(res.data.records[0])
					}
					_this.findPraiseCount()
				}
			})
		},

			// 查询曝光栏内容
			// findExposurePage() {
			// 	const _this = this;
			// 	const params = {
			// 		nCurrent: _this.pagenum,
			// 		nSize: 100,
			// 		userId: _this.userId
			// 	}
			// 	findExposurePage(params).then(res => {
			// 		// console.log('leftData',res)
			// 		if (res.success) {
			// 			console.log('查询曝光栏内容',res.data.records)
			// 			_this.listData=res.data.records
			// 			let data = res.data.records
			// 			for (let i = 0; i < data.length; i++) {
			// 				data[i].gmtCreate = _this.conversion(data[i].gmtCreate )
							
			// 			}
			// 			_this.zuiXinData=[]
			// 			res.data.records[0].gmtCreate =  _this.conversion(res.data.records[0].gmtCreate )
			// 			_this.zuiXinData.push(res.data.records[0])
			// 			_this.findPraiseCount()
			// 		}
			// 	})
			// },
			conversion(timestamp) {
				  // 时间戳转化为时间格式
				  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
				  var Y = date.getFullYear() + '-'
				  var M =
			  (date.getMonth() + 1 < 10
				  ? '0' + (date.getMonth() + 1)
				  : date.getMonth() + 1) + '-'
				  var D = date.getDate() + ' '
				  // var h = date.getHours() + ':'
				  // var m = date.getMinutes() + ':'
				  // var s = date.getSeconds()
				  return Y + M + D 
		  },
			// 查询曝光栏学习记录
			findLearningStatus() { 
				const _this = this;
				const params = {
					userId: _this.userId
				}
				findLearningStatus(params).then(res => {
					console.log(res)
					if (res.success) {
						console.log('查询曝光栏学习记录',res.data)
						_this.totalData = res.data
						_this.alearned = res.data.alreadyLearned
						_this.countNum = res.data.alreadyLearned + res.data.unLearned
						_this.countTotal = Math.floor((res.data.alreadyLearned/(res.data.alreadyLearned +res.data.unLearned))*100)
						console.log(_this.countTotal)
						this.yiBiaoPan()
					}
				})
			},
			// 学习感悟数据 点赞排行
			findPraiseCount() {
				const _this = this;
				const params = {
					userId: _this.userId
				}
				findPraiseCount(params).then(res => {
					if (res.success) {
						// _this.nodeData = res.data
						_this.nodeData=[]
						const data = res.data
						// console.log(data)
						for (let i = 0; i < data.length; i++) {
							if(data[i].headUrl){
								data[i].headUrl = 'http://10.121.252.53:1001/View_file/UserImage/'+ data[i].headUrl.split('\\').slice(-1)[0]
								// myPhotoSrc(data[i].headUrl)
								console.log(data[i].headUrl)   
							}
							if (data[i].exposureId == _this.zuiXinData[0].id) {
								_this.nodeData.push(data[i])
							}
						}
						_this.pinLunNum=_this.nodeData.length
						// console.log('整完的数据',_this.nodeData)
					}
				})
			},
			tolearn(id){
				const userId = this.userId
				this.$router.push({path: '/CautionArticle', query: { 'id': id, 'userId': userId }})
			},
			// 仪表盘
			yiBiaoPan(){
				let radarDom = this.$echarts.init(document.getElementById('yiBiao'))
				let option = {
					title: {
						text: '', //标题文本内容
					},
					toolbox: { //可视化的工具箱
						show: false,
						feature: {
							restore: { //重置
								show:false
							},
							saveAsImage: {//保存图片
								show:false
							}
						}
					},
					tooltip: { //弹窗组件
						formatter:(params) => {
								var returnStr = '共'+this.countNum + '期';
								// const data = params.value;
								// for (let i = 0; i < data.length; i++) {
								// 	returnStr += params.name[i] + '：' + (this.maxValue - data[i]) + '<br/>'
								// }
								return returnStr;
							}
					},
					series:
					[{
						name:name,
						type: 'gauge',
						detail: {
							// formatter:'{value}%',
							fontSize:16,			// 文字的字体大小,默认 15。
							formatter: (params) => {
								var returnStr = '已学'+this.alearned + '期';
								// const data = params.value;
								// for (let i = 0; i < data.length; i++) {
								// 	returnStr += params.name[i] + '：' + (this.maxValue - data[i]) + '<br/>'
								// }
								return returnStr;
							}
						},
						startAngle: 180,        // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
						endAngle: 0,          // 仪表盘结束角度,默认 -45
						center: ["45%", "65%"], 
						radius: "90%", //仪表大小
						title : {               //设置仪表盘中间显示文字样式
							textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
								fontWeight: 'bolder',
								fontSize: 18,
								fontStyle: 'italic',
								color:"white",
							},
							offsetCenter: [0,"60%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比
						},
						//min:0,
						//max:100,
						axisLine: {            // 坐标轴线  
							show:true,
							lineStyle: {       // 属性lineStyle控制线条样式  
								color: [[0.2, '#c23531'], [0.8, '#63869e'], [1, '#91c7ae']],
								width: 30,//宽度
								//shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。 
								shadowColor: "#fff",        //阴影颜色。支持的格式同color。
							}  
						},  
						splitLine: {            // 分隔线样式。
							show: false,             // 是否显示分隔线,默认 true。
							length: 30,             // 分隔线线长。支持相对半径的百分比,默认 30。
							lineStyle: {            // 分隔线样式。
								color: "#fff",              //线的颜色,默认 #eee。
								opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
								width: 2,                   //线度,默认 2。
								type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
								shadowBlur: 10,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。 
								shadowColor: "#fff",        //阴影颜色。支持的格式同color。
							}
						},
						axisTick: {             // 刻度(线)样式。
							show: false,             // 是否显示刻度(线),默认 true。
							splitNumber: 1,         // 分隔线之间分割的刻度数,默认 5。
							length: 1,              // 刻度线长。支持相对半径的百分比,默认 8。
							lineStyle: {            // 刻度线样式。   
								color: "#fff",              //线的颜色,默认 #eee。
								opacity: 1,                 //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
								width: 1,                   //线度,默认 1。
								type: "solid",              //线的类型,默认 solid。 此外还有 dashed,dotted
								shadowBlur: 1,             //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。 
								shadowColor: "#fff",        //阴影颜色。支持的格式同color。
							},
						},
						pointer : { //指针样式
							length: '50%'
						}, 
						axisLabel : { //文字样式（及“10”、“20”等文字样式）
							color : "white",
							distance : 3 //文字离表盘的距离
						},
						data: [{name:'',value: this.countTotal}]
					}]
				};
				radarDom.setOption(option)
				window.addEventListener("resize", () => { radarDom.resize();});
			},
			getRadar() {
				let radarDom = this.$echarts.init(document.getElementById('hbar'))
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'bottom',
						// top:1,
						itemWidth:20,
						itemHeight:10,
						left: 35,
						bottom: 25,
						data: ['问责', '轻处分', '重处分','未结案']
					},
					series: [
						{
							name: '',
							type: 'pie',
							// selectedMode: 'single',
							center: ['65%', '39%'],
							radius: '70%',
							label: {
								position: 'inner',
								show: false
							},
							labelLine: {
								show: false
							},
							data: [
								{ value: 234, name: '问责', selected: true },
								{ value: 52, name: '轻处分' },
								{ value: 16, name: '重处分' },
								{ value: 1, name: '未结案' },
							]
						},
	
					]
				}
				radarDom.setOption(option)
				//多图表自适应
				window.addEventListener("resize", function () {
					radarDom.resize();
	
				});
			},
			getRadar2() {
				  var colors = ['#5793f3', '#d14a61', '#675bba'];
	  
				let radarDom2 = this.$echarts.init(document.getElementById('hline'))
				let option = {
								color: ['rgb(204, 0, 255)'],
						tooltip: {
							trigger: 'axis',
						    formatter: '{a} <br/>{b}: {c} 起',
							axisPointer: {            // 坐标轴指示器，坐标轴触发有效
								type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '1%',
							right: '4%',
							top: '5%',
							bottom: '45%',
							// containLabel: true
						},
						xAxis: [
							{
								
								type: 'category',
								// data: ['政工纪检', '治安', '刑侦', '国保'],
								data: ['政治纪律', '组织纪律', '工作纪律', '廉洁纪律','群众纪律','生活纪律','其他'],
								axisTick: {
									alignWithLabel: true
								},
								
								axisLine: {
									lineStyle: {
										color: 'gray',
										type: 'dashed'
									},
								},
							},
						],
						yAxis: [
							{
								// min: 0,
								// max: 60,
								show:false,
								type: 'value'
							}
						],
						series: [
							{
								name: '案件总数',
								type: 'bar',
								barWidth: '20%',
								//设置柱状图渐变颜色
								itemStyle: {
									normal: {
										color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: "rgb(35, 95, 246)" // 0% 处的颜色
										}, {
											offset: 0.6,
											color: "rgb(29, 76, 195)" // 60% 处的颜色
										}, {
											offset: 1,
											color: "rgb(15, 52, 146)" // 100% 处的颜色
										}], false)
									}
								},
								data: [0, 4, 112, 38,34,7,110]
							}
						]
				}
				radarDom2.setOption(option)
				//多图表自适应
						  //折线图宽高自适应
						  window.addEventListener("resize", function () {
							radarDom.resize();
			
						});
			},
			getRadar3(){
				let radarDom3= this.$echarts.init(document.getElementById('hbar2'))
				let option = {
					// title: {
					// 	text: '',
					// 	subtext: '',
					// 	left: 'center'
					// },
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						itemWidth:20,
						itemHeight:10,
						// borderWidth: 2,
					    left: 'left',
					    data: ['国保', '刑侦', '治安', '交管', '监管', '技术', '监督', '政工', '警令','保障','其他']
					},
					series: [
						{
							name: '违纪警种占比',
							type: 'pie',
							radius: '80%',
							center: ['75%', '50%'],
							label:{
								show:false,
								// normal:{
								// 	borderWidth:1,
								// 	fontSize:10,
								// 	lineHeight:1
								// }
							},
							// data: [
							// 	{ value: 335, name: '直接访问' },
							// 	{ value: 310, name: '邮件营销' },
							// 	{ value: 234, name: '联盟广告' },
							// 	{ value: 135, name: '视频广告' },
							// 	{ value: 1548, name: '搜索引擎' }
							// ],
							data: [
								{ value: 0, name: '国保' },
								{ value: 32, name: '刑侦' },
								{ value: 177, name: '治安' },
								{ value: 66, name: '交管' },
								{ value: 9, name: '监管' },
								{ value: 4, name: '技术' },
								{ value: 0, name: '监督' },
								{ value: 4, name: '政工' },
								{ value: 0, name: '警令' },
								{ value: 9, name: '保障' },
								{ value: 2, name: '其他' }
							],
							// emphasis: {
							// 	itemStyle: {
							// 		shadowBlur: 8,
							// 		shadowOffsetX: 0,
							// 		shadowColor: 'rgba(0, 0, 0, 0.5)'
							// 	}
							// }
						}
					]
					// // backgroundColor: 'white',
					// title: {
					// 	text: '',
					// 	// left: 'center',
					// 	// top: 20,
					// 	textStyle: {
					// 		color: '#ccc'
					// 	}
					// },
	
					// tooltip: {
					// 	trigger: 'item',
					// 	// formatter: '*%'
					// 	formatter: '{a} <br/>{b} : {c} ({d}%)'
					// },
	
					// visualMap: {
					// 	show: false,
					// 	min: 80,
					// 	max: 600,
					// 	inRange: {
					// 		colorLightness: [0, 1]
					// 	}
					// },
					// series: [
					// 	{
					// 		name: '违纪警钟占比',
					// 		type: 'pie',
					// 		radius: '50%',
					// 		center: ['50%', '47%'],
							
					// 		data: [
					// 		    { value: 0, name: '国保' },
					// 			{ value: 32, name: '刑侦' },
					// 			{ value: 177, name: '治安' },
					// 			{ value: 66, name: '交管' },
					// 			{ value: 9, name: '监管' },
					// 			{ value: 4, name: '技术' },
					// 			{ value: 0, name: '监督' },
					// 			{ value: 4, name: '政工' },
					// 			{ value: 0, name: '警令' },
					// 			{ value: 9, name: '保障' },
					// 			{ value: 2, name: '其他' }
					// 		].sort(function (a, b) { return a.value - b.value; }),
					// 		roseType: 'radius',
					// 		label: {
					// 			color: '#006EFF'
					// 		},
					// 		labelLine: {
					// 			lineStyle: {
					// 				color: '#006EFF'
					// 			},
					// 			smooth: 0.2,
					// 			length: 10,
					// 			length2: 20
					// 		},
					// 		itemStyle: {
					// 			color: '#c23531',
					// 			shadowBlur: 200,
					// 			shadowColor: 'rgba(0, 0, 0, 0.5)'
					// 		},
	
					// 		animationType: 'scale',
					// 		animationEasing: 'elasticOut',
					// 		animationDelay: function (idx) {
					// 			return Math.random() * 200;
					// 		}
					// 	}
					// ]
			}
			radarDom3.setOption(option)
			//多图表自适应
				window.addEventListener("resize", function () {
					radarDom3.resize();
	  
				});
			},
			getRadar4() {
				  var colors = ['#5793f3', '#d14a61', '#675bba'];
	  
				let radarDom2 = this.$echarts.init(document.getElementById('hline1'))
				let option = {
								color: ['rgb(204, 0, 255)'],
						tooltip: {
							trigger: 'axis',
						    formatter: '{a} <br/>{b}: {c}人次',
							axisPointer: {            // 坐标轴指示器，坐标轴触发有效
								type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						grid: {
							left: '1%',
							right: '4%',
							top: '5%',
							bottom: '45%',
							// containLabel: true
						},
						xAxis: [
							{
								
								type: 'category',
								// data: ['政工纪检', '治安', '刑侦', '国保'],
								data: ['市局', '婺城', '江南', '金东','兰溪','义乌','东阳','永康','武义','浦江','磐安',],
								axisTick: {
									alignWithLabel: true
								},
								
								axisLine: {
									lineStyle: {
										color: 'gray',
										type: 'dashed'
									},
								},
							},
						],
						yAxis: [
							{
								// min: 0,
								// max: 60,
								show:false,
								type: 'value'
							}
						],
						series: [
							{
								name: '地区分布',
								type: 'bar',
								barWidth: '20%',
								//设置柱状图渐变颜色
								itemStyle: {
									normal: {
										color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
											offset: 0,
											color: "rgb(35, 95, 246)" // 0% 处的颜色
										}, {
											offset: 0.6,
											color: "rgb(29, 76, 195)" // 60% 处的颜色
										}, {
											offset: 1,
											color: "rgb(15, 52, 146)" // 100% 处的颜色
										}], false)
									}
								},
								data: [18, 26, 38, 43,25,64,23,32,15,2,19]
							}
						]
				}
				radarDom2.setOption(option)
				//多图表自适应
				window.addEventListener("resize", function () {
					radarDom.resize();
	
				});
			},
			chartChange(){
				this.charts = !this.charts		
			}
		}
	  }
	  </script>  
	  <style lang="stylus"  scoped>
		@import '../css/common.css';
		.child {
			height: auto;
		}
		.child li {
			min-height: 100px;
			margin: 2px 0;
			/* background: #009678; */
		}
		.parent {
			width: 100%;
			height: 460px;
			margin: 0 auto;
			/* background: #242424; */
			overflow-y: scroll;
		}
		.c_head{
			height: 20%;
			display: flex;
			width: 100%;
		}
		.c_left{
			width:18%;
		}
		.c_right{
			width: calc(82% - 10px);
			margin-top: 10px;
			background-color: #fff;
			margin-right: 10px;
			display: flex;
		}
		.content{
			height: calc(100% - 10px);
			background-color: #fff;
			margin: 10px;
			display: flex;
		}
		.c_title{
			float: left;
			width: 100%;
			height: 4%;
			/* margin: 10px; */
			margin-bottom: 0;
			font-size: 15px;
			font-weight: bold;
			line-height: 30px;
			/* border-left: 5px solid #409eff; */
			padding-left: 10px;
			background-color: white;
			padding-top: 6px;
		}
		.c_exposure{
			float: left;
			width: clac(100% - 10px);
			height: 4%;
			/* margin: 10px; */
			margin-bottom: 0;
			font-size: 15px;
			font-weight: bold;
			line-height: 30px;
			/* border-left: 5px solid #409eff; */
			padding-left: 10px;
			background-color: white;
			padding-top: 6px;
		}
		.c_hexposure{
			float: left;
			width: 97%;
			margin: 10px;
			margin-bottom: 0;
			font-size: 15px;
			font-weight: bold;
			/* line-height: 30px; */
			/* border-left: 5px solid #409eff; */
			/* padding-left: 10px; */
			/* background-color: floralwhite; */
			/* padding-top: 6px; */
		}
		.c_content{
			height: 74%;
			display: flex;
			width: 100%;
		}
		.c_cleft{
			width: 50%;
			background-color: white;
			margin: 10px;
			padding: 20px;
		}
	
		/*新 */
		/* 左边 */
		.c_cleft_top{width:100%;padding:20px;box-sizing: border-box;border-bottom:solid 1px rgba(245, 245, 245, 1);margin: auto;}
		.c_cleft_top .c_cleft_topOne{display: flex;justify-content: space-between;cursor: pointer;}
		.c_cleft_top .c_cleft_topOne p:nth-child(1){font-size: 15px;color: #333333;font-weight: 600;}
		/* .c_cleft_top .c_cleft_topOne p:nth-child(2){font-size: 14px;color: #FF0E02;font-weight:600;margin-top: 30px;} */
		.c_cleft_top .c_cleft_topTwo{display: flex;justify-content: space-between;}
		/* .c_cleft_top .c_cleft_topTwo p:nth-child(1){font-size: 14px;color: #FFFFFF;font-weight: 600;background: #FA7F79;padding: 10px 20px;border-radius:18px ;} */
		.c_cleft_top .c_cleft_topTwo .kaiXue{padding: 4px 11px;background: #FA7F79;color: white;border-radius:18px;margin-top: 20px;}
		.c_cleft_top .c_cleft_topTwo .zaiXue{padding: 4px 11px;background: #006EFF;color: white;border-radius:18px;margin-top: 20px;}
		.c_cleft_top .c_cleft_topTwo p:nth-child(2){font-size: 14px;color: #8D9AAD;font-weight:600;margin-top: 20px;}
		.c_cleft_pingConDiv{display: flex;justify-content: space-between;border-bottom:solid 1px rgba(245, 245, 245, 1) ;}
		.c_cleft_pingLunTitle{color: #333333;font-size: 14px;font-weight:bold;border: solid 1px rgba(245, 245, 245, 1);padding: 10px;}
		.c_cleft_pingLun{margin-top: 10px;height: 68%;}
		.c_cleft_pingLunCon{border: solid 1px rgba(245, 245, 245, 1);border-top:none ;padding: 20px;height: 93%;overflow: auto;}
		.c_cleft_pingConDiv .pingConLeft{border-radius:4%;overflow: hidden;flex: 1;}
		.c_cleft_pingConDiv .pingConLeft img{width: 40px;height: 50px;}
		.c_cleft_pingConDiv .pingConRight{margin-left: 10px;flex: 8;}
		.c_cleft_pingConDiv .pingConRight .pingConName{display: flex;justify-content: space-between;}
		.c_cleft_pingConDiv .pingConRight .pingConName p:nth-child(1){color: #333333;font-weight: 600;font-size: 14px;}
		.c_cleft_pingConDiv .pingConRight .pingConName p:nth-child(2){color: #8D9AAD;font-size: 12px;}
		.c_cleft_pingConDiv .pingConRight .pingConText{font-size: 14px;line-height:29px;color: #515A6E;}
		.c_cleft_pingConDiv .pingConRight .pingConZan{display: flex;justify-content: flex-end;cursor: pointer}
		.c_cleft_pingConDiv .pingConRight .pingConZan p{background: #EEEEEF;border-radius:12px;width: 47px;padding: 5px 0;text-align: center;}
		.c_cleft_pingConDiv .pingConRight .pingConZan p img{vertical-align: inherit;}
		
		/* 右边 */
		.c_crightCon{padding: 20px;height: 81%;overflow: auto;}
		.c_crightConDiv{border-bottom:solid 1px rgba(245, 245, 245, 1) ;padding:10px 0 0 0;}
		.c_crightConDiv .c_crightName p:nth-child(1){font-size: 16px;color: #333333;cursor: pointer;}
		.c_crightConDiv .c_crightName p:nth-child(2){font-size: 14px;color: #8D9AAD;margin-top: 20px;}
		.weixue{font-size: 10px;padding: 4px 11px; background: #FA7F79;color: white;border-radius: 18px;}
		.yixue{font-size: 10px; padding: 4px 11px;background: #006EFF;color: white; border-radius: 18px;}
		.c_crightConDiv .c_crightXueStart{display: flex;justify-content: flex-end;}
		.c_crightConDiv .c_crightXueStart .kaiXue{padding: 4px 11px;background: #FA7F79;color: white;border-radius:18px;}
		.c_crightConDiv .c_crightXueStart .zaiXue{padding: 4px 11px;background: #006EFF;color: white;border-radius:18px;}
		/*新 结束*/
		.c_cright{
			width: calc(50% - 10px);
			background-color: #fff;
			/* margin: 10px; */
			margin-right: 10px;
			margin-bottom: 10px;
			margin-top: 10px;
		}
		.c_change{
			font-size: 10px;
			/* padding: 4px 11px; */
			background: #006EFF;
			/* width: 75px; */
			width: 78%;
			height: 18px;
			text-align: -webkit-center;
			color: white;
			cursor: pointer;
			margin-right: 10px;
			margin-top: 10px;
			border-radius: 18px;
		}
		.c_education{
			width: 45%;
			text-align: center;
			margin-top: 9px;
		}
		.c_tlearn{
			width: 30%;
			text-align: center;
			margin-top: 9px;
			font-size: 14px;
			font-weight: 400;
			color: rgba(141,154,173,1);
		}
		.c_tip{
			margin-bottom: 10px;
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: rgba(81,90,110,1);
		}
		.c_start{
			width: 64px;
			height: 20px;
			color: white;
			background-color: #FA7F79;
			border-radius: 14px;
			text-align: center;
			cursor: pointer;
		}
		.c_astart{
			width: 64px;
			height: 20px;
			color: white;
			background-color: #006EFF;
			border-radius: 14px;
			text-align: center;
			cursor: pointer;
		}
		.c_learn{
			margin-top: 10px;
		}
		.c_handle{
			width: 60%;
			margin-right: 20px;
		}
		.c_type{
			width: 35%;
		}
		.yiBiao{
			width:100%;
			height:100;
		}
		.hbar{
			height: 124px;
			width: 317px;
		}
		.hline{
			width: 476px;
			height: 138px;
		}
		.c_category{
			width: 40%;
			height: 100%;
		}
		.e_title{
			height: 5%;
		}
		/* .e_head{
			height: 18%;
		} */
		.e_cont{
			border-bottom: 1px solid lightgray;
			height: 16%;
			margin-top: 10px;
			/* background-color: aliceblue; */
		}
		.e_top{
			height: 25%;
			padding-top: 15px;
			padding-left: 15px;
			display: flex;
		}
		.c_top{
			height: 10%;
			padding-top: 22px;
			padding-left: 15px;
			display: flex;
		}
		.c_htop{
			/* height: 10%; */
			/* padding-top: 22px; */
			padding-left: 15px;
			display: flex;
		}
		.cetitle{
			width: 90%;
			font-size: 16px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: rgba(51,51,51,1);
		}
		.ctitle{
			width: 74%;
			font-size: 13px;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: rgba(51,51,51,1);
		}
		.e_cetitle{
			padding-left: 24px;
			color: rgba(255,14,2,1);
			font-size: 14px;
			font-weight: bolder;
			margin-top: 20px;
		}
		.e_aetitle{
			width: 10%;
			padding-left: 24px;
			color: #006EFF;
			font-size: 14px;
			font-weight: bolder;
		
		}
		.c_cetitle{
			width: 30%;
			padding-left: 24px;
			/* color: #ff0e02; */
			margin-top: 20px;
			font-size: 14px;
			font-weight: bolder;
		}
		.e_learn{
			display: flex;
			padding-top: 10px;
		}
		.e_foot{
			display: flex;
			padding-top: 10px;
		}
		.e_date{
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: rgba(141,154,173,1);
		}
		.h32{
			font-size: 12px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: rgba(141,154,173,1);
		}
		.introduce{
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: rgba(81,90,110,1);
		}
		.c_introduce{
			font-size: 14px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #515a6e;
			margin-top: 5px;
			margin-right: 10px;
			margin-left: 28px;
			text-indent: 24px;
			line-height: 22px;
			letter-spacing: 1px;
		}
		/* @import'../css/assembly.css';
		@import "../css/hover-min.css";
		@import "../css/media.css";*/
	   
	  
	  </style>
	  