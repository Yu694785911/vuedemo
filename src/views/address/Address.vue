<template>
  <div class="Address">
    <nav-bar class="OrderNavBar" ref="OrderNavBar">
      <div slot="left" class="left" @click=" back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <div class="title">收货地址</div>
      </div>
    </nav-bar>
    <div class="Inputcon">
      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">收货人</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" id="aaa" placeholder="姓名" v-model="Addressname" />
      </p>

      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">联系方式</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="手机号" v-model="Addressphone" />
      </p>

      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">所在地区</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="选择所在地区" v-model="Addresscity" />
      </p>
      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">详细地址</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="详细地址需填写楼栋楼层或房间号信息" v-model="Addresshouse" />
      </p>

      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">地址标签</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="请输入手机号" />
      </p>

      <p class="input-ph">
        <span class="area-phone" style="float:left">智能识别地址:</span>
        <br />
        <span
          style="font-size:12px;color:grey;text-align:left"
        >粘贴如，北京市朝阳区三环到四环之间朝阳公园南路甲2号，张小三，13528473398</span>
      </p>
      <el-button type="danger" round @click="userAddress">保存并使用该地址</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Address",
  data() {
    return {
      Addressname: "",
      Addressphone: "",
      Addresscity: "",
      Addresshouse: ""
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
   this.Addressname=this.$store.state.userInfo.Addressname;
   this.Addressphone=this.$store.state.userInfo.Addressphone;
   this.Addresscity=this.$store.state.userInfo.Addressxx;
   this.Addresshouse=this.$store.state.userInfo.Addressxx;
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    userAddress() {
      this.$store.state.userInfo.Addressname=this.Addressname;
      this.$store.state.userInfo.Addressphone=this.Addressphone;
      this.$store.state.userInfo.Addressxx=this.Addresscity + this.Addresshouse;
      console.log(this.$store.state.userInfo);
      localStorage.setItem("Addressname", this.Addressname);
      localStorage.setItem("Addressphone", this.Addressphone);
      localStorage.setItem("Addressxx", this.Addresscity + this.Addresshouse);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
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
  text-align: left;
}
.Inputcon p.input-ph input {
  width: 80%;
  height: 47px;
  border: none;
  border-bottom: 1px solid #efefef;
  padding-left: 70px;
  font-size: 14px;
  color: grey;
  outline: none;
}
.el-button.is-round {
  width: 100%;
  margin-top: 50px;
  background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
}
</style>
