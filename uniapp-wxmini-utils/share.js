export default {
  data() {
    return {
      //设置默认的分享参数
      //如果页面不设置share，就触发这个默认的分享
      share: {
        title: '', //自定义标题
        path: `/pages/home/index`, //默认跳转首页
        imageUrl: '', //可设置默认分享图，不设置默认截取头部5:4
      },
    }
  },
  onShareAppMessage(res) {
    //发送给朋友
    let that = this
    // 动态获取当前页面栈
    let pages = getCurrentPages() //获取所有页面栈实例列表
    let nowPage = pages[pages.length - 1] //当前页页面实例
    // let prevPage = pages[pages.length - 2]; //上一页页面实例
    that.share.path = `/${nowPage.route}`
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res) {
        console.log('success(res)==', res)
        uni.showToast({
          title: '分享成功',
        })
      },
      fail(res) {
        console.log('fail(res)==', res)
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        })
      },
    }
  },
  onShareTimeline(res) {
    //分享到朋友圈
    let that = this
    // 动态获取当前页面栈
    let pages = getCurrentPages() //获取所有页面栈实例列表
    let nowPage = pages[pages.length - 1] //当前页页面实例
    // let prevPage = pages[pages.length - 2]; //上一页页面实例
    that.share.path = `/${nowPage.route}`
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res) {
        console.log('success(res)==', res)
        uni.showToast({
          title: '分享成功',
        })
      },
      fail(res) {
        console.log('fail(res)==', res)
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        })
      },
    }
  },
}
