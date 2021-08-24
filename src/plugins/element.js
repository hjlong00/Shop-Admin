import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 页面布局组件
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// 侧边栏组件
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
// 面包屑组件
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
// 卡片
Vue.use(Card)
// 栅格
Vue.use(Row)
Vue.use(Col)
// 表格
Vue.use(Table)
Vue.use(TableColumn)
// 开关
Vue.use(Switch)
// 文字提示
Vue.use(Tooltip)
// 分页
Vue.use(Pagination)
// Dialog对话框
Vue.use(Dialog)

// 弹框提示组件
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
