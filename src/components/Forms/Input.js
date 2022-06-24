import React, { useEffect, useState } from 'react';
import validator from '../../utils/validations';

const Input = ({
  name, 
  label, 
  type, 
  placeholder = '', 
  validations = [],
  customValidations = [],
  state,
  setState,
  showErrorState = false,
  setError = null,
  onKeyDown = false
}) => {
  const [warningState, setWarning] = useState(validations.includes('required') ? 'Este campo es obligatorio' : '');
  const [localErrorState, setLocalError] = useState(validations.includes('required'));

  const handleChange = (e) => {
    const value = e.target.value;

    setState({
      ...state,
      [name]: value
    });
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
        <input
          name={name}
          className={`input ${showErrorState && localErrorState ? "is-danger" : ""}`} 
          value = {state[name]}
          type={type} 
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={
            onKeyDown 
            ? (e) => {
              e.key === 'Enter' && onKeyDown();
            }
            : undefined
          }
        />
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
export default Input;