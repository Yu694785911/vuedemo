<template>
  <div class="allEvaluate">
    <nav-bar class="cartNavBar" ref="cartNavBar">
      <div slot="left" class="left" v-on:click="$router.go(-1)">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <div class="title" style="line-height:44px">商品评价</div>
      </div>
      <div slot="right" class="right">
        <!-- el-icon-more -->
        <el-dropdown trigger="click" @command="pushRouter">
          <span class="el-dropdown-link">
            <i class="el-icon-more-outline el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/home">首页</el-dropdown-item>
            <el-dropdown-item command="/keywords">分类搜索</el-dropdown-item>
            <el-dropdown-item command="/profile">我的京东</el-dropdown-item>
            <el-dropdown-item command="/profile" disabled>浏览记录</el-dropdown-item>
            <el-dropdown-item command="/profile" divided>我的关注</el-dropdown-item>
            <el-dropdown-item command="/profile" divided>分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </nav-bar>

    <div class="ev_head">
      <p class="haoping">好评度98%</p>
    </div>
    <div class="ev_key">
      <ul>
        <li>全部</li>
        <li v-for="(i,j) in all_keyword" :key="j">{{i}}</li>
      </ul>
    </div>
    <div
          class="ev-con"
          v-for="(list,index) in allEvaluate"
          :key="index"
        >
          <div class="ev-tou">
            <img :src="Evpath+list.headImg" alt />
            <span>{{list.username}}</span>
            <p>{{evaluateTime}}</p>
          </div>
          <div class="ev_detail">
            <p style="width:100%;">{{list.evaluationDetails}}</p>
            <div style="text-align:left">
              <img v-for="(a,b) in all_detailImg" :key="b" :src="Evpath+a"  v-image-preview style="margin-right:10px"/>
            </div>

            <span style="margin-right:5px;">{{list.evaluationNorm}}:</span>
            <span>{{list.evaluationShop}}</span>
          </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getGoodsSevaluate } from "network/goods";
export default {
  name: "allEvaluate",
  data() {
    return {
        Evpath: "http://106.12.85.17:8090/public/image/evaluate/", 
      allEvaluate: [],
      all_keyword: [],
      all_detailImg: [],
    };
  },
  components: {
    NavBar
  },
  computed: {
      evaluateTime() {
      //评价时间
      let time = new Date();
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    },
  },
  created() {
    console.log(this.$route.params.allid);
    if (this.$route.params.allid) {
      getGoodsSevaluate({ goods_id: this.$route.params.allid }).then(res => {
        console.log(res.data);
        if (res.code != 200) return;
        this.allEvaluate = res.data;
        console.log(this.allEvaluate);
        this.allEvaluate.forEach(list => {
          this.all_keyword = list.keyword.split(",");
          console.log(this.all_keyword);
            this.all_detailImg = list.evaluationImg.split(",");
        });
      });
    }
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    pushRouter(path) {
      this.$router.push(path);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='less'>
.allEvaluate {
  position: relative;
  .details-nav-bar {
    background: transparent;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 100;
  }

  

  .right .rightsd {
    background: url("../../../images/rightsd.png") no-repeat 50%;
    background-size: 20px 20px;
    padding: 3px 15px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
  .tab-bar-center {
    display: flex;
    /* display: none; */
  }
  .tab-bar-center div {
    font-size: 14px;
  }
  .tab-bar-center-item {
    flex: 1;
  }

  .ev_head {
    position: relative;
    height: 45px;
    line-height: 45px;
    color: #262626;
    padding-left: 8px;
    margin-top: 3px;
    .count {
      font-size: 12px;
      position: absolute;
      height: 45px;
      top: -11px;
      left: 45px;
      line-height: 45px;
    }
    .haoping {
      font-size: 12px;
      position: absolute;
      height: 45px;
      line-height: 45px;
      top: -14px;
      color: #8c8c8c;
      right: 15px;
    }
  }
  .ev_key {
    ul {
      li {
        float: left;
        background: #fcedeb;
        color: #000;
        font-size: 14px;
        padding: 5px 20px;
        border-radius: 50px;
        margin: 10px 10px;
      }
    }
  }
  .ev-con {
    float: left;
    width: 90%;
    margin-bottom: 40px;
    padding:0 20px;
    .ev-tou {
      img {
        width: 20px;
        height: 20px;
        display: block;
      }
      span {
        margin-left: 25px;
        display: inline-block;
        color: #262626;
        max-width: 8.2em;
        vertical-align: middle;
        font-size: 14px;
        margin-top: -18px;
      }
      p {
        float: right;
        font-size: 12px;
        color: #999;
        margin-top: -4%;
      }
    }
    .ev_detail {
      p {
        font-size: 13px;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    span {
      float: left;
      color: grey;
      font-size: 8px;
    }
  }
  .more {
    border: 1px solid;
    background: #fff;
    border-radius: 50px;
    padding: 5px 10px;
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    left: 38%;
  }
}
</style>
