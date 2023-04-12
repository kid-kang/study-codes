import { defineStore } from 'pinia'
import { wxlogin, wxlogout } from '@/api/auth'
import { getStorageData } from '@/utils'

// 鉴权
const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getStorageData('auth', 'token') || '',
  }),
  getters: {
    getToken: (state) => state.token, // 获取token
    isLogin: (state) => !!state.token, // 是否登录
    getAuthorization: (state) => {
      return state.token ? `Bearer ${state.token}` : ''
    }, // 获取请求头
  },
  actions: {
    // 登录
    async login(_, callback) {
      uni.login({
        provider: 'weixin',
        success: async ({ code }) => {
          // const res = await wxlogin({
          //   code,
          // })
          const res = {
            code: 200,
            data: 'token',
          }
          callback()
          this.setToken(res.data)
        },
      })
    },
    // 设置token
    setToken(token) {
      this.token = token
    },
    // 登出
    async logut() {
      const res = await wxlogout()
      this.setToken(undefined)
      return Promise.resolve(res)
    },
  },
  unistorage: true, // 开启后对 state 的数据读写都将持久化
})

export default useAuthStore
