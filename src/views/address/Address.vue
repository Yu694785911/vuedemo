<template>
  <div class="Address">
    <nav-bar class="OrderNavBar" ref="OrderNavBar">
      <div slot="left" class="left" @click=" back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <div class="title">{{code==0?"新增地址":"修改配送地址"}}</div>
      </div>
    </nav-bar>
    <div class="Inputcon">
      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">收货人:</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" id="aaa" placeholder="姓名" v-model="addAddress.Addressname" />
      </p>

      <p class="input-ph phone">
        <label for class="area-box">
          <span class="area-phone">联系方式:</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="手机号" v-model="addAddress.Addressphone" />
        <span class="el-icon-success" v-if="phonetest"></span>
        <span class="el-icon-error" v-if="!phonetest"></span>
      </p>

      <p class="input-ph" @click="dialogVisible = true">
        <label for class="area-box">
          <span class="area-phone">所在地区:</span>
          <i class="sanjiao"></i>
        </label>
        <span
          style="line-height: 50px;margin-left: -30px;color: grey;"
          @click="getProvince"
        >{{addAddress.Address|getNowAddr(addAddress.Address)}}</span>
      </p>

      <p class="input-ph">
        <label for class="area-box">
          <span class="area-phone">详细地址:</span>
          <i class="sanjiao"></i>
        </label>
        <input type="text" name id placeholder="详细地址需填写楼栋楼层或房间号信息" v-model="addAddress.detailAdd" />
      </p>

      <p class="input-ph add-ph">
        <label for class="area-box">
          <span class="area-phone">地址标签:</span>
          <i class="sanjiao"></i>
        </label>

        <button
          v-for="(item,index) in takeoverArr"
          :key="index"
          @click="setTakeover(item,index)"
          :class="{tagactive:active==index}"
        >{{item}}</button>
        <button @click="addTakoverTag" v-if="takeoverArr.length!=4">自定义+</button>
        <span class="el-icon-edit-outline" v-if="takeoverArr.length==4" @click="addTakoverTag"></span>
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
        <el-switch v-model="addAddress.default" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </p>

      <el-button
        type="danger"
        round
        @click="userAddress"
        v-if="this.$route.params.code==0"
        style="background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);"
      >保存并使用该地址</el-button>
      <div v-if="this.$route.params.code==1">
        <el-button
          type="danger"
          round
          @click="userAddress"
          style="margin-bottom:10px;background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);"
        >确认</el-button>
        <el-button type="default" round @click="deleteAddress" style="margin:0;">删除收货地址</el-button>
      </div>
    </div>

    <div class="region">
      <el-dialog title="所在地区" :visible.sync="dialogVisible">
        <el-tabs v-model="editableTabsValue">
          <el-tab-pane
            :key="item.name"
            v-for="item in editableTabs"
            :label="item.title"
            :name="item.active"
          >
            <scroll class="newaddr-content" :probeType="3" :pull-up-load="true">
              <p v-for="i in item.content" :key="i.id" @click="addAreaTab(item,i)">{{i[item.type]}}</p>
            </scroll>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>

    <!-- 自定义标签 -->
    <div class="tablib">
      <el-dialog title="自定义标签名称" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-input v-model="form.name" autocomplete="off" placeholder="标签最多填写八个字"></el-input>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="querendialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/contents/scroll/Scroll";
import {
  getuserAddress,
  getProvinces,
  getCities,
  getAreas,
  createuserAdd,
  deleteuserAddress,
  updateuserAddress
} from "network/address";

