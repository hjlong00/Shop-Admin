<template>
  <!-- 侧边栏菜单 -->
  <div id="aside-menu">
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <!--
    // |  el-menu 属性介绍：
    // |  unique-opened ： 是否只保持一个子菜单的展开 默认false
    // |    - 这里只写上属性名就表示了true , 因为默认是false ，等效写法=> [ :unique-opened='true' ]
    // |  collapse:是否水平折叠收起菜单，默认false
    // |  collapse-transition:是否开启折叠动画，默认true
    // |  router: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
     -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <!--
        //| 知识点：这里的index只接收字符串，但是tiem.id是数字类型，只要在后面加上 + '' 拼接，就转换成字符串了
      -->
      <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconsObj[item.id]"></i>
          <!-- 文本 -->
          <span>{{ item.authName }}</span>
        </template>

        <!-- 二级菜单模板区 -->
        <el-menu-item
          :index="'/' + subItem.path"
          v-for="subItem in item.children"
          :key="subItem.id"
          @click="saveNavState('/' + subItem.path)"
        >
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{ subItem.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HomeAsideMenu',
  props: {
    menuList: {
      type: [],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接
      activePath: ''
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 点击按钮，切换菜单的折叠和展开  【 英汉 toggle：n.开关 v.切换】
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('isCollapse', this.isCollapse)
    },
    // 点击二级菜单的时候赋值新的路径给 activePath ，同时保存到 window.sessionStorage
    saveNavState(activePath) {
      this.activePath = activePath
      window.sessionStorage.setItem('activePath', activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
}
.el-menu {
  border-right: none;
  .iconfont {
    margin-right: 10px;
  }
}
</style>
