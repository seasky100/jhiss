(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5f02b2b0"],{"1c31":function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"f",(function(){return l})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return i})),r.d(t,"w",(function(){return s})),r.d(t,"e",(function(){return c})),r.d(t,"a",(function(){return p})),r.d(t,"i",(function(){return m})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return f})),r.d(t,"k",(function(){return b})),r.d(t,"l",(function(){return v})),r.d(t,"m",(function(){return g})),r.d(t,"v",(function(){return h})),r.d(t,"j",(function(){return F})),r.d(t,"t",(function(){return y})),r.d(t,"q",(function(){return O})),r.d(t,"p",(function(){return j})),r.d(t,"r",(function(){return w})),r.d(t,"o",(function(){return k})),r.d(t,"u",(function(){return N})),r.d(t,"s",(function(){return C})),r.d(t,"n",(function(){return D}));var a=r("b775"),o=r("3259");function n(e){return Object(a.a)({url:o.a.report.findInterViewPage,method:"get",params:e})}function l(e){return Object(a.a)({url:o.a.report.getInterViewById,method:"get",params:e})}function u(e){return Object(a.a)({url:o.a.report.deleteInterView,method:"delete",params:e})}function i(e){return Object(a.a)({url:o.a.report.findReportPage,method:"get",params:e})}function s(e){return Object(a.a)({url:o.a.post.treeAndUser,method:"get",params:e})}function c(e){return Object(a.a)({url:o.a.post.findWorknotePage,method:"get",params:e})}function p(e){return Object(a.a)({url:o.a.post.countWorkNote,method:"get",params:e})}function m(e){return Object(a.a)({url:o.a.post.noteAduit,method:"post",params:e})}function d(e){return Object(a.a)({url:o.a.post.getRiskByUserId,method:"get",params:e})}function f(e){return Object(a.a)({url:o.a.post.getUserList,method:"get",params:e})}function b(e){return Object(a.a)({url:o.a.report.saveDeclareExit,method:"post",data:e})}function v(e){return Object(a.a)({url:o.a.report.saveDeclareHouse,method:"post",data:e})}function g(e){return Object(a.a)({url:o.a.report.saveMarrage,method:"post",data:e})}function h(e){return Object(a.a)({url:o.a.report.saveWeddingBanquet,method:"post",data:e})}function F(e){return Object(a.a)({url:o.a.report.saveCashGift,method:"post",data:e})}function y(e){return Object(a.a)({url:o.a.report.saveRelativesWork,method:"post",data:e})}function O(e){return Object(a.a)({url:o.a.report.saveRelativesAbroad,method:"post",data:e})}function j(e){return Object(a.a)({url:o.a.report.saveOverseasInvestment,method:"post",data:e})}function w(e){return Object(a.a)({url:o.a.report.saveRelativesBusiness,method:"post",data:e})}function k(e){return Object(a.a)({url:o.a.report.saveOverseasDeposit,method:"post",data:e})}function N(e){return Object(a.a)({url:o.a.report.saveSecuredLoan,method:"post",data:e})}function C(e){return Object(a.a)({url:o.a.report.saveRelativesIllegal,method:"post",data:e})}function D(e){return Object(a.a)({url:o.a.report.saveOtherReport,method:"post",data:e})}},"310c":function(e,t,r){"use strict";var a=r("e5d0");r.n(a).a},"506b":function(e,t,r){"use strict";var a=r("3a58");t.a={data:function(){return{flowId:"",flowNodeList:[]}},methods:{getFlow:function(e){var t={flowType:e};return Object(a.b)(t)},getFlowNode:function(e){var t={flowCode:e.flowCode};return Object(a.c)(t)},getData:function(e){var t=this;t.getFlow(e).then((function(e){var r=e.data[0];return t.getFlowNode(r)})).then((function(e){e.success&&(t.flowId=e.data.id,t.flowNodeList=e.data.flowNodeList)}))}}}},d942:function(e,t,r){"use strict";r.r(t),r("a4d3"),r("4de4"),r("4160"),r("d81d"),r("b0c0"),r("e439"),r("dbb4"),r("b64b"),r("159b");var a=r("ade3"),o=r("1c31"),n=r("3a58"),l=r("506b"),u=r("2f62");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}var s={mixins:[l.a],data:function(){return{ruleForm:{name:"",certificateName:"",certificateNum:"",workCompany:"",enterpriseType:"0",isDuty:"0",post:"",relation:"0",isAbroad:"0",comment:"",department:"",approvalId:""},rules:{name:[{required:!0,message:"请输入",trigger:"blur"}],certificateName:[{required:!0,message:"请输入",trigger:"blur"}],certificateNum:[{required:!0,message:"请输入",trigger:"blur"}],workCompany:[{required:!0,message:"请输入",trigger:"blur"}],enterpriseType:[{required:!0,message:"请选择",trigger:"change"}],isDuty:[{required:!0,message:"请选择",trigger:"change"}],post:[{required:!0,message:"请选择",trigger:"change"}],relation:[{required:!0,message:"请选择",trigger:"change"}],isAbroad:[{required:!0,message:"请选择",trigger:"change"}],department:[{required:!0,message:"请选择",trigger:"change"}],approvalId:[{required:!0,message:"请选择",trigger:"change"}]},enterpriseOptions:[{label:"党政机关",value:"0"},{label:"事业单位",value:"1"},{label:"国有企业",value:"2"},{label:"军队",value:"3"},{label:"学生",value:"4"},{label:"其它",value:"5"},{label:"个体工商户",value:"6"},{label:"私营企业",value:"7"},{label:"外商投资企业",value:"8"},{label:"境内从事生产经营活动的外国（地区）企业",value:"9"},{label:"外国（地区）企业常驻境内代表机构",value:"10"},{label:"境外非政府组织的境内代表机构",value:"11"}],options:[{label:"否",value:"0"},{label:"是",value:"1"}],relationOptions:[{label:"妻子",value:"0"},{label:"丈夫",value:"1"},{label:"儿子",value:"2"},{label:"女儿",value:"3"},{label:"儿媳",value:"4"},{label:"儿婿",value:"5"}],config:{value:"id",label:"name",children:"childrens",disabled:!0},approvalArr:[],approvalList:[]}},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(u.c)(["orgData"])),methods:{orgChange:function(e){this.getUserListData(e)},getUserListData:function(e){var t=this,r={orgId:e};Object(n.g)(r).then((function(e){e.success&&e.data&&0<e.data.length&&(t.approvalArr=e.data)}))},submit:function(){var e=this;this.$refs.ruleForm.validate((function(t){if(!t)return e.$message({type:"warning",message:"请填写表单"}),!1;var r={flowProcess:{flowId:e.flowId,reportType:"106",sponsorId:"5ba98b66cd3549b9b92ea8723e89207e",sponsorName:"超级管理员",policeCode:"12345678",department:"治安支队",flowHistory:e.flowNodeList.map((function(t,r){return{node:t.orders,name:t.name,approvalId:e.approvalList[r].id,approvalName:e.approvalList[r].realName}}))},certificateName:e.ruleForm.certificateName,certificateNum:e.ruleForm.certificateNum,comment:e.ruleForm.comment,enterpriseType:e.ruleForm.enterpriseType,isAbroad:e.ruleForm.isAbroad,isDuty:e.ruleForm.isDuty,isLife:"0",name:e.ruleForm.name,post:e.ruleForm.post,relation:e.ruleForm.relation,workCompany:e.ruleForm.workCompany};Object(o.t)(r).then((function(t){t.success?(e.$message({type:"success",message:"提交成功"}),e.$router.push("/IndividualReport")):e.$message({type:"error",message:"提交失败"})}))}))},selectChange:function(e){var t=this.approvalArr.filter((function(t){return t.id===e}));this.approvalList=t}},mounted:function(){this.getData("201")}},c=(r("310c"),r("2877")),p=Object(c.a)(s,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"report-container"},[e._m(0),r("div",{staticClass:"report-content"},[r("div",{staticClass:"tip"},[e._v(" 配偶、子女及其他直系亲属拟在本人单位或所管辖的单位安排工作或就业的，事前10日内报告；配偶、子女及其配偶从业变化情况，事后7日内报告。 ")]),r("div",{staticClass:"form-content"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,size:"small","label-position":"top"}},[r("el-form-item",{attrs:{label:"姓名",prop:"name"}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),r("el-form-item",{attrs:{label:"证件名称",prop:"certificateName"}},[r("el-input",{model:{value:e.ruleForm.certificateName,callback:function(t){e.$set(e.ruleForm,"certificateName",t)},expression:"ruleForm.certificateName"}})],1),r("el-form-item",{attrs:{label:"证件号码",prop:"certificateNum"}},[r("el-input",{model:{value:e.ruleForm.certificateNum,callback:function(t){e.$set(e.ruleForm,"certificateNum",t)},expression:"ruleForm.certificateNum"}})],1),r("el-form-item",{attrs:{label:"工作（学习）单位",prop:"workCompany"}},[r("el-input",{model:{value:e.ruleForm.workCompany,callback:function(t){e.$set(e.ruleForm,"workCompany",t)},expression:"ruleForm.workCompany"}})],1),r("el-form-item",{attrs:{label:"单位性质",prop:"enterpriseType"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.enterpriseType,callback:function(t){e.$set(e.ruleForm,"enterpriseType",t)},expression:"ruleForm.enterpriseType"}},e._l(e.enterpriseOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),"6"===e.ruleForm.enterpriseType||"7"===e.ruleForm.enterpriseType||"8"===e.ruleForm.enterpriseType||"9"===e.ruleForm.enterpriseType||"10"===e.ruleForm.enterpriseType||"11"===e.ruleForm.enterpriseType?r("el-form-item",{attrs:{label:"是否担任高级职称",prop:"isDuty"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.isDuty,callback:function(t){e.$set(e.ruleForm,"isDuty",t)},expression:"ruleForm.isDuty"}},e._l(e.options,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1):e._e(),r("el-form-item",{attrs:{label:"现任职务",prop:"post"}},[r("el-input",{model:{value:e.ruleForm.post,callback:function(t){e.$set(e.ruleForm,"post",t)},expression:"ruleForm.post"}})],1),r("el-form-item",{attrs:{label:"与本人关系",prop:"relation"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.relation,callback:function(t){e.$set(e.ruleForm,"relation",t)},expression:"ruleForm.relation"}},e._l(e.relationOptions,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"是否在国（境）外",prop:"isAbroad"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.ruleForm.isAbroad,callback:function(t){e.$set(e.ruleForm,"isAbroad",t)},expression:"ruleForm.isAbroad"}},e._l(e.options,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{label:"备注",prop:"comment"}},[r("el-input",{model:{value:e.ruleForm.comment,callback:function(t){e.$set(e.ruleForm,"comment",t)},expression:"ruleForm.comment"}})],1),r("el-form-item",{attrs:{label:"附件"}},[r("e-upload")],1),r("el-form-item",{attrs:{label:"审批人",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"department"}},[r("select-tree",{attrs:{props:e.config,treeData:e.orgData,placeholder:"请选择部门"},on:{change:e.orgChange},model:{value:e.ruleForm.department,callback:function(t){e.$set(e.ruleForm,"department",t)},expression:"ruleForm.department"}})],1)],1),r("el-col",{staticClass:"line",attrs:{span:2}},[e._v("-")]),r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"approvalId"}},[r("el-select",{attrs:{placeholder:"请选择"},on:{change:e.selectChange},model:{value:e.ruleForm.approvalId,callback:function(t){e.$set(e.ruleForm,"approvalId",t)},expression:"ruleForm.approvalId"}},e._l(e.approvalArr,(function(e){return r("el-option",{key:e.id,attrs:{label:e.realName,value:e.id}})})),1)],1)],1)],1),r("el-form-item",{staticStyle:{"text-align":"center"}},[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")]),r("el-button",[e._v("取消")])],1)],1)],1)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"report-title"},[t("span",[this._v("亲属就业")])])}],!1,null,"2a68d074",null);t.default=p.exports},e5d0:function(e,t,r){}}]);