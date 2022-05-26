import { diffDates } from "./functions";

const validator = (value, validations, customValidations) => {
  let hasErrors = false;
  let message = ''
  validations.every(validation => {
    if (!VALIDATION_PROPERTIES[validation].condition(value)) {
      message = VALIDATION_PROPERTIES[validation].message;
      hasErrors = true;
      return false;
    }
    return true;
  });

  customValidations.every(validation => {
    const result = validation(value);
    if (result) {
      message = result;
      hasErrors = true;
      return false;
    }
    return true;
  });
  
  return hasErrors ? message : true;
}

export const validateArray = (state) => {
  return Object.keys(state).reduce(( acc, next ) => {
    return acc && state[next];
  }, true)
}

const VALIDATION_PROPERTIES = {
  passLen: {
    condition: (value) => value.length >= 8,
    message: 'La contraseña debe tener un largo mínimo de 8 caracteres'
  },
  dateFromNow: {
    condition: (value) => value !== '' && diffDates(new Date(), value) > 0,
    message: 'La fecha debe ser posterior o igual al día de hoy'
  },
  email: {
    condition: (value) => value !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Ingrese un correo válido'
  },
  required: {
    condition: (value) => value !== '' && value !== null,
    message: 'Este campo es obligatorio'
  }
}

export default validator;