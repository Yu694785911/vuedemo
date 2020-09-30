<template>
  <div class="myOrder" v-if="myOrderShow">
    <scroll id="myOrderScroll" style="background:#d1d1">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title" style="line-height:44px">我的订单</div>
        </div>
        <div slot="right" class="right">
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

      <div class="myorder_Ipt">
        <img src="../../images/fdj.png" alt />
        <input type="text" placeholder="商品名称/商品编号/订单号" v-model="myOrderInput" />
      </div>

      <div v-if="all==null">
        <el-button type="danger" round @click="GTlogin">登录</el-button>
      </div>

      <div class="findOrder" v-if="keywordData">
        <dl class="dlData" v-for="(i,j) in keywordData" :key="j">
            <dt class="shop_name">
              <img src="../../images/dianpu.png" alt class="shopImg" />
              <!-- {{i.shop_name}} -->
              张秋雨
            </dt>
            <dd class="cart-goods">
              <img :src="$store.state.urlPath+'/goods/'+i.img_cover" alt="图片" />

              <div>
                <p class="title">
                  {{i.name}}
                  <br />
                </p>

                <p class="norm" v-on:click.stop="checkNorm(i)">
                  <span>共1件商品</span>
                  <span>
                    应付金额
                    <i>{{1*i.money_now |changePrice("￥")}}</i>
                  </span>
                  <br />
                </p>

                <p class="money_now">
                  <!-- <em>剩余支付时间：11.00</em> -->
                  <el-button type="danger" round @click="toPay(i.goods_id)">去支付</el-button>
                  <br />
                </p>
              </div>
            </dd>
          </dl>
      </div>


      <el-tabs v-model="activeName" @tab-click="handleClick" class="quanbu">
        
        <el-tab-pane label="全部" name="first" v-if="all!=null">
          {{all.length}}
          <div v-for="(i,j) in all" :key="j">
            <dl class="dlData" v-for="(a,b) in i" :key="b">
              <dt class="shop_name">
                <img src="../../images/dianpu.png" alt class="shopImg" />
                {{a.shop_name}}
              </dt>
              <dd class="cart-goods">
                <img :src="$store.state.urlPath+'/goods/'+a.img_cover" alt="图片" />

                <div>
                  <p class="title">
                    {{a.goods_name}}
                    <br />
                  </p>

                  <p class="norm" v-on:click.stop="checkNorm(a)">
                    <span>共{{a.num}}件商品</span>
                    <span>
                      应付金额
                      <i>{{a.num*a.money_now |changePrice("￥")}}</i>
                    </span>
                    <br />
                  </p>

                  <p class="money_now">
                    <em>剩余支付时间：11.00</em>

                    <br />
                  </p>
                  <el-button type="danger" round v-if="states==1">待收货</el-button>
                  <el-button type="danger" round v-if="states==2">已完成</el-button>
                  <el-button type="danger" round v-if="states==0">待支付</el-button>
                  <el-button type="danger" round v-if="states==4">再次购买</el-button>
                </div>
              </dd>
            </dl>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代付款" name="second" v-if="payfail!=null && payfail.length>0">
          <span>{{payfail.length}}</span>
          <dl class="dlData" v-for="(i,j) in payfail" :key="j">
            <dt class="shop_name">
              <img src="../../images/dianpu.png" alt class="shopImg" />
              {{i.shop_name}}
            </dt>
            <dd class="cart-goods">
              <img :src="$store.state.urlPath+'/goods/'+i.img_cover" alt="图片" />

              <div>
                <p class="title">
                  {{i.goods_name}}
                  <br />
                </p>

                <p class="norm" v-on:click.stop="checkNorm(i)">
                  <span>共{{i.num}}件商品</span>
                  <span>
                    应付金额
                    <i>{{i.num*i.money_now |changePrice("￥")}}</i>
                  </span>
                  <br />
                </p>

                <p class="money_now">
                  <!-- <em>剩余支付时间：11.00</em> -->
                  <el-button type="danger" round @click="toPay(i.goods_id)">去支付</el-button>
                  <br />
                </p>
              </div>
            </dd>
          </dl>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="third" v-if="paySuccess!=null && paySuccess.length>0">
          <dl class="dlData" v-for="(i,j) in paySuccess" :key="j">
            <dt class="shop_name" v-if="i.shop_name">
              <img src="../../images/dianpu.png" alt class="shopImg" />
              {{i.shop_name}}
            </dt>
            <dd class="cart-goods">
              <img :src="$store.state.urlPath+'/goods/'+i.img_cover" alt="图片" />

              <div>
                <p class="title">
                  {{i.goods_name}}
                  <br />
                </p>

                <p class="norm" v-on:click.stop="checkNorm(i)">
                  <span>共{{i.num}}件商品</span>
                  <span>
                    应付金额
                    <i>{{i.num*i.money_now |changePrice("￥")}}</i>
                  </span>
                  <br />
                </p>

                <p class="money_now">
                  <el-button type="danger" round @click="confimshou(i.goods_id)">确认收货</el-button>
                  <br />
                </p>
              </div>
            </dd>
          </dl>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="fourth">
          <dl class="dlData" v-for="(i,j) in paySuccess" :key="j">
            <dt class="shop_name" v-if="i.shop_name">
              <img src="../../images/dianpu.png" alt class="shopImg" />
              {{i.shop_name}}
              <span>
                已签收|
                <img src="../../images/del.png" @click="deleteOrder()" />
              </span>
            </dt>
            <dd class="cart-goods">
              <img :src="$store.state.urlPath+'/goods/'+i.img_cover" alt="图片" />

              <div>
                <p class="title">
                  {{i.goods_name}}
                  <br />
                </p>

                <p class="norm" v-on:click.stop="checkNorm(i)">
                  <span>共{{i.num}}件商品</span>
                  <span>
                    应付金额
                    <i>{{i.num*i.money_now |changePrice("￥")}}</i>
                  </span>
                  <br />
                </p>

                <p class="money_now">
                  <el-button type="default" round @click="toevaluate(i.goods_id)">去评价</el-button>
                  <el-button type="danger" round @click="buymore(i.goods_id)">再次购买</el-button>
                  <br />
                </p>
              </div>
            </dd>
          </dl>
        </el-tab-pane>
      </el-tabs>
      <div></div>
    </scroll>
  </div>
