<template>
  <div class="header">
    <div>
      <img class="logo" src="~assets/images/logo.png" alt="" />
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'HomeHeaderInfo',
  data() {
    return {

    }
  },
  methods: {
    /**
     * | 登出按钮,
     * | 1，清空token
     * | 2，跳转回登录页面
    */
    logOut() {
      window.sessionStorage.clear() // 清空token
      this.$router.push('/login') // 跳转回登录页面
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
  }
  img.logo {
    width: 40px;
    height: 40px;
    margin-left: 15px;
  }
  span {
    margin-left: 15px;
  }
}
</style>
