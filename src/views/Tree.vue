<template>
  <div>
		<el-tree :data="tree_data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		<!-- default-expand-all 默认展开全部 -->
		<el-tree :data="data2" node-key="id" >
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>
					<!-- 节点图片不一样就用这个，在数据中设置icon ； v-if判断可以判断是否含有子级，没有自己即为最后一级-->
					<img v-if="data.children == null" style="margin-right:5px;" :src="data.icon" />
					<!-- 节点图片一样可以直接在这里写路径，数据中不需要icon -->
					<!-- <img style="margin-right:5px;" v-if="data.children == null"
						src="../assets/images/menu/left_menu_sub_hierarchy.png" /> -->
					{{ node.label }}
				</span>
				<!-- 11111 -->
			</span>
    </el-tree>
		<p><br/></p>
		<!-- 第二种 -->
		<el-tree :data="data2" node-key="id" default-expand-all v-if="false">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>
					<img v-if="data.children == null" style="margin-right:5px;" :src="data.icon" />
					{{ node.label }}
					<span>
						<el-button
							type="text"
							size="mini"
							@click="() => append(data)">
							Append
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="() => remove(node, data)">
							Delete
						</el-button>
					</span>
				</span>
				<!-- 11111 -->
			</span>
    </el-tree>
		<p><br/></p>
		<!-- 第三种 default-expand-all :default-expanded-keys="[2, 3]" -->
		<el-tree
      :data="tree_data"
      show-checkbox
      node-key="id"
			:default-expanded-keys="['1']"
			:props="defaultProps"
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
		<!-- 11111 -->
	</div>
</template>
<script>
let id = 1000;
import tree_data from './tree_data.js'
  export default {
    data() {
      return {
				// visible: false,
				tree_data: tree_data,
        data2: [{
					label: '一级 1',
					icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
          children: [{
						label: '二级 1-1',
						icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            children: [{
							label: '三级 1-1-1',
							icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            }]
          }]
        }, {
					label: '一级 2',
					icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
          children: [{
						label: '二级 2-1',
						icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            children: [{
							label: '三级 2-1-1',
							icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            }]
          }, {
						label: '二级 2-2',
						icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            children: [{
							label: '三级 2-2-1',
							icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            }]
          }]
        }, {
					label: '一级 3',
					icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
          children: [{
						label: '二级 3-1',
						icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            children: [{
							label: '三级 3-1-1',
							icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            }]
          }, {
						label: '二级 3-2',
						icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            children: [{
							label: '三级 3-2-1',
							icon: require('../assets/images/menu/left_menu_sub_hierarchy.png'),
            }]
          }]
        }],
        defaultProps: {
          children: 'list',
          label: 'mc'
        }
      };
		},
		mounted(){
			console.log(tree_data)
			console.log(this.tree_data)
		},
    methods: {
      handleNodeClick(data) {
        console.log(data);
			},
			append(data) {
        const newChild = { id: id++, label: '三级====', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
			},
			renderContent(h, { node, data, store }) {
				let img;
				let options;
				// console.log(node.childNodes)
				if(data.children == null){
					img = (<img style="margin-right:5px;" src={data.icon} />)
				}
				let dataChild = node.childNodes.map(obj => {
					return obj.label
				})
				// console.log(node.parent.label != null && node.parent.label.includes('二级'))
				// console.log(dataChild.includes('二级'))
				// console.log(node.label.includes('二级'))
				// console.log(dataChild)
				dataChild = JSON.stringify(dataChild)
				if( (node.parent.label != null && (!node.parent.label.includes('江岸'))) && (!dataChild.includes('江岸')) && (!node.label.includes('江岸')) ){
					options = (<span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>)
				}
				if(node.parent.label == null && (!dataChild.includes('江岸')) ){
					options = (<span>
							<el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
							<el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
						</span>)
				}
        return (
					<span class="custom-tree-node">
						{img}
            <span>{node.label}</span>
            {options}
          </span>);
			}
			// 
    }
  };
</script>