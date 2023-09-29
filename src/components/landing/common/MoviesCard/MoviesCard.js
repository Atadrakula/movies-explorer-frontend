import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import './MoviesCard.css';
import { serverDataConfig, notImage } from '../../../../utils/constants';

function MoviesCard({ movie, isSavedMovies, getMovieName }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = movie.like && movie.like.some((i) => i === currentUser._id);
  // const isLiked = currentUser._id && movie.like.includes(currentUser._id);
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

  function getAbsoluteImageUrl(movie) {
    if (movie && movie.image && movie.image.url) {
      return `${serverDataConfig.urlForImg}${movie.image.url}`;
    }
    return { notImage };
  }

  function getCorrectFormateDuration(movie) {
    if (movie && movie.duration) {
      const hours = Math.floor(movie.duration / 60);
      const remainingMinutes = movie.duration % 60;
      const hoursText = hours > 0 ? `${hours}ч` : '';
      const minutesText = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

      if (hoursText && minutesText) {
        return `${hoursText} ${minutesText}`;
      } else {
        return `${hoursText}${minutesText}`;
      }
    }
    return 'неизвестно';
  }

  const movieName = getMovieName(movie);

  return (
    <li className="moviescard">
      <img
        src={getAbsoluteImageUrl(movie)}
        alt={movie.nameRU}
        className="moviescard__img"
      />
      <div className={cardFormCursorClassToggle}>
        <div className="moviescard__name-form">
          <h2 className="moviescard__name">{movieName}</h2>
          <button
            className={toggleClassNameButton}
            aria-label="Лайкнуть/Дизлайкнуть"
          ></button>
        </div>
        <p className="moviescard__time">{getCorrectFormateDuration(movie)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
