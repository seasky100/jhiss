<template>
  <div class="IndividualReport">
    <div class="individual_title">
      日常表现
    </div>
		<div style="margin:0 10px;">
			<div>
				<div class="label_con" v-for="(item,index) of labelList" :key="index">
					<img :src="item.imgPath" />
					<div class="label_count">
						<span class="eva_count">{{item.count}}</span>
						<span>{{item.label}}</span>
					</div>
				</div>
			</div>
      <e-table
        ref="recordTableRef"
        :tableList="tableList"
        :options="options"
        :columns="columns"
        :operates="operates"
        @afterCurrentPageClick="afterCurrentPageClickHandle"
      />
    </div>
		<!-- 评分 -->
		<el-dialog class="dialog_info" v-if="infoObj != null"
			title="总结审阅"
			:visible.sync="dialogVisible"
			width="30%">
			<div class="dialog_content">
				<span style="text-align:center;margin-bottom:15px;">
					{{infoObj.userName}} 
					{{new Date(infoObj.noteDate).toLocaleString('chinese', {hour12: false})}}
					工作总结
				</span>
				<span>{{infoObj.content}}</span>
				<span style="text-align:center;margin-top:20px;">
					总体评分
					<!-- <span class="score_con">
						{{noteScore}}
					</span>分 -->
				</span>
				<!-- <el-slider v-model="noteScore" :max="10" style="margin:0 35px;margin-top:10px;"></el-slider> -->
				<div style="text-align:center;">
					<div class="score_span">
						<span @click="scoreClick(index)" :style="[{background:activeScore==index?'#1760ff':'',color:activeScore==index?'#fff':'#333'}]"
							v-for="(item,index) of 10" :key="index">
							{{index + 1}}
						</span>
					</div>
				</div>
				<div style="text-align:center;margin-top:10px;">
					<el-input style="margin:0 15px;height:auto;"
						type="textarea" :disabled="!disabled"
						placeholder="请输入评价内容"
						v-model="leaderContent">
					</el-input>
				</div>
				<div v-if="disabled" style="margin:5px 5px 0 10px;">
					<span style="display:inline;color:#333;">是否推送：</span>
					<el-switch
						v-model="pushyn"
						active-color="#13ce66"
						inactive-color="#ff4949">
					</el-switch>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" v-if="disabled" @click="handleScoring(infoObj.id)">已 阅</el-button>
				<el-button v-if="disabled" @click="dialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
  </div>
