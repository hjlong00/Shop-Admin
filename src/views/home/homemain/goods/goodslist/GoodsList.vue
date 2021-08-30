<template>
  <div id=''>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索&添加区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="_getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="_getGoodsList" />
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 主展示区 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#" />
        <el-table-column label="商品名称" prop="goods_name" />
        <el-table-column width="95px" label="商品价格(元)" prop="goods_price" />
        <el-table-column width="70px" label="商品重量" prop="goods_weight" />
        <el-table-column width="140px" label="创建时间" prop="add_time">
          <template slot-scope="scope"> {{scope.row.add_time | dateFormat}}</template>
        </el-table-column>
        <el-table-column width="130px" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              @click="goEditGoods(scope.row.goods_id)" />
            <el-button type="danger" size="mini" icon="el-icon-delete"
              @click="removeById(scope.row.goods_id)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" background>
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { getGoodsList, removeById } from 'service/goods.js'

export default {
  name: 'GoodsList',
  data() {
    return {
      // 请求参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodsList: [],
      total: null
    }
  },
  created() {
    this._getGoodsList()
  },
  methods: {
    async _getGoodsList() {
      const { data: res } = await getGoodsList(this.queryInfo)
      if (res.meta.status !== 200) return this.$message.error('获取商品列表失败')
      console.log(res.data)
      this.goodsList = res.data.goods
      this.total = res.data.total
      // this.$message.success('获取商品列表成功')
    },
    // 前往修改商品页面
    goEditGoods(id) {
      this.$router.push('/goods/' + id)
      console.log(id)
    },
    // 前往添加商品页面
    goAddGoods() {
      this.$router.push('/goods/add')
    },
    // 主展示区 删除商品 事件
    async removeById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') return this.$message.info('已经取消删除')
      const { data: res } = await removeById(id)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除商品失败')
      this.$message.success('删除商品成功')
      this._getGoodsList()
    },
    // 分页区触发事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this._getGoodsList()
    },
    // 分页区触发事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this._getGoodsList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
