<template>
  <div id=''>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <category-table ref="cateTableRef" @editCate="refreshList2" />
      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <add-category ref="addCategoryRef" @addCate="_getCateList" />
  </div>
</template>

<script>
import CategoryTable from './childComps/CategoryTable.vue'
import AddCategory from './childComps/AddCategory.vue'

import { getCateList } from 'service/goods.js'

export default {
  components: { CategoryTable, AddCategory },
  name: 'GoodsCategory',
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 总数据条数
      total: 0
    }
  },
  created() {
    this._getCateList()
  },
  methods: {
    // 获取商品分类数据
    async _getCateList() {
      const { data: res } = await getCateList(this.queryInfo)
      console.log(this.queryInfo)
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      // console.log(res.data)
      this.$refs.cateTableRef.cateList = res.data.result
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this._getCateList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this._getCateList()
    },
    // 展示添加对话按钮对话框
    async showAddCateDialog() {
      this.$refs.addCategoryRef.addDialogVisible = true
      // 这里只要前2级的列表
      const { data: res } = await getCateList({ type: 2 })
      if (res.meta.status !== 200) return this.$message.error('获取父级分类失败')

      // console.log(res.data)
      this.$refs.addCategoryRef.parentCateList = res.data
    },
    // // 监听到子组件 添加了新分类 事件，然后刷新到最后一页列表
    // refreshList1() {
    //   if (((this.total + 1) % this.queryInfo.pagesize !== 0)) {
    //     this.queryInfo.pagenum = parseInt((this.total + 1) / this.queryInfo.pagesize) + 1
    //     this._getCateList()
    //     console.log('+1')
    //   } else {
    //     this._getCateList()
    //     console.log('22')
    //   }
    // },
    // 监听到子组件 删除分类事件，如果是当页最后一个，刷新到上一页列表
    refreshList2() {
      if (((this.total - 1) % this.queryInfo.pagesize === 0) && (this.queryInfo.pagenum >= this.total / this.queryInfo.pagesize)) {
        this.queryInfo.pagenum -= 1
        this._getCateList()
      } else {
        this._getCateList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
