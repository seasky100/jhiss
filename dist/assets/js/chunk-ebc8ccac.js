(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ebc8ccac"],{5014:function(e,t,a){"use strict";var n=a("d582");a.n(n).a},c452:function(e,t,a){"use strict";a.r(t);var n=a("6861"),s=a("1086"),r=a("b775"),l=a("3259"),o={components:{HistogramChart:n.default,LineChart:s.default},data:function(){return{searchData:{policeCode:"",userName:"",department:"",startTime:"",endTime:""},searchForm:[{type:"input",prop:"policeCode",width:"120px",placeholder:"警号"},{type:"input",prop:"userName",width:"120px",placeholder:"姓名"},{type:"select",prop:"dept_id",width:"150px",options:[],change:function(){},placeholder:"所属部门"},{type:"daterange",options:[{prop:"startTime",format:"",valueformat:"",placeholder:"起始日期"},{prop:"endTime",format:"",valueformat:"",placeholder:"结束日期"}]}],businessTrip:{data:{columns:["place","num"],rows:[]},labelMap:{num:"出差次数"}},reimburse:{data:{columns:["month","expenses"],rows:[{month:"1月",expenses:2300},{month:"2月",expenses:1300},{month:"3月",expenses:2800},{month:"4月",expenses:1500},{month:"5月",expenses:3400},{month:"6月",expenses:1500},{month:"7月",expenses:1600},{month:"8月",expenses:1230},{month:"9月",expenses:5300},{month:"10月",expenses:1200},{month:"11月",expenses:1400},{month:"12月",expenses:3300}]},labelMap:{expenses:"费用"}},params:{nCurrent:1,nSize:10,orderByField:"",isAsc:"",policeCode:"",userName:"",department:"",startTime:"",endTime:"",userId:""},tableData:[],total:0}},methods:{handleSearch:function(){}},created:function(){var e,t,a,n=this;e={userId:""},Object(r.a)({url:l.a.travelManagement.tripPlaceStatistics,method:"get",params:e}).then((function(e){return e.data})).then((function(e){for(var t in e)n.businessTrip.data.rows.push({place:t,num:e[t]})})),t={userId:""},Object(r.a)({url:l.a.travelManagement.tripMoneyStatistics,method:"get",params:t}).then((function(e){return e.data})).then((function(e){})),a={nCurrent:1,nSize:10},Object(r.a)({url:l.a.travelManagement.findTravelPage,method:"get",params:a}).then((function(e){return{data:e.data.records,total:e.data.total}})).then((function(e){n.tableData=e.data,n.total=e.total}))}},i=(a("5014"),a("2877")),p=Object(i.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticClass:"wisdom-attendance-container full-height"},[a("el-header",{attrs:{height:"40px"}},[e._v("报销异常分析")]),a("el-main",[a("div",{staticClass:"main"},[a("el-row",{staticClass:"top-chart",attrs:{gutter:16}},[a("el-col",{attrs:{span:12}},[a("HistogramChart",{attrs:{"chart-data":e.businessTrip.data,"label-map":e.businessTrip.labelMap,title:"出差次数"}})],1),a("el-col",{attrs:{span:12}},[a("LineChart",{attrs:{"chart-data":e.reimburse.data,"label-map":e.reimburse.labelMap,title:"费用(接口无数据data: [])"}})],1)],1),a("el-row",[a("el-col",[a("div",{staticClass:"search-comtainer"},[a("div",{staticClass:"query-condition"},[a("div",{staticClass:"title"},[e._v("查询条件")]),a("div",{staticClass:"search"},[a("e-search",{staticClass:"search-form",attrs:{searchData:e.searchData,searchForm:e.searchForm},on:{handleSearch:e.handleSearch}})],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,size:"mini"}},[a("el-table-column",{attrs:{prop:"policeCode",label:"警号"}}),a("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),a("el-table-column",{attrs:{prop:"department",label:"部门"}}),a("el-table-column",{attrs:{prop:"reimbursementTime",label:"报销时间"}}),a("el-table-column",{attrs:{prop:"reasons",label:"出差事由"}}),a("el-table-column",{attrs:{prop:"startTime",label:"出差时间"}}),a("el-table-column",{attrs:{prop:"endTime",label:"归队时间"}}),a("el-table-column",{attrs:{prop:"place",label:"出差地点"}}),a("el-table-column",{attrs:{prop:"isException",label:"分析结果"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"}},[e._v("详情")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:e.total}})],1)],1)])],1)],1)])],1)}),[],!1,null,"3c6a3812",null);t.default=p.exports},d582:function(e,t,a){}}]);