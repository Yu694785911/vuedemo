<template>

  <div class='GoodsListItem'>
      <div class="goodslist">
         <a href="javascript:;">
                <img :src="itempath+'/jd_category/'+citem.c3_img"/>
                <span>{{citem.c3_name}}</span>
        </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props:{
      citem:{
          type:Object,
          default(){
              return{}
          }
      },
      itempath:{
          type:String,
          default:"http://106.12.85.17:8090/public/image"
      }
  },
  data(){
    return {}
  },
  components: {},
  computed: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
.GoodsListItem{
  width: 100%;
}
.GoodsListItem a img {
  width: 60%;
  margin: 0 20%;
}
.goodslist a span {
  width: 98%;
}
</style>
