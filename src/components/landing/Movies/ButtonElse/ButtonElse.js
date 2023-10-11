import React from 'react';
import './ButtonElse.css';

function ButtonElse({
  setVisibleMoviesCount,
  visibleMoviesCount,
  visibleMoviesCountToPressButton,
  setHasPressedShowMore,
}) {
  const handleButtonClick = () => {
    setVisibleMoviesCount(visibleMoviesCount + visibleMoviesCountToPressButton);
    setHasPressedShowMore(true);
  };

  return (
    <button
      className="button-else cursor-pointer button-hover"
      type="button"
      aria-label="Показать еще фильмы"
      onClick={handleButtonClick}
    >
      Ещё
    </button>
  );
}

export default ButtonElse;
