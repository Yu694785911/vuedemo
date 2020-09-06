<template>
  <div class="details" style="background:#f2f2f2" v-loading="loading">
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
          <div class="dprice">{{detailsGoods.newPrice|changePrice("$")}}</div>
          <div class="oprice">{{detailsGoods.oldPrice|changePrice("$")}}</div>
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
          <span
            v-if="detailsGoods.category=='个体'"
            style="background-color:red;color:#fff"
          >{{detailsGoods.category}}</span>
          <div class="shopname">{{detailsGoods.title}}</div>
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

              <el-button type="text" @click="dialogVisible = true" style="margin-left: 40px;">...</el-button>

              <el-dialog title="优惠" :visible.sync="dialogVisible" :before-close="handleClose">
                <span>促销</span>
                <span>赠下方的热销商品（条件：购买1件及以上，赠完即止）</span>
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

      <div class="Address">
        <div class="Address_box">
          <span>已选</span>
          <p class="fuwu">本商品支持保障服务,点击可选服务</p>
          <el-button
            type="text"
            @click="open('Selected')"
            style="display:block;padding:0;padding-left:20%"
          >...</el-button>

          <el-dialog title="已选" :visible.sync="Selected" :before-close="handleClose">
            <div>
              <div v-for="(item,index) in selectNorm" :key="index">
                <div v-for="(i,j) in item" :key="j">
                  <div>{{j}}</div>
                  <div
                    v-for="(m,n) in i"
                    :key="n"
                    style="width:90%;height:30px;text-overflow:hidden;overflow:hidden;margin-bottom:10px;text-align:left;background:#d4d4d4;line-height:30px;margin-left:5%;border-radius:15px"
                  >{{m.name}}</div>
                </div>
              </div>

              <div class="order_num">
                <div>数量</div>
                <div>
                  <button @click="order_num--" :disabled="orderSel.order_num<=1">-</button>
                  <input type="text" :value="orderSel.num" />
                  <button @click="orderSel.num++">+</button>
                </div>
              </div>
              <div class="selectBtnBox" v-if="isConfirm">
                <button @click="addShop">添加至购物车</button>
                <button @click="addOrder(2)">立即购买</button>
              </div>
              <div class="selectBtnBox" v-else>
                <button @click="confirm">确认</button>
              </div>
            </div>
          </el-dialog>
        </div>

        <div class="Address_box" style="float: left;">
          <span>送至</span>
          <div class="toRight">
            <p class="dizhi">{{addre}}</p>
            <p class="xianhuo">
              <span v-if="true">现货</span>
            </p>
            <p class="jztime">{{getDistributionTime}}</p>
            <el-button
              type="text"
              @click="open('To') "
              style="    padding: 0px;margin-top: -5%;float: right;margin-right: 3%;"
            >...</el-button>

            <el-dialog title="配送至" :visible.sync="To" :before-close="handleClose">
              <ul style="text-align:left;line-height:20px;font-size:14px;">
                <!-- 使用过滤器把地址拼接 -->
                <li
                  style="padding:10px 0"
                  v-for="(item,index) in allAddress"
                  :key="index"
                >{{addr|changeAddr}}</li>
              </ul>
            </el-dialog>
          </div>
        </div>

        <div class="Address_box" style="float: left;">
          <span>运费</span>

          <div class="freight">
            <p class="free">在线支付免运费</p>
            <el-button
              type="text"
              @click="open('freight') "
              style="padding: 0;margin-left: 42%;margin-top: 5%;"
            >...</el-button>

            <el-dialog title="运费" :visible.sync="freight" :before-close="handleClose"></el-dialog>
            <ul>
              <li>商家发货售后</li>
              <li>不支持七天无理由退货</li>
              <br />
              <li>闪电退款</li>
              <li>极速审核</li>
              <li>可选京东快递</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="evaluate" v-if="goodsEvaluates.length==1">
        <div class="ev_head">
          <h3 style="font-size:15px;padding:0;text-align:left">评价</h3>
          <p class="count">1.8万+</p>
          <p class="haoping">好评度{{goodsEvaluates[0].Highpraise}}</p>
          <!-- <p class="haoping">好评度98%</p> -->
        </div>
        <div class="ev_key">
          <ul>
            <li>全部</li>
          </ul>
        </div>
        <div class="ev-con" v-for="(item,index) in goodsEvaluates" :key="index">
          <div class="ev-tou">
            <!-- <img :src="Evpath+item.headImg" alt /> -->
            <span>{{item.username}}</span>
            <p>{{evaluateTime}}</p>
          </div>
          <div class="ev_detail">
            <p style="width:100%;">{{item.evaluationDetails}}</p>
            <div style="text-align:left">
              <img v-image-preview v-for="(a,b) in Ev_detailImg" :key="b" :src="Evpath+a" alt />
            </div>

            <span style="margin-right:5px;">{{item.evaluationNorm}}:</span>
            <span>{{item.evaluationShop}}</span>
          </div>
        </div>
        <button v-if="evaluate.length>2" class="more">查看更多评价</button>
      </div>

      <div class="evaluate" v-if="goodsEvaluates.length>=2">
        <div class="ev_head">
          <h3 style="font-size:15px;padding:0;text-align:left">评价</h3>
          <p class="count">1.8万+</p>
          <p class="haoping">好评度{{goodsEvaluates[0].Highpraise}}</p>
          <p class="haoping">好评度98%</p>
        </div>
        <div class="ev_key">
          <ul>
            <li>全部</li>
            <li v-for="(i,j) in Ev_keyword" :key="j">{{i}}</li>
          </ul>
        </div>
        <div
          class="ev-con"
          v-for="(list,index) in goodsEvaluates"
          :key="index"
          v-show="goodsEvaluates.length=2"
        >
          <div class="ev-tou">
            <img :src="Evpath+list.headImg" alt />
            <span>{{list.username}}</span>
            <p>{{evaluateTime}}</p>
          </div>
          <div class="ev_detail">
            <p style="width:100%;">{{list.evaluationDetails}}</p>
            <div style="text-align:left">
              <img v-for="(a,b) in Ev_detailImg" :key="b" :src="Evpath+a"  v-image-preview style="margin-right:10px"/>
            </div>

            <span style="margin-right:5px;">{{list.evaluationNorm}}:</span>
            <span>{{list.evaluationShop}}</span>
          </div>
        </div>
        <button v-if="evaluate.length>2" class="more" @click="more">查看更多评价</button>
      </div>

      <!-- <details-evaluate :evaluate="goodsEvaluates" ></details-evaluate> -->

      <div class="Shop">
        <div class="shop_info">
          <span class="shop_head">
            <!-- <img :src="Evpath+goodsEvaluates[0].headImg" /> -->
          </span>
          <p class="shopName">{{shopInfo.shopName}}</p>
          <p class="shop">店铺星级</p>
        </div>
        <div class="shop_center">
          <div class="shop_cl">
            <p class="num">{{shopInfo.Collection}}</p>
            <p class="fensi">粉丝人数</p>
          </div>
          <div class="shop_cl">
            <p class="num">{{shopInfo.cGoods}}</p>
            <p class="fensi">全部商品</p>
          </div>
          <div class="shop_cr">
            <ul>
              <li>
                评价
                <span class="green">8.65 | 低</span>
              </li>
              <li>
                物流
                <span class="green">8.79 | 低</span>
              </li>
              <li>
                售后
                <span class="red">8.94 | 中</span>
              </li>
            </ul>
          </div>
        </div>
        <button @click="collectionStore" :class="{active:collectionActive}" class="gz">
          <i></i>关注店铺
        </button>
        <button class="jr">
          <i></i>进入店铺
        </button>
      </div>

      <div class="recommend">
        推荐
        <h1>11212</h1>
      </div>

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

    <details-tab-bar :addshopcart="addShop" @to-add-order="addOrder"></details-tab-bar>
  </div>
