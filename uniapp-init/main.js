import Vue from 'vue'
import App from './App'
// 导入 vuex 实例
import store from './store'
// 通用样式
import './styles/global.scss'
import api from './request'

Vue.prototype.$api = api  // this.request()

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
  store, // 挂载实例对象
})
app.$mount()


