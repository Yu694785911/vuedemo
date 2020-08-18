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
            <label for class="area-box">
              <span class="area-phone">+86</span>
              <i class="sanjiao"></i>
            </label>
            <input type="text" name id placeholder="请输入手机号" v-model="phoneReg" />
          </p>
        </div>
      </div>

      <el-button type="danger" round class="dangerBtn" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { register } from "network/login";

export default {
  name: "phonelogin",
  data() {
    return {
      phoneReg: ""
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
  methods: {
    next() {
      register({
        telphone: this.phoneReg,
        password: 121212
      }).then(res => {
        console.log(res);
        alert("注册成功");
        this.$router.push('/login')
      });
    }
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
}
</style>
