<template>
  <div class="confirmorder" style="background:#f2f2f2">
    <scroll id="OrderScroll" >
      <nav-bar class="OrderNavBar" ref="OrderNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">确认订单</div>
        </div>
      </nav-bar>

      <!-- 地址页 -->
      <div class="Order-address">
        <div
          v-if="userInfo.Addressname==null && userInfo.Addressphone==null && userInfo.Addressxx==null"
        >
          <button class="addAddress" @click="toAddress">请添加地址</button>
        </div>

        <ul v-else @click="toAddress">
          <li class="co_name">{{userInfo.Addressname}}{{userInfo.Addressphone}}</li>
          <li>{{userInfo.Addressxx}}</li>
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
    </scroll>
  </div>
</template>

<script>
import { create_order } from "network/order";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "confirmorder",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      // loading: true,
      orderData: {
        user_id: "",
        shopcarts_id: []
      }
    };
  },
  methods: {
    toAddress() {
      this.$router.push("/address");
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

        this.shop.forEach(item => {
          this.orderData.shopcarts_id.push(item.id);
        });

        if (window.confirm("是否确认提交订单")) {
          create_order(this.orderData).then(res => {
            if (res.code != 200) {
              // 失败的话 给用户提示，当用户点击确认的时候，然后跳转页面
              this.$router.push("/profile");
              return;
            }
            this.$store.state.shopcart = {};
            this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);
            this.$router.push("/payment/" + res.data.order_id);
          });
        }
      }
    }
  },
  components: {
    NavBar,
    Scroll
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    // JSON.stringify  把数组/对象类型的数据转换为JSON类型的字符串数据
    // JSON.parse() 方法把字符串数据转换为原来的类型
    this.shop = JSON.parse(this.$route.params.shop);
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    }
  },
  mounted() {}
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
}
.el-message-box {
  width: 80% !important;
}
</style>

