<template>
  <tab-bar>
    <tab-bar-item v-for="item in tabBarArr" :key="item.id" :path="item.path">
      <img slot="item-icon" :src="urlpath+'/tabbar/'+item.img" />
      <img slot="item-icon-active" :src="urlpath+'/tabbar/'+item.activeImg" />
      <div slot="item-text">{{item.title}}</div>
    </tab-bar-item>

    <!-- <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/Jx">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
      <div slot="item-text">惊喜</div>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" />
      <div slot="item-text">我的</div>
    </tab-bar-item> -->
  </tab-bar>
</template>


<script>
// TabBar 插槽组件
// 调用了 webpack.base.conf.js  中的 resolve("src")函数
// components   webpack的别名中配置的名字
import TabBar from "components/common/tabbar/Tabbar.vue";
// TabBarItem插槽组件
import TabBarItem from "components/common/tabbar/TabbarItem.vue";
import {getTabBar} from 'network/tabbar'
export default {
  name: "MainTabbar",
  data(){
    return{
      urlpath:"http://106.12.85.17:8090/public/image",
      tabBarArr:[],
    }
  },
  
  created(){
    this.getTabBar()
  },
  components: {
    TabBar,
    TabBarItem
  },
  methods:{
    getTabBar(){
      getTabBar().then(res=>{
        this.tabBarArr=[...res.data]
        })
    }
  }
};
</script>


<style scoped>
</style>
