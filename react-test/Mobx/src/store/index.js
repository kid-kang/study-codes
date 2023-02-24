import listStore from "./listStore"
import countStore from "./countStore"
import React from "react"

class RootStore {
  constructor() {
    this.listStore = listStore
    this.countStore = countStore
  }
}
// 实例化的根Store注入context中
const context = React.createContext(new RootStore())
//导出一个返回Store的方法
export function useStore () {
  return React.useContext(context)
}