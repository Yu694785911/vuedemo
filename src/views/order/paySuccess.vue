<template>
  <div class='paySuccess'>
      <h2>支付成功</h2>
      <a href="javascript:;" style="margin-right:20px;" @click="toHome">返回首页</a>
      <a href="javascript:;" @click="tomyOrder">查看订单</a>
  </div>
</template>

<script>
export default {
  name: 'paySuccess',
  data(){
    return {}
  },
  components: {},
  computed: {},
  created(){},
  activated(){},
  deactivated(){},
  mounted(){},
  methods: {
      toHome(){
          this.$router.push("/home");
      },
      tomyOrder(){
          this.$router.push("/myorder");
      }
  }
}
</script>
<style scoped>
</style>