export default {
  name: "Address",
  data() {
    return {
      editableTabsValue: "0",
      phonetest:'',
      editableTabs: [
        {
          title: "请选择",
          active: "0",
          type: "province",
          content: null
        }
      ],
      activeName: "first",
      Addressname: "",
      Addressphone: "",
      province: "",
      city: "",
      area: "",
      Address: [],
      getprovince: "",
      getcitys: "",
      getareas: "",
      dialogVisible: false,
      detailAdd: "",
      All: "",
      radio: 0,
      value: false,
      code: null,
      takeoverArr: ["公司", "家", "学校"],
      areaArr: ["province", "city", "area"],
      addAddress: {
        Addressname: "",
        Addressphone: "",
        Address: [],
        detailAdd: "",
        tag: "",
        default: false
      },
      addr: false,
      active: -1, //地址标签被选中的对比值
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  components: {
    NavBar,
    Scroll
  },
  computed: {
    addressPhone() {
      return this.addAddress.Addressphone;
    }
  },
  created() {
    // code 实际上是地址的id编号，传0的时候代表没有编号，新增，不是0的时候，就是有编号，就萤爱修改指定编号的值
    this.code = this.$route.params.code;
    this.addid = this.$store.state.addid;
    if (this.code != 0) {
      // 做地址请求
      // 做地址赋值，从vuex中取出要修改的地址，存到当前组件中并使用
      getuserAddress({ user_id: 3, address_id: this.addid }).then(res => {
        let addr = res.data[0];

        // 做地址赋值
        this.addAddress.Addressname = addr.takeover_name;
        this.addAddress.Addressphone = addr.takeover_tel;

        let arr = addr.takeover_addr.split(",");
        this.addAddress.detailAdd = arr.pop();
        this.addAddress.Address = arr;
        this.addAddress.tag = addr.takeover_label;
        this.addAddress.default = addr.default == 1 ? true : false;

        // 判断 地址标签中是否存有获取的地址标签
        if (addr.takeover_label != "") {
          this.active = this.takeoverArr.indexOf(addr.takeover_label);
          if (this.active == -1) {
            this.takeoverArr.push(addr.takeover_label);
            this.active = 3;
          }
        }

        // 修改城市位置后出现的遮罩层的数据
        this.editableTabs = [];
        for (let i = 0; i < this.addAddress.Address.length; i++) {
          this.editableTabs[i] = {};
          this.editableTabs[i].title = this.addAddress.Address[i];
          this.editableTabs[i].active = i + "";
          this.editableTabs[i].type = this.areaArr[i];
          this.editableTabs[i].content = null;
        }

        getProvinces().then(res => {
          this.editableTabs[0].content = res.data;
          // 从res.data中取出指定值得id
          let pid = res.data.filter(item => {
            if (item.province == this.addAddress.Address[0]) {
              return true;
            }
            return false;
          });
          getCities({ provinceid: pid[0].provinceid }).then(res => {
            this.editableTabs[1].content = res.data;
            let cid = res.data.filter(item => {
              if (item.cid == this.addAddress.Address[1]) {
                return true;
              }
              return false;
            });
            getAreas({ cityid: cid[0].cityid }).then(res => {
              this.editableTabs[2].content = res.data;
            });
          });
        });
      });
    }
  },
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
    // 1.对地址标签添加新值
    addTakoverTag() {
      this.dialogFormVisible = true;
      // this.takeoverArr.push("aa");
    },
    // 2.对 地址标签添加的新值 进行修改
    // 3.用于设置地址标签
    setTakeover(val, index) {
      // this.dialogFormVisible = true;

      // 如果点击的是相同的元素
      if (val == this.addAddress.tag) {
        this.addAddress.tag = "";
        this.active = "-1";
        return;
      }
      // 不是相同的元素
      this.active = index;
      this.addAddress.tag = val;
      console.log(this.addAddress.tag);
    },
    addrShow() {
      this.dialogVisible = true;
      if (this.editableTabs[0].content == null) {
        this.getProvinces();
      }
    },
    querendialog() {
      this.dialogFormVisible = false;
      console.log(this.form.name);

      if (this.takeoverArr.length == 3) {
        this.takeoverArr.push(this.form.name);
      } else {
        console.log(this.takeoverArr[3]);
        this.takeoverArr[3] = this.form.name;
      }

      console.log(this.takeoverArr.length);
    },
    getProvince() {
      getProvinces().then(res => {
        console.log(res);
        this.editableTabs[0].content = res.data;
        console.log(this.editableTabs[0]);
      });
    },
    getCities(data) {
      getCities(data).then(res => {
        console.log(res);
        this.editableTabs[1].content = res.data;
      });
    },
    getAreas(data) {
      getAreas(data).then(res => {
        console.log(res);
        this.editableTabs[2].content = res.data;
      });
    },
    // 为选项卡添加title值，并且创建下一个选项的值
    addAreaTab(obj, temp) {
      console.log(obj.active);
      console.log(temp);

      // 设置当前选项按钮的title的值
      this.editableTabs[obj.active].title = temp[obj.type];
      // 创建下一个按钮的active值
      let newActive = obj.active * 1 + 1 + "";
      if (newActive < 3) {
        // 每次选择的时候，都会从新截取一下选中值 之前的数据
        this.editableTabs = this.editableTabs.slice(0, obj.active + 1);
        this.editableTabs.push({
          title: "请选择",
          active: newActive,
          type: this.areaArr[newActive],
          content: [1, 2, 3, 4]
        });
        this.editableTabsValue = this.editableTabs[newActive].active;
        let data = {};
        data[this.areaArr[obj.active] + "id"] = temp.provinceid;
        if (newActive == 1) this.getCities({ provinceid: temp.provinceid });
        if (newActive == 2) this.getAreas({ cityid: temp.cityid });
      }
      if (newActive == 3) {
        this.dialogVisible = false;
        this.addAddress.Address = [];
        this.editableTabs.forEach(item => {
          this.addAddress.Address.push(item.title);
        });
      }
    },
    //用于设置
    checkTakeoverTag() {},
    userAddress() {
      console.log(this.phonetest);
      if(this.phonetest=="") return alert("手机号不能为空");
      if(this.phonetest==false) return alert("手机号验证错误");
      if (this.addAddress.Addressname == "") return alert("收货人不能为空");
      if (this.addAddress.Addressphone == "") return alert("电话不能为空");
      if (this.addAddress.Address.length == 0) return alert("城市不能为空");
      if (this.addAddress.detailAdd == "") return alert("收详细地址不能为空");

      let data = {};
      data.user_id = this.$store.state.userInfo.id;
      data.takeover_name = this.addAddress.Addressname;
      data.takeover_tel = this.addAddress.Addressphone;
      data.takeover_addr =
        this.addAddress.Address.join(",") + "," + this.addAddress.detailAdd;
      data.takeover_label = this.active != -1 ? this.addAddress.tag : "";
      data.default = this.addAddress.default ? 1 : 0;

      // let updatedata = {};
      // updatedata.takeover_name = this.addAddress.Addressname;
      // updatedata.takeover_tel = this.addAddress.Addressphone;
      // updatedata.takeover_addr =
      //   this.addAddress.Address.join(",") + "," + this.addAddress.detailAdd;
      // updatedata.takeover_label = this.addAddress.tag;
      // updatedata.address_id = this.$route.params.addid;

      console.log(data);
      console.log(this.code);
      if (this.code == 0) {
        //指定提交字段为6
        //请求添加数据
        createuserAdd(data).then(res => {
          if (res.code != 200) return;
          this.$store.state.shoppingAddress = data;
          console.log(this.$store.state.shoppingAddress);

          if (!this.$store.state.configOrderHistory) this.$router.push("/cart");

          this.$router.push(this.$store.state.configOrderHistory);
          // window.location.reload();
        });
      } else {
        //提交字段为7
        data.address_id = this.addid;
        updateuserAddress(data).then(res => {
          if (res.code != 200) return;
          console.log(res);
          this.$store.state.shoppingAddress = data;

          if (!this.$store.state.configOrderHistory) this.$router.push("/cart");
          this.$router.push(this.$store.state.configOrderHistory);
          //  如果修改成功，判断修改的数据，是否提交了默认地址，如果提交了默认地址。则改变现有的userInfo的defaddr
          if (data.default == 1) {
            this.$store.userInfo.defaddr = data;
          }
        });
      }
    },
    getP(sid, e) {
      document.querySelector(".Pname").innerHTML = e.target.innerHTML;
      getCities({ provinceid: sid }).then(res => {
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
      // var allAddress ='"'+document.querySelector(".Pname").innerHTML+'","'+document.querySelector(".Cname").innerHTML+'","'+document.querySelector(".Aname").innerHTML+'"';

      var allAddress =
        document.querySelector(".Pname").innerHTML +
        "," +
        document.querySelector(".Cname").innerHTML +
        "," +
        document.querySelector(".Aname").innerHTML;

      this.addAddress.Address.push(allAddress);
      console.log(allAddress.toString());
      console.log(allAddress.split(","));
      this.dialogVisible = false;
    },
    deleteAddress() {
      console.log(this.$route.params.addid);
      deleteuserAddress({ address_id: this.$route.params.addid }).then(res => {
        if (res.code != 200) return;
        console.log(res);
        if (res.code == 200) {
          alert("删除成功");
          this.$router.push("/newaddress");
          window.location.reload();
        }
      });
    }
  },
  filters: {
    getNowAddr(val) {
      let temp = "选择所在地区";
      if (val.length > 1) {
        temp = val.join(" ");
      }
      return temp;
    }
  },
  watch: {
    addressPhone(newValue) {
      console.log(newValue);
      let pattern = /^(13|14|15|17|18)[0-9]{9}$/;
      console.log(pattern.test(newValue));
      if(pattern.test(newValue)){
          this.phonetest=true;
      }else{
          this.phonetest=false;
      }
    }
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
    position: relative;
  }
  .Inputcon p.phone input {
    width: 70% !important;
  }
  .Inputcon p label.area-box {
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
  .Inputcon p.add-ph .biaoqian:first-child {
    margin-left: 70px;
    width: 72px;
    height: 50px;
    line-height: 50px;
  }
  .Inputcon p.add-ph button {
    margin-top: 2%;
    background: #fff;
    border: 1px solid #dedede;
    padding: 5px 0px;
    border-radius: 10px;
    margin-right: 10px;
    font-size: 14px;
    color: #999;
  }
  .Inputcon p.add-ph button:first-child {
    margin-left: 30px;
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
  .newaddr-content p {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: left;
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
  .region {
    .el-dialog {
      width: 100%;
      margin-top: 20vh !important;
      height: 80%;
      margin: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
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
  }
  .tablib {
    .el-dialog {
      margin-top: 40vh !important;
      width: 80%;
      height: 170px;
    }
    .el-dialog__title {
      font-size: 16px;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    .el-button {
      border-radius: 30px;
      width: 50%;
    }
    .el-button--default {
      margin-left: -10%;
    }
    .el-button--primary {
      background-color: red;
      border-color: red;
    }
  }
  .el-tabs__item.is-active {
    color: red;
  }
  .el-tabs__active-bar {
    background-color: red;
  }
  .tagactive {
    background: pink;
  }
}
#addressScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
}
</style>
