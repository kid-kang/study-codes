import useToggle from '../useToggle'

const defaultValue = false

/**
 *
 * @param defaultValue
 * @returns
 */
function useBoolean(value = defaultValue) {
  const [state, [toggle]] = useToggle(value, !value)

  const setTrue = () => toggle(true)
  const setFalse = () => toggle(false)

  const actions = { toggle, setTrue, setFalse }
  return [state, actions]
}

export default useBoolean
