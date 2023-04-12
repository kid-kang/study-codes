import useAuthStore from '@/store/auth'

function request({ url, data = {}, method = 'GET' }) {
  return new Promise((resolve, reject) => {
    const authStore = useAuthStore()
    const sendData = {
      url: import.meta.env.VITE_BASE_URL + url,
      data,
      method,
      header: {
        Authorization: authStore.getAuthorization,
      },
    }
    uni.showLoading({
      title: '加载中',
      mask: true,
    })
    uni.request({
      ...sendData,
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          if (res.data.code === 401) {
            // 清除用户信息
            authStore.setToken(undefined)
            uni.reLaunch({
              url: '/subpkgs/login/index',
            })
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
          reject(res.data.msg)
        }
      },
      fail: (error) => {
        uni.showToast({
          title: error,
          icon: 'none',
        })
        reject(error)
      },
      complete: () => {
        uni.hideLoading()
      },
    })
  })
}

export default {
  /**
   * get请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  get: (url, data, options) => {
    return request({
      ...options,
      url,
      data,
      method: 'GET',
    })
  },
  /**
   * post请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  post: (url, data, options) => {
    return request({
      ...options,
      url,
      data,
      method: 'POST',
    })
  },
  /**
   * put请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  put: (url, data, options) => {
    return request({
      ...options,
      url,
      data,
      method: 'PUT',
    })
  },
  /**
   * delete请求
   * @param url 请求地址
   * @param data 请求的参数
   * @param options 其他请求配置
   */
  delete: (url, data, options) => {
    return request({
      ...options,
      url,
      data,
      method: 'DELETE',
    })
  },
}
