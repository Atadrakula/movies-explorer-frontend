import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  children,
  movies,
  isSavedMovies,
  visibleMoviesCount,
  onToggleMovieLike,
  handleMovieLike,
  handleMovieDislike,
  isMovieSaved,
  filteredShortMovies,
  getCorrectFormateDuration,
  getAbsoluteImageUrl,
  getMovieName,
}) {
  function checkSavedMovies(movies) {
    return movies.map((movie) => ({
      ...movie,
      isLiked: isMovieSaved(movie),
    }));
  }

  const moviesToRender = checkSavedMovies(filteredShortMovies(movies))
    .slice(0, visibleMoviesCount)
    .map((movie) => (
      <MoviesCard
        key={movie.id || movie._id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        handleMovieLike={handleMovieLike}
        handleMovieDislike={handleMovieDislike}
        onToggleMovieLike={onToggleMovieLike}
        isMovieSaved={isMovieSaved}
        getCorrectFormateDuration={getCorrectFormateDuration}
        getAbsoluteImageUrl={getAbsoluteImageUrl}
        getMovieName={getMovieName}
        isLiked={movie.isLiked}
      />
    ));

  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">{moviesToRender}</ul>
      {visibleMoviesCount < filteredShortMovies(movies).length && children}
    </section>
  );
}

export default MoviesCardList;
