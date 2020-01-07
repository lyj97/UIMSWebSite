<style lang="less" scoped>

</style>
<template>
	<div>
		<v-header title="网址导航">
            <router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
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
                    <el-tag v-if="!scope.row.canAccessOutside" type="warning">需要校园网</el-tag>
                    <el-tag v-if="scope.row.canAccessInApp" type="success">可通过“UIMSTest”App访问</el-tag>
                </template>

            </el-table-column>

            <el-table-column
                prop="description"
                label="描述">
            </el-table-column>
            
        </el-table>
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
	</div>
    
</template>
<script>
    import { mapState } from 'vuex'
    import {ali_host} from 'store/host.js'
    export default {
		data() {
			return {
                tableData: [{
                    title: "加载中..."
                }],
                tableHeight: window.innerHeight * 0.8,
                loading: true,

                //提示弹窗
                dialogVisible: false,
                information:"",
                dialog_title:"",
                dialog_loading:false,
                dialog_width:"30%",
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
                this.$http.get(api).then
                (
                    function (response) 
                    {
                        console.log(response);
                        this.tableData = response.data.value;
                        this.loading = false;
                    },
                    function (err) {
                        console.log(err);
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
        },
        mounted(){
            this.getData();
        },
    }
</script>