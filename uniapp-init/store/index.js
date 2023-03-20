// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
// uniapp 已默认安装，不需要重新下载
import { createStore } from 'vuex'

const STORAGE_KEY = 'user-info'
const USER_KEY = 'wxuserId'
const TOKEN_KEY = 'token'

// 2. 安装 Vuex 插件
Vue.use(Vuex)
// 3. 创建 store 实例
export default createStore({
  state: {
    // 用户 token
    token: uni.getStorageSync(TOKEN_KEY) || '',
    // 用户 wxUserId
    wxuserId: uni.getStorageSync(USER_KEY) || '',
    // 用户信息
    userInfo: uni.getStorageSync(STORAGE_KEY) || {},
  },
  mutations: {
    /**
     * 保存 token 到 vuex
     */
    setToken(state, { token, carId }) {
      state.token = token
      state.wxuserId = carId
      this.commit('user/saveToken')
    },
    /**
     * 保存 token 到 本地存储
     */
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token,
      })
      uni.setStorage({
        key: USER_KEY,
        data: state.wxuserId,
      })
    },
    /**
     * 删除 token
     */
    removeToken(state) {
      state.token = ''
      state.wxuserId = ''
      this.commit('user/saveToken')
    },
    /**
     * 保存 用户信息 到 vuex
     */
    setUserInfo(state, userInfo) {
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo,
      })
    },
    /**
     * 删除用户信息
     */
    removeUserInfo(state) {
      state.userInfo = {}
      this.commit('user/saveUserInfo')
    },
  },
  actions: {
    /**
     * 完成登录
     */
    async wxLogin(_, { phoneCode = '' }) {
      uni.login({
        provider: 'weixin',
        success: async ({ code }) => {
          uni.showToast({
            title: '登录中',
            icon: 'loading',
            mask: true,
          })
          const res = await API.wechatLogin({
            code,
            phoneCode,
          })

          if (res.code === 200) {
            uni.hideToast()
            this.commit('user/setToken', res.data)
            this.commit('user/setUserInfo', res.data)
          }
        },
      })
    },

    /**
     * 退出登录
     */
    async logout() {
      const res = await API.logout()
      if (res.code == 200) {
        this.commit('user/removeToken')
        this.commit('user/removeUserInfo')
        uni.navigateTo({ url: '/pages/login/index' })
      }
    },

    /**
     * 进行登录判定
     */
    async isLogin({ dispatch, state }) {
      if (state.token) return true
      // 如果用户未登录，则引导用户进入登录页面
      dispatch('wxLogin', {})
      return false
    },
  },
})
