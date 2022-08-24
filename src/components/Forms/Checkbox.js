import React from 'react';

const Checkbox = ({text, name, state, setState, disabled = false}) => {

  const setCheck = (e) => {
    const check = e.target.checked;
    setState({
      ...state,
      [name]: check,
    });
  }

  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input 
            type="checkbox"
            name={name}
            checked={state[name]}
            onChange={setCheck}
            disabled={disabled}
          />  
          <span className="ml-1">{text}</span>
        </label>
      </div>
    </div>
  )
}

export default Checkbox;