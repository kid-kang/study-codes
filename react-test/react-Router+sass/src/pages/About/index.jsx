import { NavLink, Outlet } from 'react-router-dom'
import routeActiveStyle from '../../hooks/routeActiveStyle'

export default function About() {
  return (
    <div>
      <div className="nav">
        <NavLink to="detail1" className={routeActiveStyle}>
          Detail1
        </NavLink>
        <NavLink to="detail2/is2" className={routeActiveStyle}>
          Detail2
        </NavLink>
      </div>
      <div className="show">
        <Outlet />
      </div>
    </div>
  )
}
