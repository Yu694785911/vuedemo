<template>
  <div class="Shops">
    <div class="shop_top">
      <div class="head">
        <div class="img_Box">
          <img src alt />
        </div>
        <div class="title">1sddsdsadsad</div>
        <span class="xj">店铺星级</span>

        <button class="shoucang">收藏</button>
        <!--<button title="更多"></button>-->
      </div>

      <div class="nav">
        <button>
          <img src="../../images/fdj.png" alt />
          搜商品
        </button>
        <ul>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <router-link tag="li" to="selected">
              精选
              <el-tab-pane label="用户管理" name="first">精选</el-tab-pane>
            </router-link>
            <router-link tag="li" to="commodity">商品
              <el-tab-pane label="配置管理" name="second">商品</el-tab-pane>
            </router-link>
             <router-link tag="li" to="news">新品
               <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            </router-link>
            <router-link tag="li" to="buyshow">买家秀
               <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </router-link>
            <router-link tag="li" to="dynamic">动态
              <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
              </router-link>
            <!-- 
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
          </el-tabs>

          <!-- <router-link tag="li" to="selected">精选</router-link>
          <router-link tag="li" to="commodity">商品</router-link>
          <router-link tag="li" to="news">新品</router-link>
          <router-link tag="li" to="buyshow">买家秀</router-link>
          <router-link tag="li" to="dynamic">动态</router-link>-->
        </ul>
      </div>
    </div>

    <div class="shop_con">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Shops",
  data() {
    return {
      activeName: "second"
    };
  },
  components: {},
  computed: {},
  created() {
    console.log(this.$route.params.id);
    $(window).scroll(function(){
       var scrollTop　=　document.documentElement.scrollTop || document.body.scrollTop;
      //  console.log(scrollTop);
       if(scrollTop>150){
        //  console.log($("div.nav"));
         $("div.nav").css({ 'position': 'fixed' , 'top': '0', 'width': '100%','height':'40px','background':'repeating-linear-gradient(45deg, black, transparent 100px)' })
       }else{
         $(".shop_top").css({'position':'relative'})
          $("div.nav").css({'position': 'absolute','width':'100%','height':'40px','top':'73%','left':'0','bottom':'0','right':'0','float':'left','background':'none'})
       }
    })
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang='less' scope>
.Shops {
  height:1000px;
  .shop_top {
    width: 100%;
    height: 150px;
    position: relative;
    background: repeating-linear-gradient(45deg, black, transparent 100px);
    .head {
      padding-top: 20px;
      position: relative;
      .img_Box {
        width: 50px;
        height: 50px;
        border: 1px solid #fff;
        margin-left: 10px;
      }
      .title {
        float: left;
        font-size: 20px;
        line-height: 21px;
        color: #fff;
        margin-left: 5px;
        position: absolute;
        top: 32%;
        left: 18%;
      }
      span.xj {
        position: absolute;
        top: 72%;
        left: 20%;
        font-size: 12px;
        color: #fff;
      }
      .shoucang {
        position: absolute;
        top: 32%;
        left: 70%;
        background: #e93b3d;
        border-color: #e93b3d;
        border-radius: 15px;
        border: none;
        outline: none;
        color: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 14px;
      }
    }
    .nav {
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      right: 0;
      float: left;
      button {
        margin-top: 5px;
        height: 30px;
        border-radius: 15px;
        border: none;
        float: left;
        font-size: 14px;
        color: #999;
        padding: 0 15px;
        img {
          width: 15px;
          height: 15px;
        }
      }
      ul {
        height: 40px;
        li:first-child {
          margin-left: 30px;
        }
        li {
          float: left;
          text-align: center;
          color: #fff;
          margin-left: 20px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
