<template>
  <div id="country">
        <nav-bar class="home-nav-bar">
          <div slot="left" @click="historyGo(-1)">&lt;</div>
          <div slot="center">
            <h3 style="margin:0;font-weight:normal">选择国家或者地区</h3>
          </div>
        </nav-bar>

        <ul>
          <li>*</li>
          <li v-for="item in phone_area_code" :key="item.id" @click="historyGo(item.area_code)">
            <span class="city">{{item.country}}</span>
            <span class="code">+{{item.area_code}}</span>
          </li>
        </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { get_mobile_prefix } from "network/login";
import { AREA_CODE_BACK } from "store/mutation-types";
export default {
  name: "country",
  data() {
    return {
      phone_area_code: null,
      whereCome:'/home',
    };
  },
  components: {
    NavBar,
  },
  computed: {},
  created() {
    get_mobile_prefix().then(res => {
      this.phone_area_code = res.data;
    });
  },
  beforeRouteEnter(to,from,next){
    console.log(from);
    console.log(to);
    next();
  },
  mounted() {},
  methods: {
    historyGo(val){
      if(val>0){
        // 调用状态管理中定义的事件，并传递大于0的参数
        this.$store.commit(AREA_CODE_BACK,val);
      }else{
       if(this.$store.state.areacodeHistory=='/phone_register'){
         this.$store.commit(AREA_CODE_BACK,0);
         return;
       }
       this.$store.commit(AREA_CODE_BACK,val);
      }
      
    }
  }
};
</script>
<style lang='less'>
#country {
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
</style>
