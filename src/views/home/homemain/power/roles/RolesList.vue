<template>
  <div id=''>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!-- 添加角色列表按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddDialoge">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <expand-role />
        <!-- 索引列 -->
        <el-table-column type="index" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 修改角色信息按钮 -->
            <el-button size="mini" type="primary" icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)" />
            <!-- 删除按钮 -->
            <el-button size="mini" type="danger" icon="el-icon-delete"
              @click="removeRoleById(scope.row.id)" />
            <!-- 分配权限按钮 -->
            <el-button size="mini" type="warning " icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加角色的对话框  -->
    <add-role ref="addRoleRef" @addNewRole="_getRolesList"></add-role>
    <!-- 修改角色信息对话框 -->
    <edit-role ref="editRoleInfoRef" @editInfo="_getRolesList"></edit-role>
    <!-- 修改角色权限对话框 -->
    <set-right ref="setRightRef" @setRight="_getRolesList" />
  </div>
</template>

<script>
import AddRole from './childComps/AddRole.vue'
import EditRole from './childComps/EditRole.vue'
import ExpandRole from './childComps/ExpandRole.vue'
import SetRight from './childComps/SetRight.vue'

import { getRolesList, getRoleInfo, delRole, getRightsList } from 'service/power.js'

export default {
  name: 'Roles',
  components: { AddRole, EditRole, ExpandRole, SetRight },
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    // 获取所有角色列表
    this._getRolesList()
  },
  methods: {
    // | 获取所有角色列表的请求
    async _getRolesList() {
      const { data: res } = await getRolesList()
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.rolesList = res.data
      // console.log(this.rolesList)
    },
    // | 点击修改子组件 addDialogVisible 的值，显示添加角色对话框
    showAddDialoge() {
      this.$refs.addRoleRef.addDialogVisible = true
    },
    async showEditDialog(id) {
      // 1，根据用户id查询用户信息的请求
      const { data: res } = await getRoleInfo(id)
      if (res.meta.status !== 200) return this.$message.error('查询角色信息失败')
      this.$refs.editRoleInfoRef.editForm = res.data
      // console.log(res)
      // 2，显示修改用户对话框
      this.$refs.editRoleInfoRef.editDialogVisible = true
    },
    // | 删除角色操作
    async removeRoleById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(res => res)

      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message('已取消删除')

      const { data: res } = await delRole(id)
      if (res.meta.status !== 200) return this.$message.error('删除角色失败')
      this.$message.success('删除角色成功')

      this._getRolesList()
    },
    // | 获取所有权限列表，同时打开修改权限弹窗
    async showSetRightDialog(role) {
      // 保存ID到子组件的roleId
      this.$refs.setRightRef.roleId = role.id
      // 发起请求
      const { data: res } = await getRightsList('tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
      // 保存权限列表数据
      this.$refs.setRightRef.rightsList = res.data
      // 调用递归方法，获取角色的3级权限ID
      this.getRoleDefRightId(role, this.$refs.setRightRef.defKeys)
      // 打开弹窗
      this.$refs.setRightRef.setDialogVisible = true
    },
    // 递归的方式，获取角色下的3级权限id,并保存到 defKeys 数组中
    getRoleDefRightId(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item =>
        this.getRoleDefRightId(item, arr)
      )
    }
  }
}
</script>

<style lang="less" scoped>
</style>
