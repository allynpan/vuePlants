// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import crypto from 'crypto'
import store from './store'
import { formatDate } from './unit/date.js'
Vue.use(crypto)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
/* 这里注册一个全局的filter */
Vue.filter('formatDate', formatDate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
