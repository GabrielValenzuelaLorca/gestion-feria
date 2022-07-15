import { useEffect, useState } from 'react';
import { validateArray } from '../utils/validations';

const useForm = (state, setState) => {
  const [showErrorState, setShowError] = useState(false);
  const [validationState, setValidation] = useState(true);
  const [errorState, setError] = useState({});

  useEffect(() => {
    setValidation(validateArray(errorState));
  }, [errorState])

  return {
    validationState,
    setShowError,
    formProps: {
      state,
      setState,
      errorState,
      showErrorState,
      setError
    }
  };
}

export default useForm;