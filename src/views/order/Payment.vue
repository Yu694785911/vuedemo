<template>
  <div class="Payment">
    <scroll id="OrderScroll">
      <nav-bar class="OrderNavBar" ref="OrderNavBar">
        <div slot="left" class="left" @click="open">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">京东收银台</div>
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

      <div>
        <h2 style="color:red">{{goods.money_now*goods.num | changePrice("￥")}}</h2>
      </div>

      <div class="jd_pay">
        <h2></h2>
      </div>

      <ul class="pay_list">
        <li>
          <img src="../../images/pay1.png" />
          <p>使用新卡支付</p>
          <span>立减3元</span>
          <input type="radio" checked name="radio" />
        </li>
        <li>
          <img src="../../images/pay2.png" />
          <p>首次添加招商银行借记卡</p>
          <span>立减5元</span>
          <input type="radio" name="radio" />
        </li>
        <li>
          <img src="../../images/pay3.png" />
          <p>首次添加北京银行借记卡</p>
          <span>立减10元</span>
          <input type="radio" name="radio" />
        </li>
        <li class="allpay">
          <p>全部付款方式</p>
          <span class="sk" @click="drawer = true" type="primary">查看</span>
          <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose">
            <ul class="pay_list">
              <li @click="drawer = false">
                <img src="../../images/pay1.png" />
                <p>使用新卡支付</p>
                <span class="chakan_span">立减3元</span>
              </li>
              <li @click="drawer = false">
                <img src="../../images/pay2.png" />
                <p>首次添加招商银行借记卡</p>
                <span>立减5元</span>
              </li>
              <li @click="drawer = false">
                <img src="../../images/pay3.png" />
                <p>首次添加北京银行借记卡</p>
                <span>立减10元</span>
              </li>
              <li @click="drawer = false">
                <img src="../../images/baitiao.png" />
                <p>打白条</p>
                <p>未开通白条</p>
                <input type="radio" disabled name="radio" />
              </li>
            </ul>
          </el-drawer>
        </li>
        <li class="weixin_pay">
          <img src="../../images/weixin.png" />
          <p>微信支付</p>
          <span>仅安装微信6.0.2 及以上版本客户端使用</span>
          <input type="radio" name="radio" />
        </li>
      </ul>
      <div class="pay_footer">
        <a
          href="javascript:;"
          class="usepay"
          @click="toPay"
        >使用新卡支付{{goods.money_now*goods.num|changePrice("￥")}}</a>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getOrderByOrderId, updateOrderState } from "network/order";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: "Payment",
  data() {
    return {
      goods: {},
      order_id: null,
      drawer: false,
      direction: "btt",
      dialogVisible: false
    };
  },
  components: {
    NavBar,
    Scroll
  },
  computed: {},
  created() {
    this.order_id = this.$route.params.order_id;
    console.log(this.order_id);
    console.log(this.order_id);
    this.getPaymentOrder();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    getPaymentOrder() {
      getOrderByOrderId(this.order_id).then(res => {
        console.log(res);
        if (res.code != 200) {
          // 弹出对话框，获取订单数据失败
          // 跳转页面
          this.$router.push("/profile");
          return;
        }
        this.goods = res.data[0];
      });
    },
    pushRouter(path) {
      this.$router.push(path);
    },
    handleClose(done) {
      done();
    },
    open() {
      this.$confirm(
        "您的订单在0小时29分钟内未支付将被取消,请尽快完成支付。",
        "确认要离开收银台?",
        {
          confirmButtonText: "确定离开",
          cancelButtonText: "继续支付",
          type: "warning"
        }
      ).then(() => {
        this.$router.push("/cart");
      });
    },
    toPay() {
      this.$alert("是否要确认支付", "要支付吗", {
        confirmButtonText: "确定",
        callback: action => {
          this.$message({
            type: "info",
            message: `action: ${action}`
          });
          
          console.log(this.order_id)
          updateOrderState({order_id:this.order_id,state:2}).then(res => {
            console.log(res);
          });
          this.$router.push("/paySuccess");
        }
      });
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
.jd_pay {
  background: linear-gradient(90deg, #fef5f4 0, #fef0ef 100%);
  width: 100%;
  height: 61px;
  position: relative;
  border-radius: 12px 12px 0 0;
  h2 {
    height: 61px;
    background-image: url("../../images/pay.png");
    background-repeat: no-repeat;
    background-size: 95px 24px;
    background-position: 18px center;
  }
}
ul.pay_list {
  display: block;
  li {
    height: 60px;
    margin-left: 15px;
    margin-bottom: 5px;
    position: relative;
    p {
      font-size: 14px;
      line-height: 13px;
      color: #1a1a1a;
      margin-top: 24px;
      float: left;
    }

    img {
      background-size: 100%;
      float: left;
      width: 24px;
      height: 24px;
      margin: 18px 8px 3px 0;
    }
    span {
      border-radius: 2px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(242, 125, 109, 1);
      height: 12px;
      margin-left: 150px;
      line-height: 12px;
      display: block;
      font-size: 9px;
      width: 60px;
      // float: left;
      color: #f2270c;
      position: absolute;
      top: 25px;
      left: 100px;
    }
    input {
      float: right;
      margin-right: 10px;
      margin-top: 25px;
    }
  }
  li.allpay {
    p {
      margin-left: 30px;
    }
    span.sk {
      border: none;
      color: #000;
      float: right;
      background: #fff;
    }
  }
  li.weixin_pay {
    span {
      border: none;
      font-size: 12px;
      width: 100%;
      // margin: -32px 0 0 32px;
      margin-left: -140px;
      margin-top: 20px;
      color: grey;
      background: #fff;
      float: left;
    }
  }
}
div.pay_footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04);
  a.usepay {
    background: linear-gradient(
      135deg,
      #fa200c 0,
      #fa360c 45%,
      #fa510c 83%,
      #fa5c0c 100%
    );
    display: block;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    border-radius: 21px;
    margin: 6px 18px;
    font-weight: 700;
    font-family: "京东正黑体";
    color: #fff;
  }
}
span.chakan_span {
  border-radius: 2px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(242, 125, 109, 1);
  height: 12px;
  margin-left: 150px;
  line-height: 12px;
  display: block;
  font-size: 9px;
  width: 60px;
  // float: left;
  color: #f2270c;
  position: absolute;
  top: 25px;
  left: 100px;
}
div.el-drawer {
  height: 80% !important;
  border-radius: 10px 10px 0 0;
}
.el-message-box {
  width: 80% !important;
}
.el-button--primary {
  width: 50%;
  float: right;
  background: #f15353 !important;
  border-top: 1px solid #f02323 !important;
  margin-left: 0 !important;
}
.el-button--default {
  width: 50%;
  float: left;
}
</style>
