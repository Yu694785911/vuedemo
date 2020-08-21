<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left">
        <a
          :href="'http://localhost:8080/#/category'"
          style="border-top: 10px double #fff;width: 23px;padding-top: 5px;border-bottom: 3px solid #fff;margin-top: 13px;
margin-left: 8px;display:block;"
        ></a>
      </div>
      <div slot="center">
        <i class="jd"></i>
        <i class="fangdajing"></i>
        <div class="search-box">
          <input type="text" placeholder="雅马哈电钢琴" v-on:focus="routerTo('/keyword')"/>
        </div> 
        <!-- <input v-model="input" placeholder="请输入内容" class="souIpt"  /> -->
      </div>
      <div slot="right">
        <!-- 登录前 -->
        <span v-if="!$store.state.userInfo" @click="routerTo('/login')">登录</span>

        <!-- 登录后 -->
        <span v-else class="el-icon-s-custom" @click="routerTo('/profile')"></span>
        </div>
    </nav-bar>
    <hr />

    <scroll
      class="homeContent"
      :probeType="3"
      @parentScroll="HomeScroll"
      ref="HomeScrollCom"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-rotation :cbanners="banners"></home-rotation>
      <hr />
      <img src="../../images/home-b.png.webp" alt="" style="width:100%">
      <!-- 功能视图 -->
      <home-feature :cfeature="feature"></home-feature>
      <hr />

      <div>
        <button style="width:100%" @click="changeDirection">改变商品数据排列</button>
      </div>

      <div class="tabContent">
        <div class="tabTitle">
          <button @click="tabClick('recommend')">recommend</button>
          <button @click="tabClick('news')">news</button>
        </div>

        <goods-list :cgoods="showGoodsList" :cpath="path" :cisDirection="parentDirection"></goods-list>
        <!-- <goods-list :cgoods="goods" :cpath="path"></goods-list> -->
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>

    <main-tab-bar v-if="isTabBar"></main-tab-bar>
  </div>
</template>

<script>
//引入公共组件
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目....
import Scroll from "components/contents/scroll/Scroll";

import GoodsList from "components/contents/goods/GoodsList";
// import GoodsList1 from "components/contents/goods/GoodsList1";
//引入当前组件的子组件
import HomeRotation from "./childComp/HomeRotation";
import HomeFeature from "./childComp/HomeFeature";
import MainTabBar from "components/contents/MainTabbar/MainTabbar";
// import MainTabBar from "components/contents/MainTabbar/MainTabbar.vue";
// import {getHomeBanner} from "network/home"
//引入其他文件
//引入网络请求模块部分组件/方法
import { getHomeBanner, getFeature } from "network/home";

// 取商品数据
import { getGoods } from "network/goods";
import { ROUTERTO,SET_USERINFO} from "store/mutation-types";

