<template>
  <div id="category">
    <nav-bar class="home-nav-bar">
      <div slot="left"  @click='back'>&lt;
      </div>
      <div slot="center">
        <input placeholder="请输入内容" class="souIpt" @click="abc">
      </div>
    </nav-bar>
  <hr>
    <scroll class="one" ref="one" >
      <div>
      <tab-control
              :controlId="tabControlId"
              :titleArr="jd_category_one"
              @tabClick="tabControlClick"
              ref="categoryControl"
            >
              <div @click="tabControlClick('hot')" :class="{active:controlIndex == 'hot'}">
                <span>热门推荐</span>
                :
                <slot>0</slot>
              </div>
            </tab-control>
      </div>
      
    </scroll>

   <scroll class="two" ref="two" :probeType="3" @parentScroll="contentScroll">
      <div>
          <div v-if="controlIndex === 'hot'">
            <dl v-if="shophistory.length" >
            <dt>
                浏览记录
                <el-button type="text" @click="rmHistory"  style="float:right"><img src="../../images/delete.png" style="width:12px;height:12px;">清空</el-button>
              </dt>
              <dd v-for="(item,key) in shophistory" :key="key"  @click="zaa(item,0)">
                <img :src="path+item.c3_img" alt />
                <span>{{item.c3_name}}</span>
              </dd>
            </dl>
            <dl>
              <dt>热门分类 <el-button type="text" style="float:right"><a :href="'http://localhost:8080/ranking'"><img src="../../images/phb.png" style="width:12px;height:12px;">排行榜></a></el-button></dt>
              
              <dd v-for="(item,key) in secMenuList" :key="key" @click="Browhistory(item,1)">
                <img :src="path+item.c3_img" alt />
                <span>{{item.c3_name}}</span>
              </dd>
            </dl>
      </div>
      <div v-if="controlIndex != 'hot'">
        <dl v-for="(item,key) in secMenuList" :key="key">
          <dt>{{key}}</dt>
          <dd v-for="(item,key) in item" :key="key">
            <a :href="'/detalis/'+item">
              <img :src="path+item.c3_img" alt />
              <span>{{item.c3_name}}</span>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </scroll>
      
      <!-- <main-tab-bar v-if="isTabBar"></main-tab-bar> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents/tabControl/TabControl";
// import MainTabBar from "components/contents/MainTabbar/MainTabbar.vue";
import {
  get_jd_category_one,
  get_jd_category_two,
  get_jd_category_three
} from "network/category";
import Scroll from "components/contents/scroll/Scroll"
export default {
  name: "Category",
  data() {
    return {
      //动态定义组件id名字
      tabControlId: "categoryControl",
      //正常数据
      jd_category_one: [],
      jd_category_two: [],
      jd_category_three: [],
      controlIndex: "hot",
      isTabBar:true,
      secMenuList: null, //可能是数字也可能是对象
      path: "http://106.12.85.17:8090/public/image/jd_category/",
      shophistory: [] //已经浏览的记录    在发生页面跳转后，在路由守卫中记录当前请求的数据，并在页面跳转前，存储到shophistory中(把整个three中找到的那条数据存储进来)
    };
  },
  components: {
    NavBar,
    TabControl,
    Scroll
  },
  created() {
    this.get_jd_category_one(), this.get_jd_category_two();
    this.get_jd_category_three();
  },
  methods: {
    Browhistory(a,b){
      if(b) this.shophistory.push(a)
      console.log(a);
      this.$router.push('/details/'+a.c3_id)
    },
     abc(){
      // console.log(this.$router.push);
      this.$router.push({ path:'/keyword'  })
    },
    //定义业务相关事件
    tabControlClick(index) {
      if (index === "hot") {
        this.secMenuList = [];
        //循环遍历 表3 取出c3_ishot == 1的值，存到secMenuList中
        // filter本身就会返回一个数组
        this.secMenuList = [
          ...this.jd_category_three.filter(threeList => {
            if (threeList.c3_ishot == 1) {
              return true;
            }
            return false;
          })
        ];
      } else {
        this.secMenuList = {};

        this.jd_category_two.forEach(twoList => {
          if (twoList.c1_id == index) {
            this.secMenuList[twoList.c2_name] = {};
            this.jd_category_three.forEach(threeList => {
              if (threeList.c2_id == twoList.c2_id) {
                this.secMenuList[twoList.c2_name][
                  threeList.c3_name
                ] = threeList;
              }
            });
          }
        });
      }

      //传递进来的参数用于判断按钮是否选中
      this.controlIndex = index;
      //回传数据给子组件 修改子组件的数据
      //ref = categoryControl 的组件的值
      this.$refs.categoryControl.itemIndex = index;
    },
    rmHistory() {
      let that = this;
      this.$confirm("是否删除浏览记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.shophistory = [];
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    contentScroll(position){
      console.log("contentScroll被使用",position)
    },
    //网络请求
    get_jd_category_one() {
      get_jd_category_one().then(res => {
        if (res) this.jd_category_one.push(...res.data);
      });
    },
    get_jd_category_two() {
      get_jd_category_two().then(res => {
        if (res) this.jd_category_two.push(...res.data);
      });
    },
    get_jd_category_three() {
      get_jd_category_three().then(res => {
        if (res) this.jd_category_three.push(...res.data);
        this.tabControlClick(this.controlIndex);
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  mounted(){
     this.$parent.isTabBar=true;
    this.$parent.isphbTabBar=false;
    this.$parent.isjxTabBar=false;

    this.$bus.$on('goodsImageLoad1',()=>{
      this.$refs.scrollCom.refresh()
    })
  }
};
</script>

<style scoped>
#catetory {
  display: flex;
  font-size: 12px;
}
.souIpt{
  border-radius:50px;
  -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 90%;

}
.one {
  width: 20vw;
  flex: 1;
  background-color: #f8f8f8;
  float: left;
  height:calc(100vh - 49px);
  overflow: hidden;
}
.one li {
  width: 100%;
}
.one li button {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #dcdcdc;
  color: #333;
  font-size: 14px;
}
@media screen and (max-width: 768px) {
  .two {
    flex: 3;
    width: 80vw;
    float: left;
    height:calc(100vh - 49px);
    overflow: hidden;
  }
}
@media screen and (min-width: 768px) {
  .two {
    flex: 6;
    width: 80vw;
    float: left;
  }
}
.active {
  color: Red;
  background: #fff;
}
.two dl {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  margin-bottom: 20px;
}
.two dt {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  margin-bottom: 15px;
  line-height: 40px;
}
.two dl dd {
  width: 33%;
  margin-bottom: 10px;
  padding: 0;
  margin: 0;
}
.two dl dd img {
  width: 60%;
  display: block;
  margin: 0 auto;
}
</style>
