import { useEffect, useState } from "react";
import "./index.less";

function TopJumper() {
  const [show, switchShow] = useState(false); // 设置状态

  useEffect(
    () => {
      const listener = () => {
        switchShow(window.scrollY > 300);
      };
      document.addEventListener("scroll", listener);
      return () => document.removeEventListener("scroll", listener); // 组件销毁后，取消监听
    },
    [show] /* 依赖记得给上，否则死循环 */
  );

  return show ? (
    <div className="top-jumper" onClick={() => window.scrollTo(0, 0)}>
      <span className="text"> </span>
    </div>
  ) : null;
}

export default TopJumper;
