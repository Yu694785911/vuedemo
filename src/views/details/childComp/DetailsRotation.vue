<template>
  <div class="DeatilsRotation">
    <stop-rotation :interval="1000" :showIndicator="false" iscopy="false">
      <rotation-item v-for="(img,index) in cgoodsImg" :key="index">
        <img :src="path+'/goods/'+img" alt width="100%" v-if="img" />
        
      </rotation-item>
    </stop-rotation>
  </div>
</template>

<script>
import StopRotation from "components/common/rotation/StopRotation";
import RotationItem from "components/common/rotation/RotationItem";
export default {
  name: "DeatilsRotation",
  props: {
    cgoodsImg: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      path: "http://106.12.85.17:8090/public/image"
    };
  },

  components: {
    StopRotation,
    RotationItem
  },
  computed: {},
  created() {},
  activated() {}, //激活
  deactivated() {}, //未激活
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.DeatilsRotation{
  width:100%;
}
</style>
