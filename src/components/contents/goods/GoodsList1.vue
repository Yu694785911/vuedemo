<template>
  <div class='GoodList' >
     <div v-for="(item,key) in cgoods" :key="key">
          <div v-if='tabCurrentType == key' style=" width: 100%;display: flex;flex-wrap: wrap;">
            <div v-for="(i,j) in item.list" :key="j" class="goodsList">
                <goods-list-item :citem="i"></goods-list-item>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name: 'GoodList',
  props:{
      cgoods:{
          type:Object,
          default(){
              return{}
          }
      },
      path:{
          type:String,
          default:"http://106.12.85.17:8090/public/image"
      },
      tabCurrentType:{
          type:String,
          default:"recommend"
      }
  },
  data(){
    return {}
  },
  components: {
      GoodsListItem
  },
  computed: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
.goodsList{
    width: 50%;
}
</style>
