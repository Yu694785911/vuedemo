<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/details/kefu.png" />
      <div slot="item-text">客服</div>
    </tab-bar-item>

    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/details/dianpu.png" />
      <div slot="item-text">店铺</div>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/details/gouwuche.png" />
      <div slot="item-text">购物车</div>
      <!-- <i>{{$store.state.shopCartLength}}</i> -->
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <div slot="item-text">
        <el-button type="danger" round>加入购物车</el-button>
        <i></i>
      </div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <div slot="item-text">
        <el-button type="warning" round>立即购买</el-button>
      </div>
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
  name: "XqTabbar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>


<style scoped>
.el-button.is-round {
  margin-top: 5px;
}
.de_btn_wrap .btn {
  margin: 6px 5px 0 0;
  height: 38px;
  width: 105px;
}
.el-button--danger {
  background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
}
.el-button--warning {
  background-image: linear-gradient(135deg, #ffba0d, #ffc30d 69%, #ffcf0d);
}
</style>
 