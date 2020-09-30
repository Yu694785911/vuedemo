<template>
  <div style="background:#f2f2f2">
    <scroll id="cartScroll" class="cartScroll" ref="cartScrollCom" @parentScroll="cartScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title" style="line-height:44px">购物车</div>
        </div>
        <div slot="right" class="right">
          <!-- el-icon-more -->
          <el-dropdown trigger="click" @command="pushRouter">
            <span class="el-dropdown-link">
              <i class="el-icon-more-outline el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/home">首页</el-dropdown-item>
              <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
              <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
              <el-dropdown-item command="/profile" disabled>浏览记录</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>我的关注</el-dropdown-item>
              <el-dropdown-item command="/profile" divided>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav-bar>

      <div>
        <!-- 正常判断购物车数据 ShopCart 为空。。 -->
        <div v-if="localShopCart.length==0">
          <div class="cart_empty" v-if="shopCart==null||shopCart.length==0">
            <img :src="$store.state.urlPath+'/routine/cart_empty.png'" alt />
            <p>您的购物车还没有任何数据，请添加商品</p>
          </div>
        </div>

        <div
          v-if="localShopCart.length>0||shopCart==null||shopCart.length==0"
          class="shop-cart-details"
        >
          <div class="ADD">
            <div class="ADD-bar">
              <div class="ADD-bar-first">
                <div class="ADD-bar-first-text">{{address}}</div>

                <!-- <div class="ADD-bar-first-text" v-if="$store.state.shoppingAddress.takeover_addr==null">河北河北河北</div> -->
              </div>
              <span class="ADD-btn">编辑商品</span>
            </div>
          </div>

          <cart-goods
            v-for="(item,key) in shopCart"
            :key="key"
            :goods="item"
            :shopName="key"
            ref="cart_goods"
            @checknorm="selectNorm"
            @ischeckshopall="is_check_shop_all"
          >{{item}}</cart-goods>

          <div v-if="!$store.state.userInfo" class="shopcart_login_bar">
            登录可以同步账号下的购物车信息
            <router-link tag="a" to="/login" class="loginBtn">登录</router-link>
          </div>
        </div>
      </div>

      <div v-if="!$store.state.userInfo && localShopCart.length>0" style="margin-top:10px;">
        <div v-for="(item,i) in unloginData" :key="i">
          <div class="unloginLocal">
            <input type="radio" class="radio" />
            <img :src="path+'/goods/'+item.img_cover" alt />
            <div>
              <p>{{item.name}}</p>
              <p>
                <span
                  style="padding: 2px 5px;background: #f2f2f2;border-radius: 10px;"
                >{{item.relation_keyword}}</span>
              </p>
              <strong style="font-size: 18px;color: red;">{{item.money_now}}</strong>
              <p class="numberInput">
                <span class="min" @click.stop="min($event,index)">-</span>
                <input class="num" type="text" @click.stop value="1" disabled />
                <span class="add" @click.stop="add($event,index)">+</span>
                <br />
              </p>
              <p class="delegg">
                <span @click.stop="cartDel($event)">删除</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>

    <cart-tab-bar ref="tabBar" @checkall="check_shop_all" @confirm="toConfirmOrder"></cart-tab-bar>
  </div>
</template>

<script>
//公共组件
// import $ from "jquery";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
//内部子组件
import CartTabBar from "./childComp/CartTabBar";
import CartGoods from "./childComp/CartGoods";

import { UpdataShopCart } from "network/shopCart";
import { SET_USERINFO } from "store/mutation-types";
import { getGoodsId } from "network/goods";

