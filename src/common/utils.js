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