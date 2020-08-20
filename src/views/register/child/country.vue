<template>
  <div class='country'>
      <scroll id="countryScroll">
      <nav-bar class="home-nav-bar">
        <div slot="left" @click="$router.go(-1)">&lt;</div>
        <div slot="center">
          <h3 style="margin:0;font-weight:normal">选择国家或者地区</h3>
        </div>
      </nav-bar>
      <ul class="country">
          <li></li>
      </ul>
      </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/contents/scroll/Scroll";
export default {
  name: 'country',
  data(){
    return {}
  },
  components: {
      NavBar,
      Scroll
  },
  computed: {},
  created(){},
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='less'>
#countryScroll {
  height: calc(100vh - 49px);
  overflow: hidden;
  ul.country{
      background:pink;
  }
}
</style>
