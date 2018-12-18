// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
// 使用插件
import axios from 'axios'
import Qs from 'qs'
//QS是axios库中带的，不需要我们再npm安装一个
// 引入插件
import VueSweetalert2 from './plugins/vue-sweetalert2'

Vue.use(VueSweetalert2)
 
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
