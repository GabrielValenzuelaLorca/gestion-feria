import React, { useEffect, useState } from "react";
import validator from "../../utils/validations";

const Input = ({
  name,
  label,
  type,
  placeholder = "",
  validations = [],
  customValidations = [],
  disabled = false,
  style = {},
  icon,
  min = "",
  max = "",
  addons,
  rightAddons,
  state,
  setState,
  showErrorState = false,
  setError = null,
  onKeyDown = false,
}) => {
  const [warningState, setWarning] = useState(
    validations.includes("required") ? "Este campo es obligatorio" : ""
  );
  const [localErrorState, setLocalError] = useState(
    validations.includes("required")
  );

  const handleChange = (e) => {
    const value =
      type !== "date" ? e.target.value : e.target.value.replaceAll("-", "/");

    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    const validation = validator(state[name], validations, customValidations);
    if (validation !== true) setWarning(validation);
    setError((error) => ({ ...error, [name]: validation === true }));
    setLocalError(validation !== true);
    // eslint-disable-next-line
  }, [name, state, setError]);

  return (
    <div className="field" style={style}>
      <label className="label">
        {label}
        {validations.includes("required") && (
          <span className={"has-text-danger"}>*</span>
        )}
      </label>
      <div className="control">
        <div className={`field ${addons || rightAddons ? "has-addons" : ""}`}>
          {addons && <div className="control">{addons}</div>}
          <div
            className={`control ${icon ? "has-icons-left" : ""} is-expanded`}
          >
            <input
              name={name}
              className={`input ${
                showErrorState && localErrorState ? "is-danger" : ""
              }`}
              value={
                (type !== "date"
                  ? state[name].toString()
                  : state[name].replaceAll("/", "-")) || ""
              }
              type={type}
              {...(type === "number" ? { min, max } : {})}
              placeholder={placeholder}
              onChange={handleChange}
              disabled={disabled}
              onKeyDown={
                onKeyDown
                  ? (e) => {
                      e.key === "Enter" && onKeyDown();
                    }
                  : undefined
              }
            />
            {icon && (
              <span className="icon is-small is-left">
                <i className={icon}></i>
              </span>
            )}
          </div>
          {rightAddons && <div className="control">{rightAddons}</div>}
        </div>
      </div>

      {showErrorState && localErrorState && (
        <p className="help is-danger">{warningState}</p>
      )}
    </div>
  );
};
export default Input;
