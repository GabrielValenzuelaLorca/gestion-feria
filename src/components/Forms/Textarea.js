import React from 'react';

const Textarea = ({name, label, placeholder, valid=true}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea 
          name={name}
          className={`textarea ${!valid ? "is-danger" : ""}`}  
          placeholder={placeholder}
        />
      </div>

      {!valid && 
        <p className="help is-danger">
          Este campo es obligatorio
        </p>
      }
    </div>
  )
}

export default Textarea;