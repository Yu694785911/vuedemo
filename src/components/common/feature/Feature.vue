<template>
  <div :id="divID">
    <!-- feature -->
    <div class="feature" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot>
        <!-- 被FeatureItem中的ul代替 -->
      </slot>
    </div>
    <!-- 小按钮 -->
    <div class="pagination">
        <b ></b>
        <b ></b>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    divID: {
      type: String,
      default: "featureBox"
    },
    iscopy:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      currentIndex: 0,
      itemLength: 0,
      featureWidth: 0,
      featureStyle: {},
      scrolling: false,
      startX: 0,
      distance: 0,
      animateDuration: 0.3,
      moveBase: 0.3
    };
  },
  methods: {
    handleDom(id) {
      let divEl = document.querySelector(`#${id}`);
      divEl.style.position = "relative";
      divEl.style.overflow = "hidden";

      let featureEl = document.querySelector(`#${id} .feature`);
      let itemEls = document.querySelectorAll(".feature-item");


      // 根据传递的参数，判断是否需要复制子对象
      if(this.iscopy && itemEls.length>1){
        let cloneFirst = itemEls[0].cloneNode(true);
        let cloneLast = itemEls[itemEls.length - 1].cloneNode(true);
        featureEl.appendChild(cloneFirst);
        featureEl.insertBefore(cloneLast, itemEls[0]);
        this.currentIndex=1;
      }




      this.itemLength = itemEls.length;
      this.featureWidth = featureEl.offsetWidth;
      this.featureStyle = featureEl.style;
      this.setTransform(this.currentIndex * -this.featureWidth);


       var anniu=document.querySelectorAll(".pagination b")
      
      for(var j=0;j<anniu.length;j++){
          if(j==this.currentIndex){
              anniu[j].className="cur";
          }
      }

      
    },
    setTransform(position) {
      this.featureStyle.transform = `translateX(${position}px)`;
      this.featureStyle["-webkit-transform"] = `translateX(${position}px)`;
      this.featureStyle["-ms-transform"] = `translateX(${position}px)`;
    },
    //移动正确位置
    scrollPosition(currenPosition) {
      this.scrolling = true;
      this.featureStyle.transition =
        "transform " + this.animateDuration + "ms";
      this.setTransform(currenPosition);
      // this.checkPosition();
      if(this.iscopy) this.checkPosition();
      this.scrolling = false;
    },
    checkPosition() {
      setTimeout(() => {
        //把动画时间设置为0,瞬间转换图片
        this.featureStyle.transition = "0ms";
        if (this.currentIndex >= this.itemLength + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.featureWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.itemLength;
          this.setTransform(-this.currentIndex * this.featureWidth);
        }
      }, this.animateDuration);
    },
    touchStart(e) {
      if (this.scrolling) return;
      //获取用户拖拽按下点的x坐标
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      this.currentX = e.touches[0].pageX;
      //获取移动前和移动后的距离差
      this.distance = this.currentX - this.startX;
      //防止过度的拖拽
      if(!this.iscopy){
          if(
            (this.distance > 0 &&       this.currentIndex == 0)||this.distance <=-this.featureWidth){
          return;
        }
        if(
          (this.distance < 0 && this.currentIndex == 1)||this.distance >=-this.featureWidth){
          return;
        }
      }
      
      //   this.distance =     402 - 433.3333435058594
      // console.log(this.currentX);
      //获取以下在手动移动前的 图片位置
      let currenPosition = -this.currentIndex * this.featureWidth;
      // console.log(currenPosition);  //-736
      //获取 已经移动的距离
      let moveDistance = this.distance + currenPosition;
      // console.log(moveDistance); //-767.3333435058594

      //把当前移动后的值 设置给setTransform
      this.setTransform(moveDistance);
      //当设置结束后,停止移动时,执行下一步的过度
    },
    touchEnd() {
      //获取移动的距离   取正数
      let currentMove = Math.abs(this.distance);

      //判断最终的距离
      if(this.iscopy){
          if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.featureWidth * this.moveBase
        ) {
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.featureWidth * this.moveBase
        ) {
          this.currentIndex++;
        }
      }else{
        if (this.distance == 0) {
          return;
        } else if (
          this.distance > 0 &&
          currentMove > this.featureWidth * this.moveBase&& this.currentIndex==1
        ) {
          this.currentIndex--;
        } else if (
          this.distance < 0 &&
          currentMove > this.featureWidth * this.moveBase&& this.currentIndex==0
        ) {
          this.currentIndex++;
        }
      }
      

      //移动到正确的位置
      this.scrollPosition(-this.currentIndex * this.featureWidth);
      //开启定时器
      // console.log("开启定时器");
      // this.startTimer();
    }
  },
  mounted() {
    setTimeout(() => {
      this.handleDom(this.divID);
    }, 500);
  }
};
</script>

<style scoped>
.feature {
  display: flex;
  width: 100vw;
}
.pagination{
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  bottom: -5px;
  pointer-events: none;
  z-index: 5;
}
.pagination b{
    width: 5px;
    height: 5px;
    opacity: 1;
    background-color: rgba(0,0,0,.2);
    box-sizing: border-box;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin: 0 3px;
}
.pagination b.cur{
  background-color: #e93b3d;
    width: 10px;
    height: 5px;
    border-radius: 3px;
    opacity: .7;
}
</style>
