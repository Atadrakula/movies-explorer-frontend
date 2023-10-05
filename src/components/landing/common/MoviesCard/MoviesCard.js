import React, { useState } from 'react';
import './MoviesCard.css';
import { notImage, serverDataFilmsConfig } from '../../../../utils/constants';

function MoviesCard({
  movie,
  isRenderSavedMoviesButton,
  handleMovieLike,
  handleMovieDislike,
  getCorrectFormateDuration,
  getAbsoluteImageUrl,
  isLiked,
  getMovieName,
  isMobileSavedCard,
}) {
  const [isLikedMovie, setLikedMovie] = useState(isLiked);

  async function handleLikeClick() {
    try {
      if (isLiked) {
        await handleMovieDislike(movie);
      } else {
        await handleMovieLike(movie);
      }
      setLikedMovie(!isLikedMovie);
    } catch (error) {
      console.error('Ошибка при лайке/дизлайке фильма:', error.message);
    }
  }

  const cardLikedClassName = `moviescard__heart cursor-pointer ${
    isLiked && 'moviescard__heart_active'
  }`;

  const cardDeleteClassName = `moviescard__cross cursor-pointer button-hover ${
    isMobileSavedCard ? 'moviescard__cross_visible' : ''
  }`;

  const toggleClassNameButton = isRenderSavedMoviesButton
    ? cardDeleteClassName
    : cardLikedClassName;

  const cardFormCursorClassToggle = `moviescard__wrapper-for-cursor ${
    isRenderSavedMoviesButton ? 'cursor-pointer' : ''
  }`;

  const movieName = getMovieName(movie);

  return (
    <li className="moviescard">
      <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img
          src={getAbsoluteImageUrl(
            movie,
            serverDataFilmsConfig.urlForImg,
            notImage,
          )}
          alt={movieName}
          className="moviescard__img button-hover"
        />
      </a>
      <div className={cardFormCursorClassToggle}>
        <div className="moviescard__name-form">
          <h2 className="moviescard__name">{movieName}</h2>
          <button
            className={toggleClassNameButton}
            aria-label="Лайкнуть/Дизлайкнуть"
            onClick={handleLikeClick}
          ></button>
        </div>
        <p className="moviescard__time">{getCorrectFormateDuration(movie)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
