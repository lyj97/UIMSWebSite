webpackJsonp([9],{21:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.ali_host="http://2045.site",e.huawei_host="http://uimstest.2045.site"},58:function(t,e,a){var i,r;a(59),i=a(61);var s=a(63);r=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(r=i=i.default),"function"==typeof r&&(r=r.options),r.render=s.render,r.staticRenderFns=s.staticRenderFns,r._scopeId="data-v-749c3e9c",t.exports=i},59:function(t,e,a){var i=a(60);"string"==typeof i&&(i=[[t.id,i,""]]);a(12)(i,{});i.locals&&(t.exports=i.locals)},60:function(t,e,a){e=t.exports=a(11)(),e.push([t.id,".login-msg[data-v-749c3e9c]{text-align:center}.msg[data-v-749c3e9c]{text-align:center;font-size:20px}.title-text[data-v-749c3e9c]{color:#008cff}.text[data-v-749c3e9c]{font-size:16px}.box-card[data-v-749c3e9c]{max-width:550px;margin:auto}.box-card-dev[data-v-749c3e9c]{background:#c5c5c5}.box-card-new[data-v-749c3e9c]{background:#52b1ff}.title_tag[data-v-749c3e9c]{font-size:20px;font-weight:500}.main_text[data-v-749c3e9c]{font-size:16px;color:#606266}.main_text_dev[data-v-749c3e9c]{font-size:13px;color:#606266}",""])},61:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0});var s,n=a(19),o=a(62),l=i(o),c=a(21);e.default={data:function(){return{logo:l.default,movie_data:[{movieName:"暂无数据"}],popUpWindowHight:.7*window.innerHeight,popUpWindowWidth:.7*window.innerWidth}},computed:(0,n.mapState)({user:function(t){return t.user}}),methods:(s={getInformation:function(){var t=c.ali_host+":8099/UIMSTest/GetVersionInformation";this.$http.get(t).then(function(t){var e=t.data.title;if(!(!e.length>1)){var a=t.data.information.replace(/\\n/g," <br/> ");this.sendNotifyHtml(e,a)}},function(t){});var e=c.huawei_host+":8199/api/movie/get_list";this.$http.get(e).then(function(t){this.obtainMovieData(t.bodyText)},function(t){})},sendNotify:function(t){var e=this.$createElement;this.$notify({message:e("i",{style:"color: teal"},t)})}},r(s,"sendNotify",function(t,e){var a=this.$createElement;this.$notify({title:t,message:a("i",{style:"color: teal"},e)})}),r(s,"sendNotifyHtml",function(t,e){this.$createElement;e=e.replace(/\\n/g,"<br/>"),e="<div>"+e+"</div>",this.$notify({title:t,dangerouslyUseHTMLString:!0,message:e})}),r(s,"obtainMovieData",function(t){t=JSON.parse(t);var e="";t=t.data.list,this.movie_data=t;for(var a,i=0;i<5;i++)a=t[i],e=e+(1+i)+" "+a.movieName+"\n";this.sendNotifyHtml("[Tips:]热映影片",e)}),r(s,"openMoviePage",function(t){window.open("https://search.douban.com/movie/subject_search?search_text="+t)}),s),mounted:function(){var t=this;this.getInformation(),window.onresize=function(){return function(){t.popUpWindowHight=.7*window.innerHeight,t.popUpWindowWidth=.7*window.innerWidth}()}}}},62:function(t,e,a){t.exports=a.p+"ic_launcher_round.png"},63:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-header",{attrs:{title:"首页"}},[t.user.id?a("router-link",{attrs:{slot:"right",to:"/home"},slot:"right"},[t._v(t._s(t.user.name))]):t._e(),t._v(" "),t.user.id?t._e():a("router-link",{attrs:{slot:"right",to:"/login"},slot:"right"},[t._v("登录")]),t._v(" "),t.user.id?a("router-link",{attrs:{slot:"left",to:"/list"},slot:"left"},[t._v("通知")]):t._e()],1),t._v(" "),a("div",{staticClass:"msg"},[a("br"),t._v(" "),a("el-tag",{staticClass:"title_tag"},[t._v("欢迎来到UIMSTest网站！")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("img",{attrs:{width:"90",src:t.logo,alt:""}}),t._v(" "),a("br"),t._v(" "),a("b",{staticClass:"title-text"},[t._v(" UIMSTest ")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"main_text"},[t._v("\n\t\t\t\tUIMSTest提供"),a("br"),t._v("课程管理、 "),a("el-link",{staticClass:"main_text el-icon-link",attrs:{href:"/app/#/list"}},[t._v("校内通知查询")]),t._v("、 "),a("el-link",{staticClass:"main_text el-icon-link",attrs:{href:"/app/#/jlupages"}},[t._v("校园网址导航")]),t._v("、 成绩统计"),a("br"),t._v("等功能，较好整合了校内与校外访问接口，欢迎下载体验.\n\t\t\t")],1),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text"},[t._v("\n\t\t\t\t同时，您也可以在"),a("el-link",{staticClass:"main_text el-icon-link",attrs:{href:"/app/#/jlupages_new"}},[t._v("这里")]),t._v("贡献常用网址，不限校内外哦~\n\t\t\t")],1)]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card box-card-new"},[a("el-tag",{staticClass:"title_tag"},[t._v("即将上线！")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text"},[t._v("\n\t\t\t\tUIMSTest即将上线数据备份/恢复功能，不在学校也能恢复数据哦~\n\t\t\t")])],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card"},[a("el-tag",{staticClass:"title_tag",attrs:{effect:"dark"}},[t._v("UIMSTest下载地址")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text"},[a("el-link",{staticClass:"text el-icon-link",attrs:{type:"primary",href:"https://www.coolapk.com/apk/com.lu.mydemo",target:"_blank"}},[t._v("酷安网")]),t._v(" "),a("br"),t._v(" "),a("el-link",{staticClass:"text el-icon-link",attrs:{type:"primary",href:"http://app.mi.com/details?id=com.lu.mydemo",target:"_blank"}},[t._v("小米应用商店")]),t._v(" "),a("br"),t._v(" "),a("el-link",{staticClass:"text el-icon-link",attrs:{type:"primary",href:"https://appstore.huawei.com/app/C100937407",target:"_blank"}},[t._v("华为应用市场")]),t._v(" "),a("br")],1)],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card"},[a("el-tag",{staticClass:"title_tag"},[t._v("UIMSTest（内测）")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text"},[a("el-link",{staticClass:"text el-icon-link",attrs:{type:"primary",href:"https://jq.qq.com/?_wv=1027&k=52o3LIT",target:"_blank"}},[t._v("加入UIMSTest内测QQ群")])],1)],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card"},[a("el-tag",{staticClass:"title_tag"},[t._v("Tips: - 热映电影")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-popover",{attrs:{placement:"top",trigger:"hover"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.movie_data,height:t.popUpWindowHight}},[a("el-table-column",{attrs:{fixed:"left","min-width":"130",property:"movieName",label:"影片"}}),t._v(" "),a("el-table-column",{attrs:{property:"releaseInfo",label:"上映时间"}}),t._v(" "),a("el-table-column",{attrs:{property:"boxInfo",label:"综合票房(万)"}}),t._v(" "),a("el-table-column",{attrs:{property:"boxRate",label:"票房占比"}}),t._v(" "),a("el-table-column",{attrs:{property:"splitSumBoxInfo",label:"全球票房(美元)"}}),t._v(" "),a("el-table-column",{attrs:{label:"豆瓣"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{icon:"el-icon-search",circle:""},on:{click:function(a){return t.openMoviePage(e.row.movieName)}}})]}}])})],1),t._v(" "),a("el-button",{attrs:{slot:"reference"},slot:"reference"},[t._v("I'm here.")])],1)],1),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("el-card",{staticClass:"box-card box-card-dev"},[a("el-tag",{staticClass:"title_tag",attrs:{type:"info",effect:"dark"}},[t._v("For developers in JLU")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text_dev"},[t._v("\n\t\t\t\t诚邀校内开发者参与开发或提出宝贵意见\n\t\t\t\t"),a("br"),t._v("\n\t\t\t\t请点击上方“加入QQ群”按钮，愿我们携手，一起创造JLU体验一流的校内APP\n\t\t\t")]),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"main_text_dev"},[t._v("\n\t\t\t\t(模块建设中...)\n\t\t\t")])],1)],1),t._v(" "),a("v-footer",{attrs:{title:"2045.site"}},[a("li",{attrs:{slot:"right"},slot:"right"},[t._v("电影数据来源：猫眼专业版")])])],1)},staticRenderFns:[]}}});