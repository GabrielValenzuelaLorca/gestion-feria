import React, { useRef, useState } from 'react'
import AES from 'crypto-js/aes'
import { validate } from '../../utils/functions';
import { Input } from '../Forms';
import { createUser } from '../../services/user';

const Register = ({modalState, closeModal}) => {
  const fields = ["correo", "nombre", "contraseña", "contraseña_repeat"];
  const [validState, setValid] = useState({
    correo: false,
    nombre: false,
    contraseña: false,
    contraseña_repeat: false,
  });
  const [customWarning, setWarning] = useState({
    contraseña_repeat: "",
  });
  const [showWarning, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const formRef = useRef();

  const resetValid = () => {
    let valid = {}, warning={};
    Object.keys(validState).forEach(field => {
      valid[field] = false;
    });
    Object.keys(customWarning).forEach(field => {
      warning[field] = "";
    });
    setValid(valid);
    setWarning(warning);
    setShow(false);
  }

  const clearForm = () => {
    const elements = formRef.current.elements;
    fields.forEach(field => {
      elements[field].value = "";
    })
    resetValid();
  }

  const handleCreate = async () => {
    setLoading(true);
    let values = {};
    const elements = formRef.current.elements;
    let customValidate = {
      contraseña_repeat: false,
    }

    fields.forEach(field => {
      values[field] = elements[field].value;
      // Custom validation
      if(field==="contraseña_repeat" && validState.contraseña && validState.contraseña_repeat){
        const checkPass = elements["contraseña"].value === elements[field].value;
        customValidate.contraseña_repeat = checkPass;
        setValid({...validState, contraseña_repeat: checkPass});
        setWarning({...customWarning, contraseña_repeat: "Las contraseñas deben ser iguales"});
      }
    });

    if(validate(validState) && validate(customValidate)){
      const user_to_send = {
        email: values.correo,
        name: values.nombre,
        password: AES.encrypt(values.contraseña, process.env.REACT_APP_ENCRYPT_CODE).toString()
      }
      let user = await createUser(user_to_send);
      delete user.password;
      window.sessionStorage.setItem("user", JSON.stringify(user));
      handleCancel();
    } else 
      setShow(true);
    setLoading(false);
  }

  const handleCancel = () => {
    clearForm();
    closeModal();
  }

  return (
    <section className={`modal ${ modalState ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Crear Usuario
          </p>
        </header>

        <form className="modal-card-body" ref={formRef}>
          <Input name="correo"
            label="Correo"  
            type="email"
            placeholder="Ingrese su correo"
            validations={{
              required:true,
              email:true
            }}
            validState={validState}
            show={showWarning}
            setValid={setValid}
          />

          <Input name="nombre"
            label="Nombre"  
            type="text"
            placeholder="Ingrese su nombre"
            validations={{required:true}}
            validState={validState}
            show={showWarning}
            setValid={setValid}
          />

          <Input name="contraseña"
            label="Contraseña"  
            type="password"
            placeholder="********"
            validations={{
              required:true,
              passLen:true
            }}
            validState={validState}
            show={showWarning}
            setValid={setValid}
          />

          <Input name="contraseña_repeat"
            label="Repetir Contraseña"  
            type="password"
            placeholder="********"
            validations={{required:true}}
            validState={validState}
            show={showWarning}
            setValid={setValid}
            customWarning={customWarning.contraseña_repeat}
          />
        </form>

        <footer className="modal-card-foot">
          <button className={`button is-success ${isLoading && "is-loading"}`} onClick={handleCreate}>
            Registrar
          </button>

          <button className="button is-danger" onClick={handleCancel}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default Register;