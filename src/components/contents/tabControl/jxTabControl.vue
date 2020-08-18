<template>
  <div :id="controlId" ref='tabControl' class="tabControl">
      <!-- <div>
          <slot></slot>
      </div>
      <div v-for="item in titleArr" :key="item.c1_id" @click="itemClick(item.c1_id)" :class="{active:itemIndex == item.c1_id}">
          <div>
              <span>{{item.c1_name}}</span>
              :
              <slot name="subName">{{item.c1_id}}</slot>
          </div>
      </div>
  </div> -->
  <!-- <ul :id="controlId" class='tabControl'>
      <li v-for="item in titleArr" :key="item.c1_id">
          <div>
              <span>{{item.c1_name}}</span>
              <slot>{{item.c1_id}}</slot>
          </div>
      </li>
  </ul> -->

    <div v-for="(item,index) in titleArr" :key="index" @click="itemClick(index)" :class="{active:itemIndex==index}">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
      controlId:{
          type:String,
          default:"tabControl"
      },
      titleArr:{
          type:Array,
          default(){
              return []
          }
      },
      direction:{//排列方向
            type:String,
            default:'transverse'//纵向 portait 
      }
  },
  data(){
    return {
        itemIndex:0,
    }
  },
  components: {},
  computed: {},
  created(){},
  mounted(){
      this.handleDom()
  },
  methods: {
      handleDom(){
        //   let tabControl=this.$refs.tabControl;
          let tabControl=document.querySelector(`#${this.controlId}`);
          let parentWidth=tabControl.offsetWidth;
          let divItem=tabControl.querySelectorAll("div");
          divItem.forEach(item=>{
              item.style.width=parentWidth/this.column-20+'px'
          })
      },
      itemClick(index){
          //在子组件中如果向使用父组件传递过来的事件，需要通过使用$emit
          this.$emit('tabClick',index)
          //$parent 直接使用父组件的事件 (只能找到上一个父元素)
          //   this.$parent.tabControlClick(index)
          this.itemIndex = index
          console.log(index)
      }
  }
}
</script>
<style  scoped>
.tabControl{
    width:100%;
    font-size:12px;
    line-height:40px;
    display: flex;
}
.tabControl div{
    width: 50%;
    height:40px;
    border:1px solid red;
    flex:1;
    z-index:1000
}
.active{
    color:red;
    background:#fff
}
</style>
