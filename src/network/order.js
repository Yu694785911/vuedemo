import {requestPost,request} from "./request"

export function create_order(data){
    // data在传递过来之前就需要定义好格式

    return requestPost({
        url:'/vuedemo/creat_order',
        data
    })
}

export function getOrderByOrderId(data){
    // data在传递过来之前就需要定义好格式
    return requestPost({
        url:'/vuedemo/get_goods_inorder',
        data:{
            order_id:data
        }
    })
}

export function updateOrderState(data){
    console.log(data);
    return requestPost({
        url:'/vuedemo/update_order_state',
        data
    })
}

export function getOrder(data){
    console.log(data);
    return requestPost({
        url:'/vuedemo/get_order',
        data
    })
}

export function deleteOrder(data){
    console.log(data);
    return requestPost({
        url:'/vuedemo/delete_order',
        data
    })
}

// 搜索商品
export function getGoods(params){
    return request({
        url:'/vuedemo/get_goods',
        params
    })
}