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
		width: 480px;
		margin:80px auto;
	}
</style>
<template>
	<div>
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
                }
			}
        },
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.dialogVisible = false
                this.USER_SIGNOUT()
				this.$router.push({ path: '/login' })
            },
            getUser() {
                var api = huawei_host + ":8199/api/user/getCurrentUser";
				this.$http.post(
						api,
						{},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true}
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
            }
        },
        mounted(){
            this.getUser();
        },
    }
</script>