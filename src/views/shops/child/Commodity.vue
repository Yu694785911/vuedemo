<template>
  <div class="Commodity">
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="默认" name="first">
          <div class="default">
            <ul>
              <li v-for="(item,index) in getShopGoods" :key="index">
                <a href>
                  <img :src="path+item.img_cover" alt />
                  <p class="de_name">{{item.name}}</p>
                  <span class="de_monnow">￥{{item.money_now}}</span>
                  <span class="de_yh">{{item.hot_keyword}}</span>
                </a>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售" name="second">销售</el-tab-pane>
        <el-tab-pane label="价格" name="third">价格</el-tab-pane>
        <el-tab-pane label="上新" name="fourth">上新</el-tab-pane>
        <el-tab-pane label="京东物流" name="fiveth">京东物流</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getShopGoods } from "network/shops";
export default {
  name: "Commodity",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/goods/",
      activeName: "first",
      getShopGoods: []
    };
  },
  components: {},
  computed: {},
  created() {
    this.getShops();
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getShops() {
      getShopGoods({ shop_id: this.$route.params.id }).then(res => {
        if (res.code != 200) return;
        this.getShopGoods = res.data;
        this.getShopGoods.forEach(list => {
          console.log(list.hot_keyword);
        });
      });
    }
  }
};
</script>
<style lang='less'>
.Commodity {
  #tab-first {
    margin-left: 20px;
  }
  .el-tabs__active-bar {
    left: 6%;
  }
  .el-tabs__content {
    padding: 0 0 0 10px;
    background: #f2f2f2;
  }
  .default {
    ul {
      li {
        width: 48%;
        margin-right: 1.5%;
        float: left;
        background: #fff;
        padding-bottom: 10px;
        margin-bottom: 12px;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
        .de_name {
          height: 36px;
          font-size: 12px;
          color: #333;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          padding: 0 10px;
        }
        .de_monnow {
          color: red;
          float: left;
          padding: 0 0 0 10px;
          font-size: 18px;
          font-weight: 600;
        }
        .de_yh {
          font-size: 10px;
          color: red;
          border: 1px solid red;
          float: left;
          margin: 4px 0 0 5px;
        }
      }
    }
  }
}
</style>
