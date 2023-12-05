import React, { useState } from "react";
import Register from "../components/Login/Register";
import { setModalState } from "../utils/functions";
import LoginForm from "../components/Login/LoginForm";
// import logo_di from "../assets/images/logo_di.png";
// import logo_fesw from "../assets/images/logo-fesw-300x161.png";

const LoginView = () => {
  const [modalState, setModal] = useState(false);

  return (
    <section className="is-clipped">
      <section className="hero is-primary is-fullheight">
        <div className="hero-body columns">
          <div className="column is-three-fifths">
            <h1 className="title has-text-white">Bienvenid@s a CASE</h1>
            <h2 className="subtitle has-text-white">
              ¡Aquí tendrás todo lo necesario para que tu proyecto sea un
              completo éxito!
            </h2>
          </div>
          <LoginForm setModalState={() => setModalState(true, setModal)} />
        </div>
      </section>
      {/* <nav className="navbar is-fixed-bottom is-white">
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <img src={logo_di} width="200" alt="Logo" />
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <img src={logo_fesw} width="100" alt="Logo" />
            </div>
          </div>
        </div>
      </nav> */}
      <Register
        modalState={modalState}
        closeModal={() => setModalState(false, setModal)}
      />
    </section>
  );
};

export default LoginView;
