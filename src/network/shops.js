import {request} from './request';
// 获取指定店铺商品
export function getShopGoods(params){
    return request({
        url:"/vuedemo/get_shop_goods",
        params
    })
}
// 获去评价
export function getGoodsEvaluate(params){
    return request({
        url:"/vuedemo/get_goods_sevaluate",
        params
    })
}

// 获取店铺
export function getShops(params){
    return request({
        url:"/vuedemo/get_shops",
        params
    })
}

