import React, { Children, cloneElement, useEffect } from 'react'

const Form = ({className, formProps, children}) => {
  const { setError, errorState } = formProps;

  useEffect(() => {
    const filteredChildren = Children.toArray(children).filter(child => 
      child.props.validations || child.props.customValidations
    );

    if(filteredChildren.length !== Object.keys(errorState).length ){
      setError(state => {
        const newState = {};
        filteredChildren.forEach(child => {
          const name = child.props.name;
          newState[name] = state[name] || false;
        });
        return newState;
      });
    }

  }, [children, errorState, setError])

  return (
    <form className={className}>
      {Children.map(children, child => {
        if (child) {
          return cloneElement(child, formProps);
        } 
        return child;
      })}
    </form>
  )
}

export default Form;