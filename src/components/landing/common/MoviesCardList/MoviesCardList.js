import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  children,
  movies,
  isRenderSavedMoviesButton,
  visibleMoviesCount,
  handleMovieLike,
  handleMovieDislike,
  isMovieSaved,
  filteredShortMovies,
  getMovieName,
  isMobileSavedCard,
  isSavedMoviesPage,
}) {
  function checkSavedMovies(movies) {
    return isSavedMoviesPage
      ? movies
      : movies.map((movie) => ({
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
        isRenderSavedMoviesButton={isRenderSavedMoviesButton}
        handleMovieLike={handleMovieLike}
        handleMovieDislike={handleMovieDislike}
        isMovieSaved={isMovieSaved}
        getMovieName={getMovieName}
        isLiked={movie.isLiked || isSavedMoviesPage}
        isMobileSavedCard={isMobileSavedCard}
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
