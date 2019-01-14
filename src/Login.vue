<template>
    <div id="login">
        <div class="header">
            <h1>小农夫</h1>
        </div>
        <el-form label-width="15%" ref="form" class="login-container">
            <el-form-item label="账号：">
                <el-input type="text" id="username" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" id="password" v-model="password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button type="primary" @click="submitClick">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: 'guest',
                password: ''
            }
        },
        methods: {
            submitClick: function () {
                let _this = this;
                let data = {
                    username: _this.username,
                    password: _this.password
                };
                _this.httpPost("/api/login", data, () => {
                    window.location.href = "/index.html";
                }, responseBean => {
                    _this.$message.error(responseBean.msg);
                })
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