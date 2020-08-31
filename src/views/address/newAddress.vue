<template>
  <div class="newaddress">
    <nav-bar class="newNavBar" ref="OrderNavBar">
      <div slot="left" class="left" @click=" back">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div slot="center">
        <div class="title">收货地址</div>
      </div>
    </nav-bar>
    <div class="newAdd">
      <ul v-for="(i,j) in allAddress" :key="j" >
        <div @click="updataDef(i)">
          <input type="radio" name="a" style="float:left;margn-top:10%;" @click="changedef(i.id)" :checked="i.default==1">
        <li class="name">
          <strong>{{i.takeover_name}}</strong>
          <strong>{{i.takeover_tel | changeTel(i.takeover_tel)}}</strong>
        </li>
        <br />
        <li>{{i.takeover_addr}}</li>
        </div>
        
        <li class="edit" @click="Edit(i.id)">编辑</li>
      </ul>

      <el-button type="danger" round @click="newAddress">新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getuserAddress,updateuserAddressdef } from "network/address";

export default {
  name: "newaddress",
  data() {
    return {
    };
  },
  components: {
    NavBar
  },
  computed: {
    allAddress(){
      return this.$store.state.allAddress==null?[]:this.$store.state.allAddress;
    }
  },
  created() {
    getuserAddress({ user_id:this.$store.state.userInfo.id }).then(res => {
      console.log(res.data);
      this.$store.state.allAddress = res.data;
    });
  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    newAddress() {
      this.$router.push("/address/0");
    },
    changedef(defid){
      updateuserAddressdef({address_id:defid,user_id:this.$store.state.userInfo.id}).then(res => {
        console.log(res);
      });

    },
    updataDef(val){
      this.$store.state.shoppingAddress=val;
      this.$router.go(-1);
    },
    Edit(addid) {
      console.log(this.$store.state.userInfo.id);
      getuserAddress({ user_id: this.$store.state.userInfo.id }).then(res => {
        console.log(res);
      });
      console.log(addid);
      this.$store.state.addid=addid;
      console.log(this.$store.state.addid)
      this.$router.push("/address/1");
    }
  },
  filters: {
    changeTel(val) {
      return val.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  }
};
</script>
<style lang="less">
.newaddress {
  .newNavBar {
    border-bottom: 1px solid #dedede;
  }
  .newAdd {
    background: #f2f2f2;
    height: 621px;

    ul {
      padding-right: 50px;
      background-color: #fff;
      z-index: 2;
      padding: 7px 40px;
      position: relative;

      img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 30%;
        left: 10px;
      }
      li {
        text-align: left;
        font-size: 14px;
        color: #666;
      }
      li.name {
        color: #333;
        font-size: 17px;
        strong {
          font-weight: 600;
        }
      }
      li.edit {
        display: flex;
        position: absolute;
        color: #f2270c;
        width: 50px;
        align-items: center;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        margin: 0;
      }
    }
    .el-button.is-round {
      width: 100%;
      margin-top: 50px;
      background-image: linear-gradient(135deg, #f2140c, #f2270c 70%, #f24d0c);
      position: fixed;
      bottom: 10px;
      left: 0;
      right: 0;
    }
  }
}
</style>
