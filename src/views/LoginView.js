import React, { useState } from 'react';
import '../css/login.css'
import logo_di from '../assets/images/logo_di.png'
import { Link } from 'react-router-dom';
import Register from '../components/Login/Register';
import { setModalState } from '../utils/functions';

const LoginView = () => {
  const [modalState, setModal] = useState(false);

  return (
    <section className="is-clipped">
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img  
                src={logo_di}
                width="250"
                alt="Logo"
              />
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body columns">
          <div className="column is-three-fifths">
            <h1 className="title has-text-white">Bienvenid@s a -nombre plataforma-</h1>
            <h2 className="subtitle has-text-white">
              Aquí tendrás todo lo necesario para que tu proyecto sea un completo éxito!
            </h2>
          </div>
          <form className="box column has-background-light">
            <div className="field">
              <h1 className="has-text-weight-bold is-size-4">Accede a la plataforma</h1>
            </div>

            <div className="field">
              <label className="label">Correo</label>
              <div className="control">
                <input className="input" type="email" placeholder="Ingrese su correo"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control">
                <input className="input" type="password" placeholder="********"/>
              </div>
            </div>

            <div className="field">
              <button className="button is-link" type="button">Acceder</button>
            </div>

            <div className="field">
              <Link>¿Olvidó su nombre de usuario o contraseña?</Link>
            </div>

            <hr className="dropdown-divider"/>

            <div className="field is-centered">
              <button className="button is-success" type="button" onClick={() => setModalState(true, setModal)}>Crear usuario</button>
            </div>
          </form>
        </div>
      </section>
      <Register modalState={modalState} closeModal={() => setModalState(false, setModal)}/>
    </section>
  )
}

export default LoginView;