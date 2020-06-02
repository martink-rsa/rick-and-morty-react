import React, { useEffect, useState } from 'react';
import './Characters.css';
import Error from '../Error';
import Loading from '../Loading';
import Character from '../Character';
import Pages from '../Pages';
import { getUrl } from '../../utils/utils';
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
    // const maxPage = data.info.pages;
    const maxPage = 30;
    console.log(maxPage);
    switch (dir) {
      case 'next':
        setCurrentPage((prevState) => prevState + 1);
        doFetch(data.info.next);
        break;
      case 'prev':
        setCurrentPage((prevState) => prevState - 1);
        doFetch(data.info.prev);
        break;
      case 'first':
        setCurrentPage(1);
        doFetch(getUrl(1));
        break;
      case 'last':
        setCurrentPage(maxPage);
        doFetch(getUrl(maxPage));
        break;
      default:
        if (typeof dir === 'number') {
          setCurrentPage(dir);
          doFetch(getUrl(dir));
        } else {
          console.log('Error handling pagination');
        }
    }
  }

  useEffect(() => {
    doFetch(DEFAULT_URL);
  }, []);

  console.log(data);
  return (
    <div>
      {isLoading ? <Loading /> : null}
      {isError ? <Error /> : null}
      {data ? (
        <Pages
          next={data.info.next}
          getPage={getPage}
          currentPage={currentPage}
          maxPages={data.info.pages}
        />
      ) : null}

      <div className="characters-container">
        {!isLoading && !isError && data
          ? data.results.map((character) => (
              // eslint-disable-next-line react/jsx-indent
              <Character
                key={`character-${character.id}-${character.name}`}
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
          maxPages={data.info.pages}
        />
      ) : null}
    </div>
  );
};

export default Characters;
