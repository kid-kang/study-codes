import { nanoid } from "nanoid"
import "./app.css"

let arr = ["丸子", "樱桃", "wzk"]
function App () {
  return (
    <div className="App">
      <ul>
        {
          arr.map(val => <li className={val === "wzk" ? "myName" : ""} key={nanoid()}>{val}</li>)
        }
      </ul>
    </div>
  )
}

export default App
