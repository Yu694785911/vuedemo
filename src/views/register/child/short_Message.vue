<template>
  <div class="short_msg">
    <nav-bar>
      <div slot="left" @click="this.$router.go(-1)">&lt;</div>
      <div slot="center">
        <h3 style="margin:0;font-weight:normal">京东注册</h3>
      </div>
    </nav-bar>

    <div class="jd_zhuce">
      <div class="zhuce_first">
        <img src="../../../images/ma.png" alt />
        <p>我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话</p>
      </div>

      <div>
        <input type="text" class="code" />
        <button class="getcode" @click="getcode">获取验证码</button>
      </div>

      <el-button
        round
        style="margin-top:60px;height:50px;background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);color:#fff;"
      >下一步</el-button>

      <p class="problem">
        遇到问题?请
        <a href>联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { land_have_telphone } from "network/login";

export default {
  name: "short_msg",
  data() {
    return {};
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    console.log(JSON.parse(this.$route.params.data).phone);
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    getcode(){
      let data={
        telphone:JSON.parse(this.$route.params.data).phone
      }
      land_have_telphone(data).then(res=>{
        console.log(res);
      })
    }
  }
};
</script>
<style lang='less'>
.jd_zhuce {
  margin-top: 20px;
  padding: 0 25px;
  height: 300px;
  .zhuce_first {
    color: #2e2d2d;
    text-align: center;
    font-size: 16px;
    img {
      height: 71px;
      width: 88px;
      background-size: cover;
      margin: 0 auto;
      display: block;
    }
  }
  input.code {
    border: none;
    border-bottom: 1px solid #dedede;
    outline: none;
    width: 100%;
    margin-top: 30px;
    position: relative;
  }
  .getcode {
    font-size: 14px;
    width: 100px;
    height: 34px;
    line-height: 30px;
    border-radius: 18px;
    outline: none;
    top: 35%;
    right: 5%;
    position: absolute;
    padding: 0;
    background-color: rgba(226, 35, 30, 0.2);
    color: #e2231a;
    border: 0 solid rgba(226, 35, 30, 0.2);
  }
  .el-button {
    width: 95% !important;
  }
  p.problem {
    color: #999;
    font-size: 14px;
    float: left;
  }
}
.el-message-box {
  width: 90% !important;
}
</style>
