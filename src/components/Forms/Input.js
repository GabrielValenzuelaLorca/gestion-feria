import React from 'react';

const Input = ({name, label, type, placeholder, valid=true, warningMessage}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input 
          name={name}
          className={`input ${!valid ? "is-danger" : ""}`} 
          type={type} 
          placeholder={placeholder}
        />
      </div>

      {
        !valid && 
        <p className="help is-danger">
          {warningMessage}
        </p>
      }
    </div>
  )
}
export default Input;