import { debounce } from "common/utils.js";
import { autoLand } from "network/login";
export default {
  name: "Home",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/jd_category/",
      banners: null,
      feature: [],
      aaa: 100.1111,
      input: "",
      num: 500,
      isShowBackTop: false,
      isTabBar: true,
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
      // bus:"Home"
      saveY: 0
    };
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    // GoodsList1,
    HomeRotation,
    HomeFeature,
    MainTabBar
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getHomeBanner();
    //获取功能视图数据
    this.getFeature();
    // var arr = [1,2,3,4,5]
    // this.filterFeatrue(100)
    this.getGoodsMax("recommend");
    this.getGoodsMax("news");
    this.getShopCart("getShopCart",this.$store.state.userInfo);

    if(!this.$store.state.userInfo){
      this.auto_code();
    }
  },
  activated() {
    this.$refs.HomeScrollCom.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.HomeScrollCom.scroll.refresh();

    // this.refresh.HomeScrollCom.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.HomeScrollCom.scroll.y;
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    }
  },
  methods: {
    //去banner的数据
    getHomeBanner() {
      getHomeBanner().then(res => {
        // console.log(res);
        this.banners = res.data;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getFeature() {
      let that = this;
      getFeature().then(res => {
        // console.log(res);
        if (res.code != 200) return;
        let arr = res.data;
        for (let i = 0; i < arr.length / 10; i++) {
          that.feature.push([]);
          // arr.map((item,index)=>{
          //   parseInt(index/10) == i ? that.feature[i].push(item):""
          // })
          arr.forEach((item, index) => {
            parseInt(index / 10) == i ? that.feature[i].push(item) : "";
          });
        }
        // console.log(this.feature);
      });
    },
    //home页面的商品数据请求
    getGoodsMax(type) {
      // let page = this.goods[type].page + 1;
      let data = {
        page: this.goods[type].page + 1,
        pageSize: 10
      };
      getGoods(data).then(res => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.HomeScrollCom.finishPullUp();
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
      this.$refs.HomeScrollCom.scrollTo(0, 0, 300);
    },
    loadMore() {
      if (!this.isLoadmore) return;
      this.isLoadmore = false;
      this.getGoodsMax(this.tabCurrentType);
    },
    tabClick(type) {
      this.tabCurrentType = type;
      if (!this.goods[type].list.length) {
        this.getGoodsMax(type);
      }
    },
    toCategory() {
      this.$store.commit(ROUTERTO,"/category");
      // this.$router.push("/category");
    },
    routerTo(path){
      this.$store.commit(ROUTERTO,path);
    },
    changeDirection() {
      this.parentDirection = !this.parentDirection;
    },
    getShopCart(data){
      if(data!=""&& data!=null && data!=undefined){
        this.$store.dispatch("getShopCart",data)
      }
    },
    // 默认进入页面的时候
    auto_code(){
      let path=window.location.origin+'/jd';
      let autocode=window.localStorage.getItem(path);
      autoLand({
        autocode:autocode
      }).then(res=>{
        console.log(res);
        if(res.code!=200) return;
        this.$store.commit(SET_USERINFO,res)
        this.getShopCart(res.data.user.id);
      })
    }
  },
    beforeRouteLeave(to, from, next) {
      // 如果取得页面时login页面，则记录页面
    if(to.path=='/login'){
      this.$store.state.loginHistory=from.path;
    }
    next();
  },
  mounted() {
    this.$parent.isTabBar = true;
    this.$parent.isjxTabBar = false;
    this.$parent.isphbTabBar = false;
    this.$parent.isxqTabBar = false;

    const refresh = debounce(this.$refs.HomeScrollCom.refresh, 50);
    this.$bus.$on("goodsImageLoad", () => {
      return refresh();
      // 当图片加载完成，在GoddsListItem中通过$bus总线，执行当前方法 goodsImageLoad,
      // 然后对BScroll， 进行重新计算高度

      // this.$refs.HomeScrollCom找到 scroll组件，但是组件中没有
      // this.$refs.HomeScrollCom.scroll.refresh()

      // 或者在scroll组件中定义一个refresh方法
      // this.$refs.HomeScrollCom.refresh()
    });
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-image: linear-gradient(
    122deg,
    #ff8b58 0,
    #ff3e3e 41%,
    #ff203c 100%
  );
  height: 204px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 100%/0 0 20% 20%;
}
.homeContent {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.center i.jd {
  width: 20px;
  height: 15px;
  background: url("../../images/jd.png") no-repeat;
  background-size: 20px 15px;
  margin: 14px 8px 0 20px;
  position: relative;
  z-index: 1;
  float: left;
}
.center i.jd::after {
  content: "";
  position: absolute;
  border-right: 1px solid #ddd;
  top: 0;
  left: 26px;
  height: 16px;
}
.center .fangdajing {
  display: block;
  width: 18px;
  height: 15px;
  background: url("../../images/tu.png") no-repeat;
  background-position: -80px 0;
  background-size: 200px;
  margin: 14px 0 0 0;
  position: relative;
  z-index: 1;
  float: left;
}
.center .search-box {
  display: inline-block;
  width: 70%;
  border: none;
  border-radius: 15px;
  height: 30px;
  overflow: hidden;
  background: #f7f7f7;
  font-size: 12px;
  -webkit-box-align: center;
  line-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1.8% 15%;
  padding-right: 10px;
  box-sizing: border-box;
}
.center .search-box input {
  border: none;
  outline: 0;
  background: 0 0;
  font-size: 12px;
  color: #232326;
  padding-left: 55px;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  height: auto;
  margin: 0 0 0 5px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
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
.tabContent {
  display: flex;
  flex-wrap: wrap;
}
.tabContent .tabTitle {
  width: 100%;
  display: flex;
}
.tabContent .tabTitle button {
  width: 50%;
  height: 64px;
  flex: 1;
  border: none;
}
.tabContent div {
  width: 100%;
  background: #fff;
}
.tabContent div ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
/* .tabContent div ul li{
  width:95%;
  margin:0 2.5%;
 

}
.tabContent div ul li img{
  width:40%;
}
.tabContent div ul li a{
  width:100%; 
  display: flex;
}
.tabContent div ul li a span{
  width:58%;
  padding:1%;
} */
.tabContent div ul li {
  width: 50%;
}
.tabContent div ul li img {
  width: 60%;
  margin: 0 20%;
}
.tabContent div ul li span {
  width: 98%;
}
.tabTitle button:first-child {
  border-right: 1px solid grey;
}
</style>