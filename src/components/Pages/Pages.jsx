import React from 'react';
import PropTypes from 'prop-types';
import './Pages.css';
import { Pagination } from 'react-bootstrap';

function Pages({ getPage, currentPage, maxPages }) {
  function getPageNumbers(index, max) {
    const pageArr = [];
    const range = 5;
    let activePage = false;
    if (index < 3) {
      for (let i = 0; i < range; i += 1) {
        activePage = false;
        if (i === index) {
          activePage = true;
        }
        pageArr.push({ value: i + 1, active: activePage });
      }
    } else if (index > max - 3) {
      for (let i = max - range; i < max; i += 1) {
        activePage = false;
        if (i === index) {
          activePage = true;
        }
        pageArr.push({ value: i + 1, active: activePage });
      }
    } else {
      // Range of numbers with page index in the middle of the range
      // Dynamic solution used so the range of numbers can always be increased
      // Stick to odd numbers for a range so that the current page can be in the middle
      const begin = index - Math.floor(range / 2); // Half of range below index
      const end = index + Math.floor(range / 2); // Half of range above index
      for (let i = begin; i <= end; i += 1) {
        activePage = false;
        if (i === index) {
          activePage = true;
        }
        pageArr.push({ value: i + 1, active: activePage });
      }
    }
    return pageArr;
  }

  /* Multiple conditional renders about to take place according to
        where the pagination index is */
  return (
    <div className="pages-container">
      <Pagination aria-label="Pagination">
        {currentPage === 1 ? (
          <Pagination.First disabled />
        ) : (
          <Pagination.First onClick={() => getPage('first')} />
        )}
        {currentPage === 1 ? (
          <Pagination.Prev disabled />
        ) : (
          <Pagination.Prev onClick={() => getPage('prev')} />
        )}
        {getPageNumbers(currentPage - 1, maxPages).map((pageItem) => {
          return pageItem.active ? (
            <Pagination.Item key={`pagination-page-${pageItem.value}`} active>
              {pageItem.value}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={`pagination-page-${pageItem.value}`}
              onClick={() => getPage(pageItem.value)}
            >
              {pageItem.value}
            </Pagination.Item>
          );
        })}
        {currentPage === 30 ? (
          <Pagination.Next disabled />
        ) : (
          <Pagination.Next onClick={() => getPage('next')} />
        )}
        {currentPage === 30 ? (
          <Pagination.Last disabled />
        ) : (
          <Pagination.Last onClick={() => getPage('last')} />
        )}
      </Pagination>
    </div>
  );
}

Pages.propTypes = {
  getPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
};

export default Pages;
