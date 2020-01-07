<style lang="less" scoped>
	.login-msg {
		// padding: 50px;
		text-align: center;
	}
	.msg {
		// padding: 50px;
		text-align: center;
		font-size: 20px;
	}
	.title-text {
		color: rgb(0, 140, 255)
	}
	.text {
		font-size: 16px;
	}

	.box-card {
		// width: 330px;
		max-width: 550px;
		margin: auto;
	}
	.box-card-dev {
		// width: 330px;
		background: #c5c5c5
	}
	.box-card-new {
		// width: 330px;
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
				<br/>
				<div class="main_text">
					同时，您也可以在<el-link href="/app/#/jlupages_new" class="main_text el-icon-link">这里</el-link>贡献常用网址，不限校内外哦~
				</div>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card box-card-new">
				<el-tag class="title_tag">即将上线！</el-tag>
				<br/>
				<br/>
				<div class="main_text">
					UIMSTest即将上线课程编辑功能，助你轻松管理课程^_^
					<br/>
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
			<el-card class="box-card">
				<el-tag class="title_tag">Tips: - 热映电影</el-tag>
				<br/>
				<br/>
				<el-popover
					placement="top"
					trigger="hover">
					<!-- <el-table 
						:data="movie_data" 
						:height="popUpWindowHight"
						style="{width: popUpWindowWidth}"> -->
					
					<el-table 
						:data="movie_data" 
						:height="popUpWindowHight"
						style="width: 100%">

						<el-table-column fixed="left" min-width="130" property="movieName" label="影片"></el-table-column>
						<el-table-column property="releaseInfo" label="上映时间"></el-table-column>
						<el-table-column property="boxInfo" label="综合票房(万)"></el-table-column>
						<el-table-column property="boxRate" label="票房占比"></el-table-column>
						<el-table-column property="splitSumBoxInfo" label="全球票房(美元)"></el-table-column>
						<el-table-column label="豆瓣">
							<template slot-scope="scope">
								<el-button icon="el-icon-search" @click="openMoviePage(scope.row.movieName)" circle></el-button>
							</template>
						</el-table-column>

					</el-table>
					<el-button slot="reference">I'm here.</el-button>
				</el-popover>
			</el-card>
			<br/>
			<br/>
			<el-card class="box-card box-card-dev">
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
		<v-footer title="2045.site">
			<li slot="right">电影数据来源：猫眼专业版</li>
		</v-footer>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
	import logo from './ic_launcher_round.png'
	import { ali_host, huawei_host } from 'store/host.js'
    export default {
		data() {
			return {
				logo,
				movie_data: [{
					movieName:'暂无数据'
				}],

				//电影数据弹出框高度
				popUpWindowHight : window.innerHeight * 0.7,
				popUpWindowWidth : window.innerWidth * 0.7,
			}
		},
        computed: mapState({ user: state => state.user }),
		methods:{
            getInformation(){

                var api = ali_host + ":8099/UIMSTest/GetVersionInformation";
                this.$http.get(api).then
                (
                    function (response) 
                    {
						var notify_title = response.data.title;
						if(!notify_title.length > 1){
							return;
						}
						var notify_info = response.data.information.replace(/\\n/g," <br/> ");
						this.sendNotifyHtml(notify_title, notify_info);
                    },
                    function (err) {
                        // this.$alert("请考虑将浏览器地址栏\"https\"替换为\"http\"后重试.如需帮助，请联系网站管理者.", "加载失败！", {
                        //     lockScroll: false,
                        //     closeOnClickModal: true,
                        // });
                    }
				)
				var movie_api = huawei_host + ":8199/api/movie/get_list";
				this.$http.get(movie_api).then
                (
                    function (response) 
                    {
						this.obtainMovieData(response.bodyText);
                    },
                    function (err) {
                        // this.$alert("请考虑将浏览器地址栏\"https\"替换为\"http\"后重试.如需帮助，请联系网站管理者.", "加载失败！", {
                        //     lockScroll: false,
                        //     closeOnClickModal: true,
                        // });
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
			sendNotifyHtml(title_str, information_str){
				const h = this.$createElement;
				information_str = information_str.replace(/\\n/g,'<br/>');
				information_str = '<div>' + information_str + '</div>';
				this.$notify({
					title: title_str,
					dangerouslyUseHTMLString: true,
					message: information_str
				});
			},
			obtainMovieData(movie_list){
				movie_list = JSON.parse(movie_list);
				var hot_movie_msg = '';
				// movie_list = movie_list.data.list.slice(0,10);
				movie_list = movie_list.data.list;
				this.movie_data = movie_list;
				var temp;
				for(var i=0; i<5; i++){
					temp = movie_list[i];
					hot_movie_msg = hot_movie_msg + (1 + i) + ' ' + temp.movieName + '\n';
				}
				this.sendNotifyHtml('[Tips:]热映影片', hot_movie_msg);
			},
			openMoviePage(movie_name){
				// console.log(movie_name);
				window.open(("https://search.douban.com/movie/subject_search?search_text=" + movie_name));
			}
		},
		mounted(){
			this.getInformation();
			window.onresize = () => {
                return (() => {
					this.popUpWindowHight = window.innerHeight * 0.7;
					this.popUpWindowWidth = window.innerWidth * 0.7;
                })();
            };
        },
    }
</script>