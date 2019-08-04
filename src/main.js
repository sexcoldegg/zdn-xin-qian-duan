// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAxios from 'axios'
//引入jQuery
import $ from 'jquery'
Vue.prototype.$=$
//全局配置的访问服务端的域名
import domain from './domain.js'
//存入全局备用
Vue.prototype.domain=domain



//配置Axios
Vue.prototype.$axios=vueAxios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

//自己导入的小图片
import './assets/font/iconfont.css'
import './assets/xiaotubiao/iconfont.css'
//vue的样式配置end
Vue.config.productionTip = false

//默认当axios进行跨域请求的时候是不会携带Cookies的
//设置vueAxios.defaults.withCredentials的值为true则跨域的时候会带上cookie
vueAxios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
