import { useEffect, useState } from 'react';

const useFetch = (service, setState) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await service();
      setState(response);
      setLoading(false);
    };

    fetch();
  }, [service, setState]);

  return [isLoading];
}

export default useFetch;