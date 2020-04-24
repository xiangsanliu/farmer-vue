<template>
  <div id="navigation">
    <el-menu
      :default-active="activeIndex"
      active-text-color="#ffffff"
      background-color="#324057"
      class="el-menu"
      mode="horizontal"
      text-color="#cbcfd4"
    >
      <el-menu-item @click="router.replace('/navigation')" index="1">主页</el-menu-item>
      <el-menu-item
        @click="router.replace('/navigation/land')"
        index="2"
        v-if="userType === 1 || userType === 2"
      >土地管理</el-menu-item>
      <el-menu-item @click="router.replace('/navigation/material')" index="3">生产材料</el-menu-item>
      <el-menu-item @click="router.replace('/navigation/fertilizer')" index="4">培肥配药</el-menu-item>
      <el-menu-item index="5">生产计划</el-menu-item>
      <el-menu-item index="6">农作信息</el-menu-item>
      <el-menu-item index="7">实际采收</el-menu-item>
      <el-submenu index="8">
        <template slot="title">{{ username }}</template>
        <el-menu-item @click="logout" index="8-1">登出</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      activeIndex: "1",
      userType: null,
      username: "未登录",
      router: this.$router
    };
  },
  created() {
    let _this = this;
    _this.httpGet("/api/initUser", responseBean => {
      let user = responseBean.content;
      _this.userType = user.userType;
      _this.username = user.username;
    });
  },
  methods: {
    logout: function() {
      this.httpGet("/api/logout", () => {
        this.router.replace("/login");
      });
    }
  }
};
</script>

<style scoped>
</style>