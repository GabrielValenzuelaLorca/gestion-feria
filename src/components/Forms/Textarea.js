import React, { useRef, useState } from 'react';

const Textarea = ({
  name, 
  label, 
  placeholder,
  validation={
    required:false,
    minLength:0
  }, 
  validState,
  setValid,
  show 
}) => {
  const {required, minLength} = validation;
  const ref = useRef();
  const [warningState, setWarning] = useState(
    required ? "Este campo es obligatorio" : "Campo no válido"
  );

  const handleChange = () => {
    const value = ref.current.value;
    let valid = true;
    if (valid && minLength > 0) {
      valid = value > minLength;
      setValid({...validState, [name]:valid});
      if (!valid)
        setWarning(`El texto debe ser mayor a ${minLength} carácteres`);
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
        <textarea 
          ref={ref}
          name={name}
          className={`textarea ${show && !validState[name] ? "is-danger" : ""}`}  
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>

      {
        show && !validState[name] && 
        <p className="help is-danger">
          {warningState}
        </p>
      }
    </div>
  )
}

export default Textarea;