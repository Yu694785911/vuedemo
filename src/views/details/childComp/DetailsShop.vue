<template>
  <div class='DetailsShop'>
       店铺
      <!-- {{detailsShop}} -->
      <!-- {{shopInfo.Collection}} -->
      <button @click="collectionStore" :class="{active:collectionActive}">收藏</button>
      <button>进入店铺</button>
  </div>
</template>

<script>
export default {
  name: "DetailsShop",
  props: {
    shopsinfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    //   show() {
    //   // console.log(this.shopsinfo);
    //   // console.log(this.shopsinfo != undefined);
    //   // console.log(this.shopsinfo != {});
    //   // console.log(this.shopsinfo != null);
    //   return (
    //     this.detailsShop == undefined ||
    //     this.detailsShop == {} ||
    //     this.detailsShop == null
    //   );
    // },
    // collectionActive() {
    //   // let arr=this.$store.state.userInfo.['收藏的店铺key']；
    //   // let arr=[1,22,3,4];

    //   // Object.keys(对象)  返回一个数组，数组的值是对象的key的集合
    //   console.log(this.shopInfo);
    //   console.log(Object.keys(this.shopInfo).length);
    //   if (Object.keys(this.shopInfo).length > 0) {
    //     return [1, 2, 34, 6].indexOf(this.shopInfo.shopsId) != -1
    //       ? false
    //       : true;
    //   }
    //   return false;
    // }
  },
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    collectionStore() {
      if (this.$store.state.userInfo) {
        this.collectionActive = !this.collectionActive;
        if (this.collectionActive) {
          // 收藏
        } else {
          // 取消收藏
        }
      } else {
        // 跳转登录页面
        // 登录后在执行当前的方法
      }
    }
  }
};
</script>
<style lang='less'>
.detailsShop {
  .Shop {
    button.active {
      background: red;
      color: #fff;
    }
  }
}
</style>
