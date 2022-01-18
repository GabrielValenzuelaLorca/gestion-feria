import React, { useState } from 'react';
import Register from '../components/Login/Register';
import { setModalState } from '../utils/functions';
import LoginForm from '../components/Login/LoginForm';
import logo_di from '../assets/images/logo_di.png'
import '../css/login.css'

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
            <h1 className="title has-text-white">Bienvenid@s a CASE</h1>
            <h2 className="subtitle has-text-white">
              Aquí tendrás todo lo necesario para que tu proyecto sea un completo éxito!
            </h2>
          </div>
          <LoginForm setModalState={() => setModalState(true, setModal)}/>
        </div>
      </section>
      <Register modalState={modalState} closeModal={() => setModalState(false, setModal)}/>
    </section>
  )
}

export default LoginView;