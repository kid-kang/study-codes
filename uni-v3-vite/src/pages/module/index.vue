<template>
  <button @click="callPhone">打电话</button>
  <button @click="getLocation">获取定位</button>
  <button @click="downloadFile">预览文件</button>

  <button :style="{ marginTop: '48rpx' }" @click="goLink('login')">登录页</button>
  <button @click="goLink('success')">提交成功页</button>
  <button @click="goLink('waterPrint')">底部水印页</button>
</template>

<script setup>
import UTILS from '@/utils/wxmini'

// 打电话
const callPhone = () => {
  UTILS.callPhone('10086')
}

// 获取定位
const getLocation = async () => {
  const authRes = await UTILS.getLocationAuth(true)
  if (authRes) {
    UTILS.getLocation()
  } else {
    uni.showModal({
      title: '需要获取你的地理位置',
      content: '前往定位授权',
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (setRes) => {
              if (setRes.authSetting['scope.userLocation']) {
                UTILS.getLocation()
              }
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  }
}

// 预览文件
const downloadFile = () => {
  UTILS.downloadFile('https://www.baidu.com/img/bd_logo1.png')
}

// 跳转
const goLink = (url) => uni.navigateTo({ url: `/subpkgs/${url}/index` })
</script>

<style scoped></style>
