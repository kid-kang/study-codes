import { ref, isRef, onUnmounted } from 'vue'
import { onHide, onUnload } from '@dcloudio/uni-app'

const useTimeout = (fn, delay) => {
  const state = isRef(delay) ? delay : ref(delay)

  const timer = null

  const clear = () => {
    state.value = null
    clearTimeout(timer)
  }

  const handler = () => {
    if (state.value === undefined || state.value === null) return
    fn()
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

export default useTimeout
