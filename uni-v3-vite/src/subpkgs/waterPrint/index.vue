<script setup></script>

<template>
  <view class="print-container"> 一种支持直接修改的底部水印方案 </view>
</template>

<style lang="scss" scoped>
.print-container {
  color: #fff;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='97%25' font-size='12' fill='%23a9a9a9' text-anchor='middle' dominant-baseline='middle'%3E技术支持：中国联通%3C/text%3E%3C/svg%3E")
      no-repeat center bottom,
    linear-gradient(to bottom, $uni-theme-color 20%, $uni-bg-color, $uni-bg-color, $uni-bg-color);
}
</style>
