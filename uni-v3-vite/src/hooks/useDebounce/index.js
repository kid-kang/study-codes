import { ref, watch } from 'vue'
import useDebounceFn from '../useDebounceFn'

// 默认值
const defaultDelay = 1000

/**
 * 处理防抖值
 * @param value
 * @param delay
 * @returns
 */
const useDebounce = (value, delay = defaultDelay) => {
  const res = ref(value.value)

  // 利用useDebounceFn来简化处理值
  const { run } = useDebounceFn(() => {
    res.value = value.value
  }, delay)

  watch(value, () => run(), { deep: true })

  return res
}

export default useDebounce
