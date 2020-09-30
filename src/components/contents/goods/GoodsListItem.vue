<template>
  <div
    :class="{GoodsListItem:true,transverse:isDirection,column:!isDirection}"
    @click="toDetails(citem)"
  >
    <div>
      <a href="javascript:;">
        <img :src="itempath+'/goods/'+citem.img_cover" @load="loadMore" />
        <div style="flex:1">
          <span>{{citem.name}}</span>
          <em>{{citem.money_now| changePrice("￥")}}</em>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    citem: {
      type: Object,
      default() {
        return {};
      }
    },
    itempath: {
      type: String,
      default: "http://106.12.85.17:8090/public/image/"
    },
    isDirection: {
      type: Boolean, //true代表独占一行，false代表不独占一行
      default: true
    }
  },
  data() {
    return {
      num: 0
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toDetails(item) {
      console.log(item);
      this.$router.push("/details/" + item.id);
    },
    loadMore() {
      // 默认情况下，在vue中是不存在有bus总线，使用的时候，需要我们先定义bus总线
      if (!this.bus) return;
      this.$bus.$emit(this.bus);
    }
  },
  filters: {
    changePrice(val, str = "$") {
      return str + Number(val).toFixed(2);
    }
  }
};
</script>
<style lang="less">
/* .GoodsListItem{
  width: 100%;
}
.GoodsListItem a img {
  width: 60%;
  margin: 0 20%;
}
.goodslist a span {
  width: 98%;
} */
.GoodsListItem.transverse {
  /* 横向独占一行 */
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 2%;
}
.GoodsListItem.transverse a {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
  color: #000;
  line-height: 20px;
}
.GoodsListItem.transverse a img {
  width: 40%;
}
.GoodsListItem.transverse a span {
  display: block;
  margin-top: 10%;
  font-size: 12px;
}
em {
  font-style: normal;
  color: red;
  float: right;
  width: 100%;
  // margin-top: -10%;
}
.GoodsListItem.column {
  /* 多列 */
  width: 48%;
  margin: 1% 1%;
  background: #fff;
}
.GoodsListItem.column img {
  display: block;
  width: 50%;
  margin: 10px auto;
}
.GoodsListItem.column span {
  text-align: center;
  display: block;
  line-height: 24px;
  color: #000;
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.GoodsListItem.column em {
  font-style: normal;
  color: red;
  text-align: left;
  float: left;
  margin: 10px 5px;
}
</style>
