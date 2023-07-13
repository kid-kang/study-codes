import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// rem适配
function rem(): void {
  document.documentElement.style.fontSize = `${100 / 1400}vw`;
}
rem();
// 定义屏幕宽度改变时触发
window.onresize = function (): void {
  document.documentElement.style.fontSize = `${100 / 1400}vw`;
};
