<script setup>
  /**
   * @name TextEllipsis
   * @description 文本超出3行显示（...全文）
   * @param {String} text 文本
   * @param {Number} n 文本超出n行显示省略
   */
  const props = defineProps({
    text: { type: String, require: true },
    n: { type: Number, require: true },
  })

  const showText = ref(true)
  const isEllipsis = ref(false)
  const { proxy } = getCurrentInstance()

  function shiftText() {
    showText.value = !showText.value
  }

  onMounted(() => {
    const query = uni.createSelectorQuery().in(proxy)
    let textHeigth = 0
    // 计算占位字体高度
    query
      .select('.text-placeholder__higth')
      .boundingClientRect((data) => {
        textHeigth = data.height
      })
      .exec()

    query
      .select('.text-content')
      .boundingClientRect((data) => {
        if (data.height - 0.1 > textHeigth * props.n) {// 计算误差小于0.1
          isEllipsis.value = true
          showText.value = false
        }
      })
      .exec()
  })
</script>

<template>
  <view
    class="text-content"
    :class="{ 'text-full': showText && isEllipsis }"
    :style="{ '-webkit-line-clamp': showText ? Infinity : n }"
  >
    {{ text }}

    <view v-if="isEllipsis" class="btn-text" @click="shiftText">
      <text class="btn-text__ellipsis" v-show="!showText">....</text>
      <text class="btn-text__switch">{{ showText ? '收起' : '全文' }}</text>
    </view>

    <text class="text-placeholder__higth">占位</text>
  </view>
</template>

<style lang="scss" scoped>
  .text-content {
    position: relative;
    font-size: 32rpx;
    line-height: 38rpx;
    margin-bottom: 24rpx;
    text-align: justify;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    .text-placeholder__higth {
      // 占位字计算高度的样式
      position: absolute;
      font-size: 32rpx;
      line-height: 38rpx;
      top: 0;
      left: 0;
      color: transparent;
    }

    .btn-text {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
      display: inline-block;
      font-size: 32rpx;
      line-height: 38rpx;
      background-color: #fff;
      padding-left: 2.5px;

      .btn-text__ellipsis {
        color: #000;
      }
      .btn-text__switch {
        color: #08b585;
      }
    }
  }

  .text-full {
    padding-bottom: 40rpx;
  }
</style>
