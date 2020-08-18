<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/phb/phb1no.png" />
      <img slot="item-icon-active" src="~assets/img/phb/phb1active.png" />
      <div slot="item-text">热卖榜</div>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/phb/phb1no.png" />
      <img slot="item-icon-active" src="~assets/img/phb/phb2active.png" />
      <div slot="item-text">折扣榜</div>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/phb/phb1no.png" />
      <img slot="item-icon-active" src="~assets/img/phb/phb3active.png" />
      <div slot="item-text">活动榜</div>
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
