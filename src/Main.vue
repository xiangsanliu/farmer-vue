<template>
    <div id="app">
        <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" active-text-color="#ffffff"
                 background-color="#409eff" text-color="#fff">
            <el-menu-item index="1" v-if="userType === 1 || userType === 2"
                          @click="router.replace('/land')">
                土地管理
            </el-menu-item>
            <el-menu-item index="2" v-if="userType === 1 || userType === 2"
                          @click="router.replace('/material')">
                生产材料
            </el-menu-item>
            <el-menu-item index="3" v-if="userType === 1 || userType === 2"
                          @click="router.replace('/fertilizer')">
                培肥配药
            </el-menu-item>
            <el-menu-item index="4">
                生产计划
            </el-menu-item>
            <el-menu-item index="5">
                农作信息
            </el-menu-item>
            <el-menu-item index="6">
                实际采收
            </el-menu-item>
            <el-submenu index="7">
                <template slot="title">{{ username }}</template>
                <el-menu-item @click="logout" index="8-1">登出</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                activeIndex: '1',
                userType: null,
                username: 'xiangjianjian',
                router: this.$router,
            }
        },
        created() {
            let _this = this;
            this.$http.get('/api/initUser').then(function (response) {
                let resp = response.body;
                if (resp && resp.status === 200) {
                    let user = resp.content;
                    _this.userType = user.userType;
                    _this.username = user.username;
                } else {
                    _this.$alert('未登录,请先登录!', '提示', {
                        confirmButtonText: '确定',
                        callback: function () {
                            window.location.href = "/login.html";
                        }
                    });
                }
            });
            this.router.replace('/land');
        },
        methods: {
            logout: function () {
                this.$http.get('/api/logout').then(function () {
                    window.location.href = '/login.html';
                })
            }
        }
    }
</script>

<style>

</style>
