import request from '@/utils/request'

// 微信登录
export function queryUserInfo(data) {
  return request.get('/mini/userInfo', data)
}
