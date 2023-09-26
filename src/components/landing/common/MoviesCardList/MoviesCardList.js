import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ children, movies, filterFunction, isSavedMovies }) {
  const filteredMovies = filterFunction(movies);

  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">
        {filteredMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            isSavedMovies={isSavedMovies}
          />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
