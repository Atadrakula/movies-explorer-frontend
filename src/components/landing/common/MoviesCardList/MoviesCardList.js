import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  children,
  moviescards,
  filterFunction,
  isSavedMovies,
}) {
  const filteredMovies = filterFunction(moviescards);

  return (
    <section className="moviesccardlist">
      <ul className="moviesccardlist__moviescards">
        {filteredMovies.map((moviescard) => (
          <MoviesCard
            key={moviescard._id}
            moviescard={moviescard}
            isSavedMovies={isSavedMovies}
          />
        ))}
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
