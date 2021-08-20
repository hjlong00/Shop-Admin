import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from 'views/login/Login'

Vue.use(VueRouter)

const routes = [
  // 默认登录
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
