import { request } from './request'

// export function getgoods() {
//   return request({
//     url: "/vuedemo/get_goods",
//     // params:{...data},
//     params:{
//         like:"电脑",
//         order:{//先以id降序，在以Dtou升序
//             id:"UtoD",
//             money_now:'DtoU'  //'DtoU' 升序 UtoD降序
//         },
//         minMonry:0,
//         maxMoney:0,
//         exact:{//精确查找
//           id:1,
//           c1_id:2
//         },
//         page:1,
//         pageSize:50
//     }
//   })
// }


//用于搜索数据。关键字查数据等
export function getGoods(data) {
  return request({
      url: "/vuedemo/get_goods",
      params:{...data}
  })
}

//用于详情页面 根据商品id请求出当前商品的数据，以及商品规格数据，以及发布商品的店铺信息数据
export function getGoodsId(id){
  return request({
      url:"/vuedemo/get_goodsDet",
      params:{ //get请求数据的时候，提交数据用params/query
          goods_id:id
      }
  })
}

// export class Goods{
//   constructor(goodsdata,norms,relationGoods){
//     this.name=goodsdata;
//     this.age=norms;
//     this.aaa=relationGoods;
//   }
// }

// export class shop{
//   constructor(shopInfo){
//     this.shopInfo=shopInfo;
//   }
// }