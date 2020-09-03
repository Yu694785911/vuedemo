// import { normalize } from "uri-js"

// 防抖方法

export function debounce(func,delay){
    let timer=null
    return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{
            // call(对象,a,a) apply(对象,[a,a])
            func.apply(this,args)
        },delay)
    }
}

// 从商品详情中取出商品有关的数据---> detailsbaseinfo
// export function GoodsInfo(goods,shops){//es5  创建构造函数
//     this.oldPrice=goods.money_old;//取旧价格
//     this.newPrice=goods.money_now;//取现价
//     this.title=goods.name;//取名字
//     this.goodsId=goods.id;//取id
//     this.cartgory=shops.cartgory;//取分类
// }

export class GoodsInfo{//es6类
    constructor(goods,shops){
        this.oldPrice=goods.money_old;//取旧价格
        this.newPrice=goods.money_now;//取现价
        this.title=goods.name;//取名字
        this.goodsId=goods.id;//取id
        this.category=shops.category;//取分类
    }
}

export class ShopInfo{
    constructor(shops){
        this.shopName=shops.shopName;//取旧价格
        this.cGoods=shops.cGoods;//取现价
        this.shopLogo=shops.shopLogo;//取名字
        this.shopsId=shops.id;//取id
        this.category=shops.category;//取id
        this.Collection='5000';//取分类
    }
}

export class SelectNorm{
    constructor(norm,relation){
        if(norm.length>0){
            this.norm={}
            for(let i=0;i<norm.length;i++){
                if(!this.norm[norm[i].ggname]){
                    this.norm[norm[i].ggname]=[]
                }
                this.norm[norm[i].ggname].push(norm[i])
            }
        }
        if(relation.length>0){
            this.relation={}
            for(let i=0;i<relation.length;i++){
                if(!this.relation[relation[i].relation_name]){
                    this.relation[relation[i].relation_name]=[]
                }
                this.relation[relation[i].relation_name].push(relation[i])
            }
        }
    }
}

export class orderConfirmData {
    constructor(goods,shops) {
        //商品id
        this.goods_id =  goods.id
        //商品名
        this.goods_name =  goods.name
        //商品热搜关键字
        this.hot_keyword =  goods.hot_keyword
        //商品展示图
        this.img_cover =  goods.img_cover
        //新价格
        this.money_now =  goods.money_now
        //原价格
        this.money_old =  goods.money_old
        //店铺id
        this.shop_id =  shops.id
        //店铺名
        this.shop_name =  shops.shopName
    }
}