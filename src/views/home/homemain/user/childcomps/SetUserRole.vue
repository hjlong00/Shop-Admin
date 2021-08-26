<template>
  <el-dialog title="分配权限" :visible.sync="setUserRoleDialog" width="30%"
    @close="setUserRoleDialogClosed">
    <div>
      <p>当前的用户：{{userInfo.username}}</p>
      <p>当前的角色：{{userInfo.role_name}}</p>
      <p>
        分配新角色：
        <el-select v-model="selectRoleId" placeholder="请选择">
          <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setUserRoleDialog = false">取 消</el-button>
      <el-button type="primary" @click="saveUserRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setRole } from 'service/users.js'

export default {
  name: 'SetUserRole',
  data() {
    return {
      // 控制修改用户角色对话框的现实和隐藏
      setUserRoleDialog: false,
      userInfo: {},
      // 所以角色列表
      rolesList: [],
      // 已选中的角色Id值
      selectRoleId: ''
    }
  },
  methods: {
    setUserRoleDialogClosed() {
      this.selectRoleId = ''
      this.userInfo = {}
    },
    /** ----------------------------------
     * | 提交分配角色
     * | 先判断是否有选择角色
     * | 发起请求
     * | 关闭窗口
     * | 刷新页面
     */
    async saveUserRole() {
      if (!this.selectRoleId) return this.$message.error('请选择要分配的角色')
      const { data: res } = await setRole(this.userInfo.id, this.selectRoleId)
      if (res.meta.status !== 200) return this.$message.error('分配角色失败')
      this.$message.success('分配角色成功')
      this.setUserRoleDialog = false
      this.$emit('setRole')
    }
  }
}
</script>

<style scoped>
</style>
