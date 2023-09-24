import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filtercheckbox__container">
      <input type="checkbox" id="switch" className="filtercheckbox__input" />
      <label htmlFor="switch" className="filtercheckbox__label cursor-pointer">
        Поиск с тумблером
      </label>
      <h1 className="filtercheckbox__text">Короткометражки</h1>
    </div>
  );
}

export default FilterCheckbox;
