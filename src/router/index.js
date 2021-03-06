import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/homemain/Welcome')
const MainUsers = () => import('views/home/homemain/user/MainUsers')
const RightsList = () => import('views/home/homemain/power/rights/RightsList')
const RolesList = () => import('views/home/homemain/power/roles/RolesList')
const GoodsCategory = () => import('views/home/homemain/goods/category/GoodsCategory')
const GoodsParams = () => import('views/home/homemain/goods/params/GoodsParams')
const GoodsList = () => import('views/home/homemain/goods/goodslist/GoodsList')
const AddGoods = () => import('views/home/homemain/goods/goodslist/AddGoods')
const EditGoods = () => import('views/home/homemain/goods/goodslist/EditGoods')
const OrderList = () => import('views/home/homemain/order/OrderList')
const DataReport = () => import('views/home/homemain/report/DataReport')

Vue.use(VueRouter)

const routes = [
  // 默认登录
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: MainUsers },
      { path: '/rights', component: RightsList },
      { path: '/roles', component: RolesList },
      { path: '/categories', component: GoodsCategory },
      { path: '/params', component: GoodsParams },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: AddGoods },
      { path: '/goods/:id', component: EditGoods },
      { path: '/orders', component: OrderList },
      { path: '/reports', component: DataReport }
    ]
  }
]

const router = new VueRouter({
  routes
})

/** ------------------------------------------------
 *  | 挂载路由守卫
 *  | to   将要访问的路径
 *  | from 代表从哪个路径跳转而来
 *  | next 是一个函数，表示放行
 *  |   - next() 放行
 *  |   - next('/login') 强制跳转到指定路径
 */

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  //  获取token 判断是否已是登录状态
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
