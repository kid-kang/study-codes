import store from '../store'
import { BASE_URL } from '../config/index.js'

function request({ url, data = {}, method = 'GET' }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        Authorization: `Bearer ${store.state.user.token}`,
      },
      success: ({ data }) => {
        if (data.code === 200) {
          resolve(data)
        } else {
          if (data.code === 401) {
            store.commit('user/removeToken')
            store.commit('user/removeUserInfo')
            uni.redirectTo({ url: '/pages/login/index' })   // 重定向
          } else {
            uni.showToast({
              title: data.msg,
              mask: true,
            })
          }
          resolve(data)
        }
      },
      fail: (error) => {
        reject(error)
      },
      complete: () => { },
    })
  })
}

export default request