</template>
<script>
import { findWorknotePage, noteAduit, countWorkNote } from '@/api/report.js';
import { getUserListByUserId } from '@/api/user-server.js';
export default {
  name: "HierEvaluation",
  data() {
    return {
			userId: this.$store.state.user.userId,
			labelList: [
				{label: '本月全部评分', count: 0, imgPath: require('../../assets/images/all.png')},
				{label: '本月待评分', count: 0, imgPath: require('../../assets/images/todo.png')},
				{label: '本月已评分', count: 0, imgPath: require('../../assets/images/done.png')}
			],
			dialogVisible: true,
			infoObj: null,
			noteScore: 0,
			leaderContent: '',
			tableList:[],
			userIds:'',
			options: {
        // 每页数据数
        pageSize: 10,
        hasIndex: false,
        // 当前页码
        currentPage: 1,
        loading: true,
        maxHeight: null,
        height:'550'
			},
			columns: [
        {
          prop: 'userName',
          label: '姓名',
          align: 'left'
        },
        {
          prop: 'deptName',
          label: '部门',
          align: 'left'
        },
        {
          prop: 'content',
					label: '内容',
					width: '150px',
          align: 'left'
        },
        {
          prop: 'noteDate',
					formatter: 'noteDate_format',
					width: '100px',
          label: '时间',
          align: 'left'
        },
        {
          prop: 'noteScore',
					formatter: 'noteScore_format',
					// color: 'red',
          // options: {
          //   1: '审批中',
          //   2: '已通过',
          //   3: '已驳回'
          // },
          label: '评分状态',
          align: 'left'
				}
      ],
      operates: {
        width: 150,
        fixed: 'right',
        list: [
          {
            id: '1',
            label: '详情',
            show: true,
            underline: false,
            icon: '<i class="el-icon-view"></i>',
            disabled: false,
            method: (key, row) => {
							console.log('row', row);
							this.dialogVisible = true
							this.infoObj = row
							this.disabled = false
							this.leaderContent = this.infoObj.comment
            },
            showCallback: (row) => {
							// console.log(row)
							if(row.noteScore == null){
								return false
							}else {
								return true
							}
            }
					},
					{
            id: '2',
            label: '评分',
            show: true,
            underline: false,
            icon: '<i class="el-icon-edit"></i>',
            disabled: false,
            method: (key, row) => {
							console.log('row', row);
							this.dialogVisible = true
							this.infoObj = row
							this.leaderContent = ''
							this.disabled = true
							this.pushyn = false
            },
            showCallback: (row) => {
							// console.log(row)
              if(row.noteScore == null){
								return true
							}else {
								return false
							}
            }
          }
        ]
			},
			disabled: true,
			activeScore: -1,
			pushyn: false
    }
  },
  watch: {
		infoObj(){
			this.noteScore = this.infoObj.noteScore
			this.leaderContent = this.infoObj.comment
			this.activeScore = this.noteScore - 1
		},
		dialogVisible(){
			if(!this.dialogVisible){
				this.noteScore = 0
				this.leaderContent = ''
			}
		}
	},
  mounted() {
		this.getUserListByUserId()
    // this.init()
  },
  methods: {
		init() {
			
			// this.countWorkNote()
    },
    noteDate_format(row, column, prop){
      return new Date(prop).toLocaleString('chinese', {hour12: false})
		},
		noteScore_format(row, column, prop){
			// console.log(prop)
			if(prop == null){
				return `<span style="color:#ff9700;">待评分</span>`
			}else {
				return `<span style="color:#00c538;">已评分（${prop}）</span>`
			}
		},
		// 分页点击事件
    afterCurrentPageClickHandle(val, next) {
			this.query(val);
			// console.log(val)
      next();
		},
		// 工作日志统计
		countWorkNote(){
			const _this = this
			countWorkNote(
        Object.assign(
          {
						user_id: _this.userIds
						// user_id: '2020'
          },
        )
      ).then(res => {
				// console.log(res)
				if(res.success){
					// _this.$message.success('成功！')
					_this.labelList[0].count = res.data.allnote
					_this.labelList[1].count = res.data.noaudit
					_this.labelList[2].count = res.data.audited
				}
			})
		},
		// 查询列表
    query(nCurrent = 1) {
			debugger
      // const _this = this;
      findWorknotePage(
        Object.assign(
          {
            nCurrent: nCurrent,
						nSize: 10,
						staffed: this.userIds,
						orderByField: 'noteDate',
						orderFlag: false
            // userId: _this.userId
          },
        )
      ).then(res => {
        // console.log(res)
        this.$refs.recordTableRef.setPageInfo(
          nCurrent,
          res.data.size,
          res.data.total,
          res.data.records
        );
      })
		},
		// 根据用户ID查询所有下属用户
		getUserListByUserId() {
			debugger
        const _this = this;
        const params = {
          userId: _this.userId 
        }
        getUserListByUserId(params).then(res => {
          if (res.success) {
						_this.userIds = res.data.map(item => item.userInfo.info).join()
						_this.query();
						_this.countWorkNote();
          }
        })
      },
		handleScoring(noteId) {
			const _this = this
			noteAduit(
        Object.assign(
          {
						noteId: noteId,
						userId: _this.userId,
						score: _this.noteScore,
						leaderContent: _this.leaderContent,
						pushyn: _this.pushyn
          },
        )
      ).then(res => {
				// console.log(res)
				if(res.success){
					_this.$message.success('评分成功！')
					_this.infoObj.noteScore = _this.noteScore
					_this.infoObj.comment = _this.leaderContent
					_this.dialogVisible = false
				}
			})
		},
		scoreClick(index){
			if(!this.disabled){
				return
			}
			this.activeScore = index
			this.noteScore = index + 1
		}
  }
}
</script>
<style lang="stylus" scoped>
.individual_title
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size 16px
	font-weight bold
.label_con
	display inline-block
	width calc(33.3% - 2px)
	text-align center
	height 100px
	line-height 100px
	margin 10px 0
	border 1px solid #cccccc
	img
		vertical-align middle
	.label_count
		display inline-block
		position relative
		top 15px
		left 10px
		span 
			display block
			line-height 25px
			color #8893a5
		.eva_count
			font-size 20px
			font-weight bold
			color #333333
.dialog_info
	>>> .el-dialog__header
		border 1px solid #cccccc
	.dialog_content
		span 
			display block
			line-height 25px
		.score_con
			display inline
			font-size 24px
			font-weight bold
			color #af4a4a
		.score_span
			border 1px solid #cccccc
			display inline
			padding 8px
			span
				display inline-block
				margin 5px
				padding 0 15px
				border-radius 25px
</style>
