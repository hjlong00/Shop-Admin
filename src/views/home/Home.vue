<template>
  <div id="">
    <el-button type="info" @click="logOut">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {
    /**
     * | 登出按钮,
     * | 1，清空token
     * | 2，跳转回登录页面
    */
    logOut () {
      window.sessionStorage.clear() // 清空token
      this.$router.push('/login') // 跳转回登录页面
    }
  }
}
</script>

<style lang="less" scoped>
</style>
