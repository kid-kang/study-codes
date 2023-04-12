// import { debounce } from '../utils'
import { ref, watch } from 'vue'
import useThrottleFn from '../useThrottleFn'

// 默认值
const defaultDelay = 1000

/**
 * 处理防抖值
 * @param value
 * @param delay
 * @returns
 */
const useThrottle = (value, delay = defaultDelay) => {
  const res = ref(value.value)

  // 利用useDebounceFn来简化处理值
  const { run } = useThrottleFn(() => {
    res.value = value.value
  }, delay)

  watch(value, () => run(), { deep: true })

  return res
}

export default useThrottle
