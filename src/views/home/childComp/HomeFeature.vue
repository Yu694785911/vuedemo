<template>
  <!-- 用于关联feature事件 -->
  <feature divID="homeFeature" :iscopy="iscopy">
    <feature-item v-for="(item,index) in cfeature" :key="index">
      <li v-for="i in item" :key="i.id">
        <a :href="i.Imghref">
          <img :src="path+i.imgsrc" alt />
          <span>{{i.Title}}</span>
        </a>
      </li>
      <li v-if="index == cfeature.length - 1 && cfeature.length % 10 != 0">
         <a :href="'http://localhost:8080/#/all'">
          <img :src="path+'20.png'" alt />
          <span>全部</span>
        </a>
      </li>
    </feature-item>
  </feature>
</template>

<script>
import { Feature, FeatureItem } from "components/common/feature";
export default {
  name: "HomeFeature",
  props: {
    cfeature: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image/feature/",
      iscopy:false
    };
  },
  components: {
    Feature,
    FeatureItem
  }
};
</script>

<style scoped>
</style>
