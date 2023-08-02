import React, { useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'

export const Header = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
      event.preventDefault()
      auth.logout()
      navigate('/auth');
    }

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid justify-content-space-between">
        <div>LOGO</div>
        <ul className="navbar-nav">
          <li>
            <NavLink to="/cart" className="nav-link">
              Корзина
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className="nav-link">
              Каталог
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className="nav-link">
              Создать
            </NavLink>
          </li>
          <li>
          {auth.isAuthenticated ? (
              <NavLink
                to="/auth"
                className="nav-link"
                role="button"
                onClick={logoutHandler}
              >
                Выйти
              </NavLink>
             ) : (
              <NavLink to="/auth" className="nav-link">
                Войти
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
