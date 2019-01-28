<template>
    <div id="login">
        <div class="header">
            <h1>小农夫</h1>
        </div>
        <el-form class="login-container" label-width="15%" ref="form">
            <el-form-item label="账号：">
                <el-input id="username" type="text" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input id="password" type="password" v-model="password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button @click="submitClick" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                router: this.$router,
                username: 'guest',
                password: ''
            }
        },
        methods: {
            submitClick: function () {
                let _this = this;
                let data = {
                    username: this.username,
                    password: this.password
                };
                _this.httpPost("/api/login", data, () => {
                    _this.router.replace('/navigation');
                }, responseBean => {
                    _this.$message.error(responseBean.msg);
                });
            }
        }
    }
</script>

<style scoped>
    .header {
        text-align: center;
    }

    .header h1 {
        font-size: 200%;
        color: #333;
        margin-top: 30px;
    }

    .login-container {
        padding: 4% 35% 0 33%;
    }

</style>