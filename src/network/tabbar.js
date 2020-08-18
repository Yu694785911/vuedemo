import {request} from "./request"
export function getTabBar(){
    return request({
        url:"/vuedemo/jd_tabbar"
    })
}