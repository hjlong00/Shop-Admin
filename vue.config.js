module.exports = {
  configureWebpack: {
    resolve: {
      // 配置路径别名
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        service: '@/service',
        views: '@/views'
      }
    }
  }
}
