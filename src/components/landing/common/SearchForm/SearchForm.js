import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchKeyword) {
      setError('Нужно ввести ключевое слово');
      return;
    }

    try {
      onSearchSubmit(searchKeyword);
      setError('');
    } catch (error) {
      setError(`Произошла ошибка при запросе к API: ${error}`);
    }
  }

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
            className="searchform__input input-style"
            placeholder="Фильм"
            aria-label="Поиск"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <button
            className="searchform__submit cursor-pointer link-hover"
            type="submit"
            aria-label="Поиск"
          />
        </div>
        <FilterCheckbox />
      </form>
      {error && <p className="searchform__error">{error}</p>}
    </section>
  );
}

// переделать в модальное окно вывод ошибок

export default SearchForm;
