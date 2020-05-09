<style lang="less" scoped>

.input_title{
    width: 10%;
}
.input_area{
    width: 100%;
}
.mydiv{
    width: 30%;
    margin: auto;
    text-align: center;
}
.myTopDiv{
    width: 80%;
    padding: 5;
    margin: auto;
    text-align: center;
}
.myMainDiv{
    width: 100%;
    margin: auto;
    text-align: center;
}

</style>
<template>
	<div>
		<v-header title="网址导航">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
        <br/>
        <div class="myTopDiv">
            <el-input v-on:keyup.enter="getData()" style="width: 70%" type="text" v-model="websiteSearchStr" placeholder="搜索..."></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getData()">搜 索</el-button>
        </div>
        <div class="myMainDiv">
            <el-table
                :data="tableData"
                v-loading="loading"
                stripe
                :height="tableHeight"
                style="width: 100%">

                <el-table-column
                    label="站点">

                    <template slot-scope="scope">
                        <el-link type="primary" :href="scope.row.link" target="_blank">{{scope.row.title}}</el-link>
                        <el-tag v-if="!scope.row.can_access_outside" type="warning">需要校园网</el-tag>
                        <el-tag v-if="scope.row.can_access_in_app" type="success">可通过“UIMSTest”App访问</el-tag>
                    </template>

                </el-table-column>

                <el-table-column
                    prop="description"
                    label="描述">
                </el-table-column>
                
            </el-table>
        </div>
        <br/>
        <div class="mydiv">
            <el-button v-if="user.id" style="width: 100%;" type="primary" @click="dialogVisible_add = true">添 加 网 址</el-button>
            <el-button v-if="!user.id" style="width: 100%;" type="primary" @click="dialogVisible_add = true" disabled>请 登 录</el-button>
        </div>

        <!--提示弹窗-->
        <el-dialog
            :title="dialog_title"
            :loading="dialog_loading"
            :visible.sync="dialogVisible"
            :width="dialog_width"
            dangerouslyUseHTMLString: true>

            <div v-html="information"></div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--添加信息弹窗-->
        <el-dialog
            :title="dialog_title_add"
            :loading="dialog_loading_add"
            :visible.sync="dialogVisible_add"
            :width="dialog_width_add">

            <a class="input_title">网站名称</a>
            <el-input class="input_area" v-model="dialog_add_inf_title" placeholder="请输入网站名称..."></el-input>

            <a class="input_title">网站介绍</a>
            <el-input class="input_area" v-model="dialog_add_inf_description" placeholder="请输入网站介绍..."></el-input>

            <a class="input_title">网站链接</a>
            <el-input class="input_area" v-model="dialog_add_inf_link" placeholder="请输入网站链接..."></el-input>

            <a class="input_title">校外访问</a>
            <el-select class="input_area" v-model="dialog_add_inf_access_outside" placeholder="请选择">
                <el-option
                    v-for="item in dialog_add_inf_bool_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <a class="input_title">APP内访问</a>
            <el-select class="input_area" v-model="dialog_add_inf_access_in_app" placeholder="请选择">
                <el-option
                    v-for="item in dialog_add_inf_bool_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="resetAddData()">重 置</el-button>
                <el-button @click="dialogVisible_add = false">取 消</el-button>
                <el-button type="primary" @click="postAddWebsite()">确 定</el-button>
            </span>
        </el-dialog>

	</div>
    
</template>
<script>
    import { mapState } from 'vuex'
    import { ali_host, huawei_host } from 'store/host.js'
    export default {
		data() {
			return {
                tableData: [{
                    title: "加载中..."
                }],
                tableHeight: window.innerHeight * 0.72,
                loading: true,

                //提示弹窗
                dialogVisible: false,
                information:"",
                dialog_title:"",
                dialog_loading:false,
                dialog_width:"30%",

                websiteSearchStr:'',

                //添加信息弹窗
                dialogVisible_add: false,
                dialog_title_add:"欢迎贡献常用网址ヾ(≧ ▽ ≦)ゝ",
                dialog_loading_add:false,
                dialog_width_add:"80%",
                //信息
                dialog_add_inf_id:'',
                dialog_add_inf_title:'',
                dialog_add_inf_description:'',
                dialog_add_inf_link:'',
                dialog_add_inf_access_outside: false,
                dialog_add_inf_access_in_app: false,

                dialog_add_inf_bool_options: [{
                    value: false,
                    label: '否'
                    }, {
                    value: true,
                    label: '是'
                    }],
                }
            },
        computed: mapState({ user: state => state.user }),
        methods:{
            getData(){
                this.loading = true;
                this.tableData= [{
                    title: "加载中..."
                }];
                var api = ali_host + ":8099/UIMSTest/GetTestFunctionItems";
                // this.$http.get(api).then
                // (
                //     function (response) 
                //     {
                //         console.log(response);
                //         this.tableData = response.data.value;
                //         this.loading = false;
                //     },
                //     function (err) {
                //         console.log(err);
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

                var api_new = huawei_host + ":8199/api/common/website/list";
                this.$http.post(
						api_new,
						{searchName: this.websiteSearchStr},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        this.tableData = response.data.data;
                        this.loading = false;
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)

            },
            postAddWebsite(){
                if(!this.dialog_add_inf_title || !this.dialog_add_inf_description || !this.dialog_add_inf_link){
                    this.$message.error('请填写完整后提交.');
                    return;
                }
                this.dialog_loading_add = true;
                var api_new = huawei_host + ":8199/api/common/website/upload";
                this.$http.post(
						api_new,
						{
                            title: this.dialog_add_inf_title,
                            description: this.dialog_add_inf_description,
                            link: this.dialog_add_inf_link,
                            accessOutside: this.dialog_add_inf_access_outside,
                            accessInApp: this.dialog_add_inf_access_in_app,
                        },
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        this.dialog_loading_add = false;
                        if(response.body.status != 0){
                            this.$message({
                                type: 'error',
                                message: response.body.message,
                            });
                            return;
                        }
                        this.$message({
                            type: 'success',
                            message: '提交成功.'
                        });
                        this.dialogVisible_add = false
                        this.getData();
                    },
                    function (err) {
                        this.dialog_loading_add = false;
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
            resetAddData(){
                this.dialog_add_inf_title = '';
                this.dialog_add_inf_description = '';
                this.dialog_add_inf_link = '';
                this.dialog_add_inf_access_outside = false;
                this.dialog_add_inf_access_in_app = false;
            }
        },
        mounted(){
            this.getData();
            window.onresize = () => {
                return (() => {
                    this.tableHeight = window.innerHeight * 0.72;
                })();
            };
        },
    }
</script>