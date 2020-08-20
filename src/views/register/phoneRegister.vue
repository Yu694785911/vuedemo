<template>
  <div class="phonelogin">
    <div class="messagezhuce">
      <nav-bar class="home-nav-bar">
        <div slot="left" @click="$router.go(-1)">&lt;</div>
        <div slot="center">
          <h3 style="margin:0;font-weight:normal">京东注册</h3>
        </div>
      </nav-bar>

      <div>
        <div class="Inputcon">
          <p class="input-ph">
            <label for class="area-box" :v-model="region" @click="changeRegion">
              <span class="area-phone">+86</span>
              <i class="sanjiao"></i>
            </label>
            <input type="text" placeholder="请输入手机号" v-model="phone" clearable />
          </p>
        </div>
      </div>

      <el-button
        type="danger"
        round
        @click="next"
        :disabled="regTel"
        :class="{dangerBtn:true,disabled:regTel}"
      >下一步</el-button>
    </div>

    <!-- 手机号可以注册，下面的模态框显示 -->
    <div v-if="warning" class="warning">
      <div class="dialog">
        <div class="content">
          <p class="duanxin">我们将发送短信/语音验证码至:</p>
          <p class="phone">{{phone}}</p>
        </div>
        <div class="footer">
          <button class="cancel" @click="warningOk">取消</button>
          <button class="ok" @click="warningOk('ok')">确定</button>
        </div>
      </div>
    </div>

    <div class="country">
      <nav-bar class="home-nav-bar">
        <div slot="left" @click="$router.go(-1)">&lt;</div>
        <div slot="center">
          <h3 style="margin:0;font-weight:normal">选择国家或者地区</h3>
        </div>
      </nav-bar>

      <ul>
        <li>*</li>
        <li v-for="item in phone_area_code" :key="item.id" @click="selectCity(item.area_code)">
          <span class="city">{{item.country}}</span>
          <span class="code">+{{item.area_code}}</span>
        </li>
      </ul>
    </div>

    <div class="zhezhao">
      <div class="zhezhaokk">
        <div class="header">注册协议及隐私政策</div>
        <div class="content">
          <p>
            在您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
            <span
              class="xiahuaxian"
            >请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：</span>
          </p>

          <p>
            <a href class="xieyi">《京东用户注册协议》</a>
          </p>
          <p>
            <a href class="xieyi">《京东隐私政策》</a>
          </p>

          <hr />
          <p style="font-size:13px;">
            点击同意即表示您已阅读并同意
            <a href>《京东用户注册协议》</a>与
            <a href>《京东隐私政策》</a>
            并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于
            <a href>《订单共享与安全》</a>
          </p>
        </div>

        <button class="disagreen" disabled>不同意</button>
        <button class="agreen" @click="agreen">同意</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { regPhone, get_mobile_prefix } from "network/login";

