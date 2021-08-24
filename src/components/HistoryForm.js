import React from 'react'

const HistoryForm = ({isActive, handleClose}) => {  
  return (
    <div className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content">
        <h1>su texto</h1>
      </div>
    </div>
  )
}

export default HistoryForm;