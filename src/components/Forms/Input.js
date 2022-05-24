import React, { useRef, useState } from 'react';
import { diffDates } from '../../utils/functions';

const Input = ({
  name, 
  label, 
  type, 
  placeholder, 
  validations = [],
  customValidations = [],
  state,
  setState,
  showError,
  setError,
  onKeyDown = null
}) => {
  const [warningState, setWarning] = useState('');
  const [localErrorState, setLocalError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    // let valid = true;

    // if (valid && passLen){
    //   valid = value.length >= 8;
    //   setValid({...validState, [name]:valid});
    //   if (!valid)
    //     setWarning("La contraseña debe tener un largo mínimo de 8 caracteres");
    // }
    // if (valid && fromNow) {
    //   valid = value !== "" && diffDates(new Date(), value) > 0;
    //   setValid({...validState, [name]:valid});
    //   if (!valid)
    //     setWarning("La fecha debe ser posterior o igual al día de hoy");
    // }
    // if (valid && email) {
    //   valid = value !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   setValid({...validState, [name]:valid});
    //   if (!valid)
    //     setWarning("Ingrese un correo válido");
    // }
    // if (valid && required){
    //   valid = value !== "";
    //   setValid({...validState, [name]:valid});
    //   if(!valid)
    //     setWarning("Este campo es obligatorio");
    // } 
  }

  return (
    <div className="field">
      <label className="label">
        {label} 
        {
          validations.includes('required') &&
          <span className={"has-text-danger"}>*</span>
        } 
      </label>
      <div className="control">
        <input 
          name={name}
          className={`input ${showError && localErrorState ? "is-danger" : ""}`} 
          type={type} 
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={
            onKeyDown && ((e) => {
              e.key === 13 && onkeydown();
            })
          }
        />
      </div>

      {
        showError && localErrorState && 
        <p className="help is-danger">
          {warningState}
        </p>
      }
    </div>
  )
}
export default Input;