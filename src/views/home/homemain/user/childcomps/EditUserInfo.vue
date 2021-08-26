<template>
  <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editUserInfo } from 'service/users.js'

export default {
  name: 'ChangeUserInfo',
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
      // 控制修改用户信息对话框的显示和隐藏
      editDialogVisible: false,
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
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
    // 当修改对话框关闭时，重置里面的输入内容
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editDialog() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await editUserInfo(this.editForm)
        if (res.meta.status !== 200) return this.$message.error('更新用户信息失败')
        this.$message.success('更新用户信息成功')
        // 添加完用户，关闭对话框
        this.editDialogVisible = false
        // 通知父组件完成了添加用户，让父组件刷新列表
        this.$emit('editedInfo')
      })
    }
  }
}
</script>

<style scoped>
</style>
