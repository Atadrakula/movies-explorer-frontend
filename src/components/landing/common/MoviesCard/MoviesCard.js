import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import { notImage, serverDataFilmsConfig } from '../../../../utils/constants';

function MoviesCard({
  movie,
  isSavedMovies,
  // onToggleMovieLike,
  handleMovieLike,
  handleMovieDislike,
  getCorrectFormateDuration,
  getAbsoluteImageUrl,
  isLiked,
  getMovieName,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLikedMovie, setLikedMovie] = useState(isLiked);

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
    isLikedMovie && 'moviescard__heart_active'
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
  const movieName = getMovieName(movie);

  return (
    <li className="moviescard">
      <img
        src={getAbsoluteImageUrl(
          movie,
          serverDataFilmsConfig.urlForImg,
          notImage,
        )}
        alt={movieName}
        className="moviescard__img"
      />
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

//РАБОЧИЙ
// useEffect(() => {
//   if (isMovieSaved(movie)) {
//     setIsLiked(true);
//   }
// }, [movie, isMovieSaved]);

// function handleLikeClick() {
//   onToggleMovieLike(movie);
//   setIsLiked(!isLiked);
// }

// const currentUser = useContext(CurrentUserContext);
// const isLiked = currentUser._id && movie.like.includes(currentUser._id);
// const likedMovies = isLiked.some((isLiked) => isLiked._id === movie._id);
