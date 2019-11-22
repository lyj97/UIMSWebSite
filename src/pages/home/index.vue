<style lang="less" scoped>
	.user-name {
		padding: 5px;
        text-align: center;
        color: rgb(0, 153, 255)
    }
</style>
<template>
	<div>
		<v-header title="个人中心">
			<router-link slot="left" to="/">首页</router-link>
			<!-- <router-link slot="right" to="/signout">退出</router-link> -->
			<el-link slot="right" v-if="user.id" @click="dialogVisible = true">退出登录</el-link>
		</v-header>
		<div style="padding: 50px;">欢迎,<b class="user-name">{{user.name}}</b>.</div>

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
    export default {
		computed: mapState({ user: state => state.user }),
		data(){
			return{
				dialogVisible: false,
                information:"确定退出吗？",
			}
        },
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.dialogVisible = false
                this.USER_SIGNOUT()
				this.$router.push({ path: '/login' })
            }
        }
    }
</script>