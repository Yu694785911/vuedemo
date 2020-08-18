<template>
<!-- object.kets(goodsInfo).length!==0 用来判断对象是否有keys，如果没值则不挂载 -->
  <div class="goods">
    <div>原价:{{goodsInfo.oldPrice}}</div>
    <div>现价:{{goodsInfo.newPrice}}</div>
    <div>
      阿巴阿巴：
      <span v-for="(item,index) in goodsInfo.imgList" :key="index">{{item}}</span>
    </div>
    <div>名字:{{goodsInfo.title}}</div>
  </div>
</template>

<script>
export default {
  name: "DetailsBaseInfo",
  data() {
    return {
      goodsInfo: {
        oldPrice: "200",
        newPrice: "100",
        imgList: [1, 2, 3, 4, 5],
        title: "这是一件衣服啥啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
      }
    };
  },
  components: {},
  computed: {},
  created() {},
  activated() {}, //激活
  deactivated() {}, //未激活
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.goods div {
  height: 200px;
  border-bottom:5px solid red;
  margin-bottom:10px;
}
</style>
