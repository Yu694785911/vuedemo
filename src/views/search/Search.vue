<template>
  <div class="search">
    <nav-bar class="home-nav-bar">
      <div slot="left" class="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <input placeholder="汽车香水" class="souIpt" />
      </div>
    </nav-bar>

    <div class="searchbox">
      <dd v-for="(obj,index) in searahData" :key="index" class="cart-goods">
        <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />

        <div v-on:click="toDetails(obj.id)">
          <p class="title">
            {{obj.name}}
            <br />
          </p>

          <p class="money_now">
            ￥
            <em>{{obj.money_now}}</em>.00
            <br />
          </p>
        </div>
      </dd>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getGoods } from "network/order";
export default {
  name: "search",
  data() {
    return {
      searahData: null
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    console.log(this.$route.params.msg);
    getGoods({like:this.$route.params.msg}).then(res => {
      // res.data.forEach(item => {
      //   // console.log(item.name);
      //   if (item.name.substr(0, 1) == "【") {
      //     // console.log(item);
      //     this.searahData.push(item);
      //   }
      // });
      console.log(res);
      this.searahData=res.data;
    });
  },
  mounted() {},
  methods: {
    toDetails(id){
      this.$router.push("/details/"+id)
    }
  }
};
</script>
<style lang="less">
.search {
  .souIpt {
    border-radius: 50px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 90%;
  }
  div.searchbox {
    dd {
      z-index: 1;
      position: relative;
      min-height: 5rem;
      background: #fff;
      margin-bottom: 20px;
      margin-left:0;
      
      img { 
        width: 90px;
        height: 90px;
        position: absolute;
        left: 20px;
        top: 0;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
      }
      p.title {
        font-size: 12px;
        margin-bottom: 0.3rem;
        position: relative;
        margin-left: 35%;
        line-height: 16px;

        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 5px;
      }
      p.money_now {
        line-height: 0.8rem;
        color: #f2270c;
        font-size: 16px;
        em {
          font-style: normal;
          font-size: 18px;
        }
      }
      p.price {
        color: red;
      }
    }
  }
}
</style>
