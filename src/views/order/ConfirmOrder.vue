<template>
  <div class="confirmorder" style="background:#f2f2f2">
    <scroll id="OrderScroll">
      <nav-bar class="OrderNavBar" ref="OrderNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">确认订单</div>
        </div>
        <div slot="right">
          <span @click="toLogin" v-if="!isShow">登录</span>
        </div>
      </nav-bar>

      <div v-if="isShow">
        <!-- 地址页 -->
        <div class="Order-address">
          <div v-if="$store.state.shoppingAddress==null">
            <button class="addAddress" @click="toAddress">请添加地址</button>
          </div>

          <ul v-else @click="toAddress">
            <li
              class="co_name"
            >{{shoppingAddress.takeover_name}}{{shoppingAddress.takeover_tel|changeTel(shoppingAddress.takeover_tel)}}</li>
            <li>{{shoppingAddress.takeover_addr}}</li>
          </ul>
        </div>

        <div class="order-con">
          <div class="order-list" v-for="(item,index) in shop" :key="index">
            <dt>
              <i></i>
              <span>{{item.shop_name}}</span>
            </dt>
            <dd class="order-shopm">
              <img :src="path+'/goods/'+item.img_cover" alt />
              <div class="order-sm-r">
                <strong>{{item.goods_name}}</strong>
                <p>
                  {{item.money_now | changePrice("￥")}}
                  <span style="float:right">x{{item.num}}</span>
                </p>
              </div>
              <div class="zhuyi">
                <ul>
                  <li>
                    <img src="../../images/qi.png" alt />
                    支持7天无理由退货
                  </li>
                  <li>
                    <img src="../../images/gg.png" alt class="jiage" />
                    价格说明
                  </li>
                </ul>
              </div>
            </dd>

            <dd class="peisong">
              <strong>配送</strong>
              <p>快递运输</p>
              <div class="pei-justify">
                <div class="left">中小件送货时间</div>工作日、双休日与节假日均可送货
              </div>
            </dd>

            <dd class="peisong">
              <strong>退换无忧</strong>
              <div style=" 
          font-size: 12px;color:#666;line-height:24px;">退换货可获运费赔付或免费取件</div>
              <p style="color:red;float: right;
    margin-top: -20px;">商家赠送</p>
            </dd>

            <dd class="peisong">
              <strong>店铺备注</strong>
              <p>选填,给商家留言</p>
            </dd>
          </div>
          <div class="detailed">
            <dd class="detail">
              <strong>发票信息</strong>
              <p>个人商品明细</p>
            </dd>
            <dd class="detail">
              <strong>礼品卡</strong>
              <p>无可用</p>
            </dd>
            <dd class="detail">
              <strong>红包</strong>
              <p>不可用</p>
            </dd>
            <dd class="detail">
              <strong>京豆</strong>
              <p>共12个,未满1000个,暂不可使用</p>
            </dd>
          </div>

          <div class="shopMoney" v-for="i in shop" :key="i.id">
            <dd class="detail">
              <strong>商品金额</strong>
              <p>{{i.money_now*i.num | changePrice("￥")}}</p>
            </dd>
            <dd class="detail">
              <strong>运费</strong>
              <p>+￥0.00</p>
            </dd>
            <h5
              style="margin-right:18px;text-align:right"
            >实际金额:{{i.money_now*i.num | changePrice("￥")}}</h5>
          </div>

          <el-button
            type="default"
            round
            style="width:90%;background:#bbebe9;margin-bottom:10px;color:#0f8783;font-size:16px"
            @click="open"
          >货到付款</el-button>

          <el-button type="primary" round style="width:90%;font-size:16px" @click="payment">在线支付</el-button>
          <!-- <p style="color:grey;font-size:12px;">此订单不支持以下支付方式</p> -->

          <a href class="hdfk">
            <i></i>
            <h3>货到付款</h3>
            <p class>部分商品不支持货到付款，立即查看</p>
          </a>

          <div class="jd_footer">
            <div></div>
          </div>
        </div>
      </div>

      <!-- 快捷下单 -->
      <div v-if="!isShow" class="quickOrder">
        <div style="margin-bottom:20px;background:#fff;padding-bottom:20px">
          <div
            style="line-height:50px;font-size:16px;color:#333;margin:0 10px;height:50px;text-align:left"
          >
            <p>快捷下单验证</p>
          </div>

          <div class="qo_phone">
            <label class="area_box">
              <span>+86</span>
            </label>
            <input type="text" />
          </div>

          <div class="qo_phone">
            <label class="area_box">
              <span style="font-size:12px;color:red">发送验证码</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <div class="qo_detailsBox">
          <div class="qo_detailsBox_item">
            <label for>收货人</label>
            <input type="text" placeholder="姓名" />
          </div>
          <div class="qo_detailsBox_item">
            <label for>手机号码</label>
            <input type="text" placeholder="手机或电话号码" />
          </div>
          <div class="qo_detailsBox_item">
            <label for>所在地区</label>
            <input type="text" placeholder="选择省市区县" />
          </div>
          <div class="qo_detailsBox_item">
            <label for>详细地址</label>
            <input type="text" placeholder="街道、楼牌号等信息" />
          </div>
        </div>

        <button class="keep">保存信息</button>
        <div>
          <img src="../../images/logo.png" alt />
        </div>
      </div>
      <div v-if="replaceAddr" class="replaceAddr">
        <div>
          <h3>更换地址</h3>
          <div>您在浏览器更换了地址，是否匹配更换</div>
          <ul>
            <li
              v-for="(item,index) in $store.state.allAddress"
              :key="index"
              @click="repAddrId=item.id"
            >
              <span>
                <input type="radio" :id="'a'+item.id" :checked="repAddrId==item.id" />
              </span>
              <span>
                <label :for="'a'+item.id">{{item.takeover_addr|changeAddr}}</label>
              </span>
            </li>
          </ul>
          <div>
            <button @click="$store.commit('ROUTERTO','/newAddr/0')">新建地址</button>
            <button @click="replAddr(repAddrId)">确认</button>
          </div>
          {{repAddrId}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { create_order } from "network/order";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
// 用户地址
import { getuserAddress } from "network/address";
import { BuyGooods, UpdataShopCart } from "network/shopCart";
export default {
  name: "confirmorder",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      // loading: true,
      orderData: {
        user_id: "",
        shopcarts_id: []
      },
      isShow: false,
      replaceAddr: false, //替换地址的遮罩层显示
      repAddrId: 1 //需要替换的id
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(from);
    this.$store.state.configOrderHistory = from.path;
    next();
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    defaddr() {
      return this.$store.state.userInfo.defaddr;
    },
    shoppingAddress() {
      return this.$store.state.shoppingAddress;
    },
    shop() {
      let data =
        this.$store.state.cartData != null
          ? this.$store.state.cartData
          : JSON.parse(
              window.localStorage.getItem(window.location.origin + "/jd")
            ).cartData;
      return data;
    }
  },
  created() {
    // JSON.stringify  把数组/对象类型的数据转换为JSON类型的字符串数据
    // JSON.parse() 方法把字符串数据转换为原来的类型

    // this.shop =
    //   this.$route.params.shop != undefined
    //     ? JSON.parse(this.$route.params.shop)
    // : "";

    if (
      window.localStorage.getItem(window.location.origin + "/jd") ==
        undefined ||
      window.localStorage.getItem(window.location.origin + "/jd") == null ||
      window.localStorage.getItem(window.location.origin + "/jd") == ""
    ) {
      this.$router.push("/home");
    }
    this.jumpPage();

    // this.shop.forEach(item => {
    //   this.updateShopcar({
    //     id: item.id,
    //     num: item.num,
    //     norm: item.norm,
    //     ischeck: 1,
    //     takeover_addr: this.shoppingAddress.takeover_addr
    //   });
    // });
  },
  methods: {
    toAddress() {
      this.$router.push("/newaddress");
      // console.log(document.querySelector(".addAddress"));
      // document.querySelector(".order-con").style.display = "none";
      // document.querySelector(".newAddress").style.display = "block";
    },
    open() {
      // const zaixianPay=require("../../images/warning.png");
      this.$confirm(
        // "<strong><img src="+ zaixianPay + " width=100px height=100px></strong>",
        "货到付款订单总价:￥",
        // "货到付款运费:免运费",
        "是否确认使用货到付款提交订单?",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        alert("支付成功");
        this.$router.push("/profile");
      });
    },
    payment() {
      var AddressBtn = document.getElementsByClassName(".addAddress").innerHTML;
      if (AddressBtn == "请添加地址") {
        alert("请先添加地址");
      } else {
        //  获取到要提交的数据
        this.orderData.user_id = this.$store.state.userInfo.id;

        let temp = {
          name: this.shoppingAddress.takeover_name,
          tel: this.shoppingAddress.takeover_tel,
          addr: this.shoppingAddress.takeover_addr
        };

        this.orderData.takeover_addr = JSON.stringify(temp);

        this.shop.forEach(item => {
          this.orderData.shopcarts_id.push(item.id);
        });

        if (window.confirm("是否确认提交订单")) {
          if (this.$store.state.areacodeHistory.indexOf("/cart") != -1) {
            this.orderData.shopcarts_id = [];
            this.shop.forEach(item => {
              this.orderData.shopcarts_id.push(item.id);
            });

            create_order(this.orderData).then(res => {
              if (res.code != 200) {
                // 失败的话 给用户提示，当用户点击确认的时候，然后跳转页面
                this.$router.push("/profile");
                return;
              }
              // this.$store.state.shopcart = {};
              // this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);

              // 提交订单成功后，把默认的配送地址取回来，放到购物车页面
              this.$store.state.shoppingAddress = this.$store.state.userInfo.defaddr;
              this.$router.push("/payment/" + res.data.order_id);
            });
          }
        }

        //从details进入确认订单
        if (this.$store.state.areacodeHistory.indexOf("/details") != -1) {
          //取出传递过来的数据
          this.shop.forEach(item => {
            this.orderData.goods_id = item.goods_id;
            this.orderData.num = item.num;
            this.orderData.norm = item.norm;
          });

          BuyGooods(this.orderData).then(res => {
            console.log(res);
            if (res.code != 200) {
              //失败的话 给用于一个提示。当用户点击确认的时候。跳转页面
              this.$router.push("/profile");
              return;
            }
            //提交订单成功后。把默认的配送地址取回来。放到购物车页面
            this.$store.state.ShoppingAddress = this.$store.state.userInfo.defaddr;
            this.$router.push("/payment/" + res.data.order_id);
          });
        }
        this.$store.state.cartData = null;
        let data = window.localStorage.getItem(window.location.origin + "/jd");
        data =
          data != undefined && data != null && data != ""
            ? JSON.parse(data)
            : null;

        data.cartData != undefined && data.cartData != null
          ? delete data["cartData"]
          : null;
        window.localStorage.setItem(
          window.location.origin + "/jd",
          JSON.stringify(data)
        );
      }
    },
    toLogin() {
      this.$router.push("/login");
    },
    // 替换地址遮罩层的id
    replAddr(id) {
      if (id == null) return;
      this.$store.state.shoppingAddress = null;

      let arr = this.$store.state.allAddress.filter(item => {
        if (item.id == id) {
          return true;
        }
        return false;
      });
      this.$store.state.shoppingAddress = arr[0];
      this.replaceAddr = false;
    },
    showReplAddr() {
      this.replaceAddr = true;
      getuserAddress({ user_id: this.$store.state.userInfo.id }).then(res => {
        console.log(res);
        let arr = res.data.filter(item => {
          if (item.default == 1) {
            return true;
          }
          return false;
        });
        this.repAddrId = arr[0].id;
        this.$store.state.allAddress = res.data;
      });
    },
    // 页面跳转
    jumpPage() {
      if (this.$store.state.areacodeHistory.indexOf("/cart") != -1) {
        console.log("购物车进入");
        if (!this.$store.state.userInfo) {
          this.$router.push("/home");
          return;
        }
        // 查看地址
        this.isShow = true;
        //  item.takeover_addr=JSON.params(item.takeover_addr);
        //  addr=item.takeover_addr.addr.split(",")
        for (let i = 0, temp = true; i < this.shop.length; i++) {
          let addr = this.shop[i].takeover_addr.split(",");
          if (addr[3] == "" && temp) {
            this.showReplAddr();
            temp = false; //作用是为了当前的if只执行一次
          }
          // 修改确认订单页面  购买商品的配送地址
          this.UpdataShopCart({
            id: this.shop[i].id,
            num: this.shop[i].num,
            norm: this.shop[i].norm,
            ischeck: 1,
            takeover_addr: this.shoppingAddress.takeover_addr
          });
        }
      }
      if (this.$store.state.areacodeHistory.indexOf("/details") != -1) {
        console.log("详情进入");

        let addr = this.shop[0].takeover_addr.split(",");
        console.log(addr);
        if (this.$store.state.userInfo) {
          alert("b");
          //  证明配送地址的最后一位(纤细地址) 替换地址
          console.log("用户存在");
          this.isShow = true;
          if (addr[3] == "") {
            this.showReplAddr();
          }

          // 在此处需要请求用户的配送地址
        } else {
          console.log("用户不存在");
          this.isShow = false;
          //用户不存在
          // 去登陆
          // 填写地址  电话号
        }
      } else {
        // '/'
        this.isShow = true;
        console.log("页面刷新了");
        this.$router.push("/home");
      }
    },
    UpdataShopCart(data) {
      //离开购物车页面的时候，修改购物车的网络强求需要添加字段
      UpdataShopCart(data).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    NavBar,
    Scroll
  },

  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    },
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    changeAddr(val) {
      return val.split(",").join("");
    }
  }
};
</script>
<style lang='less'>
#OrderScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  .OrderNavBar {
    background: #fff;
  }
  .Order-address {
    padding-bottom: 16px;
    background: #fff url("../../images/xian.png") -7px bottom repeat-x;
    background-size: 64px 5px;
    border-top: 1px solid #ddd;
    padding: 10px 15px;
    line-height: 25px;
    .addAddress {
      border: none;
      width: 100%;
      text-align: left;
      background: #fff;
      font-size: 18px;
      outline: none;
    }
    ul {
      position: relative;
      padding-right: 30px;
      li {
        font-size: 14px;
        text-align: left;
        &:first-child {
          font-weight: bold;
        }
        &:nth-child(2) {
          color: #666;
        }
      }
    }
  }
  .order-list {
    dd {
      margin: 0;
    }
    background: #fff;
    margin-top: 15px;
    margin-bottom: 15px;
    position: relative;
    border-radius: 10px;
    dt {
      display: block;
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #efebeb;
      padding: 0 10px;
      text-align: left;
      i {
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 5px;
        width: 16px;
        height: 15px;
        background: url("../../images/order-dt.png") no-repeat;
        background-size: 16px auto;
      }
    }
    dd.order-shopm {
      position: relative;
      min-height: 75px;
      padding: 0;
      font-size: 12px;
      padding: 15px 15px;
      margin: 0;
      border-bottom: 1px solid #efebeb;
      img {
        width: 75px;
        height: 75px;
        position: absolute;
        top: 15px;
        left: 10px;
        border-radius: 6px;
      }
      .order-sm-r {
        color: #333;
        line-height: 20px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 85px;
        text-align: left;
        p {
          color: red;
          font-size: 16px;
          span {
            color: #999;
            font-size: 12px;
          }
        }
      }
      div.zhuyi {
        padding: 0 0 0 85px;
        overflow: hidden;
        position: relative;
        li {
          float: left;
          font-size: 12px;
          color: #999;
          margin-right: 25px;
          img {
            width: 15px;
            height: 15px;
            margin: -2px 2px 0 0;
            position: absolute;
            top: 1px;
            left: 67px;
          }
          img.jiage {
            position: absolute;
            top: 1px;
            left: 195px;
          }
        }
      }
      // .gift {
      //   position: relative;
      //   margin: 10px 0 15px;
      //   padding: 10px 0;
      //   background-color: #fef5f5;
      //   border-radius: 6px;
      //   span {
      //     margin: 0 10px;
      //     color: #666;
      //     line-height: 1.4em;
      //     width:10%;
      //     height:73px;
      //     float: left;
      //   }
      //   ul {
      //     flex: 1;
      //     padding-right: 10px;
      //     overflow: hidden;
      //     width:90%;
      //     height:73px;
      //     float: right;
      //     li {
      //       position: relative;
      //       padding-right: 14px;
      //       a {
      //         display: flex;
      //         width: 100%;
      //         color: inherit;
      //         p {
      //           overflow: hidden;
      //           text-overflow: ellipsis;
      //           white-space: nowrap;
      //           -webkit-box-flex: 1;
      //           flex: 1;
      //           margin-right: 10px;
      //           line-height: 1.4em;
      //         }
      //       }
      //     }
      //   }
      // }
    }
    dd.peisong {
      padding: 10px 20px 10px 0;
      position: relative;
      border-bottom: 1px solid #efebeb;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 16px;
        padding: 0 10px;
      }
      p {
        color: #666;
        font-size: 12px;
        text-align: right;
        margin-top: 5px;
      }
      .pei-justify {
        overflow: hidden;
        margin: 0;
        color: #999;
        font-size: 12px;
        padding: 0 10px;
        text-align: right;
        .left {
          float: left;
          font-size: 12px;
        }
      }
    }
  }

  div.detailed {
    margin-bottom: 15px;
    dd {
      margin: 0;
    }
    dd.detail {
      background: #fff;
      padding: 10px 20px 10px 0;
      position: relative;
      border-bottom: 1px solid #efebeb;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 16px;
        padding: 0 10px;
      }
      p {
        color: #666;
        font-size: 12px;
        text-align: right;
        margin-top: 5px;
      }
    }
  }
  div.shopMoney {
    background: #fff;
    dd {
      margin: 0;
    }
    dd.detail {
      padding: 0 20px 0 0;
      position: relative;
      strong {
        position: absolute;
        left: 0;
        top: 12px;
        font-weight: 400;
        font-size: 14px;
        padding: 0 10px;
      }
      p {
        color: red;
        font-size: 12px;
        text-align: right;
        padding-top: 10px;
      }
    }
  }
  a.hdfk {
    display: block;
    position: relative;
    padding: 10px 50px;
    overflow: hidden;
    background: #fff;
    i {
      display: block;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 50%;
      margin-top: -20px;
      left: 6px;
      background-size: 100%;
      background-image: url("../../images/huo.png");
    }
    h3 {
      margin: -1px 0;
      font-size: 14px;
      font-weight: 400;
      color: #333;
    }
    p {
      font-size: 10px;
      color: #999;
    }
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-top: 2px solid #ccc;
      border-left: 2px solid #ccc;
      top: 50%;
      transform: translate(0, -50%) rotate(135deg);
      right: 11px;
    }
  }
  div.jd_footer {
    margin: 25px 0 75px;
    div {
      display: block;
      width: 100px;
      height: 20px;
      margin: 0 auto;
      background: url("../../images/logo.png") no-repeat;
      background-size: 100%;
    }
  }
  .newAddress {
    display: none;
  }
  .replaceAddr {
    position: fixed;
    top: 59px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    > div {
      position: absolute;
      top: 20%;
      left: 15%;
      right: 15%;
      bottom: 30%;
      background-color: #fff;
      border-radius: 20px;
    }
  }
  .quickOrder {
    margin-top: -16px;
    .qo_phone {
      margin: 0 10px 10px;
      position: relative;
      height: 46px;
      line-height: 46px;
      border-radius: 4px;
      .area_box {
        position: absolute;
        width: 72px;
        height: 46px;
        top: 0;
        left: 0;
        line-height: 50px;
      }
      input {
        display: block;
        width: 100%;
        height: 46px;
        box-sizing: border-box;
        padding: 0 96px 0 10px;
        padding-left: 96px;
        padding-right: 10px;
        background: #f7f7f7;
        border: none;
        outline: none;
      }
    }
    .qo_detailsBox {
      margin-bottom: 15px;
      background: #fff;
      margin-top: 20px;
      .qo_detailsBox_item {
        display: flex;
        position: relative;
        margin-left: 10px;
        height: 46px;
        font-size: 16px;
        label {
          width: 74px;
          line-height: 46px;
          color: #333;
        }
        input {
          padding-right: 20px;
          flex: 1;
          border: none;
          outline: none;
        }
      }
    }
    button.keep {
      width: 90%;
      height: 50px;
      background: red;
      border: none;
      color: #fff;
      margin-bottom: 20px;
    }
  }
}
.el-message-box {
  width: 80% !important;
}
</style>

