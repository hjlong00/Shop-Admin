<template>
  <el-dialog title="添加角色" :visible.sync="editDialogVisible" width="20%" @close="editDialogClosed">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editForm.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="editForm.roleDesc" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editRoleInfo } from 'service/power.js'

export default {
  name: 'EditRole',
  data() {
    return {
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 当修改对话框关闭时，重置里面的输入内容
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editRoles() {
      this.$refs.editFormRef.validate(async volide => {
        if (!volide) return
        const { data: res } = await editRoleInfo(this.editForm)
        if (res.meta.status !== 200) return this.$message.error('更新角色信息失败')
        this.$message.success('更新角色信息成功')
        this.editDialogVisible = false
        this.$emit('editInfo')
      })
    }
  }
}
</script>

<style scoped>
</style>
