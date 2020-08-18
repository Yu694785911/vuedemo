<template>
  <div class="cartgoods" ref="shop_cart_details">
    <dl class="dlData">
      <dt class="shop_name">
        <input type="checkbox" v-on:click="shopCheckAll" ref="shopCheck"/>
        {{shopName}}
      </dt>
      <dt>
        <p style="font-weight: 700;font-size: 12px;color: #1d1e1e;margin-left:50px">
          满三百减六十
          <span
            style="padding-right: 12px;font-size: .6rem;display:block;width: 20%;
    float: right;"
          >去凑单></span>
        </p>
      </dt>
      <dd v-for="(obj,index) in goods" :key="index" class="cart-goods">
        <input type="checkbox" class="check" v-on:click="checkObj(index)" :checked="obj.ischeck==1" />

        <img :src="$store.state.urlPath+'/goods/'+obj.img_cover" alt="图片" />

        <div v-on:click="toDetails('/details/'+obj.goods_id)">
          <p class="title">
            {{obj.goods_name}}
            <br />
          </p>

          <p class="norm" v-on:click.stop="checkNorm(obj)">
            <span>{{obj.norm}}</span>
            <span>
              选服务
              <i class="el-icon-arrow-down"></i>
            </span>
            <br />
          </p>

          <p class="money_now">
            ￥
            <em>{{obj.money_now}}</em>.00
            <br />
          </p>

          <p class="numberInput">
            <span class="min" @click.stop="min($event,index)">-</span>
            <input class="num" type="text" @click.stop :value="obj.num" disabled />
            <span class="add" @click.stop="add($event,index)">+</span>

            <!-- <button @click.stop="num(index,'-')">-</button>
            <input type="text"  @click.stop :value="obj.num">
            <button @click.stop="num(index,'+')">+</button>-->
            <br />
          </p>
          <p class="delegg">
            <span>移入关注 |</span>
            <span @click.stop="cartDel($event)">删除</span>
          </p>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import $ from "jquery"
