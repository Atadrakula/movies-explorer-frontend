import React from 'react';
import './ButtonElse.css';

function ButtonElse({
  setVisibleMoviesCount,
  visibleMoviesCount,
  visibleMoviesCountToPressButton,
}) {
  const handleButtonClick = () => {
    setVisibleMoviesCount(visibleMoviesCount + visibleMoviesCountToPressButton);
    console.log(
      `ButtonElse-click: initialVisibleMoviesCount:${visibleMoviesCountToPressButton}`,
    );
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
