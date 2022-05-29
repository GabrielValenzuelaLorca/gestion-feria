import { useEffect, useState } from 'react';
import { validateArray } from '../utils/validations';

const useForm = (state, setState) => {
  const [showErrorState, setShowError] = useState(false);
  const [validationState, setValidation] = useState(true);
  const [errorState, setError] = useState(
    Object.keys(state).reduce((prev, acc) => {
      prev[acc] = true;
      return prev;
    }, {})
  );

  useEffect(() => {
    setValidation(validateArray(errorState));
  }, [errorState])

  return [
    validationState,
    setShowError,
    {
      state,
      setState,
      showErrorState,
      setError
    }
  ];
}

export default useForm;