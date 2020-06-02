import React from 'react';
import propTypes from 'prop-types';
import './SearchBar.css';
import { Form, FormGroup, Input } from 'reactstrap';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="form-container">
      <Form>
        <FormGroup>
          <Input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            placeholder="Search"
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
        </FormGroup>
        {/* <Button>Submit</Button> */}
      </Form>
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: propTypes.string.isRequired,
  setSearchQuery: propTypes.func.isRequired,
};

export default SearchBar;
