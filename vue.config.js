module.exports={
    configureWebpack:{
        resolve:{
            extensions:[],
            alias:{
                //'@' :'/src',//默认  在2.0 @不能给其他别名使用
                "assets":"@/assets",
                "components":"@/components",
                "views":"@/views",
                "network":"@/network",
                "common":"@/common",//common指的是公共的js文件夹
            }
        },
        // baseUrl:'/',  
        devServer:{
            proxy:{
                '/api':{
                    target:'http://pv.sohu.com',
                    changeOrigin:true,
                    ws:true,
                    pathRewrite:{
                        '^/api':''
                    }
                }
            }
        }
    }
}