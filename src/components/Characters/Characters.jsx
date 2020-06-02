import React, { useEffect, useState } from 'react';
import './Characters.css';
import Error from '../Error';
import Loading from '../Loading';
import Character from '../Character';
import Pages from '../Pages';
import { DEFAULT_URL } from '../../config';

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function doFetch(url) {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }

  function getPage(dir) {
    if (dir === 'next') {
      setCurrentPage((prevState) => prevState + 1);
      doFetch(data.info.next);
    } else if (dir === 'prev') {
      setCurrentPage((prevState) => prevState - 1);
      doFetch(data.info.prev);
    }
    console.log(data);
    // doFetch();
  }

  useEffect(() => {
    doFetch(DEFAULT_URL);
  }, []);

  console.log(data);
  return (
    <div>
      {isLoading ? <Loading /> : null}
      {isError ? <Error /> : null}
      {/* {data ? <Pages next={data.info.next} getPage={getPage} /> : null} */}

      <div className="characters-container">
        {!isLoading && !isError && data
          ? data.results.map((character) => (
              // eslint-disable-next-line react/jsx-indent
              <Character
                key={`${character.name}-${character.origin.name}-${character.location.name}`}
                data={character}
              />
            ))
          : null}
      </div>
      {data ? (
        <Pages
          next={data.info.next}
          getPage={getPage}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};

export default Characters;
