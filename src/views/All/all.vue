<template>
    <div>
        <nav-bar class="home-nav-bar">
                <div slot="left"><a :href="'http://localhost:8080/#/home'">&lt;</a></div>
                <div slot="center">
                    百宝箱
                </div>
                <div slot="right">…</div>
        </nav-bar>
        <div class="tuijian">
            <p>
                <img src="../../images/tuijian.webp" alt="">
            </p>
        </div>
    </div>
    
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
    name:"all",
    data(){
        return{
            path: "http://106.12.85.17:8090/public/image/feature/",
        }
    },
    components:{
        NavBar
    },
}
</script>

<style scoped>
.home-nav-bar {
  background: #fff;
  color: #000;
  display: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.tuijian{
    font-size: 0;
    padding: 0 .4688rem;
}
.tuijian P{
     margin: .3438rem -.4688rem;
}
.tuijian P img{
         max-width: 100%;
}
</style>