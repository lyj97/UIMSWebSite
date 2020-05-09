<style lang="less" scoped>
	.box-card {
		width: 90%;
        margin:80px auto;
        text-align: center;
    }
    .title_tag {
		font-size: 20px;
		font-weight: 500;
	}
    .box-card-50 {
        width: 50%;
        margin: auto;
        text-align: center;
    }
    .center{
		text-align: center;
	}
    .main_text{
		font-size: 16px;
		color: #606266;
	}
</style>
<template>
	<div>
		<v-header title="访问校内网址引导">
			<router-link slot="left" to="/">首页</router-link>
		</v-header>

        <el-card class="center box-card">
            <br/>

            <div class="box-card-50 main_text">

                <br/>

                先回答你最想问的问题：

                <br/><br/>

                <el-tag class="title_tag"><b>这东西有什么用？</b></el-tag>

                <br/><br/>

                通过校内VPN，你可以<b>访问校内资源</b>，例如<b>上OA看通知</b>、<b>免费下论文</b>、<b>查成绩分布</b>，统统没得问题！就像你在校内一样方便！

            </div>

            <br/><br/>

            <el-tag class="title_tag">快捷链接</el-tag>

            <br/><br/>

			<el-link href="https://vpns.jlu.edu.cn/https/77726476706e69737468656265737421fff60f962b2526557a1dc7af96/"  target="_blank" class="main_text el-icon-link">校内通知（OA）</el-link>

			<el-link href="https://vpns.jlu.edu.cn/http/77726476706e69737468656265737421fcfe43d22d3c7d1e7b0c9ce29b5b/"  target="_blank" class="main_text el-icon-link">图书馆（Lib）</el-link>

			<el-link href="https://vpns.jlu.edu.cn/https/77726476706e69737468656265737421e7e056d2243e635930068cb8/"  target="_blank" class="main_text el-icon-link">知网</el-link>

			<el-link href="https://vpns.jlu.edu.cn/http/77726476706e69737468656265737421e7e056d2303166567f068ea89941227bfcd3ca21bd0c/"  target="_blank" class="main_text el-icon-link">万方</el-link>
            <br/><br/>
		</el-card>

		<el-card class="box-card">

            <br/>
            <el-tag class="title_tag">详细教程</el-tag>
            <br/><br/>
            <b>注：需要使用电脑才可以完成</b>
            <br/><br/>
			1.在首页找到获取代码板块，输入地址，获取并复制代码
            <br/><br/>
            <img src="./mainpage.png" width="80%">
            <br/><br/>
            2.打开<el-link href="https://vpns.jlu.edu.cn"  target="_blank" class="main_text el-icon-link">vpns.jlu.edu.cn</el-link>并登录
            <br/><br/>
            3.在VPN主页选项卡按下键盘F12，打开控制台（Console）
            <br/><br/>
            4.粘贴代码(Ctrl + V)，按下确认(Enter)，等待奇迹发生...
            <br/><br/>
            <img src="./console.png" width="80%">
            <br/><br/>

		</el-card>

        <el-card class="box-card">

            <br/>
            <el-tag class="title_tag"><b>¿常见问题¿</b></el-tag>
            <br/><br/>
			1.<el-link href="/" class="main_text el-icon-link">首页</el-link>在哪里？？？
            <br/><br/>
            <b>（内心毫无波澜）</b>既然找不到了，不如收藏一下吧.
            <br/><br/>
            <el-link href="/" class="main_text el-icon-link">首页</el-link> <el-link href="/" class="main_text el-icon-link">首页</el-link> <el-link href="/" class="main_text el-icon-link">首页</el-link>
            
		</el-card>
	</div>
</template>
<script>
    export default {
        data() {
			return {
			}
		},
		methods: {
			
		}
    }
</script>