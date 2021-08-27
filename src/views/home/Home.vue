<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <home-header-info />
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <home-aside-menu :menu-list="menuList" @isCollapse="_isCollapse" />
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeaderInfo from 'components/home/HomeHeaderInfo.vue'
import HomeAsideMenu from 'components/home/HomeAsideMenu.vue'

import { getMenuList } from 'service/menus.js'

export default {
  components: {
    HomeHeaderInfo,
    HomeAsideMenu
  },
  name: 'Home',
  data() {
    return {
      menuList: [],
      isCollapse: false
    }
  },
  created() {
    // 获取左侧菜单栏数据
    this._getMenuList()
  },
  methods: {
    // | 请求左侧菜单数据的方法
    async _getMenuList() {
      // 解构赋值，并重命名为 res
      const { data: res } = await getMenuList()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList.push(...res.data)
      // console.log(this.menuList)
    },
    // | 监听左侧菜单栏是否折叠，同步改变侧边栏宽度
    _isCollapse(val) {
      this.isCollapse = val
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  padding-left: 0;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
