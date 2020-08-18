import { request } from './request'

export function getHomeBanner() {
  return request({
    url: "/vuedemo/banner"
  })
}

//到处一个获取功能视图的 访问
export function getFeature() {
  return request({
    url: "/vuedemo/jd_feature",
    params:{
      show:1
    }
  })
}

// 导出4级
// 先用3级代替4级
export function get_jd_category_max(page,pagesize) {
  // 根据传递过来的页码取数据，默认取出50条
  return request({
    url: "/vuedemo/get_jd_category_three",
    params:{
      page:page,//页数
      pagesize:pagesize//条数
    }
  })
}