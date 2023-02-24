// 导入模块
import taskStore from "./taskStore"
import React from "react"
class RootStore {
  // 组合模块
  constructor() {
    this.taskStore = taskStore
  }
}
// 实例化根store注入context
const context = React.createContext(new RootStore())
// 导出方法 供组件调用方法使用store根实例
export const useStore = () => React.useContext(context)
