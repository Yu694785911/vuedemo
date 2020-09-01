<template>
  <div class="DetailsEvaluate">
    <div class="evaluate">
      <div class="ev_head">
        <h3 style="font-size:15px;padding:0;text-align:left">评价</h3>
        <p class="count">1.8万+</p>
        <p class="haoping">好评度{{showEvaluate[0].Highpraise}}</p>
        <p class="haoping">好评度98%</p>
      </div>
      <div class="ev_key">
        <ul>
          <li>全部</li>
          <li v-for="(i,j) in Ev_keyword" :key="j">{{i}}</li>
        </ul>
      </div>
      <div
        class="ev-con"
        v-for="(list,index) in showEvaluate"
        :key="index"
        v-show="showEvaluate.length=2"
      >
        <div class="ev-tou">
          <img :src="Evpath+list.headImg" alt />
          <span>{{list.username}}</span>
          <p>{{list.evalationTime}}</p>
        </div>
        <div class="ev_detail">
          <p style="width:100%;">{{list.evaluationDetails}}</p>
          <div style="text-align:left">
            <img v-image-preview
              v-for="(a,b) in Ev_detailImg"
              :key="b"
              :src="Evpath+a"
              alt
              @mousewheel="rollImg(this)"
              ref="bigImage"
            />
          </div>

          <span style="margin-right:5px;">{{list.evaluationNorm}}:</span>
          <span>{{list.evaluationShop}}</span>
        </div>
      </div>
      <button v-if="evaluate.length>2" class="more">查看更多评价</button>
    </div>
  </div>
</template>

<script>
// import { getGoodsSevaluate } from "network/goods";
export default {
  name: "DetailsEvaluate",
  props: {
    evaluate: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      Evpath: "http://106.12.85.17:8090/public/image/evaluate/",
      Ev_keyword: [],
      Ev_detailImg: [],
      showEvaluate: []
    };
  },
  components: {},
  computed: {
    // showEvaluate() {
    //   let arr = [];
    //   console.log(this.evaluate);
    //   for (let i in this.evaluate) {
    //     // this.Ev_keyword = this.evaluate[i].keyword.split(",");
    //     if (i < 2) arr.push(this.evaluate[i]);
    //   }
    //   return arr;
    // }
  },
  created() {
    this.showEvaluate = this.evaluate;
    console.log(this.showEvaluate);
    this.showEvaluate.forEach(item=>{
        console.log(item.keyword);
        this.Ev_keyword=item.keyword.split(",")
        this.Ev_detailImg = item.evaluationImg.split(",");
    })
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    // getGoodsSevaluate() {
    //   getGoodsSevaluate({ goods_id: this.$route.params.id }).then(res => {
    //     console.log(res.data);
    //     this.showEvaluate = res.data;
    //     this.showEvaluate.forEach(list => {
    //       this.Ev_keyword = list.keyword.split(",");
    //       this.Ev_detailImg = list.evaluationImg.split(",");
    //     });
    //   });
    // }
  }
};
</script>
<style lang='less'>
</style>
