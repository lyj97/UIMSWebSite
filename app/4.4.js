webpackJsonp([4],{32:function(t,e,i){var a,l;i(33),a=i(35);var o=i(36);l=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(l=a=a.default),"function"==typeof l&&(l=l.options),l.render=o.render,l.staticRenderFns=o.staticRenderFns,l._scopeId="data-v-23b27f64",t.exports=a},33:function(t,e,i){var a=i(34);"string"==typeof a&&(a=[[t.id,a,""]]);i(12)(a,{});a.locals&&(t.exports=a.locals)},34:function(t,e,i){e=t.exports=i(11)(),e.push([t.id,".login-msg[data-v-23b27f64]{padding:50px;text-align:center}.mydiv[data-v-23b27f64]{padding:50px;margin:auto;display:inline}",""])},35:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(19);e.default={computed:(0,a.mapState)({user:function(t){return t.user}}),data:function(){return{tableData:[{title:"加载中..."}],tableHeight:.8*window.innerHeight,page:1,dialogVisible:!1,information:"",loading:!0,dialog_title:"",dialog_loading:!1,dialog_width:"30%"}},methods:{getData:function(){this.loading=!0,this.tableData=[{title:"加载中..."}];var t="http://2045.site:8099/UIMSTest/GetNewsList?page="+this.page;this.$http.get(t).then(function(t){return t.data&&t.data.value?(this.tableData=t.data.value,void(this.loading=!1)):(this.$alert(t.bodyText,"Error！",{lockScroll:!1,closeOnClickModal:!0}),this.loading=!1,void(this.tableData=[{title:"加载失败"}]))},function(t){this.$alert('请考虑将浏览器地址栏"https"替换为"http"后重试.如需帮助，请联系网站管理者.',"加载失败！",{lockScroll:!1,closeOnClickModal:!0}),this.loading=!1,this.tableData=[{title:"加载失败"}],this.dialogVisible=!1})},getNewsDetail:function(t,e){if(!e)return this.dialog_loading=!0,this.dialog_width="30%",this.dialog_title="提示",void(this.information="数据有误！ 请稍后重试或联系网站管理员.");this.dialog_loading=!0,this.dialog_width="30%",this.dialog_title="提示",this.information="加载中...";var i="http://2045.site:8099/UIMSTest/GetNewsDetail";this.$http.post(i,{url:e},{emulateJSON:!0}).then(function(e){e.ok||(this.$alert("请稍后重试.如需帮助，请联系网站管理者.","加载失败！",{lockScroll:!1,closeOnClickModal:!0}),this.dialogVisible=!1),this.dialog_width="670px",this.dialog_title=t,this.information=e.body.resultValue.content,this.dialog_loading=!1})},getPriPage:function(){this.page<=1?(this.dialog_width="30%",this.dialog_title="提示",this.information="已经是第"+this.page+"页了哦~",this.dialogVisible=!0):(this.page--,this.getData())},getNextPage:function(){this.page>=5?(this.dialog_width="30%",this.dialog_title="提示",this.information="暂不提供"+this.page+"页及以后的内容哦~",this.dialogVisible=!0):(this.page++,this.getData())},handleClick:function(t){this.getNewsDetail(t.title,t.link),this.dialogVisible=!0}},mounted:function(){this.getData()}}},36:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-header",{attrs:{title:"校内通知"}},[i("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[t._v("首页")]),t._v(" "),t.user.id?i("router-link",{attrs:{slot:"right",to:"/home"},slot:"right"},[t._v(t._s(t.user.name))]):t._e(),t._v(" "),i("el-header",{staticStyle:{"text-align":"right","font-size":"12px"},attrs:{slot:"below"},slot:"below"},[i("el-dropdown",[i("i",{staticClass:"el-icon-arrow-down",staticStyle:{"margin-right":"15px"}},[t._v("快速跳转")]),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",[i("router-link",{attrs:{to:"/"}},[t._v("首页")])],1),t._v(" "),i("el-dropdown-item",[i("router-link",{attrs:{to:"/jlupages"}},[t._v("网址导航")])],1),t._v(" "),t.user.id?i("el-dropdown-item",[i("router-link",{attrs:{to:"/home"}},[t._v("个人中心")])],1):t._e()],1)],1)],1)],1),t._v(" "),i("div",{attrs:{id:"news"}},[i("el-container",{staticStyle:{border:"1px solid #eee"}},[i("el-container",[i("el-main",[i("div",{staticClass:"mydiv"},[i("el-button",{on:{click:function(e){return t.getPriPage()}}},[t._v("上一页")]),t._v("\n                            第"+t._s(t.page)+"页\n                            "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.getNextPage()}}},[t._v("下一页")])],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:"",height:t.tableHeight}},[i("el-table-column",{attrs:{"min-width":"400",label:"标题"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){return t.handleClick(e.row)}}},[t._v(t._s(e.row.title))]),t._v(" "),e.row.flagTop?i("el-tag",{attrs:{type:"success"}},[t._v("置顶")]):t._e(),t._v(" "),e.row.is_new?i("el-tag",{attrs:{type:"success",effect:"plain"}},[t._v("NEW!")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"200",prop:"dept",label:"部门"}}),t._v(" "),i("el-table-column",{attrs:{prop:"time",width:"150",label:"发布时间"}}),t._v(" "),i("el-table-column",{attrs:{width:"100",label:"地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-popover",{attrs:{trigger:"hover",placement:"top"}},[i("p",[t._v(t._s(e.row.abs_link))]),t._v(" "),i("div",{staticStyle:{"text-align":"right",margin:"0"}},[i("el-link",{attrs:{type:"primary",href:e.row.abs_link,target:"_blank"}},[t._v("跳转至OA查看")])],1),t._v(" "),i("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[i("el-tag",{attrs:{size:"medium"}},[t._v("OA链接")])],1)])]}}])})],1)],1)],1)],1)],1),t._v(" "),i("el-dialog",{attrs:{title:t.dialog_title,loading:t.dialog_loading,visible:t.dialogVisible,width:t.dialog_width,"dangerouslyUseHTMLString:":"",true:"","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{domProps:{innerHTML:t._s(t.information)}}),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]}}});