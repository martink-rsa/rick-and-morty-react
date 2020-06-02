import React from 'react';
import PropTypes from 'prop-types';
import './Pages.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

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

  return (
    <div className="pages-container">
      <Pagination aria-label="Pagination">
        {currentPage === 1 ? (
          <PaginationItem disabled>
            <PaginationLink first />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink first onClick={() => getPage('first')} />
          </PaginationItem>
        )}
        {currentPage === 1 ? (
          <PaginationItem disabled>
            <PaginationLink previous />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink previous onClick={() => getPage('prev')} />
          </PaginationItem>
        )}
        {getPageNumbers(currentPage - 1, maxPages).map((pageItem) => {
          return pageItem.active ? (
            <PaginationItem key={`pagination-page-${pageItem.value}`} active>
              <PaginationLink>{pageItem.value}</PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={`pagination-page-${pageItem.value}`}>
              <PaginationLink onClick={() => getPage(pageItem.value)}>
                {pageItem.value}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage === 30 ? (
          <PaginationItem disabled>
            <PaginationLink next />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink next onClick={() => getPage('next')} />
          </PaginationItem>
        )}
        {currentPage === 30 ? (
          <PaginationItem disabled>
            <PaginationLink last />
          </PaginationItem>
        ) : (
          <PaginationItem>
            <PaginationLink last onClick={() => getPage('last')} />
          </PaginationItem>
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
