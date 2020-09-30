// import Vue from "vue"
import router from '../router'
// 解构赋值一个常量
import {POST_SHOPCART} from "./mutation-types"
// 获取shopcart网络请求
import {postShopCart,addShopCart} from 'network/shopCart'
import {autoLand} from 'network/login'
//取所有的常量
import * as types from "./mutation-types"
// import { stat } from 'fs'
// import { push_uniq } from 'terser'
export default {
  [types.BACK]() {
    router.go(-1)
  },
  //要做的是网络请求---->需要在actions中做分发监控,不然同步数据不会被改变
  //所以要把当前的事件，在actions中进行执行
  [POST_SHOPCART](state,payload){
    state.totalPayment=0;
    state.totalNum=0;
    postShopCart(payload).then(res=>{
      console.log(res);
      state.shopCart={};
      state.shopCartHistory={};
      if(res.code != 200) return console.log('请求数据失败');
      state.shopCartLength = res.data.length;


      //循环，把同一个店铺的东西分组取出来。
      res.data.forEach(item=>{
        // if (state.shopCart[item.shop_name]) {
        //   state.shopCart[item.shop_name].push(item);
        //   // state.shopCartHistory[item.shop_name].push(item)    
        // }else{
        //   state.shopCart[item.shop_name] = [item];
        //   state.shopCartHistory[item.shop_name]=[item]
        // }

        if(!state.shopCart[item.shop_name]){
          state.shopCart[item.shop_name]=[]
          state.shopCartHistory[item.shop_name]=[]
        }
        // state.shopCart(item.shop_name).push(item)

        let a={},b={};
        for(let i in item){
          a[i]=item[i];
          b[i]=item[i];
        }

        state.shopCart[item.shop_name].push(a);
        state.shopCartHistory[item.shop_name].push(b)   

        // 得到选中的商品的总价
        if(item.ischeck=='1'){
          state.totalPayment+=item.money_now*item.num;
          state.totalNum+=item.num;
          // if(state.paymentGoods[item.shop_name]){
          //     state.paymentGoods[item.shop_name].push(item);
          // }else{
          //   state.paymentGoods[item.shop_name]=[item];
          // }
        }

        // 获取所有商品的总价
        state.ShopCarMoneyAll+=item.money_now*item.num
        state.ShopCarMoneyGoodsNum+=item.num*1
      })
      state.loading=false;
      // state.shopCartHistory={...state.shopCart};
      // console.log(state.shopCartHistory,'shopCartHistory')
    })
  },

  // 用于国际区号页面  回退页面事件
  [types.AREA_CODE_BACK](state,payload){
    if(payload=='0'){//用于国际区号页面  返回到注册页面
      // 参数==0的时候 国际编号 回到初始值
      state.area_code='86'
    }
    if(payload>0){//用于国际区号页面  选择地区后 返回到注册页面
      state.area_code=payload;
      state.registeDialogShow=false
    }

    router.go(-1);
  },

  //用于路由跳转
  [types.ROUTERTO](state,payload){
    state;
    router.push(payload)
  },

  // [types.AUTO_CODE](){
  //   let path=window.location.origin+'/jd';
  //   let autocode=window.localStorage.getItem(path);
  //   console.log(autocode);
  //   return autoLand({autocode})
  // },

  [types.AUTO_CODE](payload){
    let path=window.location.origin+'/jd';
    let data=window.localStorage.getItem(path);
    console.log(data);
    if(data!=undefined&&data!=null&&data!=""){
      let autocode=JSON.parse(data).autoCode
      if(autocode){
        autoLand({autocode}).then(res=>{
          console.log(res);
          payload.resolve(res);
        })
      }
    }
  },




  [types.SET_USERINFO](state,payload){
    state.userInfo={}

    // 把返回的用户信息中的收藏店铺做处理
    if(payload.data.user.collectShop && payload.data.user.collectShop !=''){//存储有值
      // 有值，做分割----变成数组
      payload.data.user.collectShop=payload.data.user.collectShop.split(",");
    }else{
      payload.data.user.collectShop=[];
    }
    for(let i in payload.data.user){
      state.userInfo[i]=payload.data.user[i];
    }
    
    state.userInfo.defaddr=payload.data.defaddr;
    state.shoppingAddress=payload.data.defaddr;
    let data = window.localStorage.getItem(window.location.origin+'/jd');
    data = (data != null && data != "") ? JSON.parse(data) : {}
    data.autoCode = payload.data.user.autocode;
    window.localStorage.setItem(window.location.origin+'/jd', JSON.stringify(data))
    //如果本地存储购物车有数据，则把购物车的数据和当前用户购物车合并，并删除本地存储的购物车

    if (data.shopCart != undefined && data.shopCart.length > 0) {
      Promise.all([...data.shopCart.map(item => {
        item.user_id = state.userInfo.id
        return new Promise((resolve, reject) => {
          addShopCart(item).then(res => {
            if(res.code != 200) reject("添加异常")
            resolve(res)
          })
        })
      })]).then(success => {
        console.log(success);
        delete data['shopCart']
        window.localStorage.setItem(window.location.origin+'/jd', JSON.stringify(data))
      },err=>{
        console.log(err);
      })
    }
  }
}
