/**
 * 防抖
 * @param fn
 * @param delay
 * @returns
 */
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
const throttle = (fn, delay) => {
  let oldNow = Date.now()
  return function (...args) {
    const currNow = Date.now()
    if (currNow - oldNow < delay) return
    oldNow = currNow
    fn.call(this, ...args)
  }
}

/**
 * 防抖+节流
 * @param fn
 * @param DBdelay
 * @param TRdelay
 * @returns
 */
const throttleAndDeBounce = (fn, DBdelay, TRdelay) => {
  let oldNow = Date.now()
  let timer = null
  return function (...args) {
    const currNow = Date.now()
    if (currNow - oldNow < TRdelay) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        oldNow = currNow
        fn.call(this, ...args)
      }, DBdelay)
      return
    }
    oldNow = currNow
    fn.call(this, ...args)
  }
}

// 读取持久化数据
const getStorageData = (name, params) => {
  const data = uni.getStorageSync(name)
  const formData = JSON.parse(data) || {}
  return formData[params]
}

export { debounce, throttle, throttleAndDeBounce, getStorageData }
