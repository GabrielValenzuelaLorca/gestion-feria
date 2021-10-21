import React from 'react';

const Input = ({name, label, type, placeholder, required=false, valid=true}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input 
          name={name}
          className={`input ${required && !valid && "is-danger"}`} 
          type={type} 
          placeholder={placeholder}
        />
      </div>

      {required && !valid && 
        <p className="help is-danger">
          Este campo es obligatorio
        </p>
      }
    </div>
  )
}
export default Input;