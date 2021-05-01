import Vue from 'vue'
import App from './App.vue'
import router from './router' // 导入router插件
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;
//import axios from 'axios';
//Vue.use(Flexible) // 引用rem布局插件
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.prototype.logined = false;