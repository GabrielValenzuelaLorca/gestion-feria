import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetch = (service, callback, params = null, errorMessage = null, to = null) => {
  const [isLoading, setLoading] = useState(false);
  const [messageState, setMessage] = useState(null)
  let navigate = useNavigate();

  const doFetch = async () => {
    setLoading(true)
    try {
      const response = await service(params);
      callback(response);
      if (to) {
        navigate(to)
      } else {
        setLoading(false);    
      }
    } catch (e) {
      console.log("Error", e)
      setMessage(errorMessage);
      setLoading(false);
    }
  }

  return [doFetch, isLoading, messageState];
}

export default useFetch;