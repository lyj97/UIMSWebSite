webpackJsonp([8],{21:function(t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.ali_host="http://2045.site",i.huawei_host="http://uimstest.2045.site"},53:function(t,i,a){var e,l;a(54),e=a(56);var d=a(57);l=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(l=e=e.default),"function"==typeof l&&(l=l.options),l.render=d.render,l.staticRenderFns=d.staticRenderFns,l._scopeId="data-v-0e86cd38",t.exports=e},54:function(t,i,a){var e=a(55);"string"==typeof e&&(e=[[t.id,e,""]]);a(12)(e,{});e.locals&&(t.exports=e.locals)},55:function(t,i,a){i=t.exports=a(11)(),i.push([t.id,".input_title[data-v-0e86cd38]{width:10%}.input_area[data-v-0e86cd38]{width:100%}.mydiv[data-v-0e86cd38]{width:30%;margin:auto;text-align:center}.myTopDiv[data-v-0e86cd38]{width:80%;padding:5;margin:auto;text-align:center}.myMainDiv[data-v-0e86cd38]{width:100%;margin:auto;text-align:center}",""])},56:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=a(19),l=a(21);i.default={data:function(){return{tableData:[{title:"加载中..."}],tableHeight:.72*window.innerHeight,loading:!0,dialogVisible:!1,information:"",dialog_title:"",dialog_loading:!1,dialog_width:"30%",websiteSearchStr:"",dialogVisible_add:!1,dialog_title_add:"欢迎贡献常用网址ヾ(≧ ▽ ≦)ゝ",dialog_loading_add:!1,dialog_width_add:"80%",dialog_add_inf_id:"",dialog_add_inf_title:"",dialog_add_inf_description:"",dialog_add_inf_link:"",dialog_add_inf_access_outside:!1,dialog_add_inf_access_in_app:!1,dialog_add_inf_bool_options:[{value:!1,label:"否"},{value:!0,label:"是"}]}},computed:(0,e.mapState)({user:function(t){return t.user}}),methods:{getData:function(){this.loading=!0,this.tableData=[{title:"加载中..."}];var t=(l.ali_host+":8099/UIMSTest/GetTestFunctionItems",l.huawei_host+":8199/api/common/website/list");this.$http.post(t,{searchName:this.websiteSearchStr},{emulateJSON:!0,withCredentials:!0}).then(function(t){this.tableData=t.data.data,this.loading=!1},function(t){this.$alert(t,"Error!",{lockScroll:!1,closeOnClickModal:!0})})},postAddWebsite:function(){if(!this.dialog_add_inf_title||!this.dialog_add_inf_description||!this.dialog_add_inf_link)return void this.$message.error("请填写完整后提交.");this.dialog_loading_add=!0;var t=l.huawei_host+":8199/api/common/website/upload";this.$http.post(t,{title:this.dialog_add_inf_title,description:this.dialog_add_inf_description,link:this.dialog_add_inf_link,accessOutside:this.dialog_add_inf_access_outside,accessInApp:this.dialog_add_inf_access_in_app},{emulateJSON:!0,withCredentials:!0}).then(function(t){return this.dialog_loading_add=!1,0!=t.body.status?void this.$message({type:"error",message:t.body.message}):(this.$message({type:"success",message:"提交成功."}),this.dialogVisible_add=!1,void this.getData())},function(t){this.dialog_loading_add=!1,this.$alert(t,"Error!",{lockScroll:!1,closeOnClickModal:!0})})},resetAddData:function(){this.dialog_add_inf_title="",this.dialog_add_inf_description="",this.dialog_add_inf_link="",this.dialog_add_inf_access_outside=!1,this.dialog_add_inf_access_in_app=!1}},mounted:function(){var t=this;this.getData(),window.onresize=function(){return function(){t.tableHeight=.72*window.innerHeight}()}}}},57:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("v-header",{attrs:{title:"网址导航"}},[a("router-link",{attrs:{slot:"left",to:"/"},slot:"left"},[t._v("首页")]),t._v(" "),t.user.id?a("router-link",{attrs:{slot:"right",to:"/home"},slot:"right"},[t._v(t._s(t.user.name))]):t._e()],1),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"myTopDiv"},[a("el-input",{staticStyle:{width:"70%"},attrs:{type:"text",placeholder:"搜索..."},on:{keyup:function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"enter",13,i.key,"Enter")?null:t.getData()}},model:{value:t.websiteSearchStr,callback:function(i){t.websiteSearchStr=i},expression:"websiteSearchStr"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(i){return t.getData()}}},[t._v("搜 索")])],1),t._v(" "),a("div",{staticClass:"myMainDiv"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:"",height:t.tableHeight}},[a("el-table-column",{attrs:{label:"站点"},scopedSlots:t._u([{key:"default",fn:function(i){return[a("el-link",{attrs:{type:"primary",href:i.row.link,target:"_blank"}},[t._v(t._s(i.row.title))]),t._v(" "),i.row.can_access_outside?t._e():a("el-tag",{attrs:{type:"warning"}},[t._v("需要校园网")]),t._v(" "),i.row.can_access_in_app?a("el-tag",{attrs:{type:"success"}},[t._v("可通过“UIMSTest”App访问")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"description",label:"描述"}})],1)],1),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"mydiv"},[t.user.id?a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:function(i){t.dialogVisible_add=!0}}},[t._v("添 加 网 址")]):t._e(),t._v(" "),t.user.id?t._e():a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",disabled:""},on:{click:function(i){t.dialogVisible_add=!0}}},[t._v("请 登 录")])],1),t._v(" "),a("el-dialog",{attrs:{title:t.dialog_title,loading:t.dialog_loading,visible:t.dialogVisible,width:t.dialog_width,"dangerouslyUseHTMLString:":"",true:""},on:{"update:visible":function(i){t.dialogVisible=i}}},[a("div",{domProps:{innerHTML:t._s(t.information)}}),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(i){t.dialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),a("el-dialog",{attrs:{title:t.dialog_title_add,loading:t.dialog_loading_add,visible:t.dialogVisible_add,width:t.dialog_width_add},on:{"update:visible":function(i){t.dialogVisible_add=i}}},[a("a",{staticClass:"input_title"},[t._v("网站名称")]),t._v(" "),a("el-input",{staticClass:"input_area",attrs:{placeholder:"请输入网站名称..."},model:{value:t.dialog_add_inf_title,callback:function(i){t.dialog_add_inf_title=i},expression:"dialog_add_inf_title"}}),t._v(" "),a("a",{staticClass:"input_title"},[t._v("网站介绍")]),t._v(" "),a("el-input",{staticClass:"input_area",attrs:{placeholder:"请输入网站介绍..."},model:{value:t.dialog_add_inf_description,callback:function(i){t.dialog_add_inf_description=i},expression:"dialog_add_inf_description"}}),t._v(" "),a("a",{staticClass:"input_title"},[t._v("网站链接")]),t._v(" "),a("el-input",{staticClass:"input_area",attrs:{placeholder:"请输入网站链接..."},model:{value:t.dialog_add_inf_link,callback:function(i){t.dialog_add_inf_link=i},expression:"dialog_add_inf_link"}}),t._v(" "),a("a",{staticClass:"input_title"},[t._v("校外访问")]),t._v(" "),a("el-select",{staticClass:"input_area",attrs:{placeholder:"请选择"},model:{value:t.dialog_add_inf_access_outside,callback:function(i){t.dialog_add_inf_access_outside=i},expression:"dialog_add_inf_access_outside"}},t._l(t.dialog_add_inf_bool_options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("a",{staticClass:"input_title"},[t._v("APP内访问")]),t._v(" "),a("el-select",{staticClass:"input_area",attrs:{placeholder:"请选择"},model:{value:t.dialog_add_inf_access_in_app,callback:function(i){t.dialog_add_inf_access_in_app=i},expression:"dialog_add_inf_access_in_app"}},t._l(t.dialog_add_inf_bool_options,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"danger"},on:{click:function(i){return t.resetAddData()}}},[t._v("重 置")]),t._v(" "),a("el-button",{on:{click:function(i){t.dialogVisible_add=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(i){return t.postAddWebsite()}}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});