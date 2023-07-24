import { observer } from "mobx-react-lite"
import { useStore } from "./store"

function App () {
  let { listStore, countStore } = useStore()
  return (
    <div className="App">
      {countStore.count}
      <button onClick={countStore.addCount}>+</button>
      <br />
      {/* 计算属性 */}
      {listStore.filterList.join("-")}
      <button onClick={listStore.addList}>+list</button>
    </div>
  )
}

export default observer(App)