</template>

<script>
import $ from "jquery";
import Scroll from "components/contents/scroll/Scroll";
import DetailsRotation from "./childComp/DetailsRotation";

import NavBar from "components/common/navbar/NavBar";
import DetailsTabBar from "./childComp/DetailsTabBar";
// import DetailsEvaluate from "./childComp/DetailsEvaluate";
// 引入商品数据请求
import { getGoodsId } from "network/goods";
import { GoodsInfo, ShopInfo, SelectNorm,orderConfirmData } from "common/utils";

import { getuserAddress } from "network/address";
import { getGoodsSevaluate } from "network/goods";
import { addShopCart } from "network/shopCart";

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
      Evpath: "http://106.12.85.17:8090/public/image/evaluate/", //评价地址
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
      goodsImg: [],
      shopCeatgory: "自营",
      aa: true, //本地还是异地  true-本地   false-异地
      shopInfo: {},
      loading: false,
      selectNorm: {}, //规格数据
      // collectionActive:false,//查找用户是否存在改值
      evaluate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      Selected: false,
      freight: false,
      To: false,
      addre: "",
      free_freight: 0, //是否免运费 0 不免  1免
      shopCategory: "", //个体还是自营
      // allAddress: null
      goodsEvaluates: {}, //评价
      Ev_keyword: [],
      Ev_detailImg: [],
      Pingjia: [],
      orderSel: {
        norm: {},
        num: 1
      },
      isConfirm: true,
      confirmData:{},//用于储存当前详情页提交的数据
    };
  },
  components: {
    Scroll,
    DetailsRotation,
    NavBar,
    DetailsTabBar
    // DetailsEvaluate
  },
  created() {
    // this.addre =
    //   window.localStorage.getItem("jdItem") == null
    //     ? "河北"
    //     : window.localStorage.getItem("jdItem");

    console.log(localStorage.getItem("address"));

    this.getdata.exact.id = this.$route.params.id;
    this.getGoods(this.getdata.exact.id);

    this.toptabbar();
    this.setDate();
    this.setWeek();
    this.getAddr();
    this.getGoodsSevaluate();
    this.lookLocalStorage();
  },
  computed: {
    allAddress() {
      return this.$store.state.allAddress;
    },
    getDistributionTime() {
      let nowTime = new Date();
      let h = nowTime.getHours();
      let temp = "";
      // let nowMonth = nowTime.getMonth();
      // let nowDate = nowTime.getDate();
      // console.log(nowMonth + 1);

      if (this.shopCeatgory == "自营") {
        if (this.aa) {
          if (h >= 0 && h < 11) {
            temp = `在11:00前下单，预计今天送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23:00前下单，预计明天(${this.setDate(nowTime, 1)})送达`;
          }
          if (h >= 23) {
            temp = `在明天(11:00)下单，预计明天(${this.setDate(
              nowTime,
              1
            )})17:00送达`;
          }
        } else {
          //异地配送+2
          //个体
          if (h >= 0 && h < 11) {
            temp = `在11:00前下单，预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 2)})送达`;
          }
          if (h > 11 && h < 23) {
            temp = `在23:00前下单，预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 3)})送达`;
          }
          if (h >= 23) {
            temp = `在明天(11:00)下单，预计${this.setWeek(
              nowTime,
              3
            )}(${this.setDate(nowTime, 3)})17:00前送达`;
          }
        }
      } else {
        if (h >= 0 && h < 11) {
          temp = `在11:00前下单，预计送达`;
        }
        if (h > 11 && h < 23) {
          temp = `在23:00前下单，预计${this.setWeek(nowTime, 3)}(${this.setDate(
            nowTime,
            3
          )})送达`;
        }
        if (h >= 23) {
          temp = `在明天(11:00)下单，预计${this.setWeek(
            nowTime,
            3
          )}(${this.setDate(nowTime, 3)})送达`;
        }
      }
      return temp;
    },

    evaluateTime() {
      //评价时间
      let time = new Date();
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },
    collectionActive() {
      // let arr=this.$store.state.userInfo.['收藏的店铺key']；
      // let arr=[1,22,3,4];

      // Object.keys(对象)  返回一个数组，数组的值是对象的key的集合

      console.log(Object.keys(this.shopInfo).length);
      if (Object.keys(this.shopInfo).length > 0) {
        return [1, 2, 34, 6].indexOf(this.shopInfo.shopsId) != -1
          ? false
          : true;
      }
      return false;
    }
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
    toptabbar() {
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
          $(".details-nav-bar").css(
            "background-color",
            "rgba(255,255,255,0.5)"
          );
          $(".navbar").css("box-shadow", "none");
        } else {
          $(".tab-bar-center").slideUp("fast");
          $(".details-nav-bar").css("background-color", "transparent");
        }
      });
    },
    handleClose(done) {
      done();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getGoods(data) {
      this.loading = true;
      getGoodsId(data).then(res => {
        if (res.code != 200) return;
        // this.detailsGoods = res.data.goodsData;
        this.goodsImg = res.data.goodsData.img_detalis_list;
        console.log(this.goodsImg);

        this.detailsGoods = new GoodsInfo(
          res.data.goodsData,
          res.data.shopData
        );
        this.shopInfo = new ShopInfo(res.data.shopData);

        // 取规格数据
        this.selectNorm = new SelectNorm(
          res.data.norms,
          res.data.relationGoods
        );

        this.orderSel.norm = res.data.relationGoods[0].relation_keyword;

        this.shopCategory = res.data.shopData.category;

        this.free_freight = res.data.goodsData.free_freight == 0 ? false : true;

        this.confirmData=new orderConfirmData(
          res.data.goodsData,
          res.data.shopData
        )
        this.loading = false;
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
    },
    changeAddr(val) {
      let arr = val.split(",");

      this.addr = arr.join(" ");

      // 存到本地存储，存储的数据，不存截取后值
      let path = window.location.origin + "/jd";
      let data = window.localStorage.getItem(path);
      if (data != null) {
        data = JSON.parse(data);
      } else {
        data = {};
      }
      data.orderAddr = val;
      window.localStorage.setItem(path, JSON.stringify(data));
      this.To = false;
    },
    getAddr() {
      let data = window.localStorage.getItem(window.location.origin + "/jd");
      if (data != null && data != "") {
        data = JSON.parse(data);
        if (
          data.orderAddr != undefined &&
          data.orderAddr != null &&
          data.orderAddr != ""
        ) {
          this.addr = data.orderAddr;
        } else {
          this.addr = "北京市,北京市,昌平区,";
          data.orderAddr = "北京市,北京市,昌平区,";
        }
      } else {
        this.addr = "北京市,北京市,昌平区,";
        data = {};
        data.orderAddr = "北京市,北京市,昌平区,";
      }
      window.localStorage.setItem(
        window.location.origin + "/jd",
        JSON.stringify(data)
      );
    },
    // 从新获取日期
    setDate(nowTime = new Date(), day = 3) {
      let temp = new Date(nowTime.getTime() + day * 24 * 60 * 60 * 1000);
      temp = `${temp.getMonth() + 1}月${temp.getDate()}日`;
      console.log(temp);
      return temp;
    },

    // 重新获取星期几
    setWeek(nowTime = new Date(), day = 15) {
      let nowWeek = nowTime.getDay();
      let temp = "";
      if (nowWeek + day > 7) {
        temp = `下周${num(nowWeek + day - 7)}`;
      } else {
        temp = `本周${num(nowWeek + day)}`;
      }

      function num(val) {
        let a = "";
        switch (val % 7) {
          case 1:
            a = "一";
            break;
          case 2:
            a = "二";
            break;
          case 3:
            a = "三";
            break;
          case 4:
            a = "四";
            break;
          case 5:
            a = "五";
            break;
          case 6:
            a = "六";
            break;
          case 7:
            a = "七";
            break;
        }
        return a;
      }
      return temp;
    },
    open(val) {
      if (val == "Selected") {
        this.Selected = true;
        this.isConfirm = true;
      }

      if (val == "To") {
        this.To = true;
        if (!this.$store.state.userInfo) {
          this.$router.path("/login");
          return;
        }
        if (this.allAddress == null) {
          getuserAddress({ user_id: this.$store.state.userInfo.id }).then(
            res => {
              console.log(res);
              this.$store.state.allAddress = res.data;
            }
          );
        }
      }

      if (val == "freight") {
        this.freight = true;
      }
    },
    collectionStore() {
      if (this.$store.state.userInfo) {
        this.collectionActive = !this.collectionActive;
        if (this.collectionActive) {
          // 收藏
        } else {
          // 取消收藏
        }
      } else {
        // 跳转登录页面
        // 登录后在执行当前的方法
      }
    },
    getGoodsSevaluate() {
      getGoodsSevaluate({ goods_id: this.$route.params.id }).then(res => {
        console.log(res.data);
        this.goodsEvaluates = res.data;
        this.Pingjia.push(this.goodsEvaluates[0]);
        this.goodsEvaluates.forEach(list => {
          this.Ev_keyword = list.keyword.split(",");
          this.Ev_detailImg = list.evaluationImg.split(",");
        });
      });
    },
    order_Num() {
      this.orderSel.num++;
    },
    addShop() {
      let shopCart = {};
      shopCart.goods_id = this.getdata.exact.id;
      shopCart.user_id = this.$store.state.userInfo
        ? this.$store.state.userInfo.id
        : "";
      shopCart.num = this.orderSel.num;
      shopCart.norm = JSON.stringify(this.orderSel.norm);
      shopCart.takeover_addr = this.addr;
      if (this.$store.state.userInfo) {
        // 请求购物车
        console.log("用户存在");
        console.log(shopCart);
        addShopCart(shopCart).then(res => {
          console.log(res);
          if(res.data==200){
            alert("加入购物车成功")
          }
          
          this.$store.dispatch("getShopCart", this.$store.state.userInfo.id);
        });
      } else {
        //没用户，也能添加购物车
        console.log("用户不存在");
        let path = window.location.origin + "/jd";
        let data = window.localStorage.getItem(path);
        console.log(data);
        if (data != null && data != "") {
          data = JSON.parse(data);
          let temp = 0;
          console.log(data.shopCart);
          if (data.shopCart) {
            for (let i = 0; i < data.shopCart.length; i++) {
              if (
                data.shopCart[i].goods_id == shopCart.goods_id &&
                data.shopCart[i].norm == shopCart.norm &&
                data.shopCart[i].takeover_addr == shopCart.takeover_addr
              ) {
                data.shopCart[i].num += shopCart.num*1;
                break;
              }
              temp++;
            }
            if (temp == data.shopCart.length) {
              data.shopCart.push(shopCart);
            }
          } else {
            data.shopCart = [];
            data.shopCart.push(shopCart);
          }
        } else {
          data = {};
          data.shopCart = [];
          data.shopCart.push(shopCart);
        }
        this.calculationStorageShopNum(data.shopCart);
        window.localStorage.setItem(path, JSON.stringify(data));
        console.log(window.localStorage.getItem(path));
      }
    },
    // 去购买
    addOrder(val) {
      console.log("去购买");
      if (val == 1) {
        this.Selected = true;
        this.isConfirm = false;
      } else {
        this.confirm();
      }
    },
    confirm() {
      this.confirmData.num=this.orderSel.num;
      this.confirmData.norm=JSON.stringify(this.orderSel.norm);
      this.confirmData.takeover_addr=this.addr;
      this.$store.state.cartData=[this.confirmData];

       let data=window.localStorage.getItem(window.location.origin + "/jd")
        data=(data!=undefined && data!=null && data!="")?JSON.parse(data):{};

        data.cartData=this.$store.state.cartData;
        window.localStorage.setItem(window.location.origin + "/jd",JSON.stringify(data));
        
      this.$router.push('/confirm_order/aaa');
    },
    // 查看本地存储是否存有购物车数据
    lookLocalStorage() {
      if (!this.$store.state.userInfo) {
        let path = window.location.origin + "/jd";
        let data = window.localStorage.getItem(path);
        if (data == null || data == "") return;
        data = JSON.parse(data);
        if (!data.shopCart) return;
        this.calculationStorageShopNum(data.shop);
      }
    },
    // 用户未登录时，购物车数量
    calculationStorageShopNum(arr) {
      this.$store.state.shopCartLength = 0;
      arr.forEach(item => {
        this.$store.state.shopCartLength += item.num * 1;
      });
    },
    more(){
      this.$router.push("/allEvaluate/"+this.getdata.exact.id);
    },
  },
  filters: {
    changePrice(val, str) {
      if (arguments[1]) {
        //第二个参数有值
        return str + Number(val).toFixed(2);
      } else {
        //没值
        return Number(val).toFixed(2);
      }
    },
    // changeEvaluate(val){
    //   console.log(val);
    //   return val;
    // }
    changeAddr(val) {
      let addr = val.split(",").join(" ");
      return addr;
    },
    changeTime(val) {
      let time = val.getFullYear();
      return time;
    }
    // changeEvTime(val){
    //   // return val.replace(/(\w){1}(\w)[5,10]$/, "$1****$1");
    // }
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
    font-size: 12px;
  }
  .Dprice_box {
    .dprice {
      line-height: 30px;
      color: #f2270c;
      display: inline-block;
      font-size: 30px;
      font-weight: bold;
      float: left;
    }
    .oprice {
      text-decoration: line-through;
      font-size: 16px;
      margin-right: 40%;
      line-height: 32px;
    }
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
    line-height: 1px;
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
    span {
      color: #fff;
      padding: 2px 6px;
      border-radius: 7px;
      font-size: 12px;
      position: absolute;
      left: 6px;
      margin-top: 4px;
    }
  }
  .shopMessage .shopname {
    font-weight: 700;
    line-height: 21px;
    color: #262626;
    font-size: 16px;
    text-align: left;
    margin-left: 28px;
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
    .el-dialog {
      position: fixed;
      bottom: -50px;
      left: 0;
      right: 0;
    }
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
      .D-mj {
        height: 18px;
        line-height: 0;
        text-align: left;
        word-break: break-word;
        margin-bottom: 12px;
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
    .el-dialog__header {
      text-align: center;
    }
  }

  .Address,
  .evaluate,
  .Shop,
  .recommend {
    margin-top: 12px;
    padding: 0 18px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
    // height: 200px;
  }
  .Address {
    .el-dialog {
      position: fixed;
      bottom: -8%;
      left: 0;
      right: 0;
    }
    div.Address_box:first-child {
      margin-top: 5%;
    }
    div.Address_box:last-child {
      margin: 2%;
    }
    div.Address_box {
      width: 100%;
      margin-bottom: 5%;
      span {
        width: 20%;
        float: left;
        line-height: 50px;
        font-size: 12px;
        font-weight: bolder;
      }
      p.fuwu {
        font-size: 12px;
        color: #8c8c8c;
        float: left;
        margin-top: 6%;
      }
      div.toRight {
        float: right;
        width: 80%;
        p.dizhi {
          float: left;
          font-size: 13px;
          color: #262626;
          margin-top: 7%;
        }
        p.xianhuo {
          span {
            width: 20%;
            float: left;
            line-height: 50px;
            font-size: 12px;
            color: red;
            margin-left: -15%;
          }
        }
        p.jztime {
          float: left;
          font-size: 12px;
          color: #999;
          margin-top: 7%;
          margin-left: -5%;
        }
      }
      div.freight {
        .free {
          font-size: 12px;
          float: left;
          line-height: 26px;
        }
        ul {
          color: #262626;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          padding-left: 20px;
          li {
            padding: 3px 12px 3px 0;
            display: inline-block;
            line-height: 1;
            color: #8c8c8c;
          }
        }
      }
    }
  }
  .Shop {
    button {
      position: relative;
      margin: 0 13px 0 0;
      height: 30px;
      line-height: 24px;
      font-size: 12px;
      background-color: #fff;
      border: none;
      border-radius: 15px;
      border: 1px solid grey;
      width: 40%;
      margin-bottom: 20px;
    }
    button.gz {
      i {
        width: 14px;
        height: 14px;
        background: no-repeat 50%;
        background-size: 100%;
        position: relative;
        top: -2px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
        background-image: url("../../images/guanzhu.png");
      }
    }
    button.jr {
      i {
        width: 14px;
        height: 14px;
        background: no-repeat 50%;
        background-size: 100%;
        position: relative;
        top: -2px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
        background-image: url("../../images/jinru.png");
      }
    }
    button.active {
      border-color: red;
      color: red;
    }
    .shop_info {
      margin-bottom: 10px;
      margin-top: 10px;
      span.shop_head {
        background: pink;
        flex-shrink: 0;
        float: left;
        width: 40px;
        height: 40px;
        display: block;
        margin-right: 10px;
      }
      p.shopName,
      p.shop {
        text-align: left;
        font-size: 12px;
        color: #666;
      }
    }
    .shop_center {
      margin: 18px 0px;
      display: flex;
      .shop_cl {
        flex: 1;
        padding: 2px 0;
        text-align: center;
        p.num {
          font-size: 14px;
          margin-bottom: 3px;
        }
        p.fensi {
          font-size: 10px;
          color: #999;
          margin-top: 3px;
        }
      }
      .shop_cr {
        width: 25%;
        ul {
          margin-top: 12px;

          li {
            float: left;
            font-size: 10px;
            span.green {
              color: green;
              margin-left: 5px;
            }
            span.red {
              color: red;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .evaluate {
    position: relative;

    .ev_head {
      position: relative;
      height: 45px;
      line-height: 45px;
      color: #262626;
      padding-left: 8px;
      margin-top: 3px;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 15px;
        background-image: linear-gradient(180deg, #f5503a, #fad1cb);
      }
      .count {
        font-size: 12px;
        position: absolute;
        height: 45px;
        top: -11px;
        left: 45px;
        line-height: 45px;
      }
      .haoping {
        font-size: 12px;
        position: absolute;
        height: 45px;
        line-height: 45px;
        top: -14px;
        color: #8c8c8c;
        right: 15px;
      }
    }
    .ev_key {
      ul {
        li {
          float: left;
          background: #fcedeb;
          color: #000;
          font-size: 14px;
          padding: 5px 20px;
          border-radius: 50px;
          margin: 10px 10px;
        }
      }
    }
    .ev-con {
      float: left;
      width: 100%;
      margin-bottom: 40px;
      .ev-tou {
        img {
          width: 20px;
          height: 20px;
          display: block;
        }
        span {
          margin-left: 25px;
          display: inline-block;
          color: #262626;
          max-width: 8.2em;
          vertical-align: middle;
          font-size: 14px;
          margin-top: -18px;
        }
        p {
          float: right;
          font-size: 12px;
          color: #999;
          margin-top: -4%;
        }
      }
      .ev_detail {
        p {
          font-size: 13px;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }

      span {
        float: left;
        color: grey;
        font-size: 8px;
      }
    }
    .more {
      border: 1px solid;
      background: #fff;
      border-radius: 50px;
      padding: 5px 10px;
      font-size: 12px;
      position: absolute;
      bottom: 10px;
      left: 38%;
    }
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
  .selectedopen{
    padding-bottom:50px;
    .selectBtnBox{
      display:flex;
      position: absolute;
      left:0;
      right:0;
      bottom:40px;
      background-color:#fff;
      padding-bottom:5px;
      button{
        flex:1;
        margin:0 10px;
        border-radius: 25px;
        border:none;
        background-color:pink;
        color:#fff;
      } 
      button:nth-child(2){
        background-color:yellow;
        color:#000;
      }
    }
  }
}
</style>
