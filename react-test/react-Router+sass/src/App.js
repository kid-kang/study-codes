import "./app.css"
import { NavLink } from "react-router-dom"
import routerTable from "./router"
import routeActiveStyle from "./hooks/routeActiveStyle"
import { useRoutes } from "react-router-dom"

function App () {
  const router = useRoutes(routerTable)
  return (
    <div className="App">
      <div className="nav">
        <NavLink to="/" className={routeActiveStyle}>我的主页</NavLink>
        <NavLink to="/about/detail1" className={routeActiveStyle}>关于</NavLink>
        {/* 上面选中关于时默认打开detail1*/}
      </div>
      <div className="show">{router}</div>{/* 1级路由的展示方法*/}
    </div>
  )
}

export default App
