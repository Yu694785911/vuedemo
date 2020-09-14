<template>
  <div class="news">
    <div>8月28日上新</div>
    <div class="default">
      <!-- {{getShopGoods}} -->
      <ul>
        <li v-for="(item,index) in getDyGoods" :key="index">
          <img :src="path+item.img_cover" alt />
          <p class="de_name">{{item.name}}</p>
          <span class="de_monnow">￥{{item.money_now}}</span>
          <span class="de_yh">{{item.hot_keyword}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getShopGoods } from "network/shops";
export default {
  name: "news",
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/goods/",
      activeName: "first",
      getDyGoods: []
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
    getShops() {
      getShopGoods({ shop_id: this.$route.params.id }).then(res => {
        if (res.code != 200) return;
        this.getDyGoods = res.data;
        this.getDyGoods.forEach(list => {
          console.log(list.img_cover);
          this.img_box.push(list.img_cover);
          console.log(this.img_box);
        });
      });
    }
  }
};
</script>
<style lang='less'>
.news{
  .default {
    float: left;
    background: #f2f2f2;
    ul {
      li {
        width: 48%;
        margin-right: 1.5%;
        float: left;
        background: #fff;
        margin-bottom: 12px;
        padding-bottom: 10px;
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
