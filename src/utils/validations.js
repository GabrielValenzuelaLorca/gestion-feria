import { diffDates } from "./functions";

const validator = (value, validations, customValidations) => {
  let hasErrors = false;
  let message = ''
  validations.every(validation => {
    const [property, param] = validation.split('-');
    if (!VALIDATION_PROPERTIES[property].condition(value, param)) {
      message = VALIDATION_PROPERTIES[property].message(param);
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
    message: () => 'La contraseña debe tener un largo mínimo de 8 caracteres'
  },
  dateFromNow: {
    condition: (value) => value !== '' && diffDates(new Date(), value) > 0,
    message: () => 'La fecha debe ser posterior o igual al día de hoy'
  },
  email: {
    condition: (value) => value !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: () => 'Ingrese un correo válido'
  },
  min: {
    condition: (value, param) => value !== '' && value.length >= parseInt(param),
    message: (param) => `El texto debe tener como mínimo ${param} carácteres`
  },
  required: {
    condition: (value) => value !== null && typeof value === 'string' ? value !== '' : value.length > 0,
    message: () => 'Este campo es obligatorio'
  }
}

export default validator;