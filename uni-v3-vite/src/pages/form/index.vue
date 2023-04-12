<script setup>
import useInterval from '@/hooks/useInterval'

const data = ref(1)
const delay = ref(1000)

useInterval(() => {
  data.value += 1
  console.log('测试interval事件')
  console.log(data.value)
}, delay)
</script>

<template>
  <view>待UI框架确认</view>
  <view>测试useInterval</view>
</template>
