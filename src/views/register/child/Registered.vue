<template>
  <div class="Registered">
    <nav-bar class="home-nav-bar">
      <div slot="left"  @click="open">&lt;</div>
      <div slot="center">
        <h3 style="margin:0;font-weight:normal">京东注册</h3>
      </div>
    </nav-bar>

    <div class="jd_zhuce">
      <div class="zhuce_first">
        <img src="../../../images/touxiang.png" alt="">
        <p class="yonghuname">{{aaa}}</p>
        <p>该手机号已经绑定以上京东帐号，请确认是否是你的帐号</p>
      </div>

      <el-button round style="margin-top:60px;height:50px;background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);color:#fff;">是我的,立即登录</el-button>
      <el-button round style="margin-top:20px;height:50px;border: 1px solid #878a8c;color: #686868">不是我的,继续注册</el-button>

      <p class="problem">遇到问题?请<a href="">联系客服</a></p>
    </div>


  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "Registered",
  data() {
    return {
      aaa:"",
    };
  },
  components: {
    NavBar
  },
  computed: {},
  created() {
    var jd_name=JSON.parse(this.$route.params.user).name;
    var first=jd_name.slice(0,1);
    var last=jd_name.slice(jd_name.length-1)
    this.aaa=first+"****"+last;

  },
  activated() {},
  deactivated() {},
  mounted() {},
  methods: { open() {
        this.$confirm('点击“返回”将中断注册，确定返回？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.go(-1);
        }).catch(() => {        
        });
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
      height: 90px;
      width: 90px;
      border-radius: 50%;
      border: 2px solid #f1f1f1;
    }
    p.name {
      min-height: 16px;
      margin: 15px 30px;
    }
  }
  .el-button{
    width:95% !important;
  }
  p.problem{
    color:#999;
    font-size: 14px;
    float: left;
  }
}
.el-message-box{
    width: 90% !important;
}
</style>
