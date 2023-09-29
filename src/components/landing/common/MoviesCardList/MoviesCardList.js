import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  children,
  movies,
  filterFunction,
  isSavedMovies,
  getMovieName,
  visibleMoviesCount,
}) {
  const filteredMovies = filterFunction(movies);

  const moviesToRender = filteredMovies
    .slice(0, visibleMoviesCount)
    .map((movie) => (
      <MoviesCard
        key={movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        getMovieName={getMovieName}
      />
    ));

  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">{moviesToRender}</ul>
      {visibleMoviesCount < filteredMovies.length && children}
    </section>
  );
}

export default MoviesCardList;
