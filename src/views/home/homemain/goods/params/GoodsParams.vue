<template>
  <div id=''>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false" />
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 级联选择器 -->
          <el-cascader v-model="selectedKeys" :options="cateList" :props="cascaderProps" clearable
            @change="handleChange" />
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handTableClick">
        <!-- 动态参数部分 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮  -->
          <el-button type="primary" size="mini" :disabled="isBtdDisabled" @click="showAddDialoge">
            添加动态参数</el-button>
          <!-- 动态参数的面板,抽离成单独文件 -->
          <many-params ref="manyParamsRef" :titleText="titleText" :cateId="cateId"
            :activeName="activeName" @editParams="_getParamsData" @delParams="_getParamsData" />
        </el-tab-pane>

        <!-- 静态属性部分 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮  -->
          <el-button type="primary" size="mini" :disabled="isBtdDisabled" @click="showAddDialoge">
            添加静态属性</el-button>
          <!-- 静态属性的面板,抽离成单独文件 -->
          <only-params ref="onlyParamsRef" :titleText="titleText" :cateId="cateId"
            :activeName="activeName" @editParams="_getParamsData" @delParams="_getParamsData" />
        </el-tab-pane>
      </el-tabs>

    </el-card>

    <!-- 添加属性与参数,抽离成单独文件 -->
    <add-params :titleText="titleText" ref="addParamsRef" :cateId="cateId" :activeName="activeName"
      @addParams="_getParamsData" />
  </div>
</template>

<script>
import ManyParams from './childComps/ManyParams'
import OnlyParams from './childComps/OnlyParams'
import AddParams from './childComps/AddParams'

import { getCateList, getParamsData } from 'service/goods.js'

export default {
  name: 'GoodsParams',
  components: { ManyParams, OnlyParams, AddParams },
  data() {
    return {
      // 父级分类数据列表
      cateList: [],
      // 级联选择器里的props配置
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 当选择器做出选择时，将选择结果绑定到这里
      selectedKeys: [],
      // el-tabs 做出选择时，将选择结果绑定到这里，默认选第一个
      activeName: 'many'
    }
  },
  created() {
    this._getCateList()
  },
  computed: {
    // 添加按钮是否禁用
    isBtdDisabled() {
      if (this.selectedKeys.length !== 3) return true
      return false
    },
    // 商品ID
    cateId() {
      if (this.selectedKeys.length === 3) return this.selectedKeys[2]
      return null
    },
    // 标题属性
    titleText() {
      if (this.activeName === 'many') return '动态参数'
      return '静态属性'
    }
  },
  methods: {
    // 获取产品分类清单请求
    async _getCateList() {
      const { data: res } = await getCateList()
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      this.cateList = res.data
    },
    //  获取产品参数请求,以级联选择框是否满足条件为前提的请求
    async _getParamsData() {
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
        // 当级联选择不满足条件，还需要把下面两项清空，不然会显示出之前留下的数据
        this.$refs.manyParamsRef.manyParamsData = []
        this.$refs.onlyParamsRef.onlyParamsData = []
        return
      }
      const { data: res } = await getParamsData(this.cateId, this.activeName)
      if (res.meta.status !== 200) return this.$message.error('获取产品参数失败')
      // 这里的转换用于展开页
      // data中的attr_vals原始数据是一条字符串，现在以内容里的 逗号，来分割，转换为一个数组
      // 用3元运算符先判断字符串是否为空，空字符串的布尔值是false
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        // 为了让new-tag每行独立，在这里设置好相关属性
        item.inputVisible = false
        item.inputValue = ''
      })
      // console.log(res.data)
      if (this.activeName === 'many') {
        this.$refs.manyParamsRef.manyParamsData = res.data
      } else {
        this.$refs.onlyParamsRef.onlyParamsData = res.data
      }
    },
    // 级联选择框选中项发生变化时，会触发这个函数
    handleChange() {
      this._getParamsData()
    },
    // el-tabs选择发生变化时，会触发这个函数
    handTableClick() {
      this._getParamsData()
    },
    //
    showAddDialoge() {
      this.$refs.addParamsRef.addDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
