<template>
  <div>
    <!-- 短信登录 -->
    <div class="messagezhuce">
      <nav-bar class="home-nav-bar">
        <div slot="left" @click="$router.go(-1)">&lt;</div>
        <div slot="center">
          <h3 style="margin:0;font-weight:normal">京东登录注册</h3>
        </div>
      </nav-bar>

      <div v-show="toggleBtn">
        <div class="Inputcon">
          <p class="input-ph">
            <label for class="area-box">
              <span class="area-phone">+86</span>
              <i class="sanjiao"></i>
            </label>
            <input type="text" name id placeholder="请输入手机号" v-model="phone" />
          </p>
          <p class="input-code">
            <input type="text" name id placeholder="请输入收到的验证码" v-model="pwd" />
            <button class="area-phone">获取验证码</button>
          </p>
        </div>

        <el-row>
          <el-button type="danger" round class="dangerBtn" @click="userLogin">登录</el-button>
          <el-button round class="oneBtn">一键登录</el-button>
        </el-row>

        <p class="quick-btn" style="margin:20px;color:rgba(0,0,0,.4)">
          <span style="font-size:12px;float:left" :label="true" @click="aaa">账号密码登录</span>
          <span style="font-size:12px;float:right" :label="false" @click="phoneRegister">手机快速登录</span>
        </p>
      </div>
    </div>

    <!-- 账号登录 -->
    <div v-show="!toggleBtn">
      <div class="Inputcon">
        <p class="input-ph">
          <input type="text" name id placeholder="用户名/邮箱/手机号" style="padding:0;float:left" />
        </p>
        <p class="input-code">
          <input type="text" name id placeholder="请输入密码" />
          <button class="area-phone">忘记密码</button>
        </p>
      </div>

      <el-row>
        <el-button type="danger" round disabled class="dangerBtn">登录</el-button>
        <el-button round class="oneBtn">一键登录</el-button>
      </el-row>

      <p class="quick-btn" style="margin:20px;color:rgba(0,0,0,.4)">
        <span style="font-size:12px;float:left" :label="true" @click="aaa">短信验证码登录</span>
        <span style="font-size:12px;float:right" :label="false">手机快速登录</span>
      </p>
    </div>

    <!-- 其他登录 -->
    <div class="other">
      <h4>其他登录方式</h4>
      <p style="margin:20px 20px;">
        <a href style="margin:20px 20px;">QQ</a>
        <a href style="margin:20px 10px;">微信</a>
        <a href style="margin:20px 10px;">苹果</a>
      </p>
      <p style="font-size:12px;color:#ccc">
        登录即代表您已同意
        <a href>京东隐私政策</a>
      </p>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { Land, autoLand,register } from "network/login";
export default {
  name: "profile",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
      toggleBtn: true,
      phone: "",
      pwd: "",
      autocode: ""
    };
  },
  components: {
    NavBar
  },
  created() {
    this.$root.$children[0].isTabBar = false;

  },
  methods: {
    phoneRegister() {
      this.$router.push("/phone_register");
    },
    userLogin() {
      this.$router.push("/profile")
      if (this.phone === "" || this.pwd === "") {
        alert("账号或密码不能为空");
      } else {
        let aaa = {
          actionKey: "account",
          username: this.phone,
          password: this.pwd
        };
        console.log(aaa);

        register({
          username: this.phone,
          password: this.pwd
        }).then(res=>{
          console.log(res);
        })
        Land(aaa).then(res => {
          console.log(res);
          console.log(res.data.user.autocode);
          

          console.log(res.data.user.name);
          console.log(res.data.user.tel);
          
             
          // 自动登陆码
          autoLand({autocode:res.data.user.autocode}).then(res => {
            if(res.code!=200) return;
            console.log(res);
            console.log(res.data.user.autocode);
            localStorage.setItem('autocode', res.data.user.autocode);
            console.log(localStorage.getItem('autocode'));
            

            this.$store.state.userInfo.defaddr=res.data.defaddr;

            for(let j in res.data.user){
                this.$store.state.userInfo[j]=res.data.user[j];
            }

            console.log(this.$store.state.userInfo);

            this.$router.push('/profile')
          });

         
        });
      }
    },
    aaa() {
      this.toggleBtn = !this.toggleBtn;
    },
    back() {
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$root.$children[0].isTabBar = true;
    next();
  }
};
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.page {
  text-align: left;
  background: #fff;
  padding: 0 0.25rem 0.25rem;
}
.Inputcon {
  height: 120px;
  /* background: pink; */
  margin: 20px 20px;
}
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
.area-code {
  border: none;
  border-left: 1px solid #ccc;
  background: #fff;
  border-radius: 0;
  padding: 0;
}
.input-code input {
  position: relative;
  width: 80%;
  height: 47px;
  border: none;
  border-bottom: 1px solid #efefef;
  padding-right: 70px;
  font-size: 14px;
  color: #000;
  outline: none;
}
.input-code button {
  border: none;
  border-left: 1px solid #ccc;
  background: #fff;
  border-radius: 0;
  padding: 0;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 50px;
  outline: none;
}
.dangerBtn {
  margin: 0px 10px;
  width: 90%;
  height: 50px;
  margin-bottom: 10px;
}
.oneBtn {
  margin: 0px 10px;
  width: 90%;
  height: 50px;
  border-color: red;
  color: red;
}
.other {
  margin-top: 80px;
}
</style>
