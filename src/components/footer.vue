<style lang="less" scoped>
	.footer {
		position: relative;
		line-height: 30px;
		height: 100px;
		bottom: 0;
		color: #fff;
		text-align: center;
		background: rgb(100, 177, 255);
		.item {
			position: absolute;
			top: 10;
			bottom: 0;
			z-index: 1;
			a {
				color: #fff;
			}
		}
		.left {
			left: 10px;
			font-size: 10px;
		}
		.right {
			right: 10px;
			font-size: 10px;
		}
		.title {
			font-size: 15px;
			font-style: oblique;
		}
		.bottom-text {
			font-size: 13px;
		}
	}
</style>
<template>
	<footer class="footer">
		<div class="item left">
			<slot name="left"></slot>
		</div>
		<div class="title">{{title}}</div>
		<div class="bottom-text">Copyright © lu 2019</div>
		<div class="bottom-text"><a href="http://www.beian.miit.gov.cn">吉ICP备 19000593 号</a></div>
		<div class="item right">
			<slot name="right"></slot>
		</div>
	</footer>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>