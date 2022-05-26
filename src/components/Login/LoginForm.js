import { SHA3 } from 'crypto-js';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user';
import { Input } from '../Forms';
import { addUser } from '../../store/actions/userActions';

const LoginForm = ({ setModalState }) => {
  const [formState, setForm] = useState({
    correo: '',
    contraseña: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [loginErrorState, setLoginError] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    if(formState.correo !== '' && formState.contraseña !== ''){
      const credentials = {
        email: formState.correo,
        password: SHA3(formState.contraseña).toString()
      }
      try{
        const user = await login(credentials);
        window.sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(addUser(user));
        navigate('/actividades');
      } catch(e) {
        console.log("Error", e)
        setLoginError("Los datos ingresados no son válidos");
        setLoading(false);  
      }
    } else {
      setLoginError("Porfavor ingrese su correo y contraseña");
      setLoading(false);
    }
  }

  return (
    <form className="box column has-background-light">
      <div className="field">
        <h1 className="has-text-weight-bold is-size-4">Accede a la plataforma</h1>
      </div>

      <Input
        name="correo"
        type="email"
        label="Correo"  
        placeholder="Ingrese su correo"
        state={formState}
        setState={setForm}
      />

      <Input
        name="contraseña"
        type="password"
        label="Contraseña"  
        placeholder="********"
        state={formState}
        setState={setForm}
        onKeyDown={handleLogin}
      />

      <div className="field">
        <button className={`button is-link ${isLoading && "is-loading"}`} type="button" onClick={handleLogin}>Acceder</button>
        <p className="help is-danger">
          {loginErrorState}
        </p>
      </div>

      <div className="field">
        <p>¿Olvidó su nombre de usuario o contraseña?</p>
      </div>

      <hr className="dropdown-divider"/>

      <div className="field is-centered">
        <button className="button is-success" type="button" onClick={setModalState}>Crear usuario</button>
      </div>
    </form>
  )
}

export default LoginForm;