import React, { useRef, useState } from 'react';
import { diffDates } from '../../utils/functions';

const Input = ({
  name, 
  label, 
  type, 
  placeholder, 
  validations={
    required:false,
    fromNow:false,
    email:false,
    passLen: false
  } ,
  validState, 
  setValid, 
  show=false,
  customWarning=""
}) => {
  const {required, fromNow, email, passLen} = validations;
  const ref = useRef();
  const [warningState, setWarning] = useState(
    required ? "Este campo es obligatorio" : "Campo no válido"
  );

  const handleChange = () => {
    const value = ref.current.value;
    let valid = true;

    if (valid && passLen){
      valid = value.length >= 8;
      setValid({...validState, [name]:valid});
      if (!valid)
        setWarning("La contraseña debe tener un largo mínimo de 8 caracteres");
    }
    if (valid && fromNow) {
      valid = value !== "" && diffDates(new Date(), value) > 0;
      setValid({...validState, [name]:valid});
      if (!valid)
        setWarning("La fecha debe ser posterior o igual al día de hoy");
    }
    if (valid && email) {
      valid = value !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setValid({...validState, [name]:valid});
      if (!valid)
        setWarning("Ingrese un correo válido");
    }
    if (valid && required){
      valid = value !== "";
      setValid({...validState, [name]:valid});
      if(!valid)
        setWarning("Este campo es obligatorio");
    } 
  }

  return (
    <div className="field">
      <label className="label">
        {label} 
        {
          required &&
          <span className={"has-text-danger"}>*</span>
        } 
      </label>
      <div className="control">
        <input 
          ref={ref}
          name={name}
          className={`input ${show && !validState[name] ? "is-danger" : ""}`} 
          type={type} 
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>

      {
        show && !validState[name] && 
        <p className="help is-danger">
          {customWarning !== "" ? customWarning : warningState}
        </p>
      }
    </div>
  )
}
export default Input;