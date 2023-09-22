import React, { Children, cloneElement, useEffect } from "react";

const Form = ({ className, form, children }) => {
  useEffect(() => {
    const filteredChildren = Children.toArray(children).filter(
      (child) => child.props.validations || child.props.customValidations
    );

    if (
      filteredChildren.length !== Object.keys(form.formProps.errorState).length
    ) {
      form.formProps.setError((state) => {
        const newState = {};
        filteredChildren.forEach((child) => {
          const name = child.props.name;
          newState[name] = state[name] || false;
        });
        return newState;
      });
    }
  }, [children, form.formProps]);

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
