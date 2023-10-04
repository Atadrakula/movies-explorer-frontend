import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({
  handleInputChange,
  handleSubmit,
  currentSearchKeyword,
  textError,
  isShortFilm,
  onToggleShortFilm,
}) {
  return (
    <section className="searchform">
      <form
        name="search-form"
        action="#"
        className="searchform__form"
        onSubmit={handleSubmit}
      >
        <div className="searchform__input-container">
          <input
            type="text"
            className="searchform__input input-style-search"
            placeholder="Фильм"
            aria-label="Поиск"
            value={currentSearchKeyword}
            onChange={handleInputChange}
            name="searchKeyword"
          />
          <button
            className="searchform__submit cursor-pointer link-hover"
            type="submit"
            aria-label="Поиск"
            name="submitSearchButton"
          />
        </div>
        <FilterCheckbox
          isShortFilm={isShortFilm}
          onToggleShortFilm={onToggleShortFilm}
        />
      </form>
      {textError && <p className="searchform__error">{textError}</p>}
    </section>
  );
}

// переделать в модальное окно вывод ошибок

export default SearchForm;
