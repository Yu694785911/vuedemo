<template>
  <div class="short_msg">
    <nav-bar>
      <div slot="left" @click="warning=true">&lt;</div>
      <div slot="center">
        <h3 style="margin:0;font-weight:normal">京东注册</h3>
      </div>
    </nav-bar>

    <div class="jd_zhuce">
      <div class="zhuce_first">
        <img src="../../../images/ma.png" alt />
        {{phoneCode}}
        <p>我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话</p>
      </div>

      <div>
        <input type="text" class="code" v-model="regCode" placeholder="请输入手机验证码"/>
        <button class="getcode" @click="getCode" :disabled="isDisabled">{{msg}}</button>
      </div>

      <el-button round class="xiayibu" 
      :class="{xiayibu:true,disabled:regCode==''?true:false}"
      @click="next">下一步</el-button>

      <p class="problem">
        遇到问题?请
        <a href>联系客服</a>
      </p>
    </div>

    <div v-if="warning" class="warning">
      <div class="dialog">
        <div class="content">
          <p class="duanxin">点击“返回”将中断注册，确定返回？</p>
        </div>
        <div class="footer">
          <button class="cancel" @click="warningOk">取消</button>
          <button class="ok" @click="warningOk('ok')">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { getCodeImg } from "network/login";

export default {
  name: "short_msg",
  data() {
    return {
      regCode: "",
      warning: false,
      phone: null,
      msg: "发送验证码",
      isDisabled: false,
      phoneCode: null
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    this.phone = JSON.parse(this.$route.params.data).telphone;
    this.getCode();
    console.log(this.regCode)
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    warningOk(val) {
      if (val == "ok") {
        this.$router.go(-1);
      }
      this.warning = false;
    },
    getCode() {
      this.isDisabled = true;
      getCodeImg({ telphone: this.phone }).then(res => {
        if (res.code != 200) return;
        this.phoneCode = res.str;
      });
      this.timeout();
      this.msg = "重新发送(60)";
    },
    timeout() {
      let num = 10;
      let timer = setInterval(() => {
        num--;
        this.msg = "重新发送(" + num + ")";
        if (num == 0) {
          this.msg = "发送验证码";
          clearInterval(timer);
          this.isDisabled = false;
        }
      }, 1000);
    },
    next() {
      console.log("a");
      console.log(this.regCode);
      console.log(this.phoneCode);
      if(this.regCode!=this.phoneCode) return console.log("请与前面手机号一致");
      this.$router.push('/setpwd/'+this.$route.params.data)
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
    top: 38%;
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
  .xiayibu {
    margin-top: 60px;
    height: 50px;
    background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
    color: #fff;
  }
  .xiayibu.disabled{
    background:rgba(255,0,0,.3);
  }
}
.el-message-box {
  width: 90% !important;
}
.warning {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .dialog {
    background: #fff;
    border-radius: 5px;
    width: 80%;
    height: 20%;
    margin-top: 60%;
    margin-left: 10%;
    .content {
      padding: 20px 0;
      border-bottom: 1px solid #dedede;
    }
    .footer {
      button {
        width: 50%;
        float: left;
        height: 46px;
        border: none;
        background: #fff;
        color: #000;
        outline: none;
      }
      button.cancel {
        border-radius: 0 0 0 10px;
      }
      button.ok {
        background: #f23030;
        border-radius: 0 0 10px 0;
        color: #fff;
      }
    }
  }
}
</style>