</template>

<script>
import {
  getOrder,
  getOrderByOrderId,
  deleteOrder,
  updateOrderState,
  getGoods
} from "network/order";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "myOrder",
  data() {
    return {
      activeName: "first",
      paySuccess: null,
      payfail: null,
      all: {},
      myOrderShow: false,
      myOrderInput: "",
      keywordData:null,
    };
  },
  components: {
    NavBar,
    Scroll
  },
  computed: {},
  created() {
    setTimeout(() => {
      this.myOrderShow = true;
    }, 1000);

    getOrder({ user_id: this.$store.state.userInfo.id }).then(res => {
      console.log(res.data);
      for (var j = 0; j < res.data.length; j++) {
        this.states = res.data[j].state;
      }
      for (var i = 0; i < res.data.length; i++) {
        let a = res.data[i].id;
        getOrderByOrderId(res.data[i].id).then(res => {
          if (res.data && res.data.length > 0) {
            this.all[a] = res.data;
          }
        });
      }
    });

    getOrder({ user_id: this.$store.state.userInfo.id, state: 2 }).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        getOrderByOrderId(res.data[i].id).then(res => {
          this.paySuccess = res.data;
        });
      }
    });

    getOrder({ user_id: this.$store.state.userInfo.id, state: 1 }).then(res => {
      for (var i = 0; i < res.data.length; i++) {
        getOrderByOrderId(res.data[i].id).then(res => {
          this.payfail = res.data;
        });
      }
    });
    // getOrder({ user_id: this.$store.state.userInfo.id, state: 3 }).then(res => {
    //   console.log(res.data);
    // });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    pushRouter(path) {
      this.$router.push(path);
    },
    GTlogin() {
      this.$router.push("/login");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    buymore(id) {
      this.$router.push("/details/" + id);
    },
    toevaluate(id) {
      this.$router.push("/toEvaluate/" + id);
    },
    confimshou(goodsId) {
      // 修改
      console.log(goodsId);
      alert("aa");
      updateOrderState({ order_id: goodsId, state: 2 }).then(res => {
        console.log(res);
      });
    },
    toPay(id){
      console.log(id);
      this.$router.push("/details/"+id);
    },
    deleteOrder() {
      console.log("a");
      getOrder({ user_id: this.$store.state.userInfo.id, state: 2 }).then(
        res => {
          console.log(res.data);
        }
      );
      deleteOrder().then(res => {
        console.log(res);
      });
    }
  },
  watch: {
    myOrderInput(newVal) {
      console.log(newVal);
      console.log(this.all);

      if (newVal.length > 0) {
        getGoods({ like: newVal }).then(res => {
          console.log(res.data);
          this.keywordData = res.data;
          document.querySelector(".quanbu").style.display = "none";
          document.querySelector(".findOrder").style.display = "block";
        });
      } else {
        document.querySelector(".quanbu").style.display = "block";
        document.querySelector(".findOrder").style.display = "none";
        console.log("qqqq");
      }
    }
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    }
  }
};
</script>
<style lang="less">
#myOrderScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  .myorder_Ipt {
    height: 46px;
    position: relative;
    // background: pink;
    img {
      position: absolute;
      content: "";
      top: 15px;
      left: 20px;
      width: 15px;
      height: 15px;
    }
    input {
      box-sizing: border-box;
      width: 95%;
      height: 30px;
      background: #f7f7f7;
      padding: 0 30px;
      border-radius: 15px;
      border: none;
      font-size: 14px;
      margin-top: 8px;
    }
  }
  #tab-first {
    padding-left: 30px !important;
  }
  .el-tabs__item {
    padding: 0 25px !important;
  }
}
dl {
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 10px;
  height: 200px;
}
dt {
  text-align: left;
  line-height: 30px;
  margin-left: 15px;
  span {
    margin-left: 50%;
    img {
      width: 15px;
      height: 15px;
      margin-left: 3px;
    }
  }
  img.shopImg {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
    margin-top: 5px;
    margin-right: 5px;
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
  img {
    width: 75px;
    height: 75px;
    position: absolute;
    left: 10px;
    top: 0;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
  }
  p.title {
    font-size: 14px;
    margin-bottom: 0.3rem;
    position: relative;
    margin-left: 28%;
    line-height: 16px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
  }
  p.norm {
    span {
      position: relative;
      background: #f2f2f2;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      color: #999;
      display: flex;
      border-radius: 5px;
      margin-left: 28%;
      margin-bottom: 5px;
      text-align: center;
      float: left;
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
    i {
      color: #151515;
      font-size: 14px;
      font-style: normal;
    }
  }
  p.money_now {
    line-height: 0.8rem;
    color: #f2270c;
    font-size: 0.6rem;
    em {
      font-style: normal;
      font-size: 12px;
      color: #333;
    }
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
}
.el-button:nth-child(1) {
  width: 86px !important;
  height: 30px !important;
  line-height: 1px !important;
  padding: 0 !important;
}
.el-button:nth-child(2) {
  width: 86px !important;
  height: 30px !important;
  line-height: 1px !important;
  padding: 0 !important;
  margin-left: 20px;
  margin-right: -70px;
  background-image: linear-gradient(
    135deg,
    #f2140c,
    #f2270c 70%,
    #f24d0c
  ) !important;
  color: #fff !important;
  font-size: 14px;
}
.el-button.is-round {
  float: right;
  width: 20;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
