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
    .title_tag_16 {
		font-size: 16px;
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
		<v-header title="捐赠开发者">
			<router-link slot="left" to="/">首页</router-link>
		</v-header>

        <el-card class="center box-card">
            <br/>

            <div class="box-card-50 main_text">

                <el-tag class="title_tag">感谢使用UIMSTest</el-tag>

                <br/><br/>

                UIMSTest的运营需要你的支持。<br/>
                
                作为个人项目，从19年4月上线以来，UIMSTest一直努力为吉林大学的朋友们提供更好的服务，服务器、域名等费用由开发者个人承担。<br/>

                如果你喜欢这个项目，欢迎在下方捐赠开发者。<br/>

            </div>

            <br/>
		</el-card>

		<el-card class="box-card">

            <el-tag class="title_tag">捐赠渠道</el-tag>
            <br/><br/><br/>
            <el-tag class="title_tag_16">支付宝快捷捐赠渠道</el-tag>
            <br/><br/>
            <!-- <div v-if="show_input">
                 金额 <el-input style="width: 40%" type="text" v-model="money" placeholder="金额..."></el-input>
                <br/><br/>
                付款信息<el-input style="width: 40%" type="text" v-model="remind" placeholder="付款信息..."></el-input>
                <br/><br/>
                <el-button type="primary" icon="el-icon-check" @click="getFinalLink()" circle></el-button>
            </div> -->
            <div v-if="show_link">
                <!-- <el-button icon="el-icon-back" @click="backToInput()" circle></el-button>
                <br/><br/> -->
                <el-button type="primary" @click="goToPayLink()">去支付宝<i class="el-icon-s-promotion el-icon--right"></i></el-button>
            </div>
            <br/><br/>
            <el-tag class="title_tag_16">微信二维码</el-tag>
            <br/><br/>
            <el-image 
                style="width: 50%"
                src="./wechat.png" 
                :preview-src-list="srcList">
            </el-image>
            <!-- <img src="./wechat.png" width="30%"> -->
            <br/><br/>
            <el-tag class="title_tag_16">支付宝二维码</el-tag>
            <br/><br/>
            <el-image 
                style="width: 50%"
                src="./ali.jpg" 
                :preview-src-list="srcList">
            </el-image>
            <!-- <img src="./ali.jpg" width="30%"> -->
            <br/><br/>

		</el-card>

	</div>
</template>
<script>
    export default {
        data() {
			return {
                //捐赠信息
                // user:'2088212913962104',
                // money:0,
                // remind:'',

                // show_input:true,
                show_link:true,

                final_link:'https://qr.alipay.com/fkx024101yboxtfzk4lot45',

                //图片
                srcList: [
                    './wechat.png',
                    './ali.jpg'
                ]
			}
		},
		methods: {
			// getFinalLink(){
            //     this.final_link = 'alipays://platformapi/startapp?appId=2018120162393644&actionType=scan&biz_data={"s":"money","u":"' + this.user + '","a":"' + this.money + '","m":"' + this.remind + '"}';
            //     this.show_input = false;
            //     this.show_link = true;
            // },

            // backToInput(){
            //     this.final_link = '';
            //     this.show_input = true;
            //     this.show_link = false;
            // },

            goToPayLink(){
                var my_link_a = document.createElement("a");
                my_link_a.setAttribute("id","my_pay_link");
                my_link_a.setAttribute("href",this.final_link);
                my_link_a.setAttribute("target","_blank");
                my_link_a.click();
            }
		}
    }
</script>