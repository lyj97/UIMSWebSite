<style lang="less" scoped>
	.login-msg {
		padding: 50px;
		text-align: center;
	}
	.msg {
		padding: 50px;
		text-align: center;
		font-size: 20px;
	}
	.title-text {
		color: rgb(0, 140, 255)
	}
	.text {
		font-size: 16px;
	}

	.item {
		padding: 18px 0;
	}

	.box-card {
		width: 330px;
		margin: auto;
	}
	.box-card-dev {
		width: 330px;
		margin: auto;
		background: #c5c5c5
	}
	.box-card-new {
		width: 330px;
		margin: auto;
		background: #52b1ff
	}
	.title_tag {
		font-size: 20px;
		font-weight: 500;
	}
	.main_text{
		font-size: 16px;
		color: #606266
	}
	.main_text_dev{
		font-size: 13px;
		color: #606266
	}
</style>
<template>
	<div>
		<v-header title="首页">
			<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
			<router-link slot="right" v-if="!user.id" to="/login">登录</router-link>
			<router-link slot="left" v-if="user.id" to="/list">通知</router-link>
			<el-header style="text-align: right; font-size: 12px" slot="below">
                <el-dropdown>
                    <i class="el-icon-arrow-down" style="margin-right: 15px">快速跳转</i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link to="/list">校内通知</router-link></el-dropdown-item>
					<el-dropdown-item><router-link to="/jlupages">网址导航</router-link></el-dropdown-item>
                    <el-dropdown-item v-if="user.id"><router-link to="/home">个人中心</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
		</v-header>
		<!-- <div class="login-msg" v-if="!user.id">
			<router-link to="/login">登录</router-link>
		</div> -->
		<!-- <div class="msg" v-if="user.id"> -->
		<div class="msg">
			<br/>
			<el-tag class="title_tag">欢迎来到UIMSTest网站！</el-tag>
			<br/>
			<br/>
			<img width="90" :src="logo" alt=""> <br>
			<b class="title-text"> UIMSTest </b>
			<br/>
			<br/>
			<el-card class="box-card">
				<div class="main_text">
					UIMSTest提供<br/>课程管理、 <el-link href="/app/#/list" class="main_text el-icon-link">校内通知查询</el-link>、 <el-link href="/app/#/jlupages" class="main_text el-icon-link">校园网址导航</el-link>、 成绩统计<br/>等功能，较好整合了校内与校外访问接口，欢迎下载体验.
				</div>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card-new">
				<el-tag class="title_tag">即将上线！</el-tag>
				<br/>
				<br/>
				<div class="main_text">
					UIMSTest即将上线数据备份/恢复功能，不在学校也能恢复数据哦~
				</div>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card">
				<el-tag class="title_tag" effect="dark">UIMSTest下载地址</el-tag>
				<br/>
				<br/>
				<div class="main_text">
					<el-link class="text el-icon-link" type="primary" href="https://www.coolapk.com/apk/com.lu.mydemo" target="_blank">酷安网</el-link>
					<br/>
					<el-link class="text el-icon-link" type="primary" href="http://app.mi.com/details?id=com.lu.mydemo" target="_blank">小米应用商店</el-link>
					<br/>
					<el-link class="text el-icon-link" type="primary" href="https://appstore.huawei.com/app/C100937407" target="_blank">华为应用市场</el-link>
					<br/>
				</div>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card">
				<el-tag class="title_tag">UIMSTest（内测）</el-tag>
				<br/>
				<br/>
				<div class="main_text">
					<el-link class="text el-icon-link" type="primary" href="https://jq.qq.com/?_wv=1027&k=52o3LIT" target="_blank">加入UIMSTest内测QQ群</el-link>
				</div>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card-dev">
				<el-tag class="title_tag" type= "info" effect="dark">For developers in JLU</el-tag>
				<br/>
				<br/>
				<div class="main_text_dev">
					诚邀校内开发者参与开发或提出宝贵意见
					<br/>
					请点击上方“加入QQ群”按钮，愿我们携手，一起创造JLU体验一流的校内APP
				</div>
				<br/>
				<br/>
				<div class="main_text_dev">
					(模块建设中...)
				</div>
			</el-card>
		</div>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
	import logo from './ic_launcher_round.png'
    export default {
		data() {
			return {
				logo
			}
		},
        computed: mapState({ user: state => state.user }),
		methods:{
            getInformation(){
                var api = "http://2045.site:8099/UIMSTest/GetVersionInformation";
                this.$http.get(api).then
                (
                    function (response) 
                    {
                        // console.log(response);
						var notify_title = response.data.title;
						if(!notify_title.length > 1){
							return;
						}
						var notify_info = response.data.information.replace(/\\n/g," \n ");
						this.sendNotify(notify_title, notify_info);
                    },
                    function (err) {
                        console.log(err);
                        this.$alert("请考虑将浏览器地址栏\"https\"替换为\"http\"后重试.如需帮助，请联系网站管理者.", "加载失败！", {
                            lockScroll: false,
                            closeOnClickModal: true,
                        });
                    }
                )
			},
			sendNotify(information_str){
				const h = this.$createElement;
				this.$notify({
					message: h('i', { style: 'color: teal'}, information_str)
				});
			},
			sendNotify(title_str, information_str){
				const h = this.$createElement;
				this.$notify({
					title: title_str,
					message: h('i', { style: 'color: teal'}, information_str)
				});
			},
		},
		mounted(){
            this.getInformation();
        },
    }
</script>