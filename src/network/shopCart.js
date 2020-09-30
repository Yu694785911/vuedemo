import {requestPost} from './request'

export function postShopCart(data){
    return requestPost({
        url:"/vuedemo/get_shopcart",
        data:{
            user_id:data
        }
    })
}

export function UpdataShopCart(data){
    return requestPost({
        url:"/vuedemo/update_shopcart",
        data
    })
}

export function addShopCart(data){
    return requestPost({
        url:"/vuedemo/set_shopcart",
        data
    })
}


export function BuyGooods(data){
    return requestPost({
        url:"/vuedemo/buy_goods",
        data
    })
}
