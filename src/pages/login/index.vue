<style lang="less" scoped>
	.login {
		padding: 50px;
		text-align: center;
		margin:0 auto;
		width: 260px;
		.line {
			padding: 5px;
			color: red;
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
		<v-header title="登录">
			<router-link slot="left" to="/">返回</router-link>
		</v-header>
		<el-card class="box-card">
			<form class="login" v-on:submit.prevent="submit">
				<div class="line">	
					<el-input type="number" v-model="form.id" placeholder="输入你的学号/教学号"></el-input>
					<br/>
					<el-alert 
						v-show="btn && !form.id"
						title="学号/教学号不能为空"
						type="error"
						:closable="false">
					</el-alert>
				</div>
				<div class="line">
					<el-input type="text" v-model="form.pass" placeholder="输入你的密码"></el-input>
					<br/>
					<el-alert 
						v-show="btn && !form.pass"
						title="密码不能为空"
						type="error"
						:closable="false">
					</el-alert>
				</div>
				<el-button type="primary" @click="submit()">登录</el-button>
			</form>
		</el-card>
		<el-dialog title="请设置密码" :visible.sync="dialogTableVisible">
			<el-input type="text" v-model="password" placeholder="输入你的密码"></el-input>
			<br/>
			<el-alert 
				v-show="!password"
				title="密码不能为空"
				type="error"
				:closable="false">
			</el-alert>
			<br/>
			<br/>
			<el-input type="text" v-model="confirmPassword" placeholder="确认密码"></el-input>
			<br/>
			<el-alert 
				v-show="!this.confirmPassword"
				title="确认密码不能为空"
				type="error"
				:closable="false">
			</el-alert>
			<el-alert 
				v-show="this.confirmPassword != this.password"
				title="两次输入不一致"
				type="error"
				:closable="false">
			</el-alert>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dismissDialog()">取 消</el-button>
				<el-button type="primary" @click="commitSetPass()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNIN } from 'store/user'

    export default {
        data() {
			return {
				btn: false, //true 已经提交过， false没有提交过
				form: {
					id: '',
					pass: '',
					name: "",
				},

				//设置密码对话框
				dialogTableVisible: false,
				//密码、确认密码
				password:'',
				confirmPassword:'',

			}
		},
		methods: {
			...mapActions([USER_SIGNIN]),
			dismissDialog(){
				this.dialogTableVisible = false;
			},
			submit() {
				this.btn = true
				if(!this.form.id || !this.form.pass) return
				this.login();
				// this.USER_SIGNIN(this.form)
				// this.$router.replace({ path: '/' })
			},
			login() {
				if(!this.form.id || !this.form.pass) return;
				var api = "http://127.0.0.1:8199/api/user/login";
				this.$http.post(
						api,
						{userId: this.form.id, password: this.form.pass},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true}
				).then(
					function (response) 
                    {
						console.log(response);
						this.form.name = response.body.nickname;
						if(response.body.status != 0){
							this.$alert(response.body.message, "Error!", {
								lockScroll: false,
								closeOnClickModal: true,
							});
						}
						else if(response.body.resetPass){
							this.setPassword()
						}
						else{
							this.USER_SIGNIN(this.form)
							this.$router.replace({ path: '/' })
						}
                    },
                    function (err) {
                        console.log(err);
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
			},
			setPassword(){
				this.dialogTableVisible = true;
			},
			commitSetPass() {
				if(!this.confirmPassword || !this.password){
					this.$message({
						type: 'error',
						message: '请输入密码！'
					});
					return;
				}
				if(this.confirmPassword != this.password) {
					this.$message({
						type: 'error',
						message: '两次输入的密码不一致！'
					});
					return;
				}
				var api = "http://127.0.0.1:8199/api/user/setPassword";
				this.$http.post(
						api,
						{password: this.password},
						//解决跨域问题，不加无法跨域
            			{emulateJSON: true}
				).then(
					function (response) 
                    {
						console.log(response);
						if(response.body.status == 0 && !response.body.resetPass){
							this.$message({
								type: 'success',
								message: '设置密码成功.'
							});
							this.USER_SIGNIN(this.form)
							this.$router.replace({ path: '/' })
						}
						else{
							this.$alert(response, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
						}
                    },
                    function (err) {
                        console.log(err);
                        this.$alert(err, "Error!", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
				)
			},
		}
    }
</script>