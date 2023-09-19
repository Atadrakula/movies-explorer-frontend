import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="searchform">
      <form name="search-form" action="#" className="searchform__form">
        <div className="searchform__input-container">
          <input
            type="text"
            className="searchform__input"
            placeholder="Фильм"
            aria-label="Поиск"
          />
          <button
            className="searchform__submit cursor-pointer link-hover"
            type="submit"
            aria-label="Поиск"
          />
        </div>
        <FilterCheckbox />
      </form>
    </div>
  );
}

export default SearchForm;
