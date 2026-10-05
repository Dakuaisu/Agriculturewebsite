import { NavLink } from 'react-router-dom'
import logo from './Images/image.png'

const linkClass = ({ isActive }) =>
  `rounded-sm px-3 py-2 text-text ${isActive ? 'bg-primary' : 'hover:bg-primary'}`

function Navigation() {
  return (
    <nav className="bg-secondary">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-2 p-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} className="h-8" alt="" />
          <span className="text-2xl font-semibold text-text">AgriApp</span>
        </NavLink>
        <div className="flex gap-1">
          <NavLink to="/" end className={linkClass}>Recommend</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
