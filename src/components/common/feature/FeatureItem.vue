<template>
  <ul class="feature-item">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "FeatureItem",
};
</script>

<style scoped>
/* 写ul 和 li 的样式 */
.feature-item {
  width: 100vw;
  /* 不压缩空间 */
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}
.feature-item li {
  width: 20vw;
  font-size: 12px;
  margin: 5px 0;
}
.feature-item li a {
  text-decoration: none;
  color: darkgray;
}
.feature-item li img {
  width: 60%;
  display: block;
  margin-left: 20%;
}
</style>
