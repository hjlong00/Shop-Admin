<template>
  <div id="">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <!--  搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select"
            clearable @clear="_getUserList(queryInfo)">
            <el-button slot="append" icon="el-icon-search" @click="_getUserList(queryInfo)">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialoge">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)" />
            <el-button size="mini" type="danger" icon="el-icon-delete"
              @click="removeUserById(scope.row.id)" />
            <el-tooltip effect="light" content="分配角色" placement="top" :enterable="false">
              <el-button size="mini" type="warning" icon="el-icon-setting" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--添加用户的对话框  -->
    <add-user ref="addUserRef" @addNewUser="refreshUserList" />
    <!-- 修改用户信息对话框 -->
    <edit-user-info ref="editUserInfoRef" @editedInfo="refreshUserList" />
  </div>
</template>

<script>
import AddUser from './childcomps/AddUser.vue'
import EditUserInfo from './childcomps/EditUserInfo.vue'

import { getUserList, changUserState, getUserInfo, delUser } from 'service/users.js'

export default {
  name: 'MainUsers',
  components: { AddUser, EditUserInfo },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询参数
        query: '',
        // 当前的页码
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: null
    }
  },
  created() {
    // 获取用户列表数据
    this._getUserList(this.queryInfo)
  },
  methods: {
    // 获取用户列表请求方法
    async _getUserList(params) {
      const { data: res } = await getUserList(params)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this._getUserList(this.queryInfo)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newpage) {
      // console.log(newpage)
      this.queryInfo.pagenum = newpage
      this._getUserList(this.queryInfo)
    },
    // 修改用户的状态
    async userStateChanged(userinfo) {
      const { data: res } = await changUserState(userinfo)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新用户状态成功')
    },
    // 点击修改子组件 addDialogVisible 的值，显示添加用户对话框
    showAddDialoge() {
      this.$refs.addUserRef.addDialogVisible = true
    },
    // 监听到子组件 添加了新用户/修改了用户信息 事件，然后刷新用户列表
    refreshUserList() {
      this._getUserList(this.queryInfo)
    },
    /**
     * | showEditDialog() 解说
     * | 1，调用用户id查询用户信息的请求方法
     * |  - 如果没有请求到信息就什么都不做，return结束
     * |  - 如果请求到信息就继续后面的代码
     * | 2，通过点击事件修改子组件editDialogVisible，显示对话框
     */
    async showEditDialog(id) {
      // 1，根据用户id查询用户信息的请求
      const { data: res } = await getUserInfo(id)
      if (res.meta.status !== 200) return this.$message.error('查询用户信息失败')
      this.$refs.editUserInfoRef.editForm = res.data
      // 2，显示修改用户对话框
      this.$refs.editUserInfoRef.editDialogVisible = true
    },
    /**
    * | 根据ID删除用户解说
    * | - $confirm是一个promise，可以使用 async/await 语法简化
    * | 1，判断用户有没有点击确认，若果没点，就什么都不做
    * | 2，如果点击确认删除，则发起delete请求
    * |  - 如果删除成功就继续后面的代码
    * | 3，刷新用户列表
    */
    async removeUserById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(res => res) // !这里捕获了err信息，同时把结果 return 给confirmResult
      /**
       * * 如果用户确认删除，则返回值为字符串 confirm
       * * 如果用户取消删除，则返回值为字符串 cancel
       */
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message('已取消删除')

      // 点击确认，执行以下代码
      // 发起请求
      const { data: res } = await delUser(id)
      if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      this.$message.warning('删除成功')

      // 刷新用户列表
      this._getUserList(this.queryInfo)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
