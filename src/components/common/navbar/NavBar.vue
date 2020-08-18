<template>
  <div class="navbar">
    <div class="left" @click="parentLeft">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods:{
    parentLeft(){
      this.$emit("leftBarClick")
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
}
.left,
.right {
  width: 40px;
}
.center {
  flex: 1;
}
</style>
