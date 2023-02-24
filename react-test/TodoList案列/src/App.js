import { observer } from "mobx-react-lite"
import { useStore } from "./store"
import "./app.css"

function App () {
  let { taskStore } = useStore()

  function isEnter (e) {
    if (e.keyCode !== 13) return
    taskStore.addItem(e.target.value)
    e.target.value = ""
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          onKeyDown={(e) => isEnter(e)}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAllDone}
          onChange={(e) => taskStore.changeAllDone(e.target.checked)}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {taskStore.list.map(val =>
            <li className={val.isDone ? "todo completed" : "todo"} key={val.id}>
              <div className="view">
                <input className="toggle" type="checkbox" checked={val.isDone} onChange={() => taskStore.changeDone(val.id)} />
                <label >{val.name}</label>
                <button className="destroy" onClick={() => taskStore.deleteItem(val.id)}></button>
              </div>
            </li>
          )}
        </ul>
      </section>
    </section>
  )
}
export default observer(App)
