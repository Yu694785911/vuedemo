<template>
  <div id="setpwd">
    <nav-bar>
      <div slot="left" @click="$router.go(-1)">&lt;</div>
      <div slot="center">
        <h3 style="margin:0;font-weight:normal">京东注册</h3>
      </div>
    </nav-bar>

    <div class="content">
      <p class="yonghu">请输入账户密码:</p>
      <el-input placeholder="请输入账号密码" v-model="pwd" class="input-with-select" show-password></el-input>
      <!-- <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input> -->
      <p class="Tips">{{msg}}</p>
    </div>
    <el-button round :class="{submit:true,disabled:isSubmit}" style @click="submit" show-password>提交</el-button>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { register } from "network/login";
export default {
  name: "setpwd",
  data() {
    return {
      pwd: "",
      isSubmit: true,
      // input:'',
      msg: "请输入8~15位的密码，首字符不能是数字下划线"
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {},
  activated() {},
  deactivated() {},
  mounted() {},
  watch: {
    pwd(val) {
      console.log(val);
      let reg = /^[a-zA-Z][\w]{7,14}$/;
      if (reg.test(val)) {
        this.isSubmit = false;
        this.msg = "密码可用";
      } else {
        this.isSubmit = true;
        this.msg = "请输入8~15位的密码，首字符不能是数字下划线";
      }
      console.log(reg.test(val));
    }
  },
  methods: {
    submit() {
      console.log("a");
      let data = JSON.parse(this.$route.params.data);
      data.pasword = this.pwd;
      register(data).then(res => {
        if (res.code != 200) return console.log("网络连接错误/数据库连接有误");
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang='less'>
#setpwd {
  .content {
    padding: 20px;
    p.yonghu{
      text-align: left;
      margin-bottom: 10px;
    }
    p.Tips {
      font-size: 12px;
      margin-top: 8px;
      color:grey;
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
  .submit {
    margin-top: 60px;
    height: 50px;
    background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
    color: #fff;
    width: 90%;
  }
  .submit.disabled {
    background:rgba(255,0,0,.3);
    margin-top: 60px;
    height: 50px;
    color: #fff;
    width: 90%;
  }
  .el-input__inner {
    width: 90% !important;
  }
  .el-input__suffix{
    right:15px !important
    
    ;
  }
}
</style>
