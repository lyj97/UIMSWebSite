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
    .right {
        position: absolute;
        right: 10px;
        font-size: 11px;
    }
</style>

<template>
	<div>
		<v-header title="贝壳 - 内推查询">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
		<div>
            <el-main>
                <div class="mydiv">
                    <div class="myCenterDiv">
                        姓名:
                        <el-input style="width: 20%" type="text" v-model="searchName" placeholder="输入姓名..."></el-input>
                        手机号:
                        <el-input style="width: 35%" type="text" v-model="searchPhone" placeholder="输入手机号..."></el-input>
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
                        prop="name"
                        label="姓名">
                    </el-table-column>

                    <el-table-column
                        prop="mobile"
                        label="联系方式">
                    </el-table-column>

                    <el-table-column
                        prop="email"
                        label="邮箱">
                    </el-table-column>

                    <el-table-column
                        prop="job_ad_name"
                        label="岗位">
                    </el-table-column>

                    <el-table-column
                        prop="status_name"
                        label="状态">
                    </el-table-column>

                    <!-- <el-table-column
                        width="100"
                        label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.flagTop" type="success">置顶</el-tag>
                            <el-tag v-if="scope.row.is_new" type="success" effect="plain">NEW!</el-tag>
                        </template>
                    </el-table-column> -->
                    
                </el-table>
            </el-main>
		</div>
        <div class="right">
			<li slot="right">数据更新时间：{{dataUpdateTime}}</li>
        </div>
	</div>
</template>

<script>
    
    import { mapState } from 'vuex'
    import { ali_host, huawei_host } from 'store/host.js'
    export default {
        computed: mapState({ user: state => state.user }),
        data() {
            return {
                tableData: [],
                tableHeight: window.innerHeight * 0.7,

                //列表加载
                loading: false,

                //搜索条件
                searchName:'',
                searchPhone: '',

                //数据更新时间
                dataUpdateTime: '',
            }
        },
        methods:{
            getData(){
                if(!this.searchName || !this.searchPhone){
                    this.$alert("请输入姓名和手机号！", "错误！", {
                        lockScroll: false,
                        closeOnClickModal: true,
                    });
                    return;
                }

                this.loading = true;
                this.tableData= [{
                    title: "加载中..."
                }];

                var api = huawei_host + ":8199/api/beike/apply/query"
                this.$http.post(
						api,
                        {
                            name: this.searchName,
                            mobile: this.searchPhone,
                        },
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
                                name: "加载失败"
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
                            name: "加载失败"
                        }];
                        this.dialogVisible = false;
                    }
				)
            },

            getUpdateTime() {
                var api = huawei_host + ":8199/api/beike/apply/uploadTime"
                this.$http.post(
						api,
                        {},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
						if(!response.data || !response.data.message){
                            return;
                        }
                        this.dataUpdateTime = response.data.message;
                    },
                    function (err) {
                        this.$message({
                            type: 'warning',
                            message: '获取更新时间失败'
                        });
                    }
				)
            },

            handleClose(done) {
                done();
            },

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
            this.getUpdateTime();
            window.onresize = () => {
                return (() => {
                    this.tableHeight = window.innerHeight * 0.7;
                })();
            };
        },
    }
</script>
