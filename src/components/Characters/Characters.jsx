import React, { useEffect, useState } from 'react';
import './Characters.css';
import Error from '../Error';
import Loading from '../Loading';
import Character from '../Character';
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
      {isLoading ? <Loading /> : null}
      {isError ? <Error /> : null}
      <div className="characters-container">
        {!isLoading && !isError && data
          ? data.map((character) => (
              // eslint-disable-next-line react/jsx-indent
              <Character key={character.name} data={character} />
            ))
          : null}
      </div>
    </div>
  );
};

export default Characters;
