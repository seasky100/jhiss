(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4947ee17"],{"1c31":function(e,r,t){"use strict";t.d(r,"c",(function(){return n})),t.d(r,"f",(function(){return l})),t.d(r,"b",(function(){return u})),t.d(r,"d",(function(){return s})),t.d(r,"w",(function(){return i})),t.d(r,"e",(function(){return c})),t.d(r,"a",(function(){return p})),t.d(r,"i",(function(){return m})),t.d(r,"g",(function(){return d})),t.d(r,"h",(function(){return f})),t.d(r,"k",(function(){return b})),t.d(r,"l",(function(){return v})),t.d(r,"m",(function(){return g})),t.d(r,"v",(function(){return h})),t.d(r,"j",(function(){return w})),t.d(r,"t",(function(){return O})),t.d(r,"q",(function(){return F})),t.d(r,"p",(function(){return y})),t.d(r,"r",(function(){return j})),t.d(r,"o",(function(){return k})),t.d(r,"u",(function(){return C})),t.d(r,"s",(function(){return I})),t.d(r,"n",(function(){return $}));var o=t("b775"),a=t("3259");function n(e){return Object(o.a)({url:a.a.report.findInterViewPage,method:"get",params:e})}function l(e){return Object(o.a)({url:a.a.report.getInterViewById,method:"get",params:e})}function u(e){return Object(o.a)({url:a.a.report.deleteInterView,method:"delete",params:e})}function s(e){return Object(o.a)({url:a.a.report.findReportPage,method:"get",params:e})}function i(e){return Object(o.a)({url:a.a.post.treeAndUser,method:"get",params:e})}function c(e){return Object(o.a)({url:a.a.post.findWorknotePage,method:"get",params:e})}function p(e){return Object(o.a)({url:a.a.post.countWorkNote,method:"get",params:e})}function m(e){return Object(o.a)({url:a.a.post.noteAduit,method:"post",params:e})}function d(e){return Object(o.a)({url:a.a.post.getRiskByUserId,method:"get",params:e})}function f(e){return Object(o.a)({url:a.a.post.getUserList,method:"get",params:e})}function b(e){return Object(o.a)({url:a.a.report.saveDeclareExit,method:"post",data:e})}function v(e){return Object(o.a)({url:a.a.report.saveDeclareHouse,method:"post",data:e})}function g(e){return Object(o.a)({url:a.a.report.saveMarrage,method:"post",data:e})}function h(e){return Object(o.a)({url:a.a.report.saveWeddingBanquet,method:"post",data:e})}function w(e){return Object(o.a)({url:a.a.report.saveCashGift,method:"post",data:e})}function O(e){return Object(o.a)({url:a.a.report.saveRelativesWork,method:"post",data:e})}function F(e){return Object(o.a)({url:a.a.report.saveRelativesAbroad,method:"post",data:e})}function y(e){return Object(o.a)({url:a.a.report.saveOverseasInvestment,method:"post",data:e})}function j(e){return Object(o.a)({url:a.a.report.saveRelativesBusiness,method:"post",data:e})}function k(e){return Object(o.a)({url:a.a.report.saveOverseasDeposit,method:"post",data:e})}function C(e){return Object(o.a)({url:a.a.report.saveSecuredLoan,method:"post",data:e})}function I(e){return Object(o.a)({url:a.a.report.saveRelativesIllegal,method:"post",data:e})}function $(e){return Object(o.a)({url:a.a.report.saveOtherReport,method:"post",data:e})}},"3b30":function(e,r,t){"use strict";t.r(r),t("a4d3"),t("4de4"),t("4160"),t("d81d"),t("b0c0"),t("e439"),t("dbb4"),t("b64b"),t("159b");var o=t("ade3"),a=t("1c31"),n=t("3a58"),l=t("506b"),u=t("2f62");function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}var i={mixins:[l.a],data:function(){return{ruleForm:{type:"",borrower:"",workCompany:"",isBorrow:"",borrowReason:"",amount:"",interest:"",term:"",comment:"",department:"",approvalId:""},rules:{type:[{required:!0,message:"请选择",trigger:"change"}],borrower:[{required:!0,message:"请输入",trigger:"blur"}],workCompany:[{required:!0,message:"请输入",trigger:"blur"}],isBorrow:[{required:!0,message:"请选择",trigger:"change"}],borrowReason:[{required:!0,message:"请输入",trigger:"blur"}],amount:[{required:!0,message:"请输入",trigger:"blur"}],interest:[{required:!0,message:"请输入",trigger:"blur"}],term:[{required:!0,message:"请输入",trigger:"blur"}],department:[{required:!0,message:"请选择",trigger:"change"}],approvalId:[{required:!0,message:"请选择",trigger:"change"}]},typeOptions:[{label:"担保",value:"0"},{label:"借贷",value:"1"}],borrowOptions:[{label:"借入",value:"0"},{label:"借出",value:"1"}],config:{value:"id",label:"name",children:"childrens",disabled:!0},approvalArr:[],approvalList:[]}},computed:function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){Object(o.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}({},Object(u.c)(["orgData"])),methods:{orgChange:function(e){this.getUserListData(e)},getUserListData:function(e){var r=this,t={orgId:e};Object(n.g)(t).then((function(e){e.success&&e.data&&0<e.data.length&&(r.approvalArr=e.data)}))},submit:function(){var e=this;this.$refs.ruleForm.validate((function(r){if(!r)return e.$message({type:"warning",message:"请填写表单"}),!1;var t={flowProcess:{flowId:e.flowId,reportType:"110",sponsorId:"5ba98b66cd3549b9b92ea8723e89207e",sponsorName:"超级管理员",policeCode:"12345678",department:"治安支队",flowHistory:e.flowNodeList.map((function(r,t){return{node:r.orders,name:r.name,approvalId:e.approvalList[t].id,approvalName:e.approvalList[t].realName}}))},amount:e.ruleForm.amount,borrowReason:e.ruleForm.borrowReason,borrower:e.ruleForm.borrower,comment:e.ruleForm.comment,interest:e.ruleForm.interest,isBorrow:e.ruleForm.isBorrow,term:e.ruleForm.term,type:e.ruleForm.type,workCompany:e.ruleForm.workCompany};Object(a.u)(t).then((function(r){r.success?(e.$message({type:"success",message:"提交成功"}),e.$router.push("/IndividualReport")):e.$message({type:"error",message:"提交失败"})}))}))},selectChange:function(e){var r=this.approvalArr.filter((function(r){return r.id===e}));this.approvalList=r}},mounted:function(){this.getData("201")}},c=(t("5ead"),t("2877")),p=Object(c.a)(i,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"report-container"},[e._m(0),t("div",{staticClass:"report-content"},[t("div",{staticClass:"tip"},[e._v(" 本人为经营业务做担保人的情况；本人发生大额借贷情况，借贷款单次30万元以上、累计100万元以上的情况，事后7日内报告。 ")]),t("div",{staticClass:"form-content"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,size:"small","label-position":"top"}},[t("el-form-item",{attrs:{label:"类型",prop:"type"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.type,callback:function(r){e.$set(e.ruleForm,"type",r)},expression:"ruleForm.type"}},e._l(e.typeOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"借贷对象名称",prop:"borrower"}},[t("el-input",{model:{value:e.ruleForm.borrower,callback:function(r){e.$set(e.ruleForm,"borrower",r)},expression:"ruleForm.borrower"}})],1),t("el-form-item",{attrs:{label:"借贷对象工作单位",prop:"workCompany"}},[t("el-input",{model:{value:e.ruleForm.workCompany,callback:function(r){e.$set(e.ruleForm,"workCompany",r)},expression:"ruleForm.workCompany"}})],1),t("el-form-item",{attrs:{label:"借入/借出",prop:"isBorrow"}},[t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.isBorrow,callback:function(r){e.$set(e.ruleForm,"isBorrow",r)},expression:"ruleForm.isBorrow"}},e._l(e.borrowOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"借款事由",prop:"borrowReason"}},[t("el-input",{model:{value:e.ruleForm.borrowReason,callback:function(r){e.$set(e.ruleForm,"borrowReason",r)},expression:"ruleForm.borrowReason"}})],1),t("el-form-item",{attrs:{label:"金额（万元）",prop:"amount"}},[t("el-input",{model:{value:e.ruleForm.amount,callback:function(r){e.$set(e.ruleForm,"amount",r)},expression:"ruleForm.amount"}})],1),t("el-form-item",{attrs:{label:"约定利息",prop:"interest"}},[t("el-input",{model:{value:e.ruleForm.interest,callback:function(r){e.$set(e.ruleForm,"interest",r)},expression:"ruleForm.interest"}},[t("template",{slot:"append"},[e._v("%")])],2)],1),t("el-form-item",{attrs:{label:"期限（月）",prop:"term"}},[t("el-input",{model:{value:e.ruleForm.term,callback:function(r){e.$set(e.ruleForm,"term",r)},expression:"ruleForm.term"}})],1),t("el-form-item",{attrs:{label:"备注",prop:"comment"}},[t("el-input",{model:{value:e.ruleForm.comment,callback:function(r){e.$set(e.ruleForm,"comment",r)},expression:"ruleForm.comment"}})],1),t("el-form-item",{attrs:{label:"附件"}},[t("e-upload")],1),t("el-form-item",{attrs:{label:"审批人",required:""}},[t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{prop:"department"}},[t("select-tree",{attrs:{props:e.config,treeData:e.orgData,placeholder:"请选择部门"},on:{change:e.orgChange},model:{value:e.ruleForm.department,callback:function(r){e.$set(e.ruleForm,"department",r)},expression:"ruleForm.department"}})],1)],1),t("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),t("el-col",{attrs:{span:11}},[t("el-form-item",{attrs:{prop:"approvalId"}},[t("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectChange},model:{value:e.ruleForm.approvalId,callback:function(r){e.$set(e.ruleForm,"approvalId",r)},expression:"ruleForm.approvalId"}},e._l(e.approvalArr,(function(e){return t("el-option",{key:e.id,attrs:{label:e.realName,value:e.id}})})),1)],1)],1)],1),t("el-form-item",{staticStyle:{"text-align":"center"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),t("el-button",[e._v("取消")])],1)],1)],1)])])}),[function(){var e=this.$createElement,r=this._self._c||e;return r("div",{staticClass:"report-title"},[r("span",[this._v("担保借贷")])])}],!1,null,"a466e46a",null);r.default=p.exports},"506b":function(e,r,t){"use strict";var o=t("3a58");r.a={data:function(){return{flowId:"",flowNodeList:[]}},methods:{getFlow:function(e){var r={flowType:e};return Object(o.b)(r)},getFlowNode:function(e){var r={flowCode:e.flowCode};return Object(o.c)(r)},getData:function(e){var r=this;r.getFlow(e).then((function(e){var t=e.data[0];return r.getFlowNode(t)})).then((function(e){e.success&&(r.flowId=e.data.id,r.flowNodeList=e.data.flowNodeList)}))}}}},"5ead":function(e,r,t){"use strict";var o=t("8ee0f");t.n(o).a},"8ee0f":function(e,r,t){}}]);