<template>
  <div id="app">
    <!-- 
      缓存中会存有数据记录，所以
    -->
    <keep-alive :exclude="$store.state.keepExclude">
      <router-view />
    </keep-alive>
    <main-tab-bar v-if="$store.state.TabBar.isTabBar"></main-tab-bar>
    <phb-tab-bar v-if="$store.state.TabBar.isphbTabBar"></phb-tab-bar>
    <jx-tab-bar v-if="$store.state.TabBar.isjxTabBar"></jx-tab-bar>
    <xq-tab-bar v-if="$store.state.TabBar.isxqTabBar"></xq-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/contents/MainTabbar/MainTabbar.vue";
import PhbTabBar from "components/contents/PhbTabbar/PhbTabbar.vue";
import JxTabBar from "components/contents/JxTabbar/JxTabBar.vue";
import XqTabBar from "components/contents/XqTabBar/XqTabBar.vue";
import { requestIp } from "network/request";
import { autoLand } from "network/login";

export default {
  name: "App",
  data() {
    return {
      // isTabBar: true,
      // isphbTabBar:false,
      // isjxTabBar:false,
      // isxqTabBar:false,
      // userId:null,
      // userInfo:1,
      // keepExclude:'Details,Cart,Home,Jx',
      // keepInclude:'',
    };
  },
  components: {
    MainTabBar,
    PhbTabBar,
    JxTabBar,
    XqTabBar
  },

  watch: {
    // isTabBar(newVal,oldVal){
    //   alert(newVal,oldVal)
    // }
  },
  created() {
    requestIp().then(res => {
      // 判断是否有用户登录，如果没有用户登录，则配送为获取的地址
      if (!this.user) {
        this.$store.state.ShoppingAddress = eval(
          "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
        ).cname;
      }
      // console.log(res);
      // // indexOf 查下标  slice 截取  从下标+1的位置  开始 到下标-1的位置结束
      // console.log(eval("("+res.slice(res.indexOf('=')+1,res.length-1)+")"));
      // console.log(eval("("+res.slice(res.indexOf('=')+1,res.length-1)+")").cname);

      this.$store.state.city = eval(
        "(" + res.slice(res.indexOf("=") + 1, res.length - 1) + ")"
      ).cname;
    });

    console.log(localStorage.autocode);

    if (localStorage.autocode) {
      autoLand({ autocode: localStorage.autocode }).then(res => {
        if (res.code != 200) return;
        localStorage.setItem("autocode", res.data.user.autocode);
        // this.$store.state.userInfo.defaddr = res.data.defaddr;
        this.$store.state.userInfo.id = res.data.user.id;
        // for (let j in res.data.user) {
        //   this.$store.state.userInfo.id = res.data.user[j].id;
        // }
        console.log(res.data.user.id);
        console.log(this.$store.state.userInfo);
        console.log(this.$store.state.userInfo.id);
      });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo != null
        ? this.$store.state.userInfo
        : null;
    },
    user() {
      return (
        this.userInfo != "" &&
        this.userInfo != null &&
        this.userInfo != undefined
      );
    }
  },
  methods: {
    // 获取购物车数据
    getShopCart() {
      this.$store.dispatch("getShopCart", this.$store.state.userInfo);
    }
  }
};
</script>


<style>
@import "assets/css/base.css";
#app {
  height: 100vh;
}
</style>
