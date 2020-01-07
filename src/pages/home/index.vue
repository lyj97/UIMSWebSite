<style lang="less" scoped>
	.user-name {
		padding: 5px;
        text-align: center;
        color: rgb(0, 153, 255)
    }
    .information {
		padding: 50px;
		text-align: center;
		margin:0 auto;
		width: 300px;
		.line {
			padding: 5px;
			color: blue;
			input {
				padding: 0 10px;
				line-height: 28px;
			}
		}
		button {
			padding: 0 20px;
			margin-top: 20px;
			line-height: 28px;
		}
	}
    .box-card {
		max-width: 550px;
        margin:80px auto;
    }
    .title_tag {
		font-size: 20px;
		font-weight: 500;
    }
    .mybody{
        text-align: center;
    }
</style>
<template>
	<div class="mybody">
		<v-header title="个人中心">
			<router-link slot="left" to="/">首页</router-link>
			<!-- <router-link slot="right" to="/signout">退出</router-link> -->
			<el-link slot="right" v-if="user.id" @click="dialogVisible = true">退出登录</el-link>
		</v-header>

        <el-card class="box-card">
            <div >欢迎,<b class="user-name" @click="getUser()">{{user.name}}</b>.</div>
            <form class="information" v-on:submit.prevent="submit">
                <div class="line">
					<el-input type="number" v-model="userinfo.student_id" placeholder="学号" :disabled="true">
                        <template slot="prepend">学号</template>
                    </el-input>
				</div>
				<div class="line">	
					<el-input type="number" v-model="userinfo.user_id" placeholder="ID" :disabled="true">
                        <template slot="prepend">ID</template>
                    </el-input>
					<!-- <br/>
					<el-alert 
						v-show="btn && !form.id"
						title="学号/教学号不能为空"
						type="error"
						:closable="false">
					</el-alert> -->
				</div>
				<div class="line">
					<el-input type="text" v-model="userinfo.nick_name" placeholder="昵称">
                        <template slot="prepend">昵称</template>
                    </el-input>
				</div>
                <div class="line">
					<el-input type="text" v-model="userinfo.name" placeholder="姓名" :disabled="true">
                        <template slot="prepend">姓名</template>
                    </el-input>
				</div>
                <div class="line">
					<el-input type="datetime-local" v-model="userinfo.last_access_time" placeholder="最近登录" :disabled="true">
                        <template slot="prepend">最近登录</template>
                    </el-input>
				</div>
                <div class="line">
					<el-input type="text" v-model="userinfo.last_access_ip" placeholder="登录IP" :disabled="true">
                        <template slot="prepend">登录IP</template>
                    </el-input>
				</div>
                <div class="line">
					<el-input type="datetime-local" v-model="userinfo.create_time" placeholder="创建时间" :disabled="true">
                        <template slot="prepend">创建时间</template>
                    </el-input>
				</div>
			</form>
        </el-card>

        <el-card class="box-card" v-if="userinfo.type == 1">
            <el-tag class="title_tag">OA相关设置</el-tag>
            <br/><br/><br/>
            <div >设置OA列表获取页数</div>
            <br/>
            <el-input style="width:80%" type="number" v-model="pageSize" placeholder="输入OA页数..."></el-input>
            <el-button type="primary" @click="setOAPage()">确 定</el-button>
            <br/><br/><br/>
            <div >刷新OA详情时间</div>
            <br/>
            <el-button type="primary" @click="flushOATime()">刷新OA详情时间</el-button>
        </el-card>

        <el-card class="box-card" v-if="userinfo.type == 1">
            <el-tag class="title_tag">Link相关设置</el-tag>
            <br/><br/><br/>
            <div >设置Link模板(Link:[#link#])</div>
            <br/>
            <el-input style="width:100%" type="textarea" :rows="5" v-model="linkTemplete" placeholder="输入Link模板..."></el-input>
            <br/><br/>
            <el-button type="primary" @click="setLinkTemplete()">确 定</el-button>
        </el-card>

		<el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">

            <span>{{information}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="danger" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>

	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from 'store/user'
    import { USER_SIGNIN } from 'store/user'
    import {huawei_host} from 'store/host.js'
    export default {
		computed: mapState({ user: state => state.user }),
		data(){
			return{
                //退出登录弹窗
				dialogVisible: false,
                information:"确定退出吗？",
                userinfo:{
                    student_id: '',
					user_id: '',
                    nick_name: '',
                    name: '',
                    last_access_time: '',
					last_access_ip: '',
                    create_time: '',
                    type: 0,
                },

                //OA页数
                pageSize: 0,

                //Link模板
                linkTemplete: '',
			}
        },
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.dialogVisible = false
                this.USER_SIGNOUT()
				this.$router.push({ path: '/login' })
            },
            getData(){
                var api = huawei_host + ":8199/api/common/oa/pageNumber";
				this.$http.post(
						api,
						{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        this.pageSize = response.data.data.page;
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
                );
                
                var api_link = huawei_host + ":8199/api/LinkJSCode/getCode";
				this.$http.post(
						api_link,
						{link: '[#link#]'},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        if(response.data.status == 0){
                            this.linkTemplete = response.data.data;
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message: response.data.message
                            });
                        }
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
            getUser() {
                var api = huawei_host + ":8199/api/user/getCurrentUser";
				this.$http.post(
						api,
						{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        this.updateUser(response.bodyText);
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
            updateUser(user){
                this.userinfo = JSON.parse(user);
            },
            setOAPage(){
                var api = huawei_host + ":8199/api/common/oa/setPageNumber";
				this.$http.post(
						api,
						{page: this.pageSize},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        if(response.data.status == 0){
                            this.$message({
                                type: 'success',
                                message: '设置成功.'
                            });
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message: response.data.message
                            });
                        }
                        this.getData();
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
            flushOATime(){
                var api = huawei_host + ":8199/api/common/oa/flushDetail";
				this.$http.post(
						api,
						{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        if(response.data.status == 0){
                            this.$message({
                                type: 'success',
                                message: '刷新提交成功.'
                            });
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message: response.data.message
                            });
                        }
                        this.getData();
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
            setLinkTemplete(){
                var api = huawei_host + ":8199/api/LinkJSCode/uploadCode";
				this.$http.post(
						api,
						{code: this.linkTemplete},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true, withCredentials: true}
				).then(
					function (response) 
                    {
                        if(response.data.status == 0){
                            this.$message({
                                type: 'success',
                                message: '刷新提交成功.'
                            });
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message: response.data.message
                            });
                        }
                        this.getData();
                    },
                    function (err) {
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
            },
        },
        mounted(){
            this.getUser();
            this.getData();
        },
    }
</script>