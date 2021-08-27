<template>
  <div id="category-table">
    <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false"
      show-index index-text="#" border :show-row-hover="false">
      <!-- 是否有效 -->
      <template slot="isOk" slot-scope="scope">
        <i v-if="scope.row.cat_deleted === false" class="el-icon-success"
          style="color:lightgreen" />
        <i v-else class="el-icon-error" style="color:lightred" />
      </template>
      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
        <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
        <el-tag v-else-if="scope.row.cat_level === 1" size="mini" type="success">二级</el-tag>
        <el-tag v-else size="mini" type="warning">三级</el-tag>
      </template>
      <!-- 操作 -->
      <template slot="opt" slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit"
          @click="showEditDialogVisible(scope.row.cat_id)">编辑
        </el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"
          @click="removeCategory(scope.row.cat_id)">删除</el-button>
      </template>
    </tree-table>
    <!-- 编辑对话框 -->
    <edit-category ref="editCategoryRef" @editCate="editCate" />
  </div>
</template>

<script>
import editCategory from './editCategory.vue'

import { delCategory } from 'service/goods.js'

export default {
  components: { editCategory },
  name: 'CategoryTable',
  data() {
    return {
      // 商品分类数据
      cateList: [],
      // tree-table columns配置 指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 当前列定义为模板列
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          // 当前列定义为模板列
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          // 当前列定义为模板列
          type: 'template',
          template: 'opt'
        }
      ]
    }
  },
  methods: {
    // 打卡编辑对话框，传入商品分类的 cat_id
    showEditDialogVisible(id) {
      this.$refs.editCategoryRef.editdialogVisible = true
      this.$refs.editCategoryRef.editCateForm.cat_id = id
    },
    // 通知父组件刷新
    editCate() {
      this.$emit('editCate')
    },
    /**
   * | 根据cat_id删除分类解说
   * | - $confirm是一个promise，可以使用 async/await 语法简化
   * | 1，判断用户有没有点击确认，若果没点，就什么都不做
   * | 2，如果点击确认删除，则发起delete请求
   * |  - 如果删除成功就继续后面的代码
   * | 3，刷新用户列表
   */
    async removeCategory(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(res => res) // !这里捕获了err信息，同时把结果 return 给confirmResult
      /**
       * * 如果用户确认删除，则返回值为字符串 'confirm'
       * * 如果用户取消删除，则返回值为字符串 'cancel'
       */
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')

      const { data: res } = await delCategory(id)
      if (res.meta.status !== 200) return this.$message.error('删除分类失败')
      this.$message.success('删除分类成功')

      this.$emit('editCate')
    }
  }

}
</script>

<style lang="less" scoped>
#category-table {
  margin-top: 15px;
}
</style>
