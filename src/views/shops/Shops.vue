<template>
  <div class="Shops">
    <div class="shop_top">
      <div class="head">
        <div class="img_Box">
          <img src alt />
        </div>
        <div class="title">{{shopname[0].shopName}}</div>
        <span class="xj">店铺星级:{{shopname[0].level}}</span>
        <span class="fl">{{shopname[0].category}}</span>

        <button class="shoucang">收藏</button>
        <p class="sc">1万人收藏</p>
        <!--<button title="更多"></button>-->
      </div>

      <div class="nav">
        <button>
          <img src="../../images/fdj.png" alt />
          搜商品
        </button>
        <ul>
          <router-link
            tag="li"
            v-for="(item,index) in nav"
            :key="index"
            :to="item.path"
            @click.native="change(index)"
            :class="{ active:index===num}"
          >{{item.name}}</router-link>
          <!-- <router-link tag="li" to="commodity"><a>商品</a></router-link>
          <router-link tag="li" to="news"><a>新品</a></router-link>
          <router-link tag="li" to="buyshow"><a>买家秀</a></router-link>
          <router-link tag="li" to="dynamic"><a>动态</a></router-link>-->
        </ul>
      </div>
    </div>

    <div class="shop_con">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getShops } from "network/shops";
import $ from "jquery";
export default {
  name: "Shops",
  data() {
    return {
      num: 0,
      shopname: null,
      nav: [
        {
          path: "selected",
          name: "精选"
        },
        {
          path: "commodity",
          name: "商品"
        },
        {
          path: "news",
          name: "新品"
        },
        {
          path: "buyshow",
          name: "买家秀"
        },
        {
          path: "dynamic",
          name: "动态"
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {
    console.log(this.$route.params.id);
    $(window).scroll(function() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //  console.log(scrollTop);
      if (scrollTop > 150) {
        //  console.log($("div.nav"));
        $("div.nav").css({
          position: "fixed",
          top: "0",
          width: "100%",
          height: "40px",
          background:
            "repeating-linear-gradient(45deg, black, transparent 100px)",
          zIndex: "500000"
        });
      } else {
        $(".shop_top").css({ position: "relative" });
        $("div.nav").css({
          position: "absolute",
          width: "100%",
          height: "40px",
          top: "73%",
          left: "0",
          bottom: "0",
          right: "0",
          float: "left",
          background: "none"
        });
      }
    });

    getShops({ id: this.$route.params.id }).then(res => {
      console.log(res.data);
      this.shopname = res.data;
      console.log(this.shopname[0].shopName);
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    change(index) {
      this.num = index;
    }
  }
};
</script>
<style lang='less' scope>
.Shops {
  height: 1000px;
  .shop_top {
    width: 100%;
    height: 150px;
    position: relative;
    background: repeating-linear-gradient(45deg, black, transparent 100px);
    .head {
      padding-top: 20px;
      position: relative;
      .img_Box {
        width: 50px;
        height: 50px;
        border: 1px solid #fff;
        margin-left: 10px;
      }
      .title {
        float: left;
        font-size: 20px;
        line-height: 21px;
        color: #fff;
        margin-left: 5px;
        position: absolute;
        top: 32%;
        left: 18%;
      }
      span.xj {
        position: absolute;
        top: 72%;
        left: 20%;
        font-size: 12px;
        color: #fff;
      }
      span.fl {
        font-size: 6px;
        padding: 1px 2px;
        background: grey;
        color: #fff;
        position: absolute;
        top: 93%;
        left: 20%;
      }
      .shoucang {
        position: absolute;
        top: 32%;
        left: 70%;
        background: #e93b3d;
        border-color: #e93b3d;
        border-radius: 15px;
        border: none;
        outline: none;
        color: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 14px;
      }
      p.sc {
        float: right;
        font-size: 12px;
        position: absolute;
        right: 15%;
        top: 64%;
        color: #fff;
      }
    }
    .nav {
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      right: 0;
      float: left;
      button {
        margin-top: 5px;
        height: 30px;
        border-radius: 15px;
        border: none;
        float: left;
        font-size: 14px;
        color: #999;
        padding: 0 15px;
        img {
          width: 15px;
          height: 15px;
        }
      }
      ul {
        height: 40px;
        line-height: 40px;
        li:first-child {
          margin-left: 30px;
        }
        .active {
          color: #000;
        }
        li {
          float: left;
          text-align: center;
          color: #fff;
          margin-left: 20px;
          font-size: 14px;
          li.active {
            color: #000;
          }
          span {
            width: 28px;
            height: 2px;
            background: red;
            display: block;
            position: absolute;
            top: 71%;
            left: 33%;
          }
        }
      }
    }
  }
}
</style>
