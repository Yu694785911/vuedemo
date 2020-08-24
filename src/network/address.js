import { request } from "./request"

// params get请求使用params  或者 query
// post请求使用 data上传数据


// 获取省
export function getProvinces() {
    return request({
        url: "/vuedemo/get_provinces",
    })
}

// 获取市
export function getCities(params) {
    return request({
        url: "/vuedemo/get_cities",
        params
    })
}


// 获取区
export function getAreas(params) {
    return request({
        url: "/vuedemo/get_areas",
        params
    })
}


// 新增地址
export function createuserAdd(params) {
    console.log(params);
    return request({
        url: "/vuedemo/creat_user_address",
        params
    })
}

// 查找用户收货地址
export function getuserAddress(params) {
    return request({
        url: "/vuedemo/get_user_address",
        params
    })
}


// 修改用户收货地址
export function updateuserAddress(params) {
    console.log(params);
    return request({
        url: "/vuedemo/update_user_address",
        params
    })
}

// 删除地址
export function deleteuserAddress(params) {
    console.log(params);
    return request({
        url: "/vuedemo/delete_user_address",
        params
    })
}


// 修改用户默认地址
export function updateuserAddressdef(params) {
    console.log(params);
    return request({
        url: "/vuedemo/update_user_address_def",
        params
    })
}