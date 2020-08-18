<template>
  <div class='scroll' ref="scroll">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: 'scroll',
  props:{
      probeType:{
          type:Number,
          default:0
      },
      pullUpLoad:{
          type:Boolean,
          default:false
      }
  },
  data(){
    return {
        scroll:null
    }
  },
  components: {},
  computed: {},
  created(){},
  mounted(){
      this.scroll=new BScroll(this.$refs.scroll,{
          click:true,
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad
      })
      if(this.probeType==2 || this.probeType==3){
        this.scroll.on("scroll",position=>{

            // 调用一下父组件中的
            this.$emit("parentScroll",position)
        })
      }

    //   当父组件允许加载更多时，才能监听滚动条是否滚动到页面底部
      if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
            // console.log('滚动到页面底部了')
            // setTimeout(()=>{
                this.$emit('pullingUp')
            // },3000)
            
        })
      }
      
      
  },
  methods: {
    //   注意：在组件内定义的方法，尽量不使用其他插件中已经定义好的方法，容易冲突
    //   定义跳转页面指定位置回到页面顶部事件
    scrollTo(x,y,time){
        this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    refreshScroll(){
        this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
        this.scroll&&this.scroll.finishPullUp();
    }
  }
}
</script>
<style scoped>
    /* .scroll{
        overflow: hidden;
    } */
</style>
