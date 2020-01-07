<style lang="less" scoped>
	.login-msg {
		padding: 50px;
		text-align: center;
    }
    .mydiv{
        padding: 50px;
        margin: auto;
        display: inline;
    }
    .codeStyle{
        color: rgb(50, 173, 255);
        font-size: 15;
    }
    .toRight{
        float: right;
        color: white;
        margin-right: 25px;
        background: rgb(26, 117, 255)
    }
</style>
<template>
	<div>
		<v-header title="校内通知">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
		<!-- <div class="login-msg" v-if="!user.id">
			<router-link to="/login">你还未登录，请先登录</router-link>
		</div> -->
		<div id="news">
            <!-- <el-container style="height: 500px; border: 1px solid #eee"> -->
            <el-container style="border: 1px solid #eee">
                <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <v-navbar>
                    </v-navbar>
                </el-aside> -->
            
                <el-container>

                    <!-- <el-header style="text-align: right; font-size: 12px">
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span>王小虎</span>
                    </el-header> -->
        
                    <el-main>
                        <div class="mydiv">
                            <el-button @click="getPriPage()">上一页</el-button>
                            第{{page}}页
                            <el-button type="primary" @click="getNextPage()">下一页</el-button>
                            <el-input style="width: 50%" type="text" v-model="searchText" placeholder="搜索..."></el-input>
                            <el-button type="primary" @click="getData()">搜 索</el-button>
                            <el-popover
                                placement="bottom"
                                title="如何更新信息？"
                                width="40%"
                                trigger="hover">
                                <p>
                                    <b class="codeStyle">如果你在校内，你就可以更新这里的信息！</b><br/>
                                    如果你使用<b class="codeStyle">安卓</b>手机，并且连接校园网，<br/>
                                    可以下载并运行<a href="http://2045.site/OATest-debug.apk">这里</a>的APK.<br/>
                                    <br/>
                                    如果你喜欢用电脑，且安装了<b class="codeStyle">JAVA</b>环境：<br/>
                                    首先，下载<a href="http://2045.site/OATest.jar">这里</a>的JAR包.<br/>
                                    然后，使用命令<b class="codeStyle">java -jar</b>运行刚刚下载的JAR包.<br/>
                                    <b>等待程序结束，大功告成！</b><br/>
                                    <br/>
                                    <b class="codeStyle">若你不在校内，快告诉校内的小伙伴吧</b>
                                    <br/>
                                    <b class="codeStyle">(๑•̀ㅂ•́)و</b>
                                </p>
                                <el-button slot="reference" class="toRight">¿</el-button>
                            </el-popover>
                        </div>
                        <el-table
                            :data="tableData"
                            v-loading="loading"
                            stripe
                            :height="tableHeight"
                            style="width: 100%">

                            <el-table-column
                                min-width="400"
                                label="标题">

                                <template slot-scope="scope">

                                    <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.title }}</el-button>
                                    
                                    <!-- <el-tag v-if="scope.row.flagTop" type="success">置顶</el-tag> -->
                                    <!-- <el-tag v-if="scope.row.is_new" type="success" effect="plain">NEW!</el-tag> -->
                                </template>

                            </el-table-column>

                            <el-table-column
                                width="200"
                                prop="department"
                                label="部门">
                            </el-table-column>

                            <el-table-column
                                width="150"
                                label="发布时间">
                                <template slot-scope="scope">
                                    {{getTimeStr(scope.row.publish_time)}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                width="100"
                                label="地址">

                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        <p>{{ scope.row.link }}</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-link type="primary" :href="scope.row.link" target="_blank">跳转至OA查看</el-link>
                                        </div>
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">OA链接</el-tag>
                                        </div>
                                    </el-popover>
                                </template>

                            </el-table-column>

                            <!-- <el-table-column
                                width="100"
                                label="状态">
                                <template slot-scope="scope">
                                    <el-tag v-if="scope.row.flagTop" type="success">置顶</el-tag>
                                    <el-tag v-if="scope.row.is_new" type="success" effect="plain">NEW!</el-tag>
                                </template>
                            </el-table-column> -->

                            <!-- <el-table-column
                                fixed="right"
                                label="操作"
                                width="100">

                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                </template>

                            </el-table-column> -->
                            
                        </el-table>
                    </el-main>
                </el-container>
            </el-container>

		</div>

        <el-dialog
            :title="dialog_title"
            :loading="dialog_loading"
            :visible.sync="dialogVisible"
            :width="dialog_width"
            dangerouslyUseHTMLString: true
            :before-close="handleClose">

            <div v-html="information"></div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

	</div>
</template>

<script>
    
    import { mapState } from 'vuex'
    import { ali_host, huawei_host } from 'store/host.js'
    export default {
        computed: mapState({ user: state => state.user }),
        data() {
            return {
                tableData: [{
                    title: "加载中..."
                }],
                tableHeight: window.innerHeight * 0.8,
                page:1,
                dialogVisible: false,
                information:"",

                //列表加载
                loading: true,

                //Dialog
                dialog_title:"",
                dialog_loading:false,
                dialog_width:"30%",

                //搜索条件
                searchText:'',
            }
        },
        methods:{
            getData(){
                this.loading = true;
                this.tableData= [{
                    title: "加载中..."
                }];


                // var api = ali_host + ":8099/UIMSTest/GetNewsList?page=" + this.page;
                // this.$http.get(api).then
                // (
                //     function (response) 
                //     {
                //         // console.log(response);
                //         if(!response.data || !response.data.value){
                //             this.$alert(response.bodyText, "Error！", {
                //                 lockScroll: false,
                //                 closeOnClickModal: true,
                //             });
                //             this.loading = false;
                //             this.tableData= [{
                //                 title: "加载失败"
                //             }];
                //             return;
                //         }
                //         this.tableData = response.data.value;
                //         this.loading = false;
                //     },
                //     function (err) {
                //         // console.log(err);
                //         this.$alert("请考虑将浏览器地址栏\"https\"替换为\"http\"后重试.如需帮助，请联系网站管理者.", "加载失败！", {
                //             lockScroll: false,
                //             closeOnClickModal: true,
                //         });
                //         this.loading = false;
                //         this.tableData= [{
                //             title: "加载失败"
                //         }];
                //         this.dialogVisible = false;
                //     }
                // )


                var api = huawei_host + ":8199/api/common/oa/list"
                this.$http.post(
						api,
						{page: this.page, searchName: this.searchText},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
						if(!response.data || !response.data.data){
                            this.$alert(response.bodyText, "Error！", {
                                lockScroll: false,
                                closeOnClickModal: true,
                            });
                            this.loading = false;
                            this.tableData= [{
                                title: "加载失败"
                            }];
                            return;
                        }
                        this.tableData = response.data.data;
                        this.loading = false;
                    },
                    function (err) {
                        this.$alert("请考虑将浏览器地址栏\"https\"替换为\"http\"后重试.如需帮助，请联系网站管理者.", "加载失败！", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                        this.loading = false;
                        this.tableData= [{
                            title: "加载失败"
                        }];
                        this.dialogVisible = false;
                    }
				)
            },
            getNewsDetail(news){
                this.dialog_width = "90%";
                this.dialog_title = news.title;
                this.information = news.detail.replace(/style[\s\S]*?=[\s\S]*?"[\s\S]*?"/g, "");
                this.dialog_loading = false;
            },
            // getNewsDetail(news_title, news_link){
            //     if(!news_link){
            //         this.dialog_loading = true;
            //         this.dialog_width = "30%";
            //         this.dialog_title = "提示";
            //         this.information = '数据有误！ 请稍后重试或联系网站管理员.';
            //         return;
            //     }
            //     this.dialog_loading = true;
            //     this.dialog_width = "30%";
            //     this.dialog_title = "提示";
            //     this.information = "加载中...";
            //     var url = ali_host + ":8099/UIMSTest/GetNewsDetail";
            //     this.$http.post(url, {url : news_link}, {emulateJSON:true}).then(function(res){
            //         if(!res.ok){
            //             // alert('请求出错！');
            //             this.$alert("请稍后重试.如需帮助，请联系网站管理者.", "加载失败！", {
            //                 lockScroll: false,
            //                 closeOnClickModal: true,
            //             });
            //             this.dialogVisible = false;
            //         }
            //         // console.log(res);
            //         // this.$alert(res.body.resultValue.content, news_title, {
            //         //     dangerouslyUseHTMLString: true,
            //         //     lockScroll: false,
            //         //     closeOnClickModal: true,
            //         // });
            //         // this.dialogVisible = false;
            //         this.dialog_width = "670px";
            //         this.dialog_title = news_title;
            //         this.information = res.body.resultValue.content;
            //         this.dialog_loading = false;
            //     });
            // },
            getPriPage(){
                if(this.page <= 1){
                    this.dialog_width = "30%";
                    this.dialog_title = "提示";
                    this.information = "已经是第" + this.page + "页了哦~";
                    this.dialogVisible = true;
                }
                else{
                    this.page --;
                    this.getData();
                }
            },
            getNextPage(){
                if(this.page >= 5){
                    this.dialog_width = "30%";
                    this.dialog_title = "提示";
                    this.information = "暂不提供" + this.page + "页及以后的内容哦~";
                    this.dialogVisible = true;
                }
                else{
                    this.page ++;
                    this.getData();
                }
            },
            handleClick(row) {
                // console.log(row);
                // console.log(row.title);
                // this.getNewsDetail(row.title, row.link);
                this.getNewsDetail(row);
                this.dialogVisible = true;
            },
            // handleClose(done) {
            //     this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            // },
            // handleOpen(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            getTimeStr(date){
                // var date = '2015-03-05 17:59:00';
                date = date.substring(0,19);
                date = date.replace(/T/g,' ');
                date = date.replace(/-/g,'/');
                var MyDate = new Date(date);
                return MyDate.getFullYear() + '-' + (MyDate.getMonth() + 1) + '-' + MyDate.getDate() + ' ' + (MyDate.getHours() + 8) + ':' + this.dataLeftCompleting(2, "0", MyDate.getMinutes());
            },
            /**
             * 可扩充的解决方案
             * @param bits 格式化位数
             * @param identifier 补全字符
             * @param value 值
             */
            dataLeftCompleting(bits, identifier, value){
                value = Array(bits + 1).join(identifier) + value;
                return value.slice(-bits);
            }
        },
        mounted(){
            this.getData();
            window.onresize = () => {
                return (() => {
                    this.tableHeight = window.innerHeight * 0.8;
                })();
            };
        },
        // http:{
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // }
    }
</script>