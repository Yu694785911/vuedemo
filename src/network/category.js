import { request } from './request'


export function get_jd_category_one() {
  return request({
    url: "/vuedemo/get_jd_category_one",
  })
}

export function get_jd_category_two() {
  return request({
    url: "/vuedemo/get_jd_category_two",
  })
}
export function get_jd_category_three() {
  return request({
    url: "/vuedemo/get_jd_category_three",
    params:{
      page:1,
      pagesize:5000
    }
  })
}