export default {
  name: "Cart",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      num: 1,
      payMentData: [],
      fullscreenLoading: false,
      localShopCart: [], //本地存储的购物车,
      // UnLoginProduct: [], //没有登录时根据goods_id货到商品储存
      unloginData: [],
      isShowBackTop: false
    };
  },
  created() {
    console.log(this.$store.state.userInfo);

    //如果用户存在。则网络请求shopCart数据
    if (this.$store.state.userInfo) {
      this.getShopCart();
    }
    if (!this.$store.state.userInfo) {
      this.$store.dispatch("autocode", {
        resolve: res => {
          if (res.code != 200) return;
          this.$store.commit(SET_USERINFO, res);
          this.$store.dispatch("getShopCart", res.data.user.id);
        }
      });
    }
    // 获取本地存储中购物车的数据
    this.getLocalShopCart();
    // 如果用户存在，请求shopCart数据
    if (this.$store.state.userInfo && this.shopCartLength == 0) {
      this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);
    }

    this.getUnlogingoods();
  },
  components: {
    NavBar,
    Scroll,
    CartTabBar,
    CartGoods
  },
  beforeRouteLeave(to, from, next) {
    // 如果取得页面时login页面，则记录页面
    if (to.path == "/login") {
      this.$store.state.loginHistory = from.path;
    }

    // if(this.$store.state.userInfo) this.upDateShopCart();
    next();
  },
  methods: {
    cartScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    toDetails(path) {
      this.$router.push(path);
    },
    pushRouter(path) {
      // console.log(path);
      this.$router.push(path);
      // this.$store.commit('ROUTERTO',path);
    },
    //获取购物车数据，调用vuex中actions的数据
    getShopCart() {
      this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);
    },
    handleChange(value) {
      console.log(value);
    },
    checkNorm(data) {
      this.$emit("checkNorm", data);
    },

    selectNorm(obj) {
      console.log(obj);
    },
    // 去结算的方法，被cartTabbar组件调用
    toConfirmOrder() {
      // 获取cart页面中被选择的订单商品
      let cart_goods = this.$refs.cart_goods;
      this.$store.state.cartData = [];
      cart_goods.forEach(item => {
        let inputAll = item.$el.querySelectorAll(".check");
        for (let i = 0; i < inputAll.length; i++) {
          if (inputAll[i].checked) {
            // this.paymentData.push(item.goods[i]);
            this.$store.state.cartData.push(item.goods[i]);
          }
        }
      });

      let data = window.localStorage.getItem(window.location.origin + "/jd");
      data =
        data != undefined && data != null && data != "" ? JSON.parse(data) : {};

      data.cartData = this.$store.state.cartData;
      window.localStorage.setItem(
        window.location.origin + "/jd",
        JSON.stringify(data)
      );

      this.$router.push("/confirm_order/aaa");
    },
    upDateShopCart() {
      let shopCart = { ...this.$store.state.shopCart };
      let shopCartHistory = { ...this.$store.state.shopCartHistory };

      for (let i in shopCart) {
        for (let j = 0; j < shopCart[i]; j++) {
          if (
            shopCart[i][j].ischeck != shopCartHistory[i][j].ischeck ||
            shopCart[i][j].num != shopCartHistory[i][j].num ||
            shopCart[i][j].norm != shopCartHistory[i][j].norm
          ) {
            // 请求修改购物车接口，把数据传递上去，修改购物车数据
            console.log(shopCart[i][j]);
            let data = {};
            data.id = shopCart[i][j].id;
            data.num = shopCart[i][j].num;
            data.ischeck = shopCart[i][j].ischeck;
            data.norm = shopCart[i][j].norm;
            data.takeover_addr = shopCart[i][j].takeover_addr;

            UpdataShopCart(data).then(res => {
              console.log(res);
            });
          }
        }
      }
    },
    is_check_shop_all() {
      let cart_goods = this.$refs.cart_goods;
      let temp = 0;
      let tabbar = this.$refs.tabBar;
      let allCheck = tabbar.$el.querySelector("#allCheck");
      cart_goods.forEach(item => {
        let shopNameCheck = item.$el.querySelector(
          ".shop_name input[type=checkbox]"
        );
        if (shopNameCheck.checked) {
          temp++;
        }
      });
      if (temp == cart_goods.length) {
        allCheck.checked = true;
      } else {
        allCheck.checked = false;
      }

      this.upDateShopCart();
    },
    check_shop_all() {
      let e = e || event;
      let btnAll = document.querySelectorAll(".cartgoods input[type=checkbox]");

      if (e.target.checked) {
        btnAll.forEach(obj => {
          obj.checked = true;
        });

        this.$store.state.totalNum = this.$store.state.ShopCarMoneyGoodsNum;
        this.$store.state.totalPayment += this.$store.state.ShopCarMoneyAll;
      } else {
        btnAll.forEach(obj => {
          obj.checked = false;
        });
        this.$store.state.totalNum = 0;
        this.$store.state.totalPayment = 0.0;
      }

      //  let box = this.$refs.shop_cart_details;
      // let shopBtn=box.querySelector(".shop_name input[type=checkbox]");
    },
    confirm_goods() {
      // 找到购物车内找到选中的商品
      // 直接查找 shopCart 的 ischeck=1的值，添加到data里面，传递到confirm_order
      // this.$store.state.shopCart
      let data = {};
      for (let i in this.$store.state.shopCart) {
        this.$store.state.shopCart[i].forEach(item => {
          if (item.ischeck == 1) {
            console.log(i);
            if (data[i]) {
              data[i].push(item);
            } else {
              data[i] = [item];
            }
          }
        });
      }
      console.log(data);
      // this.$router.push("/comfirm-order/"+data)
    },
    getLocalShopCart() {
      let data = window.localStorage.getItem(this.localPath);
      data = data != null ? JSON.parse(data) : [];
      this.localShopCart = data.shopCart ? data.shopCart : [];
      var ggid = this.localShopCart[this.localShopCart.length - 1].goods_id;
      getGoodsId(ggid).then(res => {
        console.log(res.data);
      });
    },
    getUnlogingoods() {
      let localStorageunlogin = JSON.parse(
        window.localStorage.getItem(window.location.origin + "/jd")
      ).shopCart;

      if (localStorageunlogin) {
        localStorageunlogin.forEach(item => {
          getGoodsId(item.goods_id).then(res => {
            this.unloginData.push(res.data.goodsData);
          });
        });
      }
    }
  },
  computed: {
    shopCartLength() {
      return this.$store.state.shopCartLength;
    },
    urlPath() {
      return this.$store.state.urlPath;
    },
    address() {
      // 取出地址中的指定默认配送地址

      let addr = "";
      if (this.$store.state.userInfo) {
        addr = this.$store.state.shoppingAddress.takeover_addr;
      } else {
        let path = window.location.origin + "/jd";
        let data = window.localStorage.getItem(path);
        if (data != null) {
          addr = data.orderAddr ? data.orderAddr : "河北省,邢台市";
        } else {
          addr = "河北省,邢台市";
        }
      }
      return addr.split(",").join(" ");
    },
    shopCart() {
      return this.$store.state.shopCart;
    },
    cart_goods() {
      return this.$refs.cart_goods;
    }
  },
  activated() {
    this.$refs.cartScrollCom.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.cartScrollCom.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.cartScrollCom.scroll.y;
  }
};
</script>
<style lang='less' scoped>
#cartScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  // background-color: mediumaquamarine;
  .cartNavBar {
    background-color: #fff;
    .title {
      font-size: 16px;
      line-height: 24px;
    }
    .address {
      font-size: 10px;
      line-height: 20px;
      margin: 0 auto;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .shop-cart-details {
    border-radius: 10px;
    div.ADD {
      position: sticky;
      z-index: 100;
      height: 2.45rem;
      .ADD-bar {
        position: relative;
        padding: 0 0.9rem;
        height: 2.45rem;
        border-radius: 0 0 15px 15px;
        line-height: 2.45rem;
        background: #fff;
        display: flex;
        font-size: 0.65rem;
        color: #262626;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 15px;
          margin-top: -6px;
          background-image: url("../../images/address.png");
          background-position: 0 -93px;
          background-size: 130px 105px;
          width: 12px;
          height: 12px;
        }
        &::after {
          content: "";
          position: absolute;
          width: 1px;
          height: 0.5rem;
          background: #bfbfbf;
          top: 50%;
          right: 25%;
          margin-top: -0.25rem;
        }
        .ADD-bar-first {
          position: relative;
          padding: 0 16px;
          white-space: nowrap;
          overflow: hidden;
        }
        .ADD-btn {
          display: block;
          margin-left: 80px;
        }
      }
    }

    dl {
      border-bottom: 1px solid #d5d5d5;
      margin-bottom: 5px;
      background-color: #fff;
      border-radius: 10px;
    }
    dt {
      text-align: left;
      line-height: 30px;
      margin-left: 15px;
      input.check {
        margin-right: 20px;
      }
    }
    dd {
      z-index: 1;
      position: relative;
      min-height: 5rem;
      padding: 0 9px 0 8px;
      background: #fff;
      margin-bottom: 20px;
      margin-left: 25px;
      input {
        position: absolute;
        left: 0;
        top: 30%;
      }
      img {
        width: 90px;
        height: 90px;
        position: absolute;
        left: 20px;
        top: 0;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
      }
      p.title {
        font-size: 12px;
        margin-bottom: 0.3rem;
        position: relative;
        margin-left: 35%;
        line-height: 16px;

        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 5px;
      }
      p.norm {
        position: relative;
        background: #f2f2f2;
        // padding: 0 7px 0 3px;
        height: 15px;
        line-height: 15px;
        font-size: 10px;
        color: #262626;
        display: flex;
        max-width: 60px;
        border-radius: 5px;
        margin-left: 40%;
        margin-bottom: 5px;
        text-align: center;
      }
      p.money_now {
        line-height: 0.8rem;
        color: #f2270c;
        font-size: 0.6rem;
        // em {
        //   font-style: normal;
        //   font-size: 18px;
        //   font-weight: bold;
        // }
      }
      p.numberInput {
        display: block;
        width: 60px;
        border-radius: 2px;
        background-color: #fff;
        font-weight: 400;
        float: right;
        margin-top: -30px;
        span.min {
          left: 0;
          // display: none;
        }

        input.num {
          border: none;
          width: 30px;
          text-align: center;
          color: #262626;
          background-color: #f2f2f2;
          font-size: 0.55rem;
          position: relative;
        }
        span.add {
          right: 0;
        }
      }
      p.price {
        color: red;
      }
      p.delegg {
        width: 120px;
        display: block;
        padding-left: 200px;
        span {
          position: relative;
          padding: 0 10px;
          line-height: 15px;
          font-size: 10px;
        }
      }
    }
  }
  .unloginLocal {
    // height: 200px;
    width: 90%;
    padding: 5% 5%;
    float: left;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 10px;
    input.radio {
      float: left;
      width: 20px;
      height: 20px;
      margin-top: 50px;
    }
    img {
      width: 30%;
      float: left;
      padding: 20px 30px;
    }
    div {
      // flex: 1;
      font-size: 14px;
      p.numberInput {
        display: block;
        width: 60px;
        border-radius: 2px;
        background-color: #fff;
        font-weight: 400;
        float: right;
        span.min {
          left: 0;
        }

        input.num {
          border: none;
          width: 30px;
          text-align: center;
          color: #262626;
          background-color: #f2f2f2;
          font-size: 0.55rem;
          position: relative;
        }
        span.add {
          right: 0;
        }
      }
      p.delegg {
        display: block;
        text-align: right;
        span {
          position: relative;
          padding: 0 10px;
          line-height: 15px;
          font-size: 10px;
        }
      }
    }
  }
  .el-input-number {
    padding: 0;
  }
  .el-input__inner {
    height: 30px;
    width: 20%;
  }
  .shopBox {
    margin-top: 15px;
    border-radius: 10px;
    background-color: #fff;
    height: 5000px;
  }
  .shopcart_login_bar {
    line-height: 40px;
    margin-top: 20px;
    .loginBtn {
      background: red;
      padding: 10px 20px;
      border-radius: 20px;
      color: #fff;
    }
  }
}
body {
  margin: 0;
}
</style>
