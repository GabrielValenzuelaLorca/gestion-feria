import React, { Children, cloneElement, useEffect } from "react";
import { useMemo } from "react";

const Form = ({ className, form, children }) => {
  const { errorState, setError } = form.formProps;

  const filteredChildren = useMemo(
    () =>
      Children.toArray(children).filter(
        (child) => child.props.validations || child.props.customValidations
      ),
    [children]
  );

  useEffect(() => {
    if (filteredChildren.length !== Object.keys(errorState).length) {
      setError((state) => {
        const newState = {};
        filteredChildren.forEach((child) => {
          const name = child.props.name;
          newState[name] = state[name] || false;
        });
        return newState;
      });
    }
  }, [errorState, setError, filteredChildren]);

  return (
    <form className={className}>
      {Children.map(children, (child) => {
        // TODO re-renderizar solo lo que se modifica
        if (child && typeof child.type !== "string") {
          return cloneElement(child, form.formProps);
        }
        return child;
      })}
    </form>
  );
};

export default Form;
