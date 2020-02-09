import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import axios from 'axios'
import 'vant/lib/index.css'

Vue.use(Vant);

Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
