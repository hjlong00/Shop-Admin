<template>
  <el-dialog title="分配权限" :visible.sync="setDialogVisible" width="50%"
    @close="setRightDialogClosed">
    <!-- 树型控件 -->
    <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all
      :default-checked-keys="defKeys" ref="treeRef" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="allotRight">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setRoleRight } from 'service/power.js'

export default {
  name: 'SetRight',
  data() {
    return {
      setDialogVisible: false,
      rightsList: [],
      // 树形控件的绑定对象
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的节点Id数组
      defKeys: [],
      // 当前即将分配权限的角色ID
      roleId: null
    }
  },
  methods: {
    setRightDialogClosed() {
      this.defKeys = []
    },
    // 点击确定提交权限分配
    async allotRight() {
      // 获取已勾选的key的id值 （上面已经设置过 node-key="id" 节点key和id值绑定）
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      // 请求需要以字符串类型发送，这里转换一下
      const idStr = keys.join(',')
      // 发起请求
      const { data: res } = await setRoleRight(this.roleId, idStr)
      if (res.meta.status !== 200) return this.$message.error('分配权限失败')
      this.$message.success('分配权限成功')
      // 关闭弹窗
      this.setDialogVisible = false
      // 告诉父组件完成了，请重新获取数据刷新页面
      this.$emit('setRight')
    }
  }
}
</script>

<style scoped>
</style>
