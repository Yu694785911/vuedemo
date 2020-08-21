<template>
  <div style="background:#f2f2f2">
    <scroll id="ProfileScroll">
      <nav-bar class="cartNavBar" ref="cartNavBar">
        <div slot="left" class="left" v-on:click="$router.go(-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div slot="center">
          <div class="title">我的京东</div>
        </div>
        <div slot="right" class="right">
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



      <div v-if="!$store.state.userInfo" @click="$store.commit('ROUTERTO','/login')">登录</div>

       <div v-else @click="signOut">退出</div>



      <!-- 内容 -->
      <div class="content-first">
        <div class="user-message">
          <div class="user-left">
            <div class="user-img">
              <img src="../../images/user.png" alt />
            </div>
            <div class="user-sm">待实名认证></div>
          </div>

          <div class="user-right">
            <div class="ur-top">
              <span v-if="userInfo">{{userInfo.name}}</span>
              <span></span>
              <span></span>
            </div>
            <div class="ur-m"  v-if="userInfo">用户名:{{userInfo.name}}</div>
          </div>

          <div class="user-bottom">
            <div class="ub jx">京享值614</div>
            <div class="ub xb">小白信用64.6 ></div>
          </div>

          <div class="user-set">
            <img src="../../images/user-shezhi.png" alt />
            账户设置
          </div>

          <div class="bheader">
            <div class="btitle">
              <div class="bt">免费试用 立领1张运费券</div>
              <div class="br">0元使用></div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-middle">
        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-one" @click="tomyOrder">
              <img src="../../images/um1.png" alt />
              <br />代付款
            </div>
            <div class="tu-one">
              <img src="../../images/um2.png" alt />
              <br />待收货
            </div>
            <div class="tu-one">
              <img src="../../images/um3.png" alt />
              <br />退换/售后
            </div>
            <div class="tu-one">
              <img src="../../images/um4.png" alt />
              <br />全部订单
            </div>
          </div>
        </div>

        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-two">
              <span>0张</span>
              <br />京东券
            </div>
            <div class="tu-two">
              <span>开通有礼</span>
              <br />白条
            </div>
            <div class="tu-two">
              <span>12个</span>
              <br />京豆
            </div>
            <div class="tu-two">
              <span>0元</span>
              <br />红包
            </div>
            <div class="tu-two">
              <img src="../../images/um5.png" alt />
              <br />我的资产
            </div>
          </div>
        </div>

        <div class="middle-one">
          <div class="middle-top-tu">
            <div class="tu-three">
              <span>0</span>
              <br />商品收藏
            </div>
            <div class="tu-three">
              <span>0</span>
              <br />店铺收藏
            </div>
            <div class="tu-three">
              <span>2</span>
              <br />我的足迹
            </div>
          </div>
        </div>

        <div class="middle-four">
          <div class="middle-top-tu">
            <div class="tu-four">
              <img src="../../images/um6.png.webp" alt />
              <br />代付款
            </div>
            <div class="tu-four">
              <img src="../../images/um7.png.webp" alt />
              <br />待收货
            </div>
            <div class="tu-four">
              <img src="../../images/um8.png.webp" alt />
              <br />退换/售后
            </div>
            <div class="tu-four">
              <img src="../../images/um9.png.webp" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="../../images/um10.png.webp" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="../../images/um11.png.webp" alt />
              <br />全部订单
            </div>
            <div class="tu-four">
              <img src="../../images/um12.png.webp" alt />
              <br />全部订单
            </div>
          </div>
        </div>

        <div class="middle-five">
          <span>
            客户服务
            <i>></i>
          </span>
        </div>

        <div>为你推荐</div>
      </div>
    </scroll>
  </div>
</template>

