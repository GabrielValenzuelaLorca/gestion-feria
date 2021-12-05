import React from 'react';

const Select = ({
  name, 
  label, 
  options, 
  placeholder="Seleccione una opción",
  required, 
  validState, 
  setValid,
  show
}) => {
  const handleChange = () => {
    setValid({...validState, [name]:true});
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
        <div className={`select ${required && show && !validState[name] ? "is-danger" : ""}`}>
          <select 
            name={name} 
            defaultValue=""
            onChange={handleChange}
          >
            <option value="" hidden>{placeholder}</option>
            {options && options.map((option, i) => {
              return <option key={i} value={i}>{option}</option>
            })}
          </select>
        </div>
      </div>
      {
        required && show && !validState[name] && 
        <p className="help is-danger">
          Este campo es obligatorio
        </p>
      }
    </div>
  )
}

export default Select;