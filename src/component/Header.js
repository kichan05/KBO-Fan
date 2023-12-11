import {Link, Outlet} from "react-router-dom";
import "./Header.css"

const Header = ({headerMenu}) => {
  return (
    <>
      <header>
        <div className="content">
          <ul>
            {headerMenu.map(menu => (
              <li>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      
      <Outlet/>
    </>
  )
}

export default Header