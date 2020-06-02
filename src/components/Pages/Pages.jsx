import React from 'react';
import './Pages.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function Pages({ getPage, currentPage }) {
  console.log(currentPage);

  function getPageNumbers(index) {
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
    console.log(pageArr);
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
            <PaginationLink first onClick={() => getPage('start')} />
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
        {getPageNumbers(currentPage - 1).map((pageItem) => {
          return pageItem.active ? (
            <PaginationItem active>
              <PaginationLink href="#">{pageItem.value}</PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationLink href="#">{pageItem.value}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationLink next onClick={() => getPage('next')} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last onClick={() => getPage('end')} />
        </PaginationItem>
      </Pagination>
    </div>
  );
}

export default Pages;
