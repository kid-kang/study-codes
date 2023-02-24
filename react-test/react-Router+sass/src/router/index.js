import About from "../pages/About"
import Home from "../pages/Home"
import Detail1 from "../pages/About/Detial1"
import Detail2 from "../pages/About/Detial2"

const router = [
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/about",
    element: <About />,
    children: [{
      path: "detail1",
      element: <Detail1 />,
    },
    {
      path: "detail2/:id",
      element: <Detail2 />,
    }]
  },
]
//这里要定义变量再导出 不然会警告
export default router