<template>
    <div id="login">
        <div class="header">
            <div class="am-g">
                <h1>小农夫</h1>
            </div>
            <hr/>
        </div>
        <div class="am-g" id="app">
            <div class="am-u-lg-6 am-u-md-8 am-u-sm-centered">
                <span style="color: red;"> {{ message }} </span>
                <br>
                <br>
                <form method="post" class="am-form">
                    <label for="username">账号:</label>
                    <input type="text" id="username" v-model="username">
                    <br>
                    <label for="password">密码:</label>
                    <input type="password" id="password" v-model="password">
                    <br>
                    <br/>
                </form>
                <button class="am-btn am-btn-primary am-btn-sm am-fl" @click="submitClick">登录</button>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                message: '',
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
                this.$http.post('/api/login', {data: JSON.stringify(data)}).then(function (response) {
                    let resp = response.body;
                    this.message = resp.msg;
                    if (resp && resp.status === 200) {
                        window.location.href = "/index.html";
                    }
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

    .header p {
        font-size: 14px;
    }
</style>