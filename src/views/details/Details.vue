<template>
  <div class="details" style="background:#f2f2f2">
    <nav-bar class="details-nav-bar">
      <div slot="left" @click="back" class="left">
        <i></i>
      </div>
      <div slot="center" class="tab-bar-center">
        <div
          v-for="(item,index) in titleArr"
          :key="index"
          class="tab-bar-center-item"
          @click="tabbarToggle(item,index)"
        >{{item}}</div>
      </div>
      <div slot="right" class="right">
        <el-dropdown trigger="click" @command="pushRouter">
          <span class="el-dropdown-link">
            <i class="rightsd"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home">首页</el-dropdown-item>
            <el-dropdown-item command="/category">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
            <el-dropdown-item command="/profile">浏览记录</el-dropdown-item>
            <el-dropdown-item command="/profile">我的关注</el-dropdown-item>
            <el-dropdown-item command="/profile">分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav-bar>

    <scroll ref="DetailsScroll" class="DetailsScroll">
      <details-rotation :cgoodsImg="goodsImg"></details-rotation>
      <div class="Dprice-m">
        <div class="Dprice_box">
          <div class="dprice">{{detailsGoods.money_now|changePrice("$")}}</div>
          <div class="free">
            <span style>
              <a href>
                <img src="../../images/tx.png" class="tx" />
                <br />降价提醒
              </a>
            </span>
            <span>
              <a href>
                <img src="../../images/sc.png" class="tx" />
                <br />收藏
              </a>
            </span>
          </div>
        </div>
        <div class="shopMessage">
          <div class="shopname">{{detailsGoods.name}}</div>
          <div class="desc">
            放心去喜欢，天然实木画框，手工装裱，安装方便，售后无忧！更多装饰画请点击！
            <a>查看！</a>
          </div>
        </div>
      </div>

      <!-- 优惠 -->
      <div class="Discount">
        <div class="Discount-box">
          <span class="title">优惠</span>
          <div class="content">
            <div class="D-mj">
              <span class="mj-fir">满30减6</span>
              <span class="mj-fir">满30减6</span>
              <span class="mj-fir xyh">新用户专享</span>
              <!-- <el-button @click="drawer = true" style="margin-left: 26px;padding:0">...</el-button> -->

              <!-- <el-drawer
                title="我是标题"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose"
              >
                <span>我来啦!</span>
              </el-drawer>
              </div>-->

              <el-button type="text" @click="dialogVisible = true">...</el-button>

              <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </div>

            <div class="kuadian">
              <p class="kuadian-k">
                <em>跨店铺满减</em>
              </p>
              <p class="kuadian-d">满300减30元</p>
            </div>

            <div class="kuadian">
              <p class="kuadian-k">
                <em>多买优惠</em>
              </p>
              <p class="kuadian-d">满2件,总价打九折;满3件,总价打...</p>
            </div>

            <div class="kuadian">
              <p class="kuadian-k">
                <em>满额返券</em>
              </p>
              <p class="kuadian-d">购物满1元返装修500元优惠券</p>
            </div>
          </div>
        </div>
      </div>

      <div class="Address">地址</div>

      <div class="Address">评价</div>

      <div class="Address">店铺</div>

      <div class="Address">推荐</div>

      <div class="shop-M">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="商品介绍" name="first">
            <div v-for="(item,index) in goodsImg" :key="index">
              <img :src="path+'/goods/'+item" alt />
            </div>
          </el-tab-pane>

          <el-tab-pane label="规格参数" name="second">
            规格参数
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="商品编号">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="主体"></el-form-item>

              <el-form-item label="尺寸">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="肩带长度">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="斜挎带">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="内部结构"></el-form-item>
              <el-form-item label="主袋">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机袋">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="证件袋">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="拉链暗袋">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="电脑插袋">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="售后保障" name="third">
            <div class="SH-line">
              <h3>权利声明</h3>
            </div>
            <div class="SH-text">
              <p>
                京东商城上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是京东商城重要的经营资源，未经许可，禁止非法转载使用。
                <b>住:</b>
                本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。
              </p>
            </div>

            <div class="SH-line">
              <h3>价格说明</h3>
            </div>
            <div class="SH-text">
              <p>
                <strong>1.京东价：</strong>
                京东价为商品的销售价，是您最终决定是否购买商品的依据。
              </p>
              <p>
                <strong>2.划线价：</strong>
                商品展示的划横线价格为参考价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
              </p>
              <p>
                <strong>3.折扣：</strong>
                如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
              </p>
              <p>
                <strong>4.异常问题：</strong>
                商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </scroll>

    <details-tab-bar></details-tab-bar>
  </div>
