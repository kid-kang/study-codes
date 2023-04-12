import { ref, readonly } from 'vue'
import dayjs from 'dayjs'

const defaultOptions = {
  format: 'YYYY-MM-DD HH:mm:ss',
  method: 'format',
}

// method: 'format' | 'millisecond' | 'second' | 'minute' | 'hour' | 'date' |'day'  | 'month' | 'year',

function useDate(initialValue, options) {
  const state = ref()

  let value = initialValue || +new Date()
  const { format, method, methodParam } = { ...defaultOptions, ...options }

  const refresh = (refreshValue) => {
    value = refreshValue || +new Date()
    let data = dayjs(value)
    switch (method) {
      case 'format':
        state.value = dayjs(value).format(format)
        break
      case undefined:
        break
      default:
        if (methodParam) {
          data = data[method](methodParam)
          if (options && options.format) {
            data = data.format(format)
          }
        }
        state.value = data
    }
  }

  refresh()

  const data = readonly(state)

  return {
    data,
    refresh,
  }
}

export default useDate
