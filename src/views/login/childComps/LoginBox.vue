<template>
  <div id="login-box">
    <div class="avatar-box">
      <img src="~assets/images/logo.png" alt="" />
    </div>
    <login-form />
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'

export default {
  components: { LoginForm },
  name: 'LoginBox',
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
#login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar-box {
    width: 130px;
    height: 130px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
</style>
