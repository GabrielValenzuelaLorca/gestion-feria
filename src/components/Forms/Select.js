import React, { useEffect, useState } from 'react';
import validator from '../../utils/validations';

const Select = ({
  name, 
  label, 
  options, 
  placeholder="Seleccione una opción",
  multiple=false,
  validations = [],
  customValidations = [],
  disabled = false,
  state,
  setState,
  showErrorState = false,
  setError = null,
}) => {
  const [warningState, setWarning] = useState(validations.includes('required') ? 'Este campo es obligatorio' : '');
  const [localErrorState, setLocalError] = useState(validations.includes('required'));

  const handleChange = (e) => {
    const value = e.target.value;

    setState(state => ({
      ...state,
      [name]: !multiple ? value : 
        !state[name].includes(value) ? [...state[name], value] : state[name]
    }));
  }

  useEffect(() => {
    const validation = validator(state[name], validations, customValidations);
    if (validation !== true) setWarning(validation);
    setError(error => ({...error, [name]: validation === true}));
    setLocalError(validation !== true);
    // eslint-disable-next-line
  }, [name, state, setError]);

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
        <div className={`select ${showErrorState && localErrorState ? "is-danger" : ""}`}>
          <select 
            name={name} 
            value = {!multiple && state[name]}
            onChange={handleChange}
            disabled={disabled}
          >
            <option value="" hidden>{placeholder}</option>
            {options && options.map((option, i) => {
              const value = typeof option === 'string' ? option : option.value;
              const text = typeof option === 'string' ? option : option.text;
              return <option key={i} value={value}>{text}</option>
            })}
          </select>
        </div>
      </div>
      {
        showErrorState && localErrorState && 
        <p className="help is-danger">
          {warningState}
        </p>
      }
    </div>
  )
}

export default Select;