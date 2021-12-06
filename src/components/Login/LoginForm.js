import { SHA3 } from 'crypto-js';
import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/user';
import { Input } from '../Forms';

const LoginForm = ({ setModalState }) => {
  const [isLoading, setLoading] = useState(false);
  const [loginError, setError] = useState("");
  const formRef = useRef();
  const history = useHistory();

  const handleLogin = async () => {
    setLoading(true);
    const elements = formRef.current.elements;
    const values = {
      correo: elements.correo.value.toLowerCase(),
      contraseña: elements.contraseña.value
    };

    if(values.correo !== "" && values.contraseña !== ""){
      const credentials = {
        email: values.correo,
        password: SHA3(values.contraseña).toString()
      }
      try{
        const user = await login(credentials);
        window.sessionStorage.setItem("user", JSON.stringify(user));
        history.push('/actividades')
      } catch(e) {
        console.log("Error", e)
        setError("Los datos ingresados no son válidos");
        setLoading(false);  
      }
    } else {
      setError("Porfavor ingrese su correo y contraseña");
      setLoading(false);
    }
  }

  return (
    <form className="box column has-background-light" ref={formRef}>
      <div className="field">
        <h1 className="has-text-weight-bold is-size-4">Accede a la plataforma</h1>
      </div>

      <Input name="correo"
        type="email"
        label="Correo"  
        placeholder="Ingrese su correo"
      />

      <Input name="contraseña"
        type="password"
        label="Contraseña"  
        placeholder="********"
        onKeyDown={(e) => {
          e.keyCode === 13 && handleLogin();
        }}
      />

      <div className="field">
        <button className={`button is-link ${isLoading && "is-loading"}`} type="button" onClick={handleLogin}>Acceder</button>
        <p className="help is-danger">
          {loginError}
        </p>
      </div>

      <div className="field">
        <Link>¿Olvidó su nombre de usuario o contraseña?</Link>
      </div>

      <hr className="dropdown-divider"/>

      <div className="field is-centered">
        <button className="button is-success" type="button" onClick={setModalState}>Crear usuario</button>
      </div>
    </form>
  )
}

export default LoginForm;