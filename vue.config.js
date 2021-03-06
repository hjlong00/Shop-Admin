module.exports = {
  chainWebpack: config => {
    // 发布模式入口
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      // 使用externals设置排除项,里面的项不会被打包
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })

      config.plugin('html').tap(args => {
        // args[0].title = "超级商城后台管理"
        args[0].isProd = true
        return args
      })
    })
    // 开发模式入口
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        // args[0].title = "dev模式 - 超级商城后台管理"
        args[0].isProd = false
        return args
      })
    })
  },
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
