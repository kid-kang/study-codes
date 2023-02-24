import { nanoid } from "nanoid"
import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: nanoid(),
      name: '学习react',
      isDone: false
    },
    {
      id: nanoid(),
      name: '搞定mobx',
      isDone: true
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }

  changeDone = (id) => {
    let val = this.list.find(val => val.id === id)
    val.isDone = !val.isDone
  }
  deleteItem = (id) => {
    this.list = this.list.filter(val => val.id !== id)
  }
  addItem = (text) => {
    this.list.unshift({
      id: nanoid(),
      name: text,
      isDone: false
    })
  }
  changeAllDone = (isDone) => {
    this.list.forEach(val => {
      val.isDone = isDone
    })
  }
  // 计算属性不需要function申明
  get isAllDone () {
    return this.list.every(val => val.isDone)
  }
}
export default new TaskStore()
