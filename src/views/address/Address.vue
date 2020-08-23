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

      <p class="input-ph" @click="dialogVisible = true">
        <label for class="area-box">
          <span class="area-phone">所在地区:</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="选择所在地区" v-model="Address" style="color:#000" />
      </p>

      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">详细地址</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="详细地址需填写楼栋楼层或房间号信息" v-model="detailAdd" />
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

      <p class="input-ph">
        <span class="area-phone" style="float:left">设置默认地址:</span>
        <input
          type="checkbox"
          style="width: 20px;height: 20px;float: right;"
          class="defaultAdd"
        />
      </p>

      <el-button
        type="danger"
        round
        @click="userAddress"
        v-if="this.$route.params.id==1"
        style="background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);"
      >保存并使用该地址</el-button>
      <div v-if="this.$route.params.id==0">
        <el-button
          type="danger"
          round
          @click="userAddress"
          style="margin-bottom:10px;background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);"
        >确认</el-button>
        <el-button type="default" round @click="deleteAddress" style="margin:0;">删除收货地址</el-button>
      </div>
    </div>

    <el-dialog title="所在地区" :visible.sync="dialogVisible">
      <div class="header">
        <span class="Pname"></span>
        <span class="Cname"></span>
        <span class="Aname"></span>
      </div>
      <ul class="Province">
        <li
          v-for="(item,index) in getprovince"
          :key="index"
          @click="getP(item.provinceid,$event)"
        >{{item.province}}</li>
      </ul>
      <ul class="Citys">
        <li v-for="(i,j) in getcitys" :key="j" @click="getC(i.cityid,$event)">{{i.city}}</li>
      </ul>
      <ul class="Areas">
        <li v-for="(m,n) in getareas" :key="n" @click="getA($event)">{{m.area}}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import {
  getProvinces,
  getCity,
  getAreas,
  createuserAdd,
  deleteuserAddress,
  updateuserAddressdef
} from "network/address";

export default {
  name: "Address",
  data() {
    return {
      activeName: "first",
      Addressname: "",
      Addressphone: "",
      province: "",
      city: "",
      area: "",
      Address: "",
      getprovince: "",
      getcitys: "",
      getareas: "",
      dialogVisible: false,
      detailAdd: "",
      All: "",
      radio: 0
    };
  },
  components: {
    NavBar
    // Scroll
  },
  computed: {},
  created() {
    // this.Addressname = this.$store.state.userInfo.Addressname;
    // this.Addressphone = this.$store.state.userInfo.Addressphone;
    // this.Addresscity = this.$store.state.userInfo.Addressxx;
    // this.Addresshouse = this.$store.state.userInfo.Addressxx;
    console.log(this.$route.params.id);

    getProvinces().then(res => {
      this.getprovince = res.data;
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(done) {
      done();
    },
    back() {
      this.$router.go(-1);
    },
    userAddress() {
      console.log(document.querySelector(".defaultAdd").checked);

      if (document.querySelector(".defaultAdd").checked) {
        updateuserAddressdef({ address_id: 25,user_id:3 }).then(res=>{
          console.log(res);
        })
      }
      this.All = this.Address + this.detailAdd;
      console.log(this.All);
      let data = {
        user_id: this.$store.state.userInfo.id,
        takeover_tel: this.Addressphone,
        takeover_name: this.Addressname,
        takeover_addr: this.All
      };

      createuserAdd(data).then(res => {
        console.log(res);
        if (res.code != 200) return;
        this.$router.push("/newaddress");
      });
      // this.$store.state.userInfo.Addressname = this.Addressname;
      // this.$store.state.userInfo.Addressphone = this.Addressphone;
      // this.$store.state.userInfo.Addressxx =
      //   this.Addresscity + this.Addresshouse;
      // console.log(this.$store.state.userInfo);
      // localStorage.setItem("Addressname", this.Addressname);
      // localStorage.setItem("Addressphone", this.Addressphone);
      // localStorage.setItem("Addressxx", this.Addresscity + this.Addresshouse);
      // this.$router.go(-1);
    },
    getP(sid, e) {
      document.querySelector(".Pname").innerHTML = e.target.innerHTML;
      getCity({ provinceid: sid }).then(res => {
        this.getcitys = res.data;
      });
      document.querySelector(".Province").style.display = "none";
      document.querySelector(".Citys").style.display = "block";
    },
    getC(aid, e) {
      document.querySelector(".Cname").innerHTML = e.target.innerHTML;
      getAreas({ cityid: aid }).then(res => {
        this.getareas = res.data;
      });
      document.querySelector(".Citys").style.display = "none";
      document.querySelector(".Areas").style.display = "block";
    },
    getA(e) {
      document.querySelector(".Aname").innerHTML = e.target.innerHTML;
      var allAddress =
        document.querySelector(".Pname").innerHTML +
        document.querySelector(".Cname").innerHTML +
        document.querySelector(".Aname").innerHTML;
      this.Address = allAddress;
      this.dialogVisible = false;
    },
    deleteAddress() {
      deleteuserAddress({ address_id: 24 }).then(res => {
        if (res.code != 200) return;
        console.log(res);
        this.$router.push("/newaddress");
      });
    },
  }
};
</script>
<style lang="less">
.Address {
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
  div.header {
    height: 40px;
    span {
      width: 20%;
      float: left;
      line-height: 40px;
      color: red;
    }
  }
  .Province {
    display: block;
  }
  .Citys {
    display: none;
  }
  .el-button.is-round {
    width: 100%;
    margin-top: 50px;
  }
  .el-dialog {
    width: 100%;
    margin-top: 20vh !important;
    height: 80%;
    margin: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .el-dialog__body {
    height: 400px;
    overflow: auto;
    ul {
      li {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: left;
        &:last-child {
          margin-bottom: 20px;
        }
      }
    }
  }
  .el-tabs__item.is-active {
    color: red;
  }
  .el-tabs__active-bar {
    background-color: red;
  }
  // #tab-second{
  //   display: none;
  // }
  // #tab-third{
  //   display: none;
  // }
}
#addressScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
}
</style>
