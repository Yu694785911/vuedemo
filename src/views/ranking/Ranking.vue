<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <a :href="'http://localhost:8080/#/home'">&lt;</a>
      </div>
      <div slot="center">排行榜</div>
      <div slot="right">
        <el-col>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">...</span>
            <el-dropdown-menu
              slot="dropdown"
              style="width:100px;right:0;background:rgba(0,0,0,0.9)"
            >
              <el-dropdown-item style="font-weight:bold;color:#fff;">首页</el-dropdown-item>
              <el-dropdown-item style="font-weight:bold;color:#fff;">分类搜索</el-dropdown-item>
              <el-dropdown-item style="font-weight:bold;color:#fff;">购物车</el-dropdown-item>
              <el-dropdown-item style="font-weight:bold;color:#fff;">我的京东</el-dropdown-item>
              <el-dropdown-item style="font-weight:bold;color:#fff;">浏览记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
    </nav-bar>

    <!-- 导航栏 -->
    <div class="nav">
      <a href="#">手机</a>
      <a href="#">厨房小电</a>
      <a href="#">女装</a>
      <a href="#">休闲食品</a>
      <a href="#">面部护肤</a>
      <a href="#">粮油调味</a>
      <a href="#">大家电</a>
      <a href="#">五金工具</a>
      <a href="#">运动鞋包</a>
      <a href="#">电脑整机</a>
      <a href="#">饮料冲调</a>
      <a href="#">男装</a>
      <a href="#">时尚饰品</a>
      <a href="#">流行男鞋</a>
      <a href="#">生活电器</a>
      <a href="#">影音娱乐</a>
      <a href="#">奶粉</a>
      <a href="#">户外装备</a>
      <a href="#">进口食品</a>
      <a href="#">运动服饰</a>
    </div>

    <el-col class="aa">
      <el-dropdown trigger="click" class="gle">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>手机</el-dropdown-item>
          <el-dropdown-item>厨房小电</el-dropdown-item>
          <el-dropdown-item>女装</el-dropdown-item>
          <el-dropdown-item>休闲食品</el-dropdown-item>
          <el-dropdown-item>面部护肤</el-dropdown-item>
          <el-dropdown-item>粮油调味</el-dropdown-item>
          <el-dropdown-item>大家电</el-dropdown-item>
          <el-dropdown-item>五金工具</el-dropdown-item>
          <el-dropdown-item>运动鞋包</el-dropdown-item>
          <el-dropdown-item>电脑整机</el-dropdown-item>
          <el-dropdown-item>饮料冲调</el-dropdown-item>
          <el-dropdown-item>男装</el-dropdown-item>
          <el-dropdown-item>时尚饰品</el-dropdown-item>
          <el-dropdown-item>流行男鞋</el-dropdown-item>
          <el-dropdown-item>生活电器</el-dropdown-item>
          <el-dropdown-item>影音娱乐</el-dropdown-item>
          <el-dropdown-item>奶粉</el-dropdown-item>
          <el-dropdown-item>户外装备</el-dropdown-item>
          <el-dropdown-item>进口食品</el-dropdown-item>
          <el-dropdown-item>运动服饰</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="scrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <goods-list :cgoods="showGoodsList" :cpath="path" :cisDirection="parentDirection"></goods-list>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>

    <!-- <phb-tab-bar v-if="isphbTabBar"></phb-tab-bar> -->
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";

import GoodsList from "components/contents/goods/GoodsList";
// import PhbTabBar from "components/contents/PhbTabbar/PhbTabbar.vue";

import { get_jd_category_max } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/jd_category/",
      isShowBackTop: false,
      //接收商品的obj
      goods: {
        recommend: {
          page: 0,
          list: []
        },
        news: {
          page: 10,
          list: []
        }
      },
      tabCurrentType: "recommend",
      username: null,
      parentDirection: true,
      isphbTabBar:true
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList
  },
  created() {
    this.getGoodsMax("recommend");
    this.getGoodsMax("news");
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    }
  },
  methods: {
    getGoodsMax(type) {
      let page = this.goods[type].page + 1;
      get_jd_category_max(page).then(res => {
        // console.log(res);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res);
        this.$refs.scrollCom.scroll.finishPullUp();
        this.isLoadmore = true;
      });
    },
    HomeScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      // console.log(this.isShowBackTop);
    },
    toTop() {
      // console.log("回到顶部");
      this.$refs.scrollCom.scrollTo(0, 0, 300);
    },
    loadMore() {
      if (!this.isLoadmore) return;
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    toCategory() {
      this.$router.push("/category");
    },
    toSearch() {
      console.log(this.$router.push);
      this.$router.push({ path: "/search" });
    },
    goodsImageLoad() {
      alert("aaa");
    }
  },
  mounted() {
    console.log(this.$parent.isphbTabBar);
    this.$parent.isTabBar = false;
    this.$parent.isphbTabBar = true;
    this.$parent.isjxTabBar=false;
    this.$bus.$on("goodsImageLoad", () => {
      // this.$refs.scrollCom.refresh()
      this.$refs.scrollCom.scroll.refresh();
    });
  }
  // render(){
  //   this.$parent.isTabBar=true;
  //   this.$parent.isphbTabBar=false;
  // }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: #e43130;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.homeContent {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.souIpt {
  border-radius: 50px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 90%;
}

.toTop {
  position: absolute;
  bottom: 100px;
  right: 5px;
  /* background-color: red; */
  background-image: url(../../images/top.png);
  display: block;
  width: 40px;
  height: 40px;
  background-size: 100%;
}

.home-nav-bar {
  background: #fff;
  color: #000;
  display: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.nav {
  width: 90%;
  height: 35px;
  line-height: 35px;
  /*段落中文本不换行*/
  white-space: nowrap;
  /*阴影*/
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  /*设置横向滚动*/
  overflow-x: scroll;
  /*禁止纵向滚动*/
  overflow-y: hidden;
  /*文本平铺*/
  text-align: justify;
  /*背景颜色*/
  background: #fff;
  padding: 0px 5px;
  margin-bottom: 10px;
  /*设置边距改变效果为内缩*/
  box-sizing: border-box;
  margin-top: 50px;
}

.nav a {
  color: #505050;
  /*取消超链接下划线*/
  text-decoration: none;
  margin: 0 16px;
}

.nav::-webkit-scrollbar {
  /*隐藏滚动条*/
  display: none;
}
.aa {
  position: relative;
  top: 0;
  right: 0;
  width: 38px;
  height: 34px;
  background-color: #fff;
  z-index: 2;
  width: 10%;
  float: right;
}

.gle {
  position: absolute;
  background: #fff;
  margin: -33px 0 0;
  right: 10px;
  z-index: 10;
}

.el-dropdown-link {
  cursor: pointer;
  color: rgb(165, 169, 173);
}
.el-icon-arrow-down {
  font-size: 14px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.el-dropdown-menu__item {
  width: 90px;
  float: left;
  font-size: 12px;
  padding: 0;
}
</style>