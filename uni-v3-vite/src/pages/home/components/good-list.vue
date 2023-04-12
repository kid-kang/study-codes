<!-- 商品列表组件 <good-list :list="xx"></good-list> -->
<template>
  <view class="good-list">
    <view :id="'good' + good.id" class="good-li" v-for="good in list" :key="good.id">
      <image class="good-img" :src="good.goodImg" mode="widthFix" />
      <view class="flex-item">
        <view class="good-name">{{ good.goodName }}</view>
        <text class="good-price">{{ good.goodPrice }} 元</text>
        <text class="good-sold">已售{{ good.goodSold }}件</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  list: [], // 商品数据
})
</script>

<style lang="scss">
.good-list {
  background-color: #fff;

  .good-li {
    display: flex;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;

    .good-img {
      width: 160rpx;
      height: 160rpx;
      margin-right: 20rpx;
    }

    .flex-item {
      flex: 1;
      text-align: left;

      .good-name {
        font-size: 26rpx;
        line-height: 40rpx;
        height: 80rpx;
        margin-bottom: 20rpx;
        overflow: hidden;
      }
      .good-price {
        font-size: 26rpx;
        color: red;
      }
      .good-sold {
        font-size: 24rpx;
        margin-left: 16rpx;
        color: gray;
      }
    }
  }
}
</style>
