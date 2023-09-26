import React from 'react';
import './ButtonElse.css';

function ButtonElse() {
  return (
    <button
      className="button-else cursor-pointer button-hover"
      type="button"
      aria-label="Показать еще фильмы"
    >
      Ещё
    </button>
  );
}

export default ButtonElse;
