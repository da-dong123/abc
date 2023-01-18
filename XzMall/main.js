import App from './App'
import {base} from'@/service/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
//Vue2:为所有的页面/组件添加一个公共属性$base——Vue的原型上
Vue.prototype.$base=base;
App.mpType = 'app'
const app = new Vue({
    ...App
	
});

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App);
  //Vue3：为所有的页面/组件添加一个公共属性
  app.config.globalProperties.$base=base;
  return {
    app
  }
}
// #endif