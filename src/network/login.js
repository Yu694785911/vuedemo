import { requestPost,request } from "./request"

// params get请求使用params  或者 query
// post请求使用 data上传数据

// 注册
// {
//             actionKey: account,//短信注册
//             telphone:"",
//             username:"13412345678",
//             password:"123456",
//             email:""
//         }
export function Login(data) {
    return requestPost({
        url: "/vuedemo/login",
        data
    })
}

export function register(data) {
    return requestPost({
        url: "/vuedemo/register",
        data
    })
}

// 登录
export function Land(data) {
    return requestPost({
        url: "/vuedemo/land",
        data
    })
}

// 自动登录
export function autoLand(data) {
    return requestPost({
        url: "/vuedemo/autoland",
        data
    })
}

// 验证手机号
export function regPhone(params) {
    return request({
        url: "vuedemo/land_have_telphone",
        params
    })
}

// 国际区号
export function get_mobile_prefix() {
    return request({
        url: "vuedemo/get_mobile_prefix"
    })
}

export function land_have_telphone(data) {
    return requestPost({
        url: "vuedemo/land_have_telphone",
        data
    })
}

// 获取手机验证码
export function getCodeImg(params) {
    return request({
        url: "vuedemo/get_code_img",
        params
    })
}