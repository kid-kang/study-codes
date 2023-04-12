/**
 * 打电话
 * @param {String<Number>} phoneNumber - 数字字符串
 */
const callPhone = (phoneNumber = '') => {
  const num = phoneNumber.toString()
  uni.makePhoneCall({
    phoneNumber: num,
    fail(err) {
      console.log('makePhoneCall出错', err)
    },
  })
}

/**
 * 获取用户定位
 * @return { Object }
 */
const getCurLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success(res) {
      return res
    },
    fail() {
      uni.showToast({
        title: '调用小程序定位接口失败，尝试刷新',
        icon: 'none',
      })
    },
  })
}

/**
 * 获取是否授权了定位权限
 * @param { Boolean } launchAuth: 是否发起授权请求, 初次有效
 * @return { Boolean }
 */
const getLocationAuth = (launchAuth) => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success({ locationEnabled, locationAuthorized }) {
        // locationEnabled 判断手机定位服务是否开启
        // locationAuthorized 判断定位服务是否允许微信授权
        if (!locationEnabled) {
          // GPS未开启 与 GPS未给微信授权定位服务
          uni.showToast({
            title: '手机定位服务未开启',
            icon: 'none',
            mask: true,
            duration: 2000,
          })
          reject(new Error(false))
        } else if (locationEnabled && !locationAuthorized) {
          // GPS已开启 与 GPS未给微信授权定位服务
          uni.showToast({
            title: 'GPS未给微信授权定位服务',
            icon: 'none',
            mask: true,
            duration: 2000,
          })
          reject(new Error(false))
        } else if (locationEnabled && locationAuthorized) {
          uni.getSetting({
            success: (res) => {
              if (launchAuth && res.authSetting['scope.userLocation'] === undefined) {
                return uni.authorize({
                  scope: 'scope.userLocation',
                  success: () => {
                    resolve(true)
                  },
                  fail: () => {
                    reject(new Error(false))
                  },
                })
              }
              return resolve(res.authSetting['scope.userLocation'])
            },
            fail: (err) => {
              console.err(err)
            },
          })
        }
      },
    })
  })
}

/**
 * 预览文件
 * @param { string } url: 文件下载地址
 * @param { string } name: 文件名称
 */
const downloadFile = (url, name) => {
  uni.downloadFile({
    url: encodeURI(url),
    success: (res) => {
      if (res.statusCode === 200) {
        uni.getFileSystemManager().saveFile({
          tempFilePath: res.tempFilePath,
          filePath: `${uni.env.USER_DATA_PATH}/${name}`,
          success: (fileRes) => {
            uni.openDocument({
              filePath: fileRes.savedFilePath,
              showMenu: true,
              success: () => console.log('成功打开文档'),
            })
          },
          fail: () => {
            uni.showToast({
              title: '保存文件失败',
              icon: 'none',
            })
          },
        })
      }
    },
    fail: () => {
      uni.showToast({
        title: '下载文件失败',
        icon: 'none',
      })
    },
  })
}

// 通知更新微信小程序版本
const checkMiniProgramUpdate = () => {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success({ confirm }) {
              if (confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            },
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          uni.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          })
        })
      }
    })
  }
}

export default { callPhone, getCurLocation, getLocationAuth, downloadFile, checkMiniProgramUpdate }
