(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-968b57d6"],{"2df2":function(t,e,i){"use strict";var l=i("cc90");i.n(l).a},"9ab6":function(t,e,i){t.exports=i.p+"assets/img/dir_left.png"},c3b6d:function(t,e,i){"use strict";i.r(e);var l={name:"Departmental_level",data:function(){return{active:0,entranceList:[],tree_data:null,horizontal:!0,path_url:"Personnel_relation",model:"",timer:null}},watch:{},mounted:function(){this.init()},methods:{init:function(){var t=this.$route.query;this.tree_data=t.value,this.active=t.value.id,this.entranceList=t.list,this.model=t.model},changeScroll:function(t){var e=this,i=0<arguments.length&&void 0!==t?t:"right",l=this.$refs.dep_list.scrollLeft,n=this.$refs.dep_list.scrollWidth,s=0;this.timer="left"==i?setInterval((function(){l<s&&clearInterval(e.timer),$(e.$refs.dep_list).animate({scrollLeft:l-s},0),s++}),0):setInterval((function(){n<s+l&&clearInterval(e.timer),$(e.$refs.dep_list).animate({scrollLeft:l+s},0),s++}),0)},stopScroll:function(){clearInterval(this.timer),this.timer=null},handleClickDep:function(t){this.active=t.id,this.tree_data=t}}},n=(i("2df2"),i("2877")),s=Object(n.a)(l,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"Org_relationship"},[l("div",{staticClass:"individual_title"}),l("div",{staticClass:"dep_list",staticStyle:{width:"100%","text-align":"center"}},[l("div",{staticStyle:{display:"inline-block",position:"relative",bottom:"65px",cursor:"pointer"},on:{mousedown:function(e){return t.changeScroll("left")},mouseup:t.stopScroll}},[l("img",{staticStyle:{width:"30px"},attrs:{src:i("9ab6")}})]),l("div",{ref:"dep_list",staticClass:"dep_Con"},t._l(t.entranceList,(function(e,i){return l("div",{key:i,staticClass:"entrance",style:[{border:t.active==e.id?"3px solid #bf1730":"none"}],on:{click:function(i){return t.handleClickDep(e)}}},[l("div",{staticClass:"panel_info"},[l("span",{staticStyle:{display:"block"}},[t._v(t._s(e.name))]),l("span",{staticStyle:{"font-weight":"normal",color:"#ccc"}},[t._v(t._s(e.userPname))])])])})),0),l("div",{staticStyle:{display:"inline-block",position:"relative",bottom:"65px",cursor:"pointer"},on:{mousedown:function(e){return t.changeScroll("right")},mouseup:t.stopScroll}},[l("img",{staticStyle:{width:"30px"},attrs:{src:i("d7d6")}})])]),t._m(0),l("div",{staticClass:"relationship"},[l("org-tree",{attrs:{data:t.tree_data,horizontal:t.horizontal,path_url:t.path_url,collapsable:!1,expandAll:!0,model:t.model,settingFlag:!1}})],1)])}),[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"post_status"},[i("span",[t._v("岗位状态颜色说明：")]),i("li",{staticStyle:{color:"#DABC85"}},[t._v("一般")]),i("li",{staticStyle:{color:"#1ACE80"}},[t._v("良好")]),i("li",{staticStyle:{color:"#AB2C31"}},[t._v("注意")])])}],!1,null,"b7d050ea",null);e.default=s.exports},cc90:function(t,e,i){},d7d6:function(t,e,i){t.exports=i.p+"assets/img/dir_right.png"}}]);