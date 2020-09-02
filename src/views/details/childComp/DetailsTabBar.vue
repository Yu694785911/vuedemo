<template>
  <div id="DetailsTabBar">
    <!-- <tab-bar class='bar'>
        <tab-bar-item>
            <img slot="item-icon" src="../../../images/kefu.png" />
            <div slot="item-text">客服</div>
        </tab-bar-item>
        <tab-bar-item>
            <img slot="item-icon" src="../../../images/dianpu.png" />
            <div slot="item-text">店铺</div>
        </tab-bar-item>
        <tab-bar-item path='/cart'>
            <img slot="item-icon" src="../../../images/gouwuche.png" />
            <div slot="item-text" class='cart'>
              购物车
              <i>{{$store.state.shopCartLength}}</i>
            </div>
        </tab-bar-item>
    </tab-bar>-->
    <div class="DetailsTb">
      <div class="DTB">
        <img slot="item-icon" src="../../../images/kefu.png" />
        <div slot="item-text">客服</div>
      </div>

      <div class="DTB">
        <img slot="item-icon" src="../../../images/dianpu.png" />
        <div slot="item-text">店铺</div>
      </div>

      <div class="DTB" path="/cart" @click="itemClick">
        <img slot="item-icon" src="../../../images/gouwuche.png" />
        <div slot="item-text" class="cart">
          购物车
          <i>{{shopCartLength}}</i>
        </div>
      </div>
    </div>
    <div class="btnAll">
      <!-- <router-link tag="button" to="/cart">
        <span>加入购物车</span>
      </router-link>-->

      <button v-on:click="shopcart">
        <span>加入购物车</span>
      </button>

      <!-- <router-link tag="button" to="payload" class="payload" >
        <span>立即购买</span>
      </router-link>-->

      <button class="payload" v-on:click="$emit('to-add-order',1)">
        <span>立即购买</span>
      </button>
    </div>
  </div>
</template>

<script>
// import TabBar  from 'components/common/tabbar/TabBar'
// import TabBarItem  from 'components/common/tabbar/TabBarItem'
export default {
  name: "DetailsTabBar",
  data() {
    return {};
  },
  components: {
    //组件
    // TabBar,
    // TabBarItem
  },
  computed: {
    shopCartLength() {
      return this.$store.state.shopCartLength;
    }
  },
  methods: {
    itemClick() {
      console.log(this.path);
      // this.isActive=!this.isActive
      //路由跳转
      this.$router.push({ path: "/cart" });
    },
    shopcart() {
      this.$parent.addShop();
    }
  },
  created() {
    if (
      (this.userInfo != "" ||
        this.userInfo != null ||
        this.userInfo != undefined) &&
      this.shopCartLength == 0
    ) {
      this.$store.dispatch("getShopCart", this.$store.state.userInfo);
    }
  }
};
</script>
<style lang='less' scoped>
.DTB {
  // flex: 1;
  width: 30%;
  float: left;
  text-align: center;
  height: 49px;
  font-size: 14px;
  i {
    font-style: normal;
    position: absolute;
    top: 0;
    left: 33%;
    color: red;
  }
}
.DTB img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
.DetailsTb {
  // display: flex;
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background-color:white;
  width: 40%;
}

#DetailsTabBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background-color: #fff;
  box-shadow: 0 -1px 1 #dedede;
  display: flex;
  div.bar {
    position: static;
    min-width: 45vw;
    display: flex;
    div {
      position: relative;
      i {
        position: absolute;
        right: 0;
        bottom: 35px;
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        line-height: 22px;
        text-align: center;
        color: #fff;
        background-color: red;
        font-style: normal;
      }
    }
  }
  div.btnAll {
    max-width: 55vw;
    min-width: 30vw;
    flex: 1;
    display: flex;
    button {
      flex: 1;
      margin: 0 3px;
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
      padding: 0 13px;
      color: #fff;
      background: red;
      outline: none;
      border: none;
      span {
        display: block;
        min-width: 14px;
        overflow: hidden;
        height: 14px;
      }
    }
    button.payload {
      background-image: linear-gradient(135deg, #ffba0d, #ffc30d 69%, #ffcf0d);
      color: #000;
    }
  }
}
</style>
