import request from '@/utils/request'

// 微信登录
export function wxlogin(data) {
  return request.post('/mini/login/token', data)
}

// 登出
export function wxlogout() {
  return request.get('/mini/logout')
}
