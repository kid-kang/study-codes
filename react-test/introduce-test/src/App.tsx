import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Works from "./pages/Works";
import MyInfo from "./pages/MyInfo";

import ToTop from "./components/ToTop";
import "./App.less";

interface ActiveNavLinkParams {
  isActive: boolean;
}

const setActiveClassName = ({ isActive }: ActiveNavLinkParams): string => (isActive ? "isActiveTrue" : "isActiveFalse");

function App() {
  return (
    <div className="app-wrap">
      <nav>
        <div className="logo">乐此不疲</div>
        <div className="tab-list__wrap">
          <div className="tab-list">
            <NavLink to="/" className={setActiveClassName}>
              首页
            </NavLink>
            <span>/</span>
            <NavLink to="/works" className={setActiveClassName}>
              作品介绍
            </NavLink>
            <span>/</span>
            <NavLink to="/myInfo" className={setActiveClassName}>
              个人信息
            </NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/myInfo" element={<MyInfo />} />
      </Routes>
      <ToTop />
    </div>
  );
}

export default App;
