<template>
  <rotation :interval="1000" :showIndicator="true" divID="aaaBox">
    <rotation-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.href">
        <img :src="path+item.crs" alt />
      </a>
    </rotation-item>
  </rotation>
</template>

<script>
import Rotation from "components/common/rotation/Rotation.vue";
import RotationItem from "components/common/rotation/RotationItem.vue";
export default {
  name: "HomeRotation",
  components: {
    Rotation,
    RotationItem
  },
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      path: "http://106.12.85.17:9091/public/image/banner/"
    };
  }
};
</script>

<style scoped>
</style>
