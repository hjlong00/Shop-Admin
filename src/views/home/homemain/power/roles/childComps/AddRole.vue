<template>
  <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="20%" @close="addDialogClosed">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="addForm.roleDesc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRole } from 'service/power.js'

export default {
  name: 'AddRole',
  data() {
    return {
      addDialogVisible: false,
      addForm: {
        roleName: null,
        roleDesc: null
      },
      // 添加表单的验证规则对象
      addFormRules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 监听用户对话框关闭的事件,如果关闭了，就重置表单
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addRoles() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await addRole(this.addForm)
        // console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加角色失败')
        this.$message.success('添加角色成功')
        this.addDialogVisible = false
        this.$emit('addNewRole')
      })
    }
  }
}
</script>

<style scoped>
</style>
