<template>
  <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUsers">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addUser } from 'service/users.js'

export default {
  name: 'AddUser',
  data() {
    // 验证邮箱规则
    const checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    //  验证手机号码规则
    const checkMobile = (rule, value, callback) => {
      // 验证手机号码的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      // 控制添加用户对话框框的显示和隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: null,
        password: null,
        email: null,
        mobile: null
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到5位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在6到15位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 监听用户对话框关闭的事件,如果关闭了，就重置表单
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    /** ---------------------------------------------------------
     *  | addUsers()方法解说
     *  | 点击确定，提交新用户
     *  | 1，先验证表单内容是否通过初步验证
     *  | 2，发送网络请求添加用户 ， 请求模块我封装在了 users.js
     *  | 3，添加完之后要关闭对话框
     *  | 4，同时通知父组件我已完成添加用户，让父组件及时发送请求获取最新用户列表
     *  ---------------------------------------------------------
    */
    addUsers() {
      this.$refs.addFormRef.validate(async valid => {
        // 先验证表单内容是否通过初步验证
        if (!valid) return
        const { data: res } = await addUser(this.addForm)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success('添加用户成功')
        // 添加完用户，关闭对话框
        this.addDialogVisible = false
        // 通知父组件完成了添加用户
        this.$emit('addNewUser')
      })
    }
  }
}
</script>

<style scoped>
</style>
