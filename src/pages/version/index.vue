<style lang="less" scoped>
.input_title{
    width: 10%;
}
.input_area{
    width: 100%;
}
.myMainDiv{
    width: 100%;
    margin: auto;
    text-align: center;
}
.myBottomDiv{
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 0;
}

</style>
<template>
    <div>
        <v-header title="版本管理">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
        <div class="myMainDiv">
            <br/>
            <el-tag type="success">当前版本</el-tag>
            <div v-if="current_inf">
                版本号:{{current_inf.code}} 名称:{{current_inf.name}} 类型:<el-tag v-if="current_inf.is_beta" type="warning">测试版</el-tag><el-tag v-if="!current_inf.is_beta" type="success">稳定版</el-tag> 创建时间:{{current_inf.create_time}} 更新时间:{{current_inf.update_time}} 链接文字:{{current_inf.link_text}} 链接地址:{{current_inf.link}} 
            </div>
            <div v-if="!current_inf">
                暂无信息
            </div>
            <el-table
                :data="tableData"
                v-loading="loading"
                stripe
                :height="tableHeight"
                style="width: 100%">

                <el-table-column
                    prop="code"
                    label="Code">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="Name">
                </el-table-column>

                <el-table-column
                    prop="is_beta"
                    label="Beta">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.is_beta" type="warning">测试版</el-tag>
                        <el-tag v-if="!scope.row.is_beta" type="success">稳定版</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>

                <el-table-column
                    prop="update_time"
                    label="更新时间">
                </el-table-column>

                <el-table-column
                    prop="link_text"
                    label="LinkText">
                </el-table-column>

                <el-table-column
                    prop="link"
                    label="Link">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                
            </el-table>

            <div class="myBottomDiv">
                <el-button style="width: 100%;" type="primary" @click="showAddDialog()">添 加 版 本 信 息</el-button>
            </div>
        </div>

        <!--添加信息弹窗-->
        <el-dialog
            :title="dialog_title_add"
            :loading="dialog_loading_add"
            :visible.sync="dialogVisible_add"
            :width="dialog_width_add">

            <a class="input_title">版本号</a>
            <el-input class="input_area" v-model="dialog_add_inf_code" placeholder="请输入版本号..." :disabled="this.dialogVerCodeLocked"></el-input>

            <a class="input_title">版本名称</a>
            <el-input class="input_area" v-model="dialog_add_inf_name" placeholder="请输入版本名称..."></el-input>

            <a class="input_title">是否测试版</a>
            <el-select class="input_area" v-model="dialog_add_inf_beta" placeholder="请选择">
                <el-option
                    v-for="item in dialog_add_inf_bool_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <a class="input_title">创建时间</a>
            <el-input class="input_area" type="datetime-local" v-model="dialog_add_inf_create_time" placeholder="创建时间" :disabled="true"/>

            <a class="input_title">更新时间</a>
            <el-input class="input_area" type="datetime-local" v-model="dialog_add_inf_update_time" placeholder="更新时间" :disabled="true"/>

            <a class="input_title">网站链接</a>
            <el-input class="input_area" v-model="dialog_add_inf_link_text" placeholder="请输入网站链接..."></el-input>

            <a class="input_title">网站链接</a>
            <el-input class="input_area" v-model="dialog_add_inf_link" placeholder="请输入网站链接..."></el-input>

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
    import { huawei_host } from 'store/host.js'
    export default {
		data() {
			return {
                tableData: [{
                    title: "加载中..."
                }],
                tableHeight: window.innerHeight * 0.7,
                loading: true,

                //当前版本信息
                current_inf:{
                    code:0,
                    name:'',
                    beta: false,
                    create_time:'',
                    update_time: '',
                    link_text: '',
                    link: '',
                },

                //添加信息弹窗
                dialogVisible_add: false,
                dialog_title_add:"添加版本信息",
                dialog_loading_add: false,
                dialog_width_add:"80%",
                dialogVerCodeLocked: false,
                //信息
                dialog_add_inf_code:0,
                dialog_add_inf_name:'',
                dialog_add_inf_beta: false,
                dialog_add_inf_create_time:'',
                dialog_add_inf_update_time: '',
                dialog_add_inf_link_text: '',
                dialog_add_inf_link: '',

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

                var api = huawei_host + ":8199/api/version/all_version";
                this.$http.post(
						api,
						{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        this.tableData = response.data.data;
                        this.loading = false;
                    },
                    function (err) {
                        this.loading = false;
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
                )
                
                var current_version_api = huawei_host + ":8199/api/version/get_version";
                this.$http.post(
						current_version_api,{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        if(response.body.status != 0){
                            this.$message({
                                type: 'error',
                                message: response.body.message,
                            });
                            return;
                        }
                        this.current_inf = response.body.data;
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
                this.dialog_loading_add = true;
                var api_new = huawei_host + ":8199/api/version/set_version";
                this.$http.post(
						api_new,
						{
                            versionCode: this.dialog_add_inf_code,
                            versionName: this.dialog_add_inf_name,
                            isBeta: this.dialog_add_inf_beta,
                            linkText: this.dialog_add_inf_link_text,
                            link: this.dialog_add_inf_link,
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
                            message: response.body.message,
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
            handleClick(item){
                this.showAddDialog();
                this.initDialogInformation(item);
            },
            showAddDialog(){
                this.dialogVisible_add = true;
                this.dialogVerCodeLocked = false;
            },
            initDialogInformation(item){
                this.dialogVerCodeLocked = true;
                this.dialog_add_inf_code= item.code;
                this.dialog_add_inf_name= item.name;
                this.dialog_add_inf_beta= item.is_beta;
                this.dialog_add_inf_create_time= item.create_time;
                this.dialog_add_inf_update_time= item.update_time;
                this.dialog_add_inf_link_text= item.link_text;
                this.dialog_add_inf_link= item.link;
            },
            resetAddData(){
                this.dialog_add_inf_code= 0;
                this.dialog_add_inf_name= '';
                this.dialog_add_inf_beta= false;
                this.dialog_add_inf_create_time= '';
                this.dialog_add_inf_update_time= '';
                this.dialog_add_inf_link_text= '';
                this.dialog_add_inf_link= '';
            },
        },
        mounted(){
            this.getData();
            window.onresize = () => {
                return (() => {
                    this.tableHeight = window.innerHeight * 0.7;
                })();
            };
        },
    }
</script>