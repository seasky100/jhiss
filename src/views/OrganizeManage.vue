<template>
    <router-view></router-view>
</template>
<script>
    import { treeAndUser } from '@/api/report.js';
    export default {
        created() {
            this.init();
        },
        methods: {
            init() {
                this.getData();
            },
            getData() {
                if (!window.localStorage.tree_data) {
                    treeAndUser(
                        Object.assign({
                            currentId: '', // 当前区域id
                        })
                    ).then((res) => {
                        let tree_data = res.data[0];
                        tree_data.children = tree_data.childrens[0].userList;
                        tree_data.level = 1;
                        tree_data.expand = true;
                        window.localStorage.tree_data = JSON.stringify(tree_data);
                        this.getDeptChidren(tree_data);
                    });
                }
            },
            getDeptChidren(tree_data) {
                tree_data.userInfo = tree_data.userList[0];
                let arr1 = data.children; //第二层的人员
                let arr2 = data.childrens[0].childrens; //第三次的人员
                for (let i = 0; i < arr1.length; i++) {
                    //遍历第二次人员
                    let obj = arr1[i];
                    obj.index = i;
                    obj.level = 2;
                    obj.expand = true;
                    obj.name = data.childrens[0].name;
                    obj.orgName = data.childrens[0].orgName;
                    let children = [];
                    for (let j = 0; j < arr2.length; j++) {
                        //遍历第三次人员，如果相等则把部门名称加到第二层的children里面
                        let obj2 = arr2[j];
                        if (obj2.userPname.includes(obj.realName)) {
                            children.push(obj2);
                        }
                    }
                    let dep = { dep: children, level: 3 };
                    // obj.children = children
                    if (children.length > 0) {
                        obj.children = [dep];
                    }
                }
                console.log(arr2)
                if (!window.localStorage.dep_list) {
                    window.localStorage.dep_list = JSON.stringify(arr2);
                }
            },
        }
    }
</script>