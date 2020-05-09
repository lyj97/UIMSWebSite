<style lang="less" scoped>
    .mydiv{
        padding: 50 0 50 0;
        margin: auto;
        display: inline;
    }
    .myCenterDiv{
        text-align: center;
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
    .mydiv{
        width: 90%;
        height: 90%;
        overflow: auto;
    }
</style>

<template>
	<div>
		<v-header title="校内通知">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
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
                            <div class="myCenterDiv">
                                <el-button @click="getPriPage()">上一页</el-button>
                                第{{page}}页
                                <el-button type="primary" @click="getNextPage()">下一页</el-button>
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
                            <br/>
                            <div class="myCenterDiv">
                                搜索内容:
                                <el-input v-on:keyup.enter="getData()" style="width: 40%" type="text" v-model="searchText" placeholder="搜索..."></el-input>
                                搜索类型:
                                <el-select style="width: 15%" v-model="searchType" placeholder="选择类型">
                                    <el-option
                                        v-for="item in searchTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-button type="primary" icon="el-icon-search" @click="getData()">搜 索</el-button>
                            </div>
                            
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
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- <el-drawer
            :title="dialog_title"
            :loading="dialog_loading"
            :visible.sync="dialogVisible"
            direction="rtl"
            size="80%"
            :before-close="handleClose"
            dangerouslyUseHTMLString: true>
            <div v-html="information"></div>
        </el-drawer> -->

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
                tableHeight: window.innerHeight * 0.7,
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
                //搜索类型 1 标题 2 内容
                searchType: '0',
                searchTypeOptions: [
                    {
                        value: '0',
                        label: '选择类型'
                    }, {
                        value: '1',
                        label: '标题'
                    }, {
                        value: '2',
                        label: '内容'
                    }
                ],
            }
        },
        methods:{
            getData(){
                this.loading = true;
                this.tableData= [{
                    title: "加载中..."
                }];

                var api = huawei_host + ":8199/api/common/oa/list"
                this.$http.post(
						api,
						{page: this.page, searchName: this.searchText, searchType: this.searchType},
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
                if(this.searchText.length > 0){
                    var sKey = "<b style='background-color: yellow;'>"+this.searchText+"</b>";
                    var rStr = new RegExp(this.searchText, "g");
                    this.information = this.information.replace(rStr,sKey);
                }
                this.dialog_loading = false;
            },

            // getNewsDetailFromServer(id){
            //     if(!id){
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
            //     var url = huawei_host + ":8199/api/common/oa/detail";
            //     this.$http.post(
            //         url, 
            //         {id : id, searchName: this.searchText}, 
            //         {emulateJSON:true}).then(function(response){
            //             if(!response.ok || !response.data || !response.data.data){
            //                 // alert('请求出错！');
            //                 this.$alert("请稍后重试.如需帮助，请联系网站管理者.", "加载失败！", {
            //                     lockScroll: false,
            //                     closeOnClickModal: true,
            //                 });
            //                 this.dialogVisible = false;
            //             }
            //             this.dialog_width = "90%";
            //             this.dialog_title = response.data.data.title;
            //             this.information = response.data.data.detail.replace(/style[\s\S]*?=[\s\S]*?"[\s\S]*?"/g, "");
            //             this.dialog_loading = false;
            //         });
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

            handleClose(done) {
                done();
            },

            // handleOpen(key, keyPath) {
            //     console.log(key, keyPath);
            // },
            // handleClose(key, keyPath) {
            //     console.log(key, keyPath);
            // },

            getTimeStr(date){
                if(!date){
                    return;
                }
                var date = date.substring(0,19);
                date = date.replace(/T/g,' ');
                date = date.replace(/-/g,'/');
                var MyDate = new Date(date);
                
                var mHour = MyDate.getHours() + 8;
                if(mHour >= 24){
                    mHour -= 24;
                    MyDate = new Date(MyDate.getTime() + 24*60*60*1000);
                }

                return MyDate.getFullYear() + '-' + (MyDate.getMonth() + 1) + '-' + MyDate.getDate() + ' ' + mHour + ':' + this.dataLeftCompleting(2, "0", MyDate.getMinutes());
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
                    this.tableHeight = window.innerHeight * 0.7;
                })();
            };
        },
        // http:{
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // }
    }
</script>
