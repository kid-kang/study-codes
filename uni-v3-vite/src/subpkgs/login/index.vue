<script setup>
import { onShow } from '@dcloudio/uni-app'
import useAuthStore from '@/store/auth'

// 获取登录相关的auth pinia store
const authStore = useAuthStore()

onShow(() => {
  console.log(JSON.parse(uni.getStorageSync('auth')).token)
  // 如果已经登录，直接跳转到首页
  // if (authStore.isLogin) {
  //   uni.switchTab({ url: '/pages/home/index' })
  // }
})

// 微信登录
const wxloginSubmit = async () => {
  authStore.login({}, () => {
    // 登录成功后的回调
    uni.switchTab({
      url: '/pages/home/index',
    })
  })
}

// 手机登录
const phoneSubmit = async ({ detail }) => {
  if (detail.errMsg === 'getPhoneNumber:fail user deny') {
    console.log('用户拒绝提供手机号')
  } else {
    authStore.login({ phoneCode: detail.code }, () => {
      // 登录成功后的回调
      uni.switchTab({
        url: '/pages/home/index',
      })
    })
  }
}
</script>

<template>
  <view class="login-container">
    <view class="title">欢迎使用uvvu</view>
    <button type="primary" @click="wxloginSubmit">微信一键登录</button>
    <button open-type="getPhoneNumber" @getphonenumber="phoneSubmit" @click="wxloginSubmit">
      手机号一键登录
    </button>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  .title {
    font-size: 48rpx;
    font-weight: 500;
    margin-bottom: 24rpx;
  }
  button {
    margin-bottom: 24rpx;
  }
}
</style>
