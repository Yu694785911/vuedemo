<template>
  <div
    :class="{GoodsListItem:true,transverse:isDirection,column:!isDirection}"
    @click="toDetails(citem)"
  >
    <div>
      <a href="javascript:;">
        <img :src="itempath+'/goods/'+citem.img_cover" @load="loadMore" />
        <span>
          {{citem.name}}
          <br />
          <em>{{citem.money_now| changePrice("￥")}}</em>
          <br />
        </span>
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
.GoodsListItem {
  border-bottom: 1px solid grey;
}
.GoodsListItem.transverse {
  /* 横向独占一行 */
  width: 100%;
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
  width: 60%;
  display: block;
  margin-top: 10%;
  font-size: 12px;
  em {
    font-style: normal;
    color: red;
  }
}
.GoodsListItem.column {
  /* 多列 */
  width: 48%;
  margin: 0 1%;
}
.GoodsListItem.column img {
  display: block;
  width: 50%;
  margin: 10px auto;
}
.GoodsListItem.column span {
  text-align: center;
  display: block;
  line-height: 40px;
}
</style>
