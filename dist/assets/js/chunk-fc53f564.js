(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-fc53f564"],{"4ec0":function(t,a,e){"use strict";e.r(a),e("d81d");var n=e("6861"),l=e("1086"),r=e("cfa6"),i=e("8534"),o={components:{HistogramChart:n.default,LineChart:l.default,RingChart:r.default},data:function(){return{checkingInResult:{data:{columns:["type","num"],rows:[]},labelMap:{num:"数量"}},workTime:{data:{columns:["month","applynum"],rows:[]},labelMap:{applynum:"次数"}},tableData:[],total:0,params:{userId:"123",deptId:"123",role:"123"}}},methods:{},created:function(){var t=this;Object(i.a)(this.params).then((function(a){var e=[];for(var n in a)e.push({type:n,num:a[n]});t.checkingInResult.data.rows=e})),Object(i.c)(this.params).then((function(a){t.workTime.data.rows=a.map((function(t){return{month:t.month+"月",applynum:t.applynum}}))}))}},s=(e("e7d6"),e("2877")),c=Object(s.a)(o,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-container",{staticClass:"wisdom-attendance-container full-height"},[e("el-header",{attrs:{height:"40px"}},[t._v("审批记录分析")]),e("el-main",[e("div",{staticClass:"main"},[e("el-row",{staticClass:"top-chart",attrs:{gutter:16}},[e("el-col",{attrs:{span:12}},[e("RingChart",{attrs:{"chart-data":t.checkingInResult.data,"label-map":t.checkingInResult.labelMap,title:"数量"}})],1),e("el-col",{attrs:{span:12}},[e("LineChart",{attrs:{"chart-data":t.workTime.data,"label-map":t.workTime.labelMap,yAxisName:t.workTime.yAxisName,title:"请假次数"}})],1)],1),e("el-row",[e("el-col",[e("div",{staticClass:"comtainer"},[e("div",{staticClass:"query-condition"},[e("div",{staticClass:"title"},[t._v("查询条件")]),e("div",{staticClass:"search"},[e("el-input",{attrs:{placeholder:"警号",size:"mini"}}),e("el-input",{attrs:{placeholder:"姓名",size:"mini"}}),e("el-select",{attrs:{size:"mini"},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}},t._l(t.options,(function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),e("br"),e("div",{staticStyle:{"margin-bottom":"8px"}}),e("el-date-picker",{staticStyle:{"margin-right":"8px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",size:"mini"},model:{value:t.value1,callback:function(a){t.value1=a},expression:"value1"}}),e("el-select",{attrs:{size:"mini"},model:{value:t.value3,callback:function(a){t.value3=a},expression:"value3"}},t._l(t.options3,(function(t){return e("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),e("el-button",{attrs:{size:"mini"}},[t._v("清空")]),e("el-button",{attrs:{type:"primary",size:"mini"}},[t._v("查询")])],1)]),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,size:"mini"}},[e("el-table-column",{attrs:{prop:"userId",label:"警号"}}),e("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),e("el-table-column",{attrs:{prop:"department",label:"部门"}}),e("el-table-column",{attrs:{prop:"applyTime",label:"请假时间"}}),e("el-table-column",{attrs:{prop:"applyType",label:"请假类型"}}),e("el-table-column",{attrs:{prop:"approvalState",label:"审核状态"}}),e("el-table-column",{attrs:{prop:"isException",label:"是否异常"}}),e("el-table-column",{attrs:{prop:"operation",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.handleClick(a.row)}}},[t._v("详情")])]}}])})],1),e("div",{staticClass:"pagination"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.current,"page-size":10},on:{"current-change":t.handleCurrentChange}})],1)],1)])],1)],1)])],1)}),[],!1,null,"32b43b36",null);a.default=c.exports},8534:function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"d",(function(){return i})),e.d(a,"a",(function(){return o})),e.d(a,"c",(function(){return s}));var n=e("b775"),l=e("3259");function r(t){return Object(n.a)({url:l.a.askForLeave.vacationTypeStatistics,method:"get",params:t}).then((function(t){return t.data}))}function i(t){return Object(n.a)({url:l.a.askForLeave.vacationExceptionStatistics,method:"get",params:t}).then((function(){}))}function o(t){return Object(n.a)({url:l.a.askForLeave.applyException,method:"get",params:t}).then((function(t){return t.data}))}function s(t){return Object(n.a)({url:l.a.askForLeave.vacationApplyByMonth,method:"get",params:t}).then((function(t){return t.data}))}},"8ffd":function(t,a,e){},e7d6:function(t,a,e){"use strict";var n=e("8ffd");e.n(n).a}}]);