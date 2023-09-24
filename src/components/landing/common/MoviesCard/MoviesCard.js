import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import './MoviesCard.css';

function MoviesCard({ moviescard, isSavedMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    moviescard.like && moviescard.like.some((i) => i === currentUser._id);
  const [isMobile, setIsMobile] = useState(false);

  const cardLikedClassName = `moviescard__heart cursor-pointer ${
    isLiked && 'moviescard__heart_active'
  }`;

  const cardDeleteClassName = `moviescard__cross cursor-pointer button-hover ${
    isMobile ? 'moviescard__cross_visible' : ''
  }`;

  const toggleClassNameButton = isSavedMovies
    ? cardDeleteClassName
    : cardLikedClassName;

  const cardFormCursorClassToggle = `moviescard__wrapper-for-cursor ${
    isSavedMovies ? 'cursor-pointer' : ''
  }`;

  useEffect(() => {
    const handleResizeWindow = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <li className="moviescard">
      <img
        src={moviescard.src}
        alt={moviescard.alt}
        className="moviescard__img"
      />
      <div className={cardFormCursorClassToggle}>
        <div className="moviescard__name-form">
          <h2 className="moviescard__name">{moviescard.name}</h2>
          <button
            className={toggleClassNameButton}
            aria-label="Лайкнуть/Дизлайкнуть"
          ></button>
        </div>
        <p className="moviescard__time">{moviescard.time}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