</template>

<script>
import $ from "jquery";
import Scroll from "components/contents/scroll/Scroll";
import DetailsRotation from "./childComp/DetailsRotation";
import NavBar from "components/common/navbar/NavBar";
import DetailsTabBar from "./childComp/DetailsTabBar";
// 引入商品数据请求
import { getGoodsId } from "network/goods";
// import { slide } from "network/slide";
export default {
  name: "Details",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      path: "http://106.12.85.17:8090/public/image",
      activeName: "second",
      dialogVisible: false,
      direction: "btt",
      getdata: {
        //提交的数据
        exact: {
          //精确查找
        },
        page: 1
      },
      detailsGoods: {},
      titleArr: ["商品", "评价", "详情", "推荐"],
      goodsImg: null
    };
  },
  components: {
    Scroll,
    DetailsRotation,
    NavBar,
    DetailsTabBar
  },
  computed: {},
  created() {
    console.log("details被创建");
    this.getdata.exact.id = this.$route.params.id;
    this.getGoods(this.getdata.exact.id);

    var p = 0;
    $(window).scroll(function() {
      p = $(window).scrollTop();
      if (p >= 200) {
        // slideDown 向下显示元素
        $(".tab-bar-center").slideDown("fast");
        $(".details-nav-bar").css("background-color", "white");
        $(".navbar").css("box-shadow", "0 1px 1px rgba(100, 100, 100, 0.2)");
      } else if (p < 200 && p > 50) {
        // slideUp 向上隐藏元素
        $(".tab-bar-center").slideDown("fast");
        $(".details-nav-bar").css("background-color", "rgba(255,255,255,0.5)");
        $(".navbar").css("box-shadow", "none");
      } else {
        $(".tab-bar-center").slideUp("fast");
        $(".details-nav-bar").css("background-color", "transparent");
      }
    });
  },
  activated() {
    console.log("details处于活跃");
  },
  mounted() {
    console.log("details被渲染");
    this.$parent.isTabBar = false;
    this.$parent.isjxTabBar = false;
    this.$parent.isphbTabBar = false;
    this.$parent.isxqTabBar = true;
  },
  watch: {
    // detailsGoods(newVal) {
    //   console.log(newVal);
    //   // var imgArr=newVal[0].img_detalis_list.splice(",");
    //   // console.log(imgArr);
    //   // 如果是一组数据，则需要循环
    //   newVal.forEach(item => {
    //     item.img_detalis_list = item.img_detalis_list.split(",");
    //   });
    //   return newVal;
    // }
    // 监听数据改变，做一些数据变化的事情
  },
  methods: {
    handleClose(done) {
      done();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getGoods(data) {
      getGoodsId(data).then(res => {
        if (res.code != 200) return;
        this.detailsGoods = res.data.goodsData;
        // this.goods = new Goods(
        //   res.data.goodsData,
        //   res.data.norms,
        //   res.data.relationGoods
        // );
        this.goodsImg = res.data.goodsData.img_detalis_list;
        console.log(this.goodsImg);
      });
      // getGoods(data).then(res => {
      //   console.log(res.data);
      //   if (res.code != 200) return;
      //   this.detailsGoods = [...res.data];
      // });
    },
    back() {
      this.$router.go(-1);
    },
    pushRouter(path) {
      this.$router.push(path);
    },
    tabbarToggle(a, b) {
      $("html,body").animate({ scrollTop: 800 * b }, 500);
    }
  },
  filters: {
    changePrice(val, str) {
      if (arguments[1]) {
        //第二个参数有值
        console.log("存在");
        return str + Number(val).toFixed(2);
      } else {
        //没值
        console.log("不存在");
        return Number(val).toFixed(2);
      }
    }
  }
};
</script>

<style lang="less">
.detailsScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
}

