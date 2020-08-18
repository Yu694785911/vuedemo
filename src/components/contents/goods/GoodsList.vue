<template>
  <div class='GoodsList' >
      <goods-list-item v-for="(item,key) in cgoods" :key="key" :citem="item" :itempath='path' :isDirection='cisDirection'></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
  name: 'GoodList',
  props:{
      cgoods:{
          type:Array,
          default(){
              return []
          }
      },
      path:{
          type:String,
          default:"http://106.12.85.17:8090/public/image/"
      },
      tabCurrentType:{
          type:String,
          default:"recommend"
      },
      cisDirection:{
        type:Boolean,
        default:true
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
.GoodsList{
  display: flex;
  flex-wrap: wrap;
}
</style>
