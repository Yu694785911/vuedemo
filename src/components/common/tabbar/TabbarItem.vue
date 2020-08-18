<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
    <!-- 用来插图片 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <!-- 用来插入选中后的图片 -->
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <!-- 文本 -->
    <div>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    //接收父组件传递的path值
    path: {
      type: String
    },
    cstyle: {
      type: Object,
      default() {
        return {
          bgcolor: "transparent",
          activeBG: "transparent",
          color: "black",
          activeTxt: "red"
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    // 通过计算属性来让tabbar效果改变
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive
        ? { color: this.cstyle.activeTxt, background: this.cstyle.activeBG }
        : { color: this.cstyle.color, background: this.cstyle.bgcolor };
    }
    // this.$router.path
    // 计算路由地址是否和当前的tabbar相同
  },
  methods: {
    itemClick() {
      console.log(this.path);
      this.$router.push(this.path);



      // if (this.path == "/profile" && this.$store.state.userInfo != null) {
      //   this.$router.push("/profile");
      // } else if (this.path == "/profile" && this.$store.state.userInfo == null) {
      //   this.$router.push("/login");
      // }
      // this.isActive=!this.isActive
      //路由跳转
    }
  }
};
</script>


<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
/* .active {
  color: brown;
} */
</style>
