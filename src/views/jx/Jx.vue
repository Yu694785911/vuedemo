<template>
  <div id="jx">
    <tab-control
      :titleArr="titleArr"
      :column="titleArr.length"
      @tabClick="tabClick"
      res="tabCon1"
      :class="{fixed:true}"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="jxContent"
      :probeType="3"
      @parentScroll="positionScroll"
      ref="scrollCom1"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <nav-bar class="jx-nav-bar">
        <div slot="left" @click="$router.go(-1)">
          <a class="el-icon-arrow-left"></a>
        </div>
        <div slot="center">
          <input v-model="input" placeholder="请输入内容" class="souIpt" v-on:focus="toSearch" />
        </div>
        <div slot="right">登录</div>
      </nav-bar>
      <hr />

      <!-- 轮播图 -->
      <jx-rotation :cbanners="banners" @imgLoad="bannerImgLoad"></jx-rotation>
      <hr />
      <!-- 功能视图 -->
      <jx-feature :cfeature="feature"></jx-feature>
      <hr />

      <div style="height:5000px">
        <tab-control
          :titleArr="titleArr"
          :column="titleArr.length"
          @tabClick="tabClick"
          res="tabCon2"
        ></tab-control>
        <goods-list
          :cgoods="showGoodsList"
          :cpath="path"
          :cisDirection="parentDirection"
          :bus="bus"
        ></goods-list>
      </div>
    </scroll>
    <a class="toTop" @click="toTop" v-if="isShowBackTop"></a>
  </div>
</template>

<script>
//引入公共组件
import NavBar from "components/common/navbar/NavBar";
//引入公共组件中跟项目....
import Scroll from "components/contents/scroll/Scroll";
import TabControl from "components/contents/tabControl/jxTabControl";

import GoodsList from "components/contents/goods/GoodsList";
// import GoodsList1 from "components/contents/goods/GoodsList1";
//引入当前组件的子组件
// import {getHomeBanner} from "network/home"
import JxRotation from "./childComp/JxRotation.vue";
import JxFeature from "./childComp/JxFeature.vue";

// import JxTabBar from "components/contents/JxTabbar/JxTabBar.vue";
//引入其他文件
//引入网络请求模块部分组件/方法
import { getJxBanner, getJxFeature} from "network/jx";
import { getGoods} from "network/goods";
export default {
  name: "Jx",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image",
      banners: null,
      feature: [],
      aaa: 100.1111,
      input: "",
      num: 500,
      isjxTabBar: false,
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
      titleArr: ["进入推荐", "京东商城"],
      tabCurrentType: "recommend",
      username: null,
      parentDirection: true, //是否独占一行
      bus: "",
      isTabFixed: false, //tab是否坐定位
      tabOffsetTop: 0
    };
  },
  components: {
    NavBar,
    TabControl,
    Scroll,
    GoodsList,
    JxRotation,
    JxFeature
  },
  created() {
    //vue实例在创建时的钩子函数
    //页面在创建的时候，我们需要请求数据
    this.getJxBanner();
    //获取功能视图数据
    this.getJxFeature();

    //获取高度
  },
  computed: {
    showGoodsList() {
      return this.goods[this.tabCurrentType].list;
    }
  },
  watch: {
    isTabFixed(newVal) {
      console.log(newVal);
      if (newVal) {
        this.$refs.tabCon1.$el.style.width = "414px";
        this.$refs.tabCon1.handleDom();
      }
    }
  },
  methods: {
    //去banner的数据
    getJxBanner() {
      getJxBanner().then(res => {
        console.log(res);
        this.banners = res.data;
        // this.banners = {...res}//解构赋值
      });
    },
    //定义功能视图的数据
    getJxFeature() {
      let that = this;
      getJxFeature().then(res => {
        // console.log(res);
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
     let data = {
        page:this.goods[type].page + 1
      }
      getGoods(data).then((res) => {
        // console.log(res);
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data);
        this.$refs.jxScrollCom.finishpullup();
        console.log(this.$refs.jxScrollCom);
        this.isLoadmore = true; //获取到一次数据后isLoadmore 才变为true，才能进行下一次请求
      });
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
    // tabClick(type) {
    //   this.tabCurrentType = type;
    //   if (!this.goods[type].list.length) {
    //     this.getGoodsMax(type);
    //   }
    // },
    tabClick(index) {
      switch (index) {
        case 0:
          this.tabCurrentType = "recommend";
          break;
        case 1:
          this.tabCurrentType = "jd";
          break;
      }
      this.$refs.tabCon1.itemIndex = index;
      this.$refs.tabCon2.itemIndex = index;
    },
    bannerImgLoad() {
      this.tabOffsetTop = this.$refs.tabCon2.$el.offsetTop + 100;
    },
    positionScroll(position) {
      this.isTabFixed = -position.y > this.tabOffsetTop;
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
    this.$parent.isTabBar = false;
    this.$parent.isjxTabBar = true;
    this.$parent.isphbTabBar = false;
    this.$parent.isxqTabBar = false;
    
    this.getGoodsMax("recommend");
    this.getGoodsMax("jd");

    this.$bus.$on("goodsImageLoad1", () => {
      this.$refs.scrollCom1.refresh();
    });
  }
};
</script>
<style scoped>
#jx {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.jx-nav-bar {
  background-color: #e43130;
  color: white;
}
.jxContent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
}
.tabCon1{
  width:98%;
  z-index:10;
  left:0;
  top:0;
  right: 0;
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

.fixed {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
</style>