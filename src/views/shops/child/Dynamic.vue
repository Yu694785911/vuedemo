<template>
  <div class='Dynamic' >
      动态
      <div style="background:#f2f2f2;float:left">
        <p>本店热销，欢迎选购</p>
        <ul>
          <li v-for="list in img_box" :key="list" style="float:left">
            <img :src="path+list" alt style="width:115px;height:115px;margin:10px 5px"/>
          </li>
        </ul>
       
      </div>
       <p>没有更多动态了</p>
  </div>
</template>

<script>
import { getShopGoods } from "network/shops";
export default {
  name: 'Dynamic',
  data(){
    return {
      path: "http://106.12.85.17:8090/public/image/goods/",
      getDyGoods: [],
      img_box:[],
    }
  },
  components: {
  },
  computed: {},
  created(){
    this.getShops();
  },
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {
    getShops() {
      getShopGoods({ shop_id: this.$route.params.id }).then(res => {
        if (res.code != 200) return;
        this.getDyGoods = res.data;
        this.getDyGoods.forEach(list=>{
          console.log(list.img_cover)
          this.img_box.push(list.img_cover);
          console.log(this.img_box);
        })
      });
    }
  }
}
</script>
<style lang='less'>
</style>