export default {
  name: "phonelogin",
  data() {
    return {
      phone: "",
      region: "",
      phone_area_code: null,
      regTel: true,
      area_code: "86",
      warning: false
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    get_mobile_prefix().then(res => {
      this.phone_area_code = res.data;
      console.log(this.phone_area_code);
    });
  },
  watch: {
    phone(val) {
      let pattern = /^0?(13|14|15|17|18|19)[0-9]{9}$/;
      this.regTel = !pattern.test(val);
      console.log(pattern.test(val));
    },
    area_code(val) {
      console.log(val);
    }
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    next() {
      var data = { telphone: this.phone };
      regPhone(data).then(res => {
        console.log(res);
        // res.code==500 代表用户已经注册
        if (res.code == 500) {
          // 把用户注册的时间提取出来，转换成时间格式
          let createTime = new Date(res.data.createtime);
          let newDate = new Date();
          //Difference 差值
          // new Date().getTime() 获取当前时间到1970年的毫秒值
          let Difference = newDate.getTime() - createTime.getTime();

          console.log(Difference);
          console.log(30 * 24 * 60 * 60 * 1000);
          if (Difference > 30 * 24 * 60 * 60 * 1000) {
            // 跳转页面
            this.$router.push("/registered/" + JSON.stringify(res.data));
            return;
          } else {
            alert("该手机号已被其他账号绑定，30天内不可改绑");
            return;
          }
        }

        this.warning = true;
      });
    },
    warningOk(val) {
      if (val == "ok") {
        let data = {};
        data.areaCode = this.areaCode;
        data.phone = this.phone;
        // 如果不是500，手机号是未被注册的，跳转短信页面，
        this.$router.push("/shortMsg/" + JSON.stringify(data));
      }
      this.warning = false;
    },
    changeRegion() {
      document.querySelector(".messagezhuce").style.display = "none";
      document.querySelector(".country").style.display = "block";
    },
    selectCity(a) {
      console.log(a);
      document.querySelector(".messagezhuce").style.display = "block";
      document.querySelector(".country").style.display = "none";
      console.log(document.querySelector(".area-phone").innerHTML);
      document.querySelector(".area-phone").innerHTML = "+" + a;
    },
    agreen() {
      document.querySelector(".zhezhao").style.display = "none";
    }
  },
  filters: {
    // regPhone(){
    //   console.log(this.phone);
    //   var pattern=/0?(13|14|15|17|18|19)[0-9]{9}$/;
    //   return pattern.text(this.phone);
    // }
  }
};
</script>
<style lang="less">
.Inputcon p {
  height: 50px;
  position: relative;
}
.Inputcon p label {
  position: absolute;
  width: 72px;
  height: 50px;
  top: 0;
  left: 0;
  line-height: 50px;
  i.sanjiao {
    position: absolute;
    top: 22px;
    right: 4px;
    width: 14px;
    height: 6px;
    overflow: hidden;
    background-image: url("../../images/xia.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    display: inline-block;
    margin-left: 0.06rem;
  }
}
.Inputcon p.input-ph input {
  width: 80%;
  height: 47px;
  border: none;
  border-bottom: 1px solid #efefef;
  padding-left: 70px;
  font-size: 14px;
  color: #000;
  outline: none;
}
.dangerBtn {
  margin: 0px 10px;
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 20%;
  background: rgba(255, 0, 0) !important;
}
.dangerBtn.disabled {
  background: rgba(255, 0, 0, 0.3) !important;
}
.country {
  display: none;
  ul {
    padding: 0;
    margin: 0;

    li {
      line-height: 44px;
      height: 44px;
      border-bottom: 1px solid #dbdbdb;
      margin: 0 30px 0 15px;
      font-size: 18px;
      text-align: left;
      span.city {
        float: left;
      }
      span.code {
        float: right;
        padding-right: 12px;
        color: #999;
        font-size: 13px;
      }
    }
  }
}

div.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .zhezhaokk {
    width: 85%;
    background: #fff;
    border-radius: 10px;
    position: relative;
    top: 20%;
    left: 8%;
    color: #2e2d2d;
    height: 69.7%;
    .header {
      font-size: 16px;
      text-align: center;
      padding: 18px 0 13px;
    }
    .content {
      font-size: 14px;
      line-height: 22px;
      padding: 0 25px;
      text-align: left;
      span.xiahuaxian {
        color: #000;
        text-decoration: underline;
      }
      a.xieyi {
        color: #000;
      }
    }
    button {
      width: 50%;
      float: left;
      height: 46px;
      border: none;
      background: #fff;
      color: #000;
      outline: none;
    }
    button.disagreen {
      border-radius: 0 0 0 10px;
    }
    button.agreen {
      background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
      border-radius: 0 0 10px 0;
      color: #fff;
    }
  }
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
    height: 23%;
    margin-top: 60%;
    margin-left: 10%;
    .content {
      padding: 20px 0;
      border-bottom: 1px solid #dedede;
      p.phone {
        text-align: left;
        margin-top: -10px;
        margin-left: 30px;
      }
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
