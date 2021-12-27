import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../store/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();
  
  return (
    <header>
      {
        location.pathname !== '/login' &&
        <nav className="navbar is-dark" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-burger"/>
            <a className="navbar-item" href="www.youtube.com">
              <img
                src="https://bulma.io/images/bulma-logo-white.png"
                width="112"
                height="28"
                alt="Logo"
              />
            </a>
            
            <Link className="navbar-item" to="/actividades">
              <span className="icon-text">
                <span className="icon">
                <i className="fas fa-list-ul"></i>
                </span>
                <span>Actividades</span>
              </span>
            </Link>

            <Link className="navbar-item" to="/historias">
              <span className="icon-text">
                <span className="icon">
                <i className="fas fa-border-all"></i>
                </span>
                <span>Historias de Usuario</span>
              </span>
            </Link>
            
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              {/* Aquí iría algo */}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-danger" onClick={() => {
                  window.sessionStorage.removeItem('user');
                  dispatch(removeUser());
                  navigate('login');
                }}>
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>
      }
    </header>
  );
};

export default Navbar;