<script>
//公共组件
// import $ from "jquery";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import { ROUTERTO } from "store/mutation-types";
export default {
  name: "Profile",
  data(){
    return {};
  },
  created() {
    // this.$store.state.userInfo=null;
   if(!this.$store.state.userInfo){
     this.$store.commit('AUTO_CODE')
   }
    
  console.log(this.$store.state.userInfo);

    if (this.$store.state.userInfo != null) {
      this.$router.push("/profile");
    } else if ( this.$store.state.userInfo == null) {
      this.$router.push("/login");
    }


  },
  components: {
    NavBar,
    Scroll
  },
  methods: {
    pushRouter(path) {
      this.$router.push(path);
    },
    tomyOrder(){
      this.$router.push("/myorder")
    },
    routerTo(path){
      this.$store.commit(ROUTERTO,path);
    },
    signOut(){
      this.$store.state.userInfo=null;
      this.$store.state.shopCart=null;
      this.$store.state.shopCartLength=0;
      let path=window.location.origin+'/jd';
      localStorage.setItem(path,'')
      if(this.$store.state.userInfo==null){
        this.$router.push('/home')
      }
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo;
    }
  },
  beforeRouteLeave(to, from, next) {
      // 如果取得页面时login页面，则记录页面
    if(to.path=='/login'){
      this.$store.state.loginHistory=from.path;
    }
    next();
  },
};
</script>
<style lang='less' scoped>
#ProfileScroll {
  height: calc(100vh - 49px);
  overflow: hidden;

  .content-first {
    width: 100%;
    height: 135px;
    position: relative;
    overflow: hidden;
    border-radius: 0 0 35px 35px;
    background: linear-gradient(90deg, #eb3c3c, #ff7459);
    box-sizing: border-box;
    min-height: 110px;
    padding-top: 25px;
    // border-radius: 0 0 5px 5px;
    .user-message {
      padding: 0 0 10px 15px;
      position: relative;
      .user-left {
        float: left;
        .user-img {
          width: 60px;
          height: 60px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 60px;
          transform: translateZ(0);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-sm {
          position: absolute;
          left: 12%;
          bottom: -20px;
          z-index: 1;
          transform: translateX(-50%);
          padding: 0 5px 0 6px;
          height: 15px;
          line-height: 15px;
          border-radius: 15px;
          font-size: 10px;
          white-space: nowrap;
          color: hsla(0, 0%, 100%, 0.7);
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      .user-right {
        flex: 1;
        padding: 0 0 0 80px;
        position: relative;
        .ur-top {
          font-size: 14px;
          color: #fff;
          display: flex;
          span:nth-child(2) {
            flex-shrink: 0;
            margin: 4px 0 0 10px;
            width: 12px;
            height: 12px;
            vertical-align: middle;
            background: url("../../images/user-bi.png");
            background-size: 12px;
            display: inline-block;
          }
          span:nth-child(3) {
            display: block;
            position: relative;
            margin: 2px 5px 0 13px;
            padding: 0 6px 0 10px;
            height: 16px;
            line-height: 16px;
            border-radius: 0 12px 12px 0;
            background-color: #c8483f;
            font-size: 10px;
            color: #fff;
            &::after {
              content: "注册";
            }
            &::before {
              position: absolute;
              width: 20px;
              height: 20px;
              left: -10px;
              top: 48%;
              margin-top: -10px;
              background: url("../../images/user-icon.png") no-repeat 0 0;
              background-size: 100px 20px;
              content: "";
            }
          }
        }
        .ur-m {
          font-size: 12px;
          color: #f2f2f2;
          line-height: 18px;
          text-align: left;
        }
      }
      .user-bottom {
        div.ub {
          float: left;
          height: 16px;
          line-height: 16px;
          padding: 0 8px;
          margin: 6px 8px 0 0;
          border-radius: 10px;
          font-size: 10px;
          color: #fff;
          background: #c8483f;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: JDZH-Regular;
        }
        div.jx {
          width: 70px;
          margin-left: 20px;
        }
        div.xb {
          width: 93px;
        }
      }
      .user-set {
        position: absolute;
        right: 15px;
        top: -25px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        color: rgba(76, 0, 0, 0.7);
        font-size: 12px;
        padding-left: 15px;
        height: 40px;
        line-height: 40px;
        img {
          display: inline-block;
          width: 12px;
          height: 12px;
          position: relative;
          top: 2px;
          right: 2px;
        }
      }

      .bheader {
        width: 100%;
        height: 37px;
        box-sizing: border-box;
        padding: 0 20px;
        color: #ffe678;
        font-size: 12px;
        margin-top: 40px;
        .btitle {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 7px 10px 10px;
          background: url("../../images/bh.png") no-repeat 0 0;
          background-size: 100% 67px;
          .bt {
            position: relative;
            line-height: 18px;
            &::before {
              position: absolute;
              content: "";
              width: 57px;
              height: 12px;
              left: 0;
              top: 3px;
              background: url("../../images/plus.png") no-repeat 50%;
              background-size: 100% 100%;
            }
            &::after {
              position: absolute;
              content: "";
              width: 1px;
              height: 7px;
              background: #ffe678;
              left: 67px;
              top: 5px;
            }
          }
          .br {
            float: right;
            margin-top: -15px;
          }
        }
      }
    }
  }

  .content-middle {
    background: #f2f2f2;
    height: 500px;
    .middle-one {
      line-height: 30px;
      margin: 15px 0;
      background: #fff;
      .middle-top-tu {
        display: flex;
        position: relative;
        .tu-one {
          width: 25%;
          text-align: center;
          color: #666;
          font-size: 12px;
          img {
            width: 20px;
            height: 20px;
            margin-top: 10px;
          }
        }
        .tu-two {
          width: 20%;
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 10px;
            line-height: 18px;
            height: 18px;
            color: #e93b3d;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
        .tu-three {
          width: 33.3%;
          text-align: center;
          color: #666;
          font-size: 12px;
          margin-top: 10px;
          span {
            font-size: 16px;
            line-height: 18px;
            height: 18px;
            color: #000;
            font-weight: bold;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .middle-four {
      background: #fff;
      margin: 15px 0;
      .middle-top-tu {
        overflow: hidden;
        position: relative;
        height: 130px;
        .tu-four {
          padding: 10px 0 8px;
          text-align: center;
          height: 65px;
          box-sizing: border-box;
          float: left;
          width: 25%;
          position: relative;
          color: #666;
          font-size: 12px;
          line-height: 24px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
    .middle-five {
      background: #fff;
      margin: 15px 0;
      span {
        position: relative;
        margin: 15px 0;
        background: #fff;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        width: 100%;
        float: left;
        display: block;
        text-align: left;
        i {
          text-align: right;
        }
      }
    }
  }
}
</style>
