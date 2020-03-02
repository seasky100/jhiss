<template>
  <div class="Org_relationship">
    <div class="individual_title">
      层级关系
    </div>
		<div class="entrance" v-for="(item,index) of entranceList" :key="index">
			{{item.name}}
		</div>
		<div class="relationship">
			<org-tree :data="tree_data"></org-tree>
		</div>
  </div>
</template>
<script>
import { treeAndUser } from '@/api/report.js';
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
      tree_data: null
			// 
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
    },
    getData(){
      const _this = this
      treeAndUser(
        Object.assign(
          {
            // currentId: '' // 当前区域id
          }
        )
      ).then(res => {
        // console.log(res)
        let data = res.data[0]
        let tree_data = JSON.stringify(data)
        let reg=new RegExp('childrens','g')
        tree_data=tree_data.replace(reg,'children')
        tree_data = JSON.parse(tree_data)
        console.log(tree_data)
        _this.tree_data = tree_data
      })
    },
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
