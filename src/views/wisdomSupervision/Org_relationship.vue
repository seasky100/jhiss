<template>
  <div class="Org_relationship">
    <div class="individual_title">
      层级关系
    </div>
		<div class="entrance" v-for="(item,index) of entranceList" :key="index">
			{{item.name}}
		</div>
		<div class="relationship">
			<org-tree :data="data"></org-tree>
		</div>
  </div>
</template>
<script>
export default {
	name: "Org_relationship",
  data() {
    return {
			entranceList: [
				{name: '事项申报', path: ''},
				{name: '个人即报', path: ''},
				{name: '警示教育', path: ''},
				{name: '廉政教育', path: ''},
				{name: '年度报告', path: ''},
				{name: '廉政台账', path: ''}
			],
			data: {
        id: 0,
				label: "度量指标体系",
				position: '111111111',
				expand: true,
        children: [
          {
            id: 1,
            label: "交付质量",
            children: [
              {
                id: 11,
                label: "生产质量",
                children: [
                  {
                    id: 111,
                    label: "生产事件"
                  }
                ]
              },
              {
                id: 12,
                label: "开发质量",
                children: [
                  {
                    id: 121,
                    label: "项目开发缺陷密度"
                  }
                ]
              },
              {
                id: 13,
                label: "发布质量",
                children: [
                  {
                    id: 131,
                    label: "上线失败率"
                  }
                ]
              },
              {
                id: 14,
                label: "过程质量",
                children: [
                  {
                    id: 141,
                    label: "项目过程符合度"
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            label: "交付效能",
            expand: true,
            children: [
              {
                id: 21,
                label: "交付能力",
                children: [
                  {
                    id: 211,
                    label: "功能点产出"
                  },
                  {
                    id: 212,
                    label: "代码行产出"
                  },
                  {
                    id: 213,
                    label: "上线投产次数"
                  },
                  {
                    id: 214,
                    label: "接收需求数"
                  },
                  {
                    id: 215,
                    label: "立项数"
                  },
                  {
                    id: 216,
                    label: "结项数"
                  },
                  {
                    id: 217,
                    label: "迭代速率"
                  },
                  {
                    id: 218,
                    label: "迭代完成率"
                  }
                ]
              },
              {
                id: 22,
                label: "交付效率",
                expand: true,
                children: [
                  {
                    id: 221,
                    label: "人均产出功能点"
                  },
                  {
                    id: 222,
                    label: "项目生产率"
                  }
                ]
              }
            ]
          },
          {
            id: 3,
            label: "业务满意度",
            children: [
              {
                id: 31,
                label: "业务满意度"
              }
            ]
          },
          {
            id: 4,
            label: "交付价值",
            children: [
              {
                id: 41,
                label: "业务价值关键指标"
              }
            ]
          },
          {
            id: 5,
            label: "交付速度",
            children: [
              {
                id: 51,
                label: "需求评估速度",
                children: [
                  {
                    id: 511,
                    label: "需求响应度"
                  }
                ]
              },
              {
                id: 52,
                label: "开发速度",
                children: [
                  {
                    id: 521,
                    label: "完成度天数"
                  },
                  {
                    id: 522,
                    label: "完成度达标率"
                  },
                  {
                    id: 523,
                    label: "故事平均测试通过周期"
                  }
                ]
              },
              {
                id: 53,
                label: "发布速度",
                children: [
                  {
                    id: 531,
                    label: "首次交付天数"
                  },
                  {
                    id: 532,
                    label: "首次交付达标率"
                  },
                  {
                    id: 533,
                    label: "故事平均发布周期"
                  }
                ]
              },
              {
                id: 54,
                label: "燃尽图"
              },
              {
                id: 55,
                label: "一次测试通过率"
              }
            ]
          },
          {
            id: 6,
            label: "持续交付",
            children: [
              {
                id: 61,
                label: "技术债务率",
                url: "https://world.taobao.com/"
              },
              {
                id: 62,
                label: "DEVOPS成熟度",
                url: " http://www.baidu.com"
              },
              {
                id: 63,
                label: "DEVOPS健康度",
                url: " https://www.google.com/"
              }
            ]
          }
        ]
      }
			// 
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
		init() {}
		// 
  }
}
</script>
<style lang="stylus" scoped>
.Org_relationship
	height 100%
	width 100%
.individual_title
	height:40px;
	line-height:40px;
	background:#fff;
	padding:0 10px;
	font-size 16px
	font-weight bold
.entrance
	width 15%
	height 35px
	line-height 35px
	display inline-block
	text-align center
	background #fff
	margin 10px 0.8%
.relationship
	margin 0 0.8%
	background #fff
	height calc(100% - 100px)
	text-align center
	overflow auto
</style>
