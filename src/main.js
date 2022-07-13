import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  引入字体图标css
import '@/assets/iconfont/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
