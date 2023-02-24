import { computed, makeAutoObservable } from "mobx";

class ListStore{
  list = [1,2,3]
  constructor(){
    makeAutoObservable(this,{
      filterList: computed
    })
  }
  get filterList() {
    return this.list.filter(val => val > 2)
  }
  addList = () => {
    this.list.push(6)
  }
}

// 导出实例
export default new ListStore()