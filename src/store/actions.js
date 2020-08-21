import * as types from './mutation-types'
// import { resolve } from 'uri-js'
export default{
    getShopCart(contents,payload){
        // this.$store.commit("方法,参数")
        // contens 相当于 $store  使用commit
        // 调用vuex的mutation中的types.POST_SHOPCART 方法
        contents.commit(types.POST_SHOPCART,payload)
    },
    autocode(contents){
        return contents.commit(types.AUTO_CODE)
    }
}