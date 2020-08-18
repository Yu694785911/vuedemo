import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import Vuesession from 'vue-session'

// 配置cookie
// import cookies from 'vue-cookies'

Vue.use(element);
Vue.use(Vuesession);
window.$=$;

Vue.prototype.$bus=new Vue()



Vue.config.productionTip = false
// Vue.prototype.$cookies = cookies;

// 定义一个全局可以使用的$bus总线  ---> 主要通过原型为vue添加一个总线属性

Vue.prototype.$bus=new Vue();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App),
}).$mount("#app")

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app')