.details {
  .details-nav-bar {
    background: transparent;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 100;
  }

  .left i {
    background: url("../../images/leftsj.png") no-repeat 50%;
    background-size: 20px 20px;
    margin: 0;
    height: 20px;
    padding: 3px 15px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }

  .right .rightsd {
    background: url("../../images/rightsd.png") no-repeat 50%;
    background-size: 20px 20px;
    padding: 3px 15px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
  .tab-bar-center {
    display: flex;
    /* display: none; */
  }
  .tab-bar-center div {
    font-size: 14px;
  }
  .tab-bar-center-item {
    flex: 1;
  }
  .Dprice-m {
    padding: 12px 18px;
    background: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .Dprice_box {
    height: 35px;
    position: relative;
    margin-top: 12px;
    margin-bottom: 0;
    line-height: 20px;
    font-size: 12px;
  }
  .Dprice_box .dprice {
    line-height: 30px;
    color: #f2270c;
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
    float: left;
  }
  .Dprice_box .free {
    width: 100px;
    float: right;
  }
  .Dprice_box .free span {
    width: 50px;
    display: block;
    float: left;
    font-size: 12px;
  }
  .Dprice_box .free span img {
    position: absolute;
    top: 0;
    width: 18px;
    height: 18px;
    margin-left: -10px;
  }
  .Dprice_box .free span:nth-child(2) {
    float: right;
  }
  .shopMessage {
    margin-top: 15px;
  }
  .shopMessage .shopname {
    font-weight: 700;
    line-height: 21px;
    color: #262626;
    font-size: 16px;
    text-align: left;
  }
  .shopMessage .desc {
    padding: 18px 0 0;
    line-height: 1.3;
    position: relative;
    font-size: 12px;
    max-height: 46px;
    overflow: hidden;
    color: #666;
    text-align: left;
  }

  .Discount {
    margin-top: 12px;
    padding: 0 18px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;

    .Discount-box {
      position: relative;
      padding: 18px 20px 5px 38px;
      font-size: 0;
      color: #333;
      word-break: break-word;
      overflow: hidden;
      font-size: 13px;
      line-height: 18px;
      height: 200px;

      .title {
        position: absolute;
        left: 0;
        top: 18px;
        color: #262626;
        font-weight: 700;
      }
      .content {
        div {
          margin-bottom: 12px;
        }
      }
      .D-mj {
        height: 18px;
        line-height: 0;
        text-align: left;
        word-break: break-word;
        .mj-fir {
          position: relative;
          display: inline-block;
          margin-right: 5px;
          padding: 0 9px 0 12px;
          border-top: 1px solid #f2270c;
          border-bottom: 1px solid #f2270c;
          height: 16px;
          line-height: 16px;
          color: #f2270c;
          font-size: 10px;
          &::before {
            left: 0;
            width: 7px;
            content: "";
            position: absolute;
            top: -1px;
            height: 18px;
            background-image: url("../../images/mj.png");
            background-size: 15px 18px;
            background-repeat: no-repeat;
          }
          &::after {
            right: 0;
            width: 4px;
            background-position: -11px 0;
            content: "";
            position: absolute;
            top: -1px;
            height: 18px;
            background-image: url("../../images/mj.png");
            background-size: 15px 18px;
            background-repeat: no-repeat;
          }
        }
        .xyh {
          color: #fff;
          margin: 0 8.5px 0 9px;
          padding: 0 5.5px 0 3px;
          background-color: #f2270c;
          &::before {
            content: "";
            position: absolute;
            top: -1px;
            left: -9px;
            height: 18px;
            background-image: url("../../images/xyh.png");
            background-size: 15px 18px;
            background-repeat: no-repeat;
            width: 9px;
          }
          &::after {
            content: "";
            position: absolute;
            top: -1px;
            right: -3.5px;
            height: 18px;
            background-image: url("../../images/xyh.png");
            background-size: 15px 18px;
            background-repeat: no-repeat;
            width: 4.5px;
            background-position: -11px 0;
          }
        }
      }
      .kuadian {
        float: left;
      }
      .kuadian-k {
        margin-right: 5px;
        padding-top: 1px;
        text-align: left;
        float: left;
        em {
          position: relative;
          padding: 0 3px;
          height: 13px;
          line-height: 13px;
          font-size: 9px;
          color: #e4393c;
          background: #fff;
          border: 1px solid red;
          font-style: normal;
          &::before {
            border-color: #e4393c;
            border-radius: 2px;
          }
        }
      }
      .kuadian-d {
        float: left;
      }
    }
  }

  .Address {
    margin-top: 12px;
    padding: 0 18px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
    height: 200px;
  }
  .shop-M {
    margin-top: 12px;
    padding: 0 18px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 100%;
    }
    .SH-line {
      border-top: 1px solid #ddd;
      text-align: center;
      height: 6px;
      margin: 16px 0 10px;
      h3 {
        display: inline-block;
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        position: relative;
        top: -20px;
        font-weight: 400;
        padding: 0 20px;
        background: #fff;
        color: #666;
      }
    }
    .SH-text {
      p {
        font-size: 12px;
        color: #666;
        line-height: 18px;
        b {
          font-weight: bold;
        }
      }
    }
  }
  .el-tabs__active-bar {
    transform: translateX(136px);
  }
  .el-tabs__item {
    padding: 0 40px;
  }
  .el-dialog {
    width: 100%;
    margin-top: 69vh;
  }
}
</style>
