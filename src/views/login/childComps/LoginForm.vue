<template>
  <div id="login-form">
    <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" label-width="0px"
      class="el-from">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password">
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLoginData } from 'service/login.js'

export default {
  name: 'LoginForm',
  data() {
    return {
      // 表单内容
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到5位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6到15位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录，先校验表单信息，校验通过valid就为true，并发送login请求
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await getLoginData(this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        /**
         * | 1,将登陆成功之后的 token ，保存到客户端的 sessionStorage 中
         * |   - 项目中除了登陆之外的其他API接口，必须在登录之后才能访问
         * |   - token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
         */

        // 保存登录token
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
    // login请求
    // _getLoginData (data) {
    //   getLoginData(data).then(res => {
    //     if (res.data.meta.status !== 200) return console.log('登录失败')
    //     console.log('登录成功')
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
#login-form {
  .el-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
