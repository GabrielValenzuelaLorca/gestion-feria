import React from 'react';

const Checkbox = ({text, name, setCheck=null}) => {
  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          {
            setCheck ?
              <input type="checkbox" name={name} onChange={e => setCheck(e.target.checked)}/>  
            : 
              <input type="checkbox" name={name}/>
          }
          <span className="ml-1">{text}</span>
        </label>
      </div>
    </div>
  )
}

export default Checkbox;