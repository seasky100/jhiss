(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-079196fa"],{"1c31":function(e,t,r){"use strict";r.d(t,"c",(function(){return l})),r.d(t,"f",(function(){return n})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return s})),r.d(t,"w",(function(){return i})),r.d(t,"e",(function(){return c})),r.d(t,"a",(function(){return p})),r.d(t,"i",(function(){return m})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return f})),r.d(t,"k",(function(){return b})),r.d(t,"l",(function(){return g})),r.d(t,"m",(function(){return v})),r.d(t,"v",(function(){return h})),r.d(t,"j",(function(){return O})),r.d(t,"t",(function(){return F})),r.d(t,"q",(function(){return j})),r.d(t,"p",(function(){return y})),r.d(t,"r",(function(){return w})),r.d(t,"o",(function(){return k})),r.d(t,"u",(function(){return I})),r.d(t,"s",(function(){return T})),r.d(t,"n",(function(){return $}));var a=r("b775"),o=r("3259");function l(e){return Object(a.a)({url:o.a.report.findInterViewPage,method:"get",params:e})}function n(e){return Object(a.a)({url:o.a.report.getInterViewById,method:"get",params:e})}function u(e){return Object(a.a)({url:o.a.report.deleteInterView,method:"delete",params:e})}function s(e){return Object(a.a)({url:o.a.report.findReportPage,method:"get",params:e})}function i(e){return Object(a.a)({url:o.a.post.treeAndUser,method:"get",params:e})}function c(e){return Object(a.a)({url:o.a.post.findWorknotePage,method:"get",params:e})}function p(e){return Object(a.a)({url:o.a.post.countWorkNote,method:"get",params:e})}function m(e){return Object(a.a)({url:o.a.post.noteAduit,method:"post",params:e})}function d(e){return Object(a.a)({url:o.a.post.getRiskByUserId,method:"get",params:e})}function f(e){return Object(a.a)({url:o.a.post.getUserList,method:"get",params:e})}function b(e){return Object(a.a)({url:o.a.report.saveDeclareExit,method:"post",data:e})}function g(e){return Object(a.a)({url:o.a.report.saveDeclareHouse,method:"post",data:e})}function v(e){return Object(a.a)({url:o.a.report.saveMarrage,method:"post",data:e})}function h(e){return Object(a.a)({url:o.a.report.saveWeddingBanquet,method:"post",data:e})}function O(e){return Object(a.a)({url:o.a.report.saveCashGift,method:"post",data:e})}function F(e){return Object(a.a)({url:o.a.report.saveRelativesWork,method:"post",data:e})}function j(e){return Object(a.a)({url:o.a.report.saveRelativesAbroad,method:"post",data:e})}function y(e){return Object(a.a)({url:o.a.report.saveOverseasInvestment,method:"post",data:e})}function w(e){return Object(a.a)({url:o.a.report.saveRelativesBusiness,method:"post",data:e})}function k(e){return Object(a.a)({url:o.a.report.saveOverseasDeposit,method:"post",data:e})}function I(e){return Object(a.a)({url:o.a.report.saveSecuredLoan,method:"post",data:e})}function T(e){return Object(a.a)({url:o.a.report.saveRelativesIllegal,method:"post",data:e})}function $(e){return Object(a.a)({url:o.a.report.saveOtherReport,method:"post",data:e})}},"2a99":function(e,t,r){"use strict";var a=r("e3b2");r.n(a).a},"506b":function(e,t,r){"use strict";var a=r("3a58");t.a={data:function(){return{flowId:"",flowNodeList:[]}},methods:{getFlow:function(e){var t={flowType:e};return Object(a.b)(t)},getFlowNode:function(e){var t={flowCode:e.flowCode};return Object(a.c)(t)},getData:function(e){var t=this;t.getFlow(e).then((function(e){var r=e.data[0];return t.getFlowNode(r)})).then((function(e){e.success&&(t.flowId=e.data.id,t.flowNodeList=e.data.flowNodeList)}))}}}},c269:function(e,t,r){"use strict";r.r(t),r("a4d3"),r("4de4"),r("4160"),r("d81d"),r("b0c0"),r("e439"),r("dbb4"),r("b64b"),r("159b");var a=r("ade3"),o=r("1c31"),l=r("3a58"),n=r("506b"),u=r("2f62");function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}var i={mixins:[n.a],data:function(){return{ruleForm:{name:"",relation:"",illegalType:"",happenTime:"",cause:"",stage:"",result:"",comment:"",department:"",approvalId:""},rules:{name:[{required:!0,message:"请输入",trigger:"blur"}],relation:[{required:!0,message:"请选择",trigger:"change"}],illegalType:[{required:!0,message:"请选择",trigger:"change"}],happenTime:[{required:!0,message:"请选择",trigger:"change"}],cause:[{required:!0,message:"请输入",trigger:"blur"}],stage:[{required:!0,message:"请选择",trigger:"change"}],result:[{required:!0,message:"请选择",trigger:"change"}],department:[{required:!0,message:"请选择",trigger:"change"}],approvalId:[{required:!0,message:"请选择",trigger:"change"}]},relationOptions:[{label:"配偶",value:"0"},{label:"子女",value:"1"},{label:"子女配偶",value:"2"}],illegalOptions:[{label:"民事诉讼",value:"0"},{label:"执纪执法机关查处",value:"1"},{label:"涉嫌犯罪",value:"2"},{label:"非正常死亡",value:"3"}],stageOptions:[{label:"立案侦查",value:"0"},{label:"审查起诉",value:"1"},{label:"刑事审判",value:"2"},{label:"刑罚执行",value:"3"},{label:"执行完毕",value:"4"},{label:"其它",value:"5"}],config:{value:"id",label:"name",children:"childrens",disabled:!0},approvalArr:[],approvalList:[]}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(u.c)(["orgData"])),methods:{orgChange:function(e){this.getUserListData(e)},getUserListData:function(e){var t=this,r={orgId:e};Object(l.g)(r).then((function(e){e.success&&e.data&&0<e.data.length&&(t.approvalArr=e.data)}))},submit:function(){var e=this;this.$refs.ruleForm.validate((function(t){if(!t)return e.$message({type:"warning",message:"请填写表单"}),!1;var r={flowProcess:{flowId:e.flowId,reportType:"107",sponsorId:"5ba98b66cd3549b9b92ea8723e89207e",sponsorName:"超级管理员",policeCode:"12345678",department:"治安支队",flowHistory:e.flowNodeList.map((function(t,r){return{node:t.orders,name:t.name,approvalId:e.approvalList[r].id,approvalName:e.approvalList[r].realName}}))},cause:e.ruleForm.cause,comment:e.ruleForm.comment,happenTime:e.ruleForm.happenTime,illegalType:e.ruleForm.illegalType,name:e.ruleForm.name,relation:e.ruleForm.relation,result:e.ruleForm.result,stage:e.ruleForm.stage};Object(o.s)(r).then((function(t){t.success?(e.$message({type:"success",message:"提交成功"}),e.$router.push("/IndividualReport")):e.$message({type:"error",message:"提交失败"})}))}))},selectChange:function(e){var t=this.approvalArr.filter((function(t){return t.id===e}));this.approvalList=t}},mounted:function(){this.getData("201")}},c=(r("2a99"),r("2877")),p=Object(c.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"report-container"},[e._m(0),r("div",{staticClass:"report-content"},[r("div",{staticClass:"tip"},[e._v(" 本人、父母、配偶、子女及其配偶涉及民事诉讼的情况，事发7日内报告。 ")]),r("div",{staticClass:"form-content"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,size:"small","label-position":"top"}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"与本人关系",prop:"relation"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.relation,callback:function(t){e.$set(e.ruleForm,"relation",t)},expression:"ruleForm.relation"}},e._l(e.relationOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"类型",prop:"illegalType"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.illegalType,callback:function(t){e.$set(e.ruleForm,"illegalType",t)},expression:"ruleForm.illegalType"}},e._l(e.illegalOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"发生时间",prop:"happenTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.ruleForm.happenTime,callback:function(t){e.$set(e.ruleForm,"happenTime",t)},expression:"ruleForm.happenTime"}})],1),r("el-form-item",{attrs:{label:"事由",prop:"cause"}},[r("el-input",{model:{value:e.ruleForm.cause,callback:function(t){e.$set(e.ruleForm,"cause",t)},expression:"ruleForm.cause"}})],1),r("el-form-item",{attrs:{label:"处理阶段",prop:"stage"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.stage,callback:function(t){e.$set(e.ruleForm,"stage",t)},expression:"ruleForm.stage"}},e._l(e.stageOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"处理结果",prop:"result"}},[r("el-input",{model:{value:e.ruleForm.result,callback:function(t){e.$set(e.ruleForm,"result",t)},expression:"ruleForm.result"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"comment"}},[r("el-input",{model:{value:e.ruleForm.comment,callback:function(t){e.$set(e.ruleForm,"comment",t)},expression:"ruleForm.comment"}})],1),r("el-form-item",{attrs:{label:"附件"}},[r("e-upload")],1),r("el-form-item",{attrs:{label:"审批人",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"department"}},[r("select-tree",{attrs:{props:e.config,treeData:e.orgData,placeholder:"请选择部门"},on:{change:e.orgChange},model:{value:e.ruleForm.department,callback:function(t){e.$set(e.ruleForm,"department",t)},expression:"ruleForm.department"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"approvalId"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectChange},model:{value:e.ruleForm.approvalId,callback:function(t){e.$set(e.ruleForm,"approvalId",t)},expression:"ruleForm.approvalId"}},e._l(e.approvalArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.realName,value:e.id}})})),1)],1)],1)],1),r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),r("el-button",[e._v("取消")])],1)],1)],1)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"report-title"},[t("span",[this._v("涉纪涉诉事项")])])}],!1,null,"1493bb5e",null);t.default=p.exports},e3b2:function(e,t,r){}}]);