(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-06796a73"],{"715a":function(e,t,a){"use strict";a.r(t),a("4160"),a("159b");var n=a("afb1"),i={data:function(){return{violationTitle:{text:"违规用车按人名统计"},violationTimesHistogram:{columns:["user_name","warnnum"],rows:[]},violationSettings:{labelMap:{warnnum:"违规次数"}},monthlyTitle:{text:"违规用车按月统计",left:"center"},monthlyData:{columns:["everymonth","warnnum"],rows:[]},monthlyExtend:{series:{smooth:!1}},monthlySettings:{labelMap:{warnnum:"违规次数"}},searchData:{userName:"",policeCode:"",department:"",startTime:"",endTime:""},searchForm:[{type:"input",prop:"policeCode",width:"120px",placeholder:"警号"},{type:"input",prop:"userName",width:"120px",placeholder:"姓名"},{type:"select",prop:"department",width:"150px",options:[{label:"治安部门",value:"0"},{label:"交通管理部门",value:"1"}],change:function(){},placeholder:"所属部门"},{type:"daterange",options:[{prop:"startTime",format:"",valueformat:"",placeholder:"起始时间"},{prop:"endTime",format:"",valueformat:"",placeholder:"结束时间"}]}],tableList:[],options:{pageSize:10,hasIndex:!1,currentPage:1,loading:!0,maxHeight:null,height:"500"},columns:[{prop:"policeCode",label:"警号",align:"left"},{prop:"userName",label:"使用人",align:"left"},{prop:"department",label:"所属部门",align:"left"},{prop:"carNumber",label:"车牌号",align:"left"},{prop:"actualStartTime",label:"用车时间",align:"left",type:"date"},{prop:"actualEndTime",label:"还车时间",align:"left",type:"date"},{prop:"isException",label:"是否异常",align:"left"}],operates:{width:150,fixed:"right",list:[{id:"1",label:"查看",show:!0,underline:!1,icon:'<i class="el-icon-view"></i>',disabled:!1,method:function(){},showCallback:function(){return!0}}]}}},methods:{handleSearch:function(e){Object.assign(this.searchData,e),this.query()},afterCurrentPageClickHandle:function(e,t){this.query(e),t()},query:function(e){var t=this,a=0<arguments.length&&void 0!==e?e:1;Object(n.h)(Object.assign({nCurrent:a,nSize:10,userId:"5ba98b66cd3549b9b92ea8723e89207e",role:"123",recordPlace:""},this.searchData)).then((function(e){t.$refs.recordSpTableRef.setPageInfo(a,e.data.size,e.data.total,e.data.records)}))},getMonthIllUsecarStatistics:function(){var e=this;Object(n.v)({userId:"5ba98b66cd3549b9b92ea8723e89207e",deptId:"111",role:"111"}).then((function(t){var a=t.data;t.success&&a&&0<a.length&&(a.forEach((function(e){e.everymonth=e.everymonth+"月"})),e.monthlyData.rows=a)}))},getIllUsecarHumanStatistics:function(){var e=this;Object(n.s)({userId:"5ba98b66cd3549b9b92ea8723e89207e",deptId:"111",role:"111"}).then((function(t){t.success&&(e.violationTimesHistogram.rows=t.data)}))}},mounted:function(){this.getMonthIllUsecarStatistics(),this.getIllUsecarHumanStatistics(),this.query()}},l=(a("bb7e"),a("2877")),s=Object(l.a)(i,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container"},[e._m(0),a("div",{staticClass:"content"},[a("el-row",{staticClass:"bg-fff"},[a("el-col",{attrs:{span:12}},[a("e-histogram",{attrs:{chartSettings:e.violationSettings,title:e.violationTitle,chartData:e.violationTimesHistogram}})],1),a("el-col",{attrs:{span:12}},[a("ve-line",{attrs:{title:e.monthlyTitle,data:e.monthlyData,extend:e.monthlyExtend,settings:e.monthlySettings,"legend-visible":!1}})],1)],1),a("div",{staticClass:"search-wrap"},[a("div",{staticClass:"section-title"},[e._v("查询条件")]),a("e-search",{staticClass:"search-form",attrs:{searchData:e.searchData,searchForm:e.searchForm},on:{handleSearch:e.handleSearch}})],1),a("div",[a("e-table",{ref:"recordSpTableRef",attrs:{tableList:e.tableList,options:e.options,columns:e.columns,operates:e.operates},on:{afterCurrentPageClick:e.afterCurrentPageClickHandle}})],1)],1)])}),[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-title"},[a("span",[e._v("违规车管控")])])}],!1,null,"5567956f",null);t.default=s.exports},bb7e:function(e,t,a){"use strict";var n=a("dbf2");a.n(n).a},dbf2:function(e,t,a){}}]);