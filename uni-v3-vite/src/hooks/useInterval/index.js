import { ref, isRef, onUnmounted } from 'vue'
import { onHide, onUnload } from '@dcloudio/uni-app'

const defaultOptions = {
  immediate: false,
}

const useInterval = (fn, delay, options) => {
  const { immediate } = { ...defaultOptions, ...options }

  const state = isRef(delay) ? delay : ref(delay)

  if (immediate) fn()

  const timer = null

  const clear = () => {
    state.value = null
    clearTimeout(timer)
  }

  const handler = () => {
    if (state.value === undefined || state.value === null) return
    fn()
    run()
  }

  const run = () => {
    if (state.value === undefined || state.value === null) {
      clear()
      return
    }
    setTimeout(handler, state.value)
  }

  run()

  onUnmounted(() => clear())
  onHide(() => clear())
  onUnload(() => clear())
}

export default useInterval
