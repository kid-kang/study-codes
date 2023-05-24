<script setup>
  /**
   * @name TextEllipsis
   * @description 文本超出3行显示（...全文）
   * @param {String} text 文本
   */
  import { ref, onMounted, getCurrentInstance } from 'vue'

  defineProps({
    text: { type: String, require: true },
  })

  const showText = ref(false)
  const isEllipsis = ref(false)
  const instance = getCurrentInstance()
  let { proxy } = instance

  function shiftText() {
    showText.value = !showText.value
  }

  onMounted(() => {
    const query = uni.createSelectorQuery().in(proxy)
    query
      .select('.text-content')
      .boundingClientRect((data) => {
        if (data.height > 56) {
          isEllipsis.value = true
        }
      })
      .exec()
  })
</script>

<template>
  <view class="text-content" :class="{ 'show-text__full': showText, 'is-ellipsis': isEllipsis && !showText }">
    {{ text }}
    <text v-if="isEllipsis" class="shift-text">
      <text class="diandiandain" v-if="!showText">...</text>
      <text style="color: #08b585" @click="shiftText">{{ showText ? '收起' : '全文' }}</text>
    </text>
  </view>
</template>

<style lang="scss" scoped>
  .text-content {
    position: relative;
    font-size: 32rpx;
    line-height: 38rpx;
    .shift-text {
      position: absolute;
      bottom: 0;
      right: 8rpx;
      z-index: 99;
      font-size: 32rpx;
      background-color: #fff;
      padding-left: 8rpx;
    }
  }
  .is-ellipsis {
    overflow: hidden;
    height: 112rpx;
  }
  .show-text__full {
    height: auto !important;
    padding-bottom: 44rpx;
  }
</style>
