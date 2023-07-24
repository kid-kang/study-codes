import { makeAutoObservable } from "mobx";

class CountStor{
  count = 0
  constructor(){
    makeAutoObservable(this)
  }
  addCount = () => {
    this.count++
  }
}

// 导出实例
export default new CountStor()