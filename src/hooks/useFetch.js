import { useCallback, useState } from 'react';

const useFetch = (service, callback, redirect = false, errorMessage = null) => {
  const [isLoading, setLoading] = useState(false);
  const [messageState, setMessage] = useState(null)

  const doFetch = useCallback(async (params) => {
    setLoading(true)
    try {
      const response = await service(params);
      await callback(response.data);
      if (!redirect) {
        setLoading(false);    
      }
    } catch (e) {
      console.log("Error", e)
      setMessage(errorMessage);
      setLoading(false);
    }
  }, [callback, errorMessage, redirect, service])

  return [doFetch, isLoading, messageState];
}

export default useFetch;