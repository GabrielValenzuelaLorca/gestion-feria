import React from 'react';

const Textarea = ({name, label, placeholder, valid=true, warningMessage}) => {
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

      {
        !valid && 
        <p className="help is-danger">
          {warningMessage}
        </p>
      }
    </div>
  )
}

export default Textarea;