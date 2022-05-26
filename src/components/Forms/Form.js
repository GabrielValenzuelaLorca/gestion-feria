import React, { Children, cloneElement } from 'react'

const Form = ({className, formProps, children}) => {
  
  
  return (
    <form className={className}>
      {Children.map(children, child => {
        return cloneElement(child, formProps);
      })}
    </form>
  )
}

export default Form;