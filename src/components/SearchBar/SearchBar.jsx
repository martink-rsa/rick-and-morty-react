import React from 'react';
import propTypes from 'prop-types';
import './SearchBar.css';
import { Form } from 'react-bootstrap';

function SearchBar({ searchQuery, setSearchQuery }) {
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="form-container">
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group>
          <Form.Control
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            placeholder="Search"
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: propTypes.string.isRequired,
  setSearchQuery: propTypes.func.isRequired,
};

export default SearchBar;
