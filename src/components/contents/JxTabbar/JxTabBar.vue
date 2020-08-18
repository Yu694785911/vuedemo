<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/jx/jx-tabbar1no.png.webp" />
      <img slot="item-icon-active" src="~assets/img/jx/jx-tabbar1active.png.webp" />
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/jx/jx-tabbar2no.png.webp" />
      <img slot="item-icon-active" src="~assets/img/jx/jx-tabbar2active.png.webp" />
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/jx/jx-tabbar3no.png.webp" />
      <img slot="item-icon-active" src="~assets/img/jx/jx-tabbar3active.png.webp" />
      <div slot="item-text">直播</div>
    </tab-bar-item>

     <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/jx/jx-tabbar4no.png.webp" />
      <img slot="item-icon-active" src="~assets/img/jx/jx-tabbar4active.png.webp" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>


<script>
// TabBar 插槽组件
// 调用了 webpack.base.conf.js  中的 resolve("src")函数
// components   webpack的别名中配置的名字
import TabBar from "components/common/tabbar/Tabbar.vue";
// TabBarItem插槽组件
import TabBarItem from "components/common/tabbar/TabbarItem.vue";

export default {
  name: "MainTabbar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>


<style scoped>
</style>
