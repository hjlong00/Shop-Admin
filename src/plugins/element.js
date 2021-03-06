import Vue from 'vue'

import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Cascader, Alert, Tabs, TabPane, Steps, Step, Checkbox, CheckboxGroup, Upload, Timeline, TimelineItem
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
// Tag标签
Vue.use(Tag)
// Tree 树形控件
Vue.use(Tree)
// Select 选择器
Vue.use(Select)
Vue.use(Option)
// Cascader 级联选择器
Vue.use(Cascader)
// Alert 警告
Vue.use(Alert)
// Tabs标签页
Vue.use(Tabs)
Vue.use(TabPane)
// 步骤进度条
Vue.use(Steps)
Vue.use(Step)
// 复选框
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
// 图片上传
Vue.use(Upload)
// timeline 时间线
Vue.use(Timeline)
Vue.use(TimelineItem)

// 弹框消息提示组件
Vue.prototype.$message = Message
//  MessageBox 弹框
Vue.prototype.$confirm = MessageBox.confirm
