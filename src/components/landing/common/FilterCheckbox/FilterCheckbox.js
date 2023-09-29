import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ isShortFilm, onToggleShortFilm }) {
  const handleCheckboxChange = () => {
    onToggleShortFilm(!isShortFilm);
  };

  return (
    <div className="filtercheckbox">
      <input
        type="checkbox"
        id="switch"
        className="filtercheckbox__input"
        checked={isShortFilm}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="switch" className="filtercheckbox__label cursor-pointer">
        Поиск с тумблером
      </label>
      <h1 className="filtercheckbox__text">Короткометражки</h1>
    </div>
  );
}

export default FilterCheckbox;
