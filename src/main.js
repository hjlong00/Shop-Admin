import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
import './common/util.js'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 注册为全局可用组件
Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
