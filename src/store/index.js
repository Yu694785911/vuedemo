import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"

Vue.use(Vuex)

const state = {
  urlPath: 'http://106.12.85.17:8090/public/image',
  localData:'JD',
  TabBar: {
    isjdTabBar: true,
    isjxTabBar: false,
    isphbTabBar: false,
    isxqTabBar: false,
  },
  //用户名数据
  userInfo: null,
  // userInfo: {
  //   defaddr: { id: 1, user_id: '3', tel: '', addr: '', name: '', default: 1 },
  //   autocode: "",
  //   cardId: '',
  //   email: '',
  //   fullName: null,
  //   id: null,
  //   img: null,
  //   name: '',
  //   pwd: '',
  //   qq: '',
  //   weixin: '',
  //   tel: '',
  //   Addressname: '',
  //   Addressphone: '',
  //   Addressxx: "",


  //   //autocode:''//这个值后期用户登录后，服务器会给你返回一个数值，这个数据用于用户自动登录的，当本地存储找那个存在这个值的时候，需要那这个值访问自动登录接口，请求用户数据
  // },
  //keep-leave
  keepExclude: 'Details,Cart,Payment,ConfirmOrder,Order',
  keepInclude: '',
  shopCartHistory: null,//在页面渲染的时候，购物车加载的时候取一下默认值，在离开购物车页面的时候，用购物车页面的值和当前的值做对比。存在的值，对比后提交数据
  shopCart: null,
  shopCartLength: 0,//购物车的数据数量
  loginRecords: '',//进入login的记录
  temp: null,
  totalNum: 0,
  totalPayment: 0,
  ShippingAddress: null,   //配送地址
  city: null,
  ShopCarMoneyAll: 0,
  ShopCarMoneyGoodsNum: 0,
  paymentGoods: {},
  registeDialogShow: true,
  area_code: "86",
  areacodeHistory:'/home',//记录一下离开页面时的路由地址，默认地址为/home
  loginHistory:'/home',
  shoppingAddress:null,
  configOrderHistory:null,//记录离开页面的时候的路由地址
  addid:null,
  searchData:null,
  allAddress:null,
 
}
const x = new Vuex.Store({
  state,      //状态管理数据
  mutations,  //定义事件
  getters,    //计算
  actions,    //异步请求
  modules: {} //模块
})
export default x