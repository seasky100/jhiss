(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-76619fdc"],{"1c31":function(e,t,r){"use strict";r.d(t,"c",(function(){return o})),r.d(t,"f",(function(){return l})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return s})),r.d(t,"w",(function(){return i})),r.d(t,"e",(function(){return c})),r.d(t,"a",(function(){return p})),r.d(t,"i",(function(){return m})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return b})),r.d(t,"k",(function(){return f})),r.d(t,"l",(function(){return v})),r.d(t,"m",(function(){return g})),r.d(t,"v",(function(){return h})),r.d(t,"j",(function(){return O})),r.d(t,"t",(function(){return q})),r.d(t,"q",(function(){return F})),r.d(t,"p",(function(){return j})),r.d(t,"r",(function(){return w})),r.d(t,"o",(function(){return y})),r.d(t,"u",(function(){return k})),r.d(t,"s",(function(){return I})),r.d(t,"n",(function(){return P}));var a=r("b775"),n=r("3259");function o(e){return Object(a.a)({url:n.a.report.findInterViewPage,method:"get",params:e})}function l(e){return Object(a.a)({url:n.a.report.getInterViewById,method:"get",params:e})}function u(e){return Object(a.a)({url:n.a.report.deleteInterView,method:"delete",params:e})}function s(e){return Object(a.a)({url:n.a.report.findReportPage,method:"get",params:e})}function i(e){return Object(a.a)({url:n.a.post.treeAndUser,method:"get",params:e})}function c(e){return Object(a.a)({url:n.a.post.findWorknotePage,method:"get",params:e})}function p(e){return Object(a.a)({url:n.a.post.countWorkNote,method:"get",params:e})}function m(e){return Object(a.a)({url:n.a.post.noteAduit,method:"post",params:e})}function d(e){return Object(a.a)({url:n.a.post.getRiskByUserId,method:"get",params:e})}function b(e){return Object(a.a)({url:n.a.post.getUserList,method:"get",params:e})}function f(e){return Object(a.a)({url:n.a.report.saveDeclareExit,method:"post",data:e})}function v(e){return Object(a.a)({url:n.a.report.saveDeclareHouse,method:"post",data:e})}function g(e){return Object(a.a)({url:n.a.report.saveMarrage,method:"post",data:e})}function h(e){return Object(a.a)({url:n.a.report.saveWeddingBanquet,method:"post",data:e})}function O(e){return Object(a.a)({url:n.a.report.saveCashGift,method:"post",data:e})}function q(e){return Object(a.a)({url:n.a.report.saveRelativesWork,method:"post",data:e})}function F(e){return Object(a.a)({url:n.a.report.saveRelativesAbroad,method:"post",data:e})}function j(e){return Object(a.a)({url:n.a.report.saveOverseasInvestment,method:"post",data:e})}function w(e){return Object(a.a)({url:n.a.report.saveRelativesBusiness,method:"post",data:e})}function y(e){return Object(a.a)({url:n.a.report.saveOverseasDeposit,method:"post",data:e})}function k(e){return Object(a.a)({url:n.a.report.saveSecuredLoan,method:"post",data:e})}function I(e){return Object(a.a)({url:n.a.report.saveRelativesIllegal,method:"post",data:e})}function P(e){return Object(a.a)({url:n.a.report.saveOtherReport,method:"post",data:e})}},"506b":function(e,t,r){"use strict";var a=r("3a58");t.a={data:function(){return{flowId:"",flowNodeList:[]}},methods:{getFlow:function(e){var t={flowType:e};return Object(a.b)(t)},getFlowNode:function(e){var t={flowCode:e.flowCode};return Object(a.c)(t)},getData:function(e){var t=this;t.getFlow(e).then((function(e){var r=e.data[0];return t.getFlowNode(r)})).then((function(e){e.success&&(t.flowId=e.data.id,t.flowNodeList=e.data.flowNodeList)}))}}}},b5e4:function(e,t,r){"use strict";var a=r("bae7");r.n(a).a},bae7:function(e,t,r){},bb6a:function(e,t,r){"use strict";r.r(t),r("a4d3"),r("4de4"),r("4160"),r("d81d"),r("b0c0"),r("e439"),r("dbb4"),r("b64b"),r("159b");var a=r("ade3"),n=r("1c31"),o=r("3a58"),l=r("506b"),u=r("2f62");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}var i={mixins:[l.a],data:function(){return{ruleForm:{banquetState:"",isBanquet:"",banquetScope:[],count:"",mealsPrice:"",banquetRelation:"",comment:"",department:"",approvalId:""},rules:{banquetState:[{required:!0,message:"请选择",trigger:"change"}],isBanquet:[{required:!0,message:"请选择",trigger:"change"}],banquetScope:[{type:"array",required:!0,message:"请至少",trigger:"change"}],count:[{required:!0,message:"请输入",trigger:"blur"}],mealsPrice:[{required:!0,message:"请输入",trigger:"blur"}],department:[{required:!0,message:"请选择",trigger:"change"}],approvalId:[{required:!0,message:"请选择",trigger:"change"}]},banquetOptions:[{label:"婚（喜庆）事",value:"0"},{label:"丧事",value:"1"}],options:[{label:"否",value:"0"},{label:"是",value:"1"}],banquetArr:[{label:"亲戚",value:"0"},{label:"朋友",value:"1"},{label:"同事",value:"2"},{label:"同学",value:"3"},{label:"其它",value:"4"}],relationOptions:[{label:"本人",value:"0"},{label:"子女",value:"1"},{label:"父母",value:"2"},{label:"祖父母",value:"3"},{label:"外祖父母",value:"4"}],config:{value:"id",label:"name",children:"childrens",disabled:!0},approvalArr:[],approvalList:[]}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(u.c)(["orgData"])),methods:{orgChange:function(e){this.getUserListData(e)},getUserListData:function(e){var t=this,r={orgId:e};Object(o.g)(r).then((function(e){e.success&&e.data&&0<e.data.length&&(t.approvalArr=e.data)}))},submit:function(){var e=this;this.$refs.ruleForm.validate((function(t){if(!t)return e.$message({type:"warning",message:"请填写表单"}),!1;var r={flowProcess:{flowId:e.flowId,reportType:"102",sponsorId:"5ba98b66cd3549b9b92ea8723e89207e",sponsorName:"超级管理员",policeCode:"12345678",department:"治安支队",flowHistory:e.flowNodeList.map((function(t,r){return{node:t.orders,name:t.name,approvalId:e.approvalList[r].id,approvalName:e.approvalList[r].realName}}))},banquetRelation:e.ruleForm.banquetRelation,banquetScope:e.ruleForm.banquetScope,banquetState:e.ruleForm.banquetState,comment:e.ruleForm.comment,count:e.ruleForm.count,isBanquet:e.ruleForm.isBanquet,mealsPrice:e.ruleForm.mealsPrice};Object(n.v)(r).then((function(t){t.success?(e.$message({type:"success",message:"提交成功"}),e.$router.push("/IndividualReport")):e.$message({type:"error",message:"提交失败"})}))}))},selectChange:function(e){var t=this.approvalArr.filter((function(t){return t.id===e}));this.approvalList=t}},mounted:function(){this.getData("201")}},c=(r("b5e4"),r("2877")),p=Object(c.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"report-container"},[e._m(0),r("div",{staticClass:"report-content"},[r("div",{staticClass:"tip"},[e._v(" 本人及直系亲属婚(喜庆)事、直系亲属丧事的办理情况,包括是否举办宴请、宴请对象范围、酒席桌数、餐费标准等，婚(喜庆)事事前7日内报告；丧事事后7日内报告。收受礼金、礼品等情况，事后7日内报告。 ")]),r("div",{staticClass:"form-content"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,size:"small","label-position":"top"}},[r("el-form-item",{attrs:{label:"办理类型",prop:"banquetState"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.banquetState,callback:function(t){e.$set(e.ruleForm,"banquetState",t)},expression:"ruleForm.banquetState"}},e._l(e.banquetOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"是否宴请",prop:"isBanquet"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.isBanquet,callback:function(t){e.$set(e.ruleForm,"isBanquet",t)},expression:"ruleForm.isBanquet"}},e._l(e.options,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"宴请对象范围",prop:"banquetScope"}},[r("el-checkbox-group",{model:{value:e.ruleForm.banquetScope,callback:function(t){e.$set(e.ruleForm,"banquetScope",t)},expression:"ruleForm.banquetScope"}},e._l(e.banquetArr,(function(t,a){return r("el-checkbox",{key:a,attrs:{label:t.value}},[e._v(e._s(t.label))])})),1)],1),r("el-form-item",{attrs:{label:"酒席桌数（桌）",prop:"count"}},[r("el-input",{model:{value:e.ruleForm.count,callback:function(t){e.$set(e.ruleForm,"count",t)},expression:"ruleForm.count"}})],1),r("el-form-item",{attrs:{label:"餐费标准（元）",prop:"mealsPrice"}},[r("el-input",{model:{value:e.ruleForm.mealsPrice,callback:function(t){e.$set(e.ruleForm,"mealsPrice",t)},expression:"ruleForm.mealsPrice"}})],1),r("el-form-item",{attrs:{label:"与本人关系",prop:"banquetRelation"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.banquetRelation,callback:function(t){e.$set(e.ruleForm,"banquetRelation",t)},expression:"ruleForm.banquetRelation"}},e._l(e.relationOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"备注",prop:"comment"}},[r("el-input",{model:{value:e.ruleForm.comment,callback:function(t){e.$set(e.ruleForm,"comment",t)},expression:"ruleForm.comment"}})],1),r("el-form-item",{attrs:{label:"附件"}},[r("e-upload")],1),r("el-form-item",{attrs:{label:"审批人",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"department"}},[r("select-tree",{attrs:{props:e.config,treeData:e.orgData,placeholder:"请选择部门"},on:{change:e.orgChange},model:{value:e.ruleForm.department,callback:function(t){e.$set(e.ruleForm,"department",t)},expression:"ruleForm.department"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"approvalId"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectChange},model:{value:e.ruleForm.approvalId,callback:function(t){e.$set(e.ruleForm,"approvalId",t)},expression:"ruleForm.approvalId"}},e._l(e.approvalArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.realName,value:e.id}})})),1)],1)],1)],1),r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),r("el-button",[e._v("取消")])],1)],1)],1)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"report-title"},[t("span",[this._v("婚丧宴请")])])}],!1,null,"7c99e3ab",null);t.default=p.exports}}]);