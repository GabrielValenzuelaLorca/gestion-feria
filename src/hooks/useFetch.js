import { useEffect, useState } from 'react';

const useFetch = (service, setState) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await service();
      console.log(response);
      setState(response);
      setLoading(false);
    };

    fetch();
  }, [service, setState]);

  console.log("aer dentro", isLoading);
  return [isLoading];
}

export default useFetch;