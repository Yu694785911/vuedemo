<template>
  <div id="CartTabBar">
    <!-- <tab-bar class='bar'>
        <tab-bar-item>
           <el-checkbox v-model="checked">备选项</el-checkbox>
            <div slot="item-text">全选</div>
        </tab-bar-item>
    </tab-bar>-->

    <!-- <el-checkbox v-model="checked" v-on:click="checkAll('all')" id="Allcheckbar">全选</el-checkbox> -->

    <!-- v-on:click="checkAll('all')" -->
    <div class="select-money">
      <label for="allCheck" v-on:click="$emit('checkall')">
        <input type="checkbox" id="allCheck" />全选
      </label>
    </div>

    <div class="allMoney">合计:{{totalPayment | changePrice("￥")}}</div>

    <div class="btn">
      <input type="submit" class="settlement" @click="$emit('confirm')" :value="'去结算('+totalNum+')'" :disabled='totalNum==0' :class='{disabled:totalNum==0}'/>
    </div>
  </div>
</template>

 <script>
// import TabBar  from 'components/common/tabbar/TabBar'
// import TabBarItem  from 'components/common/tabbar/TabBarItem'
export default {
  name: "DetailsTabBar",
  created(){
  },
  data() {
    return {
      checked: true
    };
  },
  components: {
    //组件
    // TabBar,
    // TabBarItem
  },
  computed: {
    paymentGoods(){
      return this.$store.state.paymentGoods;
    },
    totalPayment() {
      return this.$store.state.totalPayment;
    },
    totalNum() {
      return this.$store.state.totalNum;
    }
  },
  methods: {
    // checkAll(data) {
    //   this.$emit("check_all", data);
    // },
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    }
  }
};
</script>
<style lang='less'>
#CartTabBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 49px;
  background-color: #fff;
  box-shadow: 0 -1px 1 #dedede;
  display: flex;
  align-items: center;
  z-index: 1000;
  div.select-money {
    width: 70vw;
    display: flex;
    padding: 0 15px;
    input {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    .allMoney {
      margin-left: 20px;
    }
  }
  div.bar {
    position: static;
    min-width: 70vw;
    display: flex;
  }
  div.btn {
    max-width: 30vw;
    min-width: 30vw;
    display: flex;
    margin-top: 5px;
    input {
      flex: 1;
      margin: 0 3px;
      height: 40px;
      border-radius: 20px;
      font-size: 14px;
      padding: 0 13px;
      color: #fff;
      background: rgba(255,0,0,1);
      outline: none;
      border: none;
    }
    input.disabled{
      background: rgba(255,0,0,.3);
    }
  }
}
.el-checkbox__inner {
  border: 1px solid #000;
  border-radius: 50px;
  margin-left: 15px;
  width: 20px;
  height: 20px;
}
.el-checkbox__label {
  line-height: 50px;
  font-size: 18px;
}
.el-checkbox__inner {
  &::after {
    height: 8px;
    left: 5px;
    top: 3px;
    width: 5px;
  }
}
.el-checkbox__label {
  font-size: 12px;
}
.allMoney {
  font-size: 14px;
  margin-left: 60px;
  margin-right: 30px;
}
</style>
