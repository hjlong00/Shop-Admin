<template>
  <div id="login">
    <login-Box />
  </div>
</template>

<script>
import LoginBox from './childComps/LoginBox.vue'
export default {
  components: { LoginBox },
  name: 'Login',
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
#login {
  background-color: #2b4b6b;
  height: 100%;
}
</style>
