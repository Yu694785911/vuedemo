import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")
const Jx = () => import("views/jx/Jx")
const All = () => import("views/All/all")
const Ranking = () => import("views/ranking/Ranking")
const Keyword = () => import("views/keyword/Keyword")
const Details = () => import("views/details/Details")
const Search = () => import("views/search/Search")
const Login = () => import("views/login/login")
const ConfirmOrder = () => import("views/order/ConfirmOrder")
const Order = () => import("views/order/Order")
const Payment = () => import("views/order/Payment")
const phoneRegister = () => import("views/register/phoneRegister");
const Address = () => import("views/address/Address");
const myOrder = () => import("views/order/myOrder");
const paySuccess = () => import("views/order/paySuccess");


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",//首页
    mata: {
      title: "首页"
    },
    component: Home
  },
  {
    path: "/category",//分类
    mata: {
      title: "分类"
    },
    component: Category
  },
  {
    path: "/cart",//购物车
    mata: {
      title: "购物车"
    },
    component: Cart
  },
  {
    path: '/profile',//我的
    mata: {
      title: "我的"
    },
    component: Profile
  },
  {
    path: '/jx',//我的
    mata: {
      title: "京喜"
    },
    component: Jx
  },
  {
    path: "/all",
    mata: {
      title: "全部"
    },
    component: All
  },
  {
    path: "/ranking",
    mata: {
      title: "排行榜"
    },
    component: Ranking
  },
  {
    path: "/keyword",
    mata: {
      title: "搜索"
    },
    component: Keyword
  },
  {
    path: "/details/:id",
    mata: {
      title: "详情"
    },
    component: Details
  },
  {
    path: "/search",
    mata: {
      title: "搜索"
    },
    component: Search
  },
  {
    path: "/login",
    mata: {
      title: "登录"
    },
    component: Login
  },
  {//确认支付
    path: '/confirm_order/:shop',
    mata: {
      title: "订单页"
    },
    component: ConfirmOrder
  },
  {//支付页面
    path: '/payment/:order_id',
    mata: {
      title: "支付页面"
    },
    component: Payment
  },
  {//订单
    path: '/Order',
    mata: {
      title: "订单页"
    },
    component: Order
  },
  {//订单
    path: '/phone_register',
    mata: {
      title: "手机号注册"
    },
    component: phoneRegister,
  },

  {
    path: '/registered/:user',
    name: "registered",
    meta: {
      title: "已注册"
    },
    component: () => import("views/register/child/Registered")
  },
  {
    path: '/shortMsg/:data',
    name: "shortMsg",
    meta: {
      title: "获取短信"
    },
    component: () => import("views/register/child/short_Message")
  },
  {
    path: '/setpwd/:data',
    name: "setpwd",
    meta: {
      title: "设置密码"
    },
    component: () => import("views/register/child/SetPwd")
  },
  {
    path: '/country',
    name: "country",
    meta: {
      title: "国际区号"
    },
    component: () => import("views/register/child/country")
  },
  {
    path: '/newaddress',
    name: "newaddress",
    meta: {
      title: "新增地址"
    },
    component: () => import("views/address/newAddress")
  },
  {//地址
    path: '/address/:id',
    mata: {
      title: "地址页"
    },
    component: Address
  }, {//我的订单
    path: '/myorder',
    mata: {
      title: "我的订单"
    },
    component: myOrder
  },
  {//支付成功  
    path: '/paySuccess',
    mata: {
      title: "支付成功"
    },
    component: paySuccess
  },
]

const routers = new Router({
  routes,
  mode: 'history',//可以修改模式
})

routers.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // console.log(to, from);

  for (let item in store.state.TabBar) {
    // item = false
    // console.log(item);
    store.state.TabBar[item] = false
  }
  if (to.path == '/home' || to.path == '/category' || to.path == '/cart' || to.path == '/profile') store.state.TabBar.isTabBar = true
  else if (to.path.lastIndexOf('/jx') != -1) store.state.TabBar.isjxTabBar = true
  else if (to.path == '/ranking') store.state.TabBar.isphbTabBar = true
  next();


})
export default routers