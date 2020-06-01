import React, { useEffect, useState } from 'react';
// import Character from '../Character';
import { DEFAULT_URL } from '../../config';

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function doFetch(url) {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }

  useEffect(() => {
    doFetch(DEFAULT_URL);
  }, []);

  return (
    <div>
      {data && data.length > 0
        ? data.map((item) => <div>{item.name}</div>)
        : null}
    </div>
  );
};

export default Characters;
