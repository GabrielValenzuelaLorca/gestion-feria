import { useCallback, useState } from 'react';

const useFetch = (service, callback = null, redirect = false, errorMessage = null) => {
  const [isLoading, setLoading] = useState(false);
  const [messageState, setMessage] = useState(null)

  const doFetch = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await service(params);
      if (callback) {
        await callback(response.data);
      }
      if (!redirect) {
        setLoading(false);    
      }
    } catch (e) {
      console.log("Error", e)
      setMessage(errorMessage);
      setLoading(false);
      throw e;
    }
  }, [callback, errorMessage, redirect, service])

  return [doFetch, isLoading, messageState];
}

export default useFetch;