import React from 'react';

const Select = ({name, label, options, placeholder="Seleccione una opción", valid, warningMessage}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>    
      <div className="control">
        <div className={`select ${!valid ? "is-danger" : ""}`}>
          <select 
            name={name} 
            defaultValue=""
          >
            <option value="" hidden>{placeholder}</option>
            {options.map((option, i) => {
              return <option key={i} value={i}>{option}</option>
            })}
          </select>
        </div>
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

export default Select;