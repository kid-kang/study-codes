import { ref, isRef, watch } from 'vue'

/**
 * 用于在N个状态值间切换。
 * @param args
 * @returns
 */
function useToggle(...args) {
  const argsStateArr = args.map((variable) => (isRef(variable) ? variable : ref(variable)))
  const initialValue = argsStateArr[0].value
  const state = ref(initialValue)
  let activeState = argsStateArr[0]

  // 1: 监听当前被激活的state异步
  // 2: 如果当前的异步发生改变则修改state
  watch(
    [activeState],
    () => {
      state.value = activeState.value
    },
    {
      deep: true,
    },
  )

  let currIndex = 0
  const len = args.length

  const toggle = (param) => {
    // 判定是否在参数里
    if (param !== undefined && args.includes(param)) {
      state.value = isRef(param) ? param.value : param
      activeState = isRef(param) ? param : ref(param)
      return
    }
    // 顺序变化
    currIndex = currIndex + 1 > len - 1 ? 0 : currIndex + 1
    state.value = argsStateArr[currIndex].value
    activeState = argsStateArr[currIndex]
  }

  const createHandle = () => {
    return argsStateArr.map((active, index) => {
      return () => {
        state.value = active.value
        activeState = active
        currIndex = index
      }
    })
  }

  const actions = [toggle, ...createHandle()]

  return [state, actions]
}

export default useToggle
