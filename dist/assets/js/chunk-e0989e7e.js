(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e0989e7e"],{"0e7c":function(t,e,a){},3430:function(t,e,a){"use strict";var l=a("0e7c");a.n(l).a},"68aa":function(t,e,a){"use strict";a.r(e);var l=a("afb1"),i=a("ade3"),n={props:{title:{type:String,default:"通报详情"}},data:function(){var t;return{visible:!1,form:(t={bulletinTitle:"",bulletinObject:"",publishUnit:"",bulletinDate:"",problemNature:""},Object(i.a)(t,"publishUnit",""),Object(i.a)(t,"userCreate",""),Object(i.a)(t,"content",""),t)}},methods:{open:function(t){this.visible=!0,this.getDetailInfo(t)},getDetailInfo:function(t){var e=this,a={id:t.id};Object(l.n)(a).then((function(t){t.success&&(e.form=t.data)}))}}},s=(a("3430"),a("2877")),r={components:{BulletinInfo:Object(s.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:t.title,visible:t.visible,width:"700px"},on:{"update:visible":function(e){t.visible=e}}},[a("div",{staticClass:"detail-wrapper"},[a("el-scrollbar",{staticStyle:{height:"100%"}},[a("div",{staticClass:"detail-info"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px",size:"small"}},[a("el-form-item",{attrs:{label:"标题"}},[a("el-input",{model:{value:t.form.bulletinTitle,callback:function(e){t.$set(t.form,"bulletinTitle",e)},expression:"form.bulletinTitle"}})],1),a("el-form-item",{attrs:{label:"被通报人"}},[a("el-input",{model:{value:t.form.bulletinObject,callback:function(e){t.$set(t.form,"bulletinObject",e)},expression:"form.bulletinObject"}})],1),a("el-form-item",{attrs:{label:"所在通报单位"}},[a("el-input",{model:{value:t.form.publishUnit,callback:function(e){t.$set(t.form,"publishUnit",e)},expression:"form.publishUnit"}})],1),a("el-form-item",{attrs:{label:"通报时间"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.bulletinDate,callback:function(e){t.$set(t.form,"bulletinDate",e)},expression:"form.bulletinDate"}})],1),a("el-form-item",{attrs:{label:"问题性质"}},[a("dic-select",{staticClass:"dic-select",attrs:{type:"通报问题性质"},model:{value:t.form.problemNature,callback:function(e){t.$set(t.form,"problemNature",e)},expression:"form.problemNature"}})],1),a("el-form-item",{attrs:{label:"发起单位"}},[a("el-input",{model:{value:t.form.publishUnit,callback:function(e){t.$set(t.form,"publishUnit",e)},expression:"form.publishUnit"}})],1),a("el-form-item",{attrs:{label:"填报人"}},[a("el-input",{model:{value:t.form.userCreate,callback:function(e){t.$set(t.form,"userCreate",e)},expression:"form.userCreate"}})],1),a("el-form-item",{attrs:{label:"内容"}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)],1)])],1)])],1)}),[],!1,null,"00acbcdc",null).exports},data:function(){var t=this;return{departmentTitle:{text:"部门通报次数统计"},departmentSettings:{labelMap:{bulletinNum:"通报次数"}},departData:{columns:["department","bulletinNum"],rows:[]},exceptionTitle:{text:"问题性质分类统计"},exceptionSettings:{labelMap:{times:"次数"}},exceptionData:{columns:["exception","times"],rows:[]},monthlyTitle:{text:"按月检查通报统计次数"},monthlySettings:{labelMap:{COUNT:"次数"}},monthlyData:{columns:["months","COUNT"],rows:[]},searchData:{userName:"",policeCode:"",department:"",problemType:"",startTime:"",endTime:""},searchForm:[{type:"input",prop:"policeCode",width:"120px",placeholder:"警号"},{type:"input",prop:"userName",width:"120px",placeholder:"通报对象"},{type:"select",prop:"department",width:"150px",options:[{label:"治安部门",value:"0"},{label:"交通管理部门",value:"1"}],change:function(){},placeholder:"所属部门"},{type:"daterange",options:[{prop:"startTime",format:"",valueformat:"",placeholder:"起始时间"},{prop:"endTime",format:"",valueformat:"",placeholder:"结束时间"}]},{type:"select",prop:"problemType",width:"150px",options:[{label:"表彰通报",value:"0"},{label:"批评通报",value:"1"}],change:function(){},placeholder:"通报类型"}],tableList:[],options:{pageSize:10,hasIndex:!1,currentPage:1,loading:!0,maxHeight:null,height:"500"},columns:[{prop:"bulletinTitle",label:"标题",align:"left"},{prop:"policeCode",label:"警号",align:"left"},{prop:"bulletinObject",label:"被通报对象",align:"left"},{prop:"bulletinDate",label:"通报时间",align:"left"},{prop:"problemNature",label:"问题性质",align:"left"}],operates:{width:150,fixed:"right",list:[{id:"1",label:"详情",show:!0,underline:!1,icon:'<i class="el-icon-view"></i>',disabled:!1,method:function(e,a){t.$refs.bulletinInfo.open(a)},showCallback:function(){return!0}}]}}},methods:{handleSearch:function(t){Object.assign(this.searchData,t),this.query()},afterCurrentPageClickHandle:function(t,e){this.query(t),e()},query:function(t){var e=this,a=0<arguments.length&&void 0!==t?t:1;Object(l.f)(Object.assign({nCurrent:a,nSize:10},this.searchData)).then((function(t){e.$refs.recordSpTableRef.setPageInfo(a,t.data.size,t.data.total,t.data.records)}))},getBulletinTypeStatistics:function(){var t=this;Object(l.d)({userId:"5ba98b66cd3549b9b92ea8723e89207e"}).then((function(e){if(e.success&&e.data){var a=[];for(var l in e.data)a.push({department:l,bulletinNum:e.data[l]});t.departData.rows=a}}))},getBulletinExceptionStatistics:function(){var t=this;Object(l.b)({userId:"5ba98b66cd3549b9b92ea8723e89207e"}).then((function(e){if(e.success&&e.data){var a=[];for(var l in e.data)a.push({exception:l,times:e.data[l]});t.exceptionData.rows=a}}))},getBulletinTimesStatistics:function(){var t=this;Object(l.c)({userId:"5ba98b66cd3549b9b92ea8723e89207e"}).then((function(e){e.success&&e.data&&(t.monthlyData.rows=e.data)}))}},mounted:function(){this.getBulletinTypeStatistics(),this.getBulletinExceptionStatistics(),this.getBulletinTimesStatistics(),this.query()}},o=(a("f513"),Object(s.a)(r,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[t._m(0),a("div",{staticClass:"content"},[a("el-row",{staticClass:"bg-fff"},[a("el-col",{attrs:{span:8}},[a("e-histogram",{attrs:{chartSettings:t.departmentSettings,title:t.departmentTitle,chartData:t.departData}})],1),a("el-col",{attrs:{span:8}},[a("e-histogram",{attrs:{chartSettings:t.exceptionSettings,title:t.exceptionTitle,chartData:t.exceptionData}})],1),a("el-col",{attrs:{span:8}},[a("e-histogram",{attrs:{chartSettings:t.monthlySettings,title:t.monthlyTitle,chartData:t.monthlyData}})],1)],1),a("div",{staticClass:"search-wrap"},[a("div",{staticClass:"section-title"},[t._v("查询条件")]),a("e-search",{staticClass:"search-form",attrs:{searchData:t.searchData,searchForm:t.searchForm},on:{handleSearch:t.handleSearch}})],1),a("div",[a("e-table",{ref:"recordSpTableRef",attrs:{tableList:t.tableList,options:t.options,columns:t.columns,operates:t.operates},on:{afterCurrentPageClick:t.afterCurrentPageClickHandle}})],1)],1),a("bulletin-info",{ref:"bulletinInfo"})],1)}),[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-title"},[a("span",[t._v("检查通报")])])}],!1,null,"5ba1743e",null));e.default=o.exports},cfce:function(t,e,a){},f513:function(t,e,a){"use strict";var l=a("cfce");a.n(l).a}}]);