export default {
  name: "cartgoods",
  props: {
    shopName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ischeck: true
    };
  },
  components: {},
  computed: {
    name() {
      return this.shopName;
    },
    // 当前页面需要用到的商品，通过传递过来的计算后的店铺名，从shopcart中获取
    goods() {
      return this.$store.state.shopCart[this.name];
    },
    paymentGoods(){
      return this.$store.state.paymentGoods
    },
  },
  created() {
    // console.log(this.paymentGoods);
  },
  mounted() {},
  methods: {
    toDetails(path) {
      alert(path);
      this.$router.push(path);
    },
    checkNorm(obj) {
      console.log(obj);
      this.$emit("checknorm", obj);
    },
    // 商品的复选框
    checkObj(index) {
      var e = e || event;
      let num = 1;
      if (!e.target.checked) {
        num = -1;
      }
      this.$store.state.totalPayment +=
        this.goods[index].money_now * this.goods[index].num * num;
      this.$store.state.totalNum += this.goods[index].num * num;
      this.goods[index].ischeck = Number(e.target.checked).toString();

      this.$emit("checknorm", 'item');
      console.log(this.paymentGoods);
    },
    isshopCheckAll() {
      let box = this.$refs.shop_cart_details;
      let shopBtn = box.querySelector(".shop_name input[type=checkbox]");
      let btnAll = box.querySelectorAll(".cart-goods input[type=checkbox]");

      let temp = 0;
      btnAll.forEach(obj => {
        if (obj.checked == true) {
          temp++;
        }
      });
      if (temp == btnAll.length) {
        shopBtn.checked = true;
      } else {
        shopBtn.checked = false;
      }
      this.$emit('ischeckshopAll')
    },
    // 店铺的复选框
    shopCheckAll() {
      let e = e || event;
      let box = this.$refs.shop_cart_details;
      let btnAll = box.querySelectorAll(".cart-goods input[type=checkbox]");
      let temp = -1;
      if (e.target.checked) {
        temp = 1;
      }

      for (let i = 0; i < btnAll.length; i++) {
        // 如果当前商品复选框的checked为true，并且店铺复选框页尾true，则跳过当前循环，执行下一次循环
        // 因为如果当前商品选中的状态，那么支付总价是不需要增加价钱的，所以直接跳过当前循环的后续代码执行
        if (btnAll[i].checked && e.target.checked) {
          continue;
        }
        this.goods[i].ischeck = Number(e.target.checked).toString();
        this.$store.state.totalPayment +=
          this.goods[i].money_now * this.goods[i].num * temp;
        this.$store.state.totalNum += this.goods[i].num * temp;
        btnAll[i].checked = e.target.checked;
      }
      this.$emit("ischeckshopall");
      // console.log(this.goods);
      // console.log(this.$store.state.shopCart);
      console.log(this.paymentGoods);
    },
 
    // num(index,operation){
    //   if(operation=='-'){
    //     this.goods[index].num-=1
    //   }
    //   if(operation=='+'){
    //     this.goods[index].num+=1
    //   }
    //   console.log(this.goods[index]);
    //   console.log(this.$store.state.shopCart);
    // },
    min(e, index) {
      this.goods[index].num -= 1;
      if (this.goods[index].ischeck == "1") {
        this.$store.state.totalPayment -=
          this.goods[index].money_now * this.goods[index].num;
        this.$store.state.totalNum = this.$store.state.totalNum -= 1;
      }
      var jian = e.currentTarget.nextElementSibling;
      jian.value = parseInt(jian.value) - 1;
      console.log(jian.value);
      if (jian.value == 1) {
        e.target.style = "display:none";
      }

      console.log(this.goods[index]);
      console.log(this.$store.state.shopCart);
    },
    add(e, index) {
      this.goods[index].num += 1;
      if (this.goods[index].ischeck == "1") {
        this.$store.state.totalPayment +=
          this.goods[index].money_now * this.goods[index].num;
        this.$store.state.totalNum = this.$store.state.totalNum += 1;
      }

      console.log(e.target); //当前元素
      console.log(e.currentTarget.previousElementSibling.value); //上一个元素
      var jia = e.currentTarget.previousElementSibling;
      jia.value = parseInt(jia.value) + 1;
      if (jia.value > 1) {
        var aa = e.currentTarget.previousElementSibling.previousElementSibling;
        aa.style = "display:block";
        aa.style = "width:10px";
      }

      console.log(this.goods[index]);
      console.log(this.$store.state.shopCart);
      console.log(this.goods);
    },
    cartDel(e){
      console.log(e.currentTarget.parentElement.parentElement);
     if(confirm('确认要删除此商品?')){
       console.log("删除")
       $(e.currentTarget.parentElement.parentElement.parentElement).remove();
     }else{
        console.log("失败")
     }
    }
  }
};
</script>
<style lang="less" scoped>
.shop-cart-details {
  border-radius: 10px;
  div.ADD {
    position: sticky;
    z-index: 100;
    height: 2.45rem;
    .ADD-bar {
      position: relative;
      padding: 0 0.9rem;
      height: 2.45rem;
      border-radius: 0 0 15px 15px;
      line-height: 2.45rem;
      background: #fff;
      display: flex;
      font-size: 0.65rem;
      color: #262626;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 15px;
        margin-top: -6px;
        background-image: url("../../../images/address.png");
        background-position: 0 -93px;
        background-size: 130px 105px;
        width: 12px;
        height: 12px;
      }
      &::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 0.5rem;
        background: #bfbfbf;
        top: 50%;
        right: 25%;
        margin-top: -0.25rem;
      }
      .ADD-bar-first {
        position: relative;
        padding: 0 16px;
        white-space: nowrap;
        overflow: hidden;
      }
      .ADD-btn {
        display: block;
        margin-left: 80px;
      }
    }
  }

  dl {
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 5px;
    background-color: #fff;
    border-radius: 10px;
  }
  dt {
    text-align: left;
    line-height: 30px;
    margin-left: 15px;
    input.check {
      margin-right: 20px;
    }
  }
  dd {
    z-index: 1;
    position: relative;
    min-height: 5rem;
    padding: 0 9px 0 8px;
    background: #fff;
    margin-bottom: 20px;
    margin-left: 25px;
    input {
      position: absolute;
      left: 0;
      top: 30%;
    }
    img {
      width: 90px;
      height: 90px;
      position: absolute;
      left: 20px;
      top: 0;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0.2rem 0.6rem 0 rgba(0, 0, 0, 0.05);
    }
    p.title {
      font-size: 12px;
      margin-bottom: 0.3rem;
      position: relative;
      margin-left: 35%;
      line-height: 16px;

      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 5px;
    }
    p.norm {
      span {
        position: relative;
        background: #f2f2f2;
        height: 15px;
        line-height: 15px;
        padding: 0 10px;
        font-size: 10px;
        color: #262626;
        display: flex;
        max-width: 60px;
        border-radius: 5px;
        margin-left: 40%;
        margin-bottom: 5px;
        text-align: center;
        float: left;
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
    p.money_now {
      line-height: 0.8rem;
      color: #f2270c;
      font-size: 0.6rem;
      em {
        font-style: normal;
        font-size: 18px;
        font-weight: bold;
      }
    }
    p.numberInput {
      display: block;
      width: 60px;
      border-radius: 2px;
      background-color: #fff;
      font-weight: 400;
      float: right;
      margin-top: -30px;
      span.min {
        left: 0;
        // display: none;
      }

      input.num {
        border: none;
        width: 30px;
        text-align: center;
        color: #262626;
        background-color: #f2f2f2;
        font-size: 0.55rem;
        position: relative;
      }
      span.add {
        right: 0;
      }
    }
    p.price {
      color: red;
    }
    p.delegg {
      width: 120px;
      display: block;
      padding-left: 200px;
      span {
        position: relative;
        padding: 0 10px;
        line-height: 15px;
        font-size: 10px;
      }
    }
  }
}
</style>