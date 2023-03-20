/**
   * 图片处理-预览图片
   * @param {Array} urls - 图片列表
   * @param {Number} current - 首个预览下标
   */
export function previewImage(urls = [], current = 0) {
  uni.previewImage({
    urls: urls,
    current: current,
    indicator: 'default',
    loop: true,
    fail(err) {
      console.log('previewImage出错', urls, err)
    },
  })
}

/**
 * 打电话
 * @param {String<Number>} phoneNumber - 数字字符串
 */
export function callPhone(phoneNumber = '') {
  let num = phoneNumber.toString()
  uni.makePhoneCall({
    phoneNumber: num,
    fail(err) {
      console.log('makePhoneCall出错', err)
    },
  })
}

/**
 * 根据身份号推断出生日期和性别
 * @param {String} idNo -身份证号
 */
export function formatSexAndBirthWithIdcard(idNo) {
  let birth = '',
    sex = ''

  if (idNo && idNo.length >= 14) {
    const birthStr = idNo.substring(6, 14)
    const year = birthStr.substring(0, 4)
    const month = birthStr.substring(4, 6)
    const day = birthStr.substring(6, 8)
    birth = `${year}-${month}-${day}`
  }

  if (idNo && idNo.length >= 17) {
    const sexFlag = idNo.substr(16, 1)
    if (sexFlag % 2 === 0) {
      sex = {
        name: '女',
        id: '2',
      }
    } else {
      sex = {
        name: '男',
        id: '1',
      }
    }
  }

  return {
    birth,
    sex,
  }
}


/**
* 获取是否授权了定位权限
* @param { Boolean } launchAuth: 是否发起授权请求, 初次有效
* @return { Boolean }
*/
export function getLocationAuth(launchAuth) {
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
          reject(false)
        } else if (locationEnabled && !locationAuthorized) {
          // GPS已开启 与 GPS未给微信授权定位服务
          uni.showToast({
            title: 'GPS未给微信授权定位服务',
            icon: 'none',
            mask: true,
            duration: 2000,
          })
          reject(false)
        } else if (locationEnabled && locationAuthorized) {
          uni.getSetting({
            success: (res) => {
              if (
                launchAuth &&
                res.authSetting['scope.userLocation'] === undefined
              ) {
                return uni.authorize({
                  scope: 'scope.userLocation',
                  success: () => {
                    resolve(true)
                  },
                  fail: () => {
                    resolve(false)
                  },
                })
              }
              resolve(res.authSetting['scope.userLocation'])
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
 * 根据经纬度获取两点距离
 * @param la1 第一个坐标点的纬度 如：24.445676
 * @param lo1 第一个坐标点的经度 如：118.082745
 * @param la2 第二个坐标点的纬度
 * @param lo2 第二个坐标点的经度
 * @return { Object } { km: 千米/公里, m: 米 }
 * @tips 注意经度和纬度参数别传反了, 一般经度为0~180、纬度为0~90
 */
export function calcDistanceLL(la1, lo1, la2, lo2) {
  let La1 = (la1 * Math.PI) / 180.0
  let La2 = (la2 * Math.PI) / 180.0
  let La3 = La1 - La2
  let Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(La3 / 2), 2) +
          Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)
      )
    )

  s = s * 6378.137
  s = Math.round(s * 10000) / 10000

  // return {
  //   km: s,
  //   m: Math.round(s * 1000),
  // }
  return Math.round(s * 1000)